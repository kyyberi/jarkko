"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { InsightReport } from "./reports";
import { trackInsightEvent } from "./insights-analytics";

const assetPath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const insightsApiUrl = process.env.NEXT_PUBLIC_INSIGHTS_API_URL ?? "";
const gateMarkerKey = "jm_insights_gate_completed";
const gateMarkerValue = "v1";

type DownloadState = "idle" | "submitting" | "ready";
type WorkerSubscriptionStatus =
  | "subscribed"
  | "not_requested"
  | "failed";

type WorkerResponse = {
  ok?: boolean;
  subscribed?: boolean;
  subscriptionFailed?: boolean;
  reportSlug?: string;
  error?: string;
  subscriptionStatus?: WorkerSubscriptionStatus;
};

function hasCompletedGate() {
  try {
    return window.localStorage.getItem(gateMarkerKey) === gateMarkerValue;
  } catch {
    return false;
  }
}

function markGateCompleted() {
  try {
    window.localStorage.setItem(gateMarkerKey, gateMarkerValue);
  } catch {
    // Browsers can block storage; the soft gate should still grant this download.
  }
}

function triggerDownload(downloadUrl: string) {
  window.location.assign(`${assetPath}${downloadUrl}`);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function subscriptionNotice(status?: WorkerSubscriptionStatus) {
  if (status === "failed") {
    return "Your report is ready. We could not complete the subscription request.";
  }

  return "Your report is ready.";
}

export function ReportDownloadButton({ report }: { report: InsightReport }) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribe, setSubscribe] = useState(false);
  const [state, setState] = useState<DownloadState>("idle");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  function closeModal() {
    setIsOpen(false);
    setState("idle");
    setError("");
    setNotice("");
    openerRef.current?.focus();
  }

  function openModal() {
    trackInsightEvent("report_download_button_clicked", {
      report_slug: report.slug,
      report_type: report.type,
      report_title: report.title,
    });

    if (hasCompletedGate()) {
      trackInsightEvent("report_downloaded", {
        report_slug: report.slug,
        report_type: report.type,
        report_title: report.title,
        subscribed: false,
      });
      triggerDownload(report.filePath);
      return;
    }

    setIsOpen(true);
    trackInsightEvent("download_modal_opened", {
      report_slug: report.slug,
      report_type: report.type,
      report_title: report.title,
    });
  }

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    emailInputRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeModal();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "submitting") return;

    const trimmedEmail = email.trim();

    if (!isValidEmail(trimmedEmail)) {
      setError("Enter a valid email address.");
      return;
    }

    setState("submitting");
    setError("");
    setNotice("");

    function grantAccess(message: string) {
      markGateCompleted();
      setState("ready");
      setNotice(message);
      trackInsightEvent("report_request_submitted", {
        report_slug: report.slug,
        report_type: report.type,
        report_title: report.title,
        subscribed: subscribe,
      });
      if (subscribe) {
        trackInsightEvent("subscription_checkbox_selected", {
          report_slug: report.slug,
          report_type: report.type,
          report_title: report.title,
          subscribed: true,
        });
      }
    }

    if (!insightsApiUrl) {
      setState("idle");
      setError("We could not process the request. Please try again.");
      return;
    }

    try {
      const response = await fetch(`${insightsApiUrl.replace(/\/$/, "")}/insights/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: trimmedEmail,
          reportSlug: report.slug,
          subscribe,
        }),
      });
      const payload = (await response.json().catch(() => ({}))) as WorkerResponse;

      if (!response.ok || payload.ok === false) {
        setState("idle");
        setError(payload.error ?? "We could not process the request. Please try again.");
        return;
      }

      grantAccess(
        payload.subscriptionFailed
          ? "Your report is ready. We could not complete the subscription request."
          : subscriptionNotice(payload.subscriptionStatus),
      );
    } catch {
      setState("idle");
      setError("We could not process the request. Please try again.");
    }
  }

  return (
    <>
      <button
        className="report-download-button"
        onClick={openModal}
        ref={openerRef}
        type="button"
      >
        Download report
      </button>

      {isOpen ? (
        <div
          className="report-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <div
            aria-describedby={descriptionId}
            aria-labelledby={titleId}
            aria-modal="true"
            className="report-modal"
            ref={dialogRef}
            role="dialog"
          >
            <div className="section-kicker">Get the report</div>
            <h2 id={titleId}>
              {state === "ready" ? "Your report is ready." : report.title}
            </h2>
            <p id={descriptionId}>
              {state === "ready"
                ? notice
                : "Enter your email to access the report. Subscription is optional."}
            </p>

            {state === "ready" ? (
              <div className="report-modal-actions">
                <button
                  className="report-download-button"
                  onClick={() => {
                    trackInsightEvent("report_downloaded", {
                      report_slug: report.slug,
                      report_type: report.type,
                      report_title: report.title,
                      subscribed: subscribe,
                    });
                    triggerDownload(report.filePath);
                  }}
                  type="button"
                >
                  Download now
                </button>
                <button className="report-secondary-button" onClick={closeModal} type="button">
                  Cancel
                </button>
              </div>
            ) : (
              <form className="report-download-form" onSubmit={handleSubmit}>
                <label htmlFor={`report-email-${report.slug}`}>Email address</label>
                <input
                  autoComplete="email"
                  id={`report-email-${report.slug}`}
                  onChange={(event) => setEmail(event.target.value)}
                  ref={emailInputRef}
                  type="email"
                  value={email}
                />
                <label className="report-checkbox">
                  <input
                    checked={subscribe}
                    onChange={(event) => setSubscribe(event.target.checked)}
                    type="checkbox"
                  />
                  <span>Send me new research, whitepapers, and analysis when published.</span>
                </label>
                <p className="report-privacy-note">
                  Used to send this report and, if selected, future research updates.
                  No raw email is stored in this browser.
                </p>
                {error ? <p className="report-form-error">{error}</p> : null}
                <div className="report-modal-actions">
                  <button
                    className="report-download-button"
                    disabled={state === "submitting"}
                    type="submit"
                  >
                    {state === "submitting" ? "Preparing..." : "Get report"}
                  </button>
                  <button
                    className="report-secondary-button"
                    onClick={closeModal}
                    type="button"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
