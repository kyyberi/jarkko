const allowedReports = new Set([
  "odps-whitepaper-2026",
  "ai-centers-of-excellence-operating-model",
]);

const defaultAllowedOrigins = [
  "https://jarkkomoilanen.com",
  "https://www.jarkkomoilanen.com",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:3001",
  "http://127.0.0.1:3001",
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(data, init = {}, corsHeaders = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...corsHeaders,
      ...init.headers,
    },
  });
}

function allowedOrigins(env) {
  if (!env.ALLOWED_ORIGINS) return defaultAllowedOrigins;
  return env.ALLOWED_ORIGINS.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function corsHeaders(request, env) {
  const origin = request.headers.get("Origin");
  if (!origin || !allowedOrigins(env).includes(origin)) {
    return null;
  }

  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

async function subscribeToMailerLite(email, env) {
  if (!env.MAILERLITE_API_KEY || !env.MAILERLITE_RESEARCH_GROUP_ID) {
    console.error("MailerLite configuration is missing.");
    return false;
  }

  const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${env.MAILERLITE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      groups: [env.MAILERLITE_RESEARCH_GROUP_ID],
    }),
  });

  if (!response.ok) {
    console.error("MailerLite subscription failed.", {
      status: response.status,
      statusText: response.statusText,
    });
    return false;
  }

  return true;
}

export default {
  async fetch(request, env) {
    const headers = corsHeaders(request, env);

    if (request.method === "OPTIONS") {
      if (!headers) return new Response(null, { status: 403 });
      return new Response(null, { status: 204, headers });
    }

    const url = new URL(request.url);

    if (url.pathname !== "/insights/subscribe") {
      return json({ ok: false, error: "Not found." }, { status: 404 }, headers ?? {});
    }

    if (request.method !== "POST") {
      return json(
        { ok: false, error: "Method not allowed." },
        { status: 405, headers: { Allow: "POST, OPTIONS" } },
        headers ?? {},
      );
    }

    if (!headers) {
      return json({ ok: false, error: "Origin not allowed." }, { status: 403 });
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return json({ ok: false, error: "Invalid request." }, { status: 400 }, headers);
    }

    const email = typeof payload.email === "string" ? payload.email.trim() : "";
    const normalizedEmail = email.toLowerCase();
    const reportSlug =
      typeof payload.reportSlug === "string" ? payload.reportSlug.trim() : "";

    if (typeof payload.subscribe !== "boolean") {
      return json(
        { ok: false, error: "Subscription consent must be true or false." },
        { status: 400 },
        headers,
      );
    }

    const subscribe = payload.subscribe;

    if (!emailPattern.test(normalizedEmail)) {
      return json(
        { ok: false, error: "Enter a valid email address." },
        { status: 400 },
        headers,
      );
    }

    if (!allowedReports.has(reportSlug)) {
      return json(
        { ok: false, error: "This report is temporarily unavailable." },
        { status: 404 },
        headers,
      );
    }

    if (!subscribe) {
      return json(
        { ok: true, subscribed: false, reportSlug },
        { status: 200 },
        headers,
      );
    }

    let subscribed = false;
    try {
      subscribed = await subscribeToMailerLite(normalizedEmail, env);
    } catch (error) {
      console.error("MailerLite request threw.", {
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }

    if (!subscribed) {
      return json(
        { ok: true, subscribed: false, subscriptionFailed: true, reportSlug },
        { status: 200 },
        headers,
      );
    }

    return json({ ok: true, subscribed: true, reportSlug }, { status: 200 }, headers);
  },
};
