const stages = [
  {
    number: "01",
    label: "QUESTION",
    description: "Small expert engagement",
    value: "Concrete value",
  },
  {
    number: "02",
    label: "DIAGNOSE",
    description: "Focused assessment",
    value: "Concrete value",
  },
  {
    number: "03",
    label: "DESIGN",
    description: "Defined solution",
    value: "Concrete value",
  },
  {
    number: "04",
    label: "DELIVER",
    description: "Working implementation",
    value: "Concrete value",
  },
  {
    number: "05",
    label: "DRIVE",
    description: "Ongoing leadership",
    value: "Continuous value",
  },
];

export function EngagementStagePattern({
  id,
  title = "Engagement options",
}: {
  id?: string;
  title?: string;
}) {
  const titleId = id ? `${id}-title` : "engagement-stage-pattern-title";

  return (
    <section
      aria-labelledby={titleId}
      className="engage-section engage-stage-section"
      id={id}
    >
      <h2 className="sr-only" id={titleId}>
        {title}
      </h2>
      <div className="engage-stage-grid" aria-label="Five engagement stages">
        {stages.map((stage) => (
          <article className="engage-stage" key={stage.number}>
            <span>{stage.number}</span>
            <h3>{stage.label}</h3>
            <p>{stage.description}</p>
            <strong>{stage.value}</strong>
          </article>
        ))}
      </div>
      <div className="engage-stage-statements">
        <p>Each step is a standalone value package.</p>
        <p>Continue only when the next step is worth taking.</p>
      </div>
    </section>
  );
}
