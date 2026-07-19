---
title: Golden Data Product Portfolio
date: 2026-07-19
category: Data products
summary: A Golden Data Product Portfolio connects fragmented initiative portfolios into one traceable candidate for implementation.
status: draft
---

Organizations rarely lack data and AI ideas. The problem is that those ideas enter the organization separately.

One business unit proposes a customer retention initiative. Another wants better recommendations. A third wants to improve customer service with AI. Each initiative has its own sponsor, workshop, business case, objectives, and proposed data products. Because the organization reviews them one at a time, they appear to be separate opportunities. The underlying evidence may show that they are parts of the same opportunity.

Several initiatives may depend on the same customer identity, interaction history, transaction data, operational signals, ownership model, or quality controls. If each initiative moves forward independently, the organization risks building overlapping pipelines, duplicated data products, competing definitions, and separate governance structures for the same business capability.

There is already a body of work around data product portfolio management, use-case clustering, reusable data products, strategic portfolio selection, and provenance. What is missing is a clear name for the strategic object that appears when several initiative portfolios are connected before implementation. I call that object the Golden Data Product Portfolio.

## The Gap Between Initiative Discovery and Implementation

Portfolio management has long focused on connecting strategy to execution. Its role is to help leaders choose the right combination of investments, manage limited resources, and identify interactions between initiatives. The Project Management Institute describes portfolio management as a way to maximize strategic benefits by evaluating investments as a connected portfolio rather than as isolated projects.

Source note: PMI portfolio decisions.

Data product thinking adds another layer. It asks organizations to design reusable, owned, governed, and consumable data assets around business needs rather than around technical systems alone. These two disciplines meet when an organization has several business initiatives that rely on similar data.

Martin Fowler's guidance on data product design starts with one use case, works backward to identify the required data products, and then overlays additional use cases. The purpose is to generalize the product boundary and avoid creating a data product that only serves one narrow request. Source note: Designing data products.

McKinsey applies the same logic at portfolio scale. It recommends evaluating the value of use cases, clustering the ones that depend on similar data, and treating those clusters as strong evidence for shared data products. Source note: Scaling data products to generate more value.

This creates an important insight. Separate initiative proposals may describe fragments of one larger capability. One portfolio may contain the clearest business objective. Another may provide the strongest evidence. A third may already identify a reusable data product. A fourth may have the strongest executive case.

The organization needs a way to combine these parts without erasing their source context. That is the purpose of the Golden Data Product Portfolio.

## Defining the Golden Data Product Portfolio

### Initial definition of Golden Data Product Portfolio

"A Golden Data Product Portfolio is a virtual, evidence-backed strategic portfolio assembled from several accepted or boardroom-ready initiative portfolios. It combines shared business objectives, clustered use cases, supporting signals, evidence, reusable data products, ownership, readiness material, and decision context into one implementation candidate. The portfolio remains machine-readable and AI agent friendly, includes a graph of relationships between its elements, and preserves provenance back to every source portfolio. It is not the implementation itself. It is the strongest consolidated proposal for what several connected initiatives should become if the organization decides to move them forward together." It preserves provenance to every source portfolio, artifact, owner, and version. A normal portfolio represents one initiative package. It connects a business objective to use cases, candidate data products, evidence, owners, readiness material, and a proposed delivery path.

A Golden Data Product Portfolio sits above those initiative packages. It appears when several portfolios point toward the same wider business capability. The source portfolios remain intact. The Golden Portfolio does not replace them. It references and combines selected parts of them to form a stronger strategic case.

This distinction matters because the Golden Portfolio is not another program, catalog entry, or project plan. A program usually coordinates work that has already been approved. A catalog records assets that already exist or have been defined. A project plan describes execution.

The Golden Data Product Portfolio exists before that commitment. It is a strategic candidate for what the organization should implement after discovery.

## A Data Product Portfolio Is More Than a List of Products

In this concept, a data product portfolio is not a catalog page containing only product names. It is a structured business context that connects data products with the reasons they should exist.

Each portfolio contains the relevant business objectives, use cases, signals, evidence, ownership, readiness information, and proposed or existing data products. The relationships between these elements matter as much as the elements themselves.

A business objective explains the outcome the organization wants to achieve. Use cases describe how data will support that outcome. Signals provide evidence that the need exists or show how business conditions are changing. Data products provide the reusable foundations needed by those use cases. Ownership and readiness information show whether the portfolio has a credible path toward implementation.

Together, these elements form a connected context rather than a collection of files.

The portfolio also contains a graph of relationships. It shows which use cases support which objectives, which signals provide evidence for those use cases, which data products support them, and where ownership and dependencies sit.

This graph matters because the meaning is found in the connections.

A list of products might tell you that Customer Profile, Interaction History, and Propensity Score exist. The graph explains which business objectives they support, which use cases consume them, which signals justify their priority, and where reuse is possible across initiatives.

That makes the portfolio useful to humans and machines alike.

A business leader can read it as a coherent initiative and investment case. A data product leader can inspect product boundaries and ownership. An enterprise architect can examine dependencies and overlap. An AI agent can traverse the graph, compare portfolios, identify missing links, detect repeated products, test strategic alignment, and explain why a proposed product matters.

The portfolio therefore acts as rich organizational context. It gives people a clear business narrative while giving machines structured knowledge that they can inspect and reason across.

This distinction becomes more important as organizations move from AI systems that summarize documents toward agents that work across governed enterprise context. An agent cannot reliably reason across a folder of presentations and spreadsheets without first reconstructing the objects, meaning, and relationships inside them. A machine-readable portfolio provides that structure directly.

## Standardized Context for Humans and AI Agents

The portfolio content is standardized through the Open Data Products standards family developed and maintained under the Linux Foundation.

The Open Data Product Specification defines a vendor-neutral and machine-readable model for describing individual data products. It supports structured information covering product strategy, use cases, access, data quality, service levels, governance, licensing, pricing, and other product concerns. Source note: Open Data Product Specification 4.1.

The wider standards family extends that foundation beyond the individual product.

Open Data Product Catalogs organizes products together with objectives, use cases, KPIs, and signals. Open Data Product Graphs defines relationships, value mappings, governance connections, and graph structures that AI agents can traverse. Open Data Product Vocabulary keeps terms and relationship meanings consistent. The draft Open Data Product Recipes standard defines repeatable workflow contracts for people, platforms, and agents. Source note: Open Data Products standards family.

This makes the portfolio more than a document prepared for one meeting. It becomes a portable and interoperable context package.

The same portfolio can be reviewed by a person, processed through an SDK, exchanged between platforms, queried by an AI agent, rendered as a graph, or transformed into executive material without losing its underlying structure.

A presentation captures one interpretation at one moment. A standardized portfolio preserves the objects, evidence, relationships, and provenance beneath that interpretation.

The presentation can change. The decision brief can change. The portfolio remains the structured source context.

## The Same Principle Applies to Golden Portfolios

A Golden Data Product Portfolio retains the same structure.

It is not a list of selected data products taken from several initiatives. It is a new connected context assembled from the strongest and most reusable parts of several source portfolios.

The Golden Portfolio contains shared business objectives, clustered use cases, supporting signals, evidence, candidate data products, ownership boundaries, readiness material, and executive decision context.

Its graph records how these elements connect across source portfolios.

One objective may come from a customer experience initiative. A use case may come from a service transformation portfolio. A signal may come from operational evidence. A reusable product may already exist under another domain. The Golden Portfolio brings these together while preserving the original source, owner, version, and rationale.

![Several initiative portfolios feeding one Golden Data Product Portfolio candidate](golden-portfolio-candidate.png "Several initiative portfolios reveal one stronger implementation candidate.")

This makes the Golden Portfolio useful to both leadership teams and AI agents.

Leaders receive a coherent argument for why several initiatives should move forward together. They can see where the combined case is stronger than the local proposals, where reuse reduces cost, where ownership must remain separate, and where shared investment creates more value.

AI agents receive a standardized and traceable graph that they can inspect, compare, challenge, and refine. They can identify which source portfolios contributed to the Golden Portfolio, which relationships are supported by evidence, where confidence is weak, and which proposed connections need human review.

The result is a rich strategic context for humans and machines. It does not merely state what should be implemented. It records the connected evidence explaining why.

## Why This Matters

The first reason is value concentration. McKinsey argues that data products become more valuable when several high-value use cases depend on similar data.

Reuse lowers the incremental cost of supporting additional use cases and speeds up value capture. In one example, one data product serving five use cases was projected to cost around 30 percent less than building five separate analytical pipelines. Extending the same product to another market increased the projected savings to around 40 percent. McKinsey also reports cases where data products accelerated value capture by as much as 90 percent. Source note: Scaling data products to generate more value.

![Reuse economics for shared data products across use cases and markets](reuse-economics.png "Reuse changes the economics of data products.")

These figures support the central logic of the Golden Portfolio. The economic value does not come from combining documents. It comes from identifying where several initiatives should share data products, foundations, controls, and delivery investment.

![Before and after consolidation of duplicated pipelines into shared data products](consolidation-before-implementation.png "The value comes from consolidation before implementation.")

The second reason is duplication control. AWS warns that overlapping data products reduce organizational value. Redundancy consumes resources and increases the complexity of ownership, quality management, and maintenance. Its data product portfolio guidance presents portfolio management as a way to select the right mix of products while reducing overlap and balancing current and future demand. Source note: Data product portfolio management.

Organizations face a similar problem at the capability level. Teams often rebuild existing functions because they lack a trusted view of what already exists, who owns it, and which business journeys depend on it. A Golden Portfolio exposes that overlap before separate projects create permanent duplication.

The third reason is strategic alignment. Portfolio management exists to help organizations select investments that support strategic goals and create benefits across projects. Data and AI portfolios often fail at this level because leaders see isolated requests for dashboards, models, pipelines, and agents. They do not see the shared business capability underneath those requests.

A Golden Portfolio changes the unit of discussion. It allows leaders to assess the combined opportunity rather than approving or rejecting each local initiative in isolation.

The fourth reason is decision quality. Boards and steering committees do not need another technical proposal. They need a clear case for change, expected value, implementation readiness, commercial implications, financial requirements, and management controls.

HM Treasury's Five Case Model separates business-case development into strategic, economic, commercial, financial, and management cases. This structure helps leaders evaluate whether an initiative is desirable, viable, affordable, and deliverable. Source note: Guidance on developing business cases.

A Golden Data Product Portfolio gives leaders a stronger basis for those discussions because it combines the strongest evidence from connected portfolios into one decision package.

## Who Needs the Golden Portfolio

The Golden Portfolio matters first to data and AI portfolio leaders. These leaders often receive use cases from different departments and struggle to compare them consistently. The Golden Portfolio gives them a way to identify repeated objectives, overlapping data needs, common signals, and reusable data products across the initiative pipeline. It also matters to data product leaders.

Their risk is that every business request creates another narrow data product. The Golden Portfolio helps them see where one broader product should serve several use cases and where separate product boundaries still make sense.

Business transformation leaders need it because they are often responsible for portfolios of change rather than individual data assets. They need to understand when separate business problems point toward one larger capability, investment case, or transformation package.

Enterprise architects need it because duplication often becomes visible too late. By the time several teams have designed separate integrations, models, and platforms, consolidation becomes expensive and politically difficult. The Golden Portfolio gives architects an earlier view of shared foundations and product boundaries.

Executives and investment committees need it because local business cases rarely expose cross-initiative value. A combined case may justify investment that no single initiative could support alone.

Domain owners and data stewards also need it, but for a different reason.

Consolidation must not remove domain accountability. A Golden Portfolio should show which source products remain domain-owned, which responsibilities cross domains, and where shared governance is needed.

AI engineering and agent platform teams also need it. Their agents require more than access to data. They need business meaning, product context, ownership, evidence, and explicit relationships. A standardized portfolio gives them a governed context layer instead of forcing every agent to infer that structure independently.

## What the Golden Portfolio Contains

A Golden Data Product Portfolio begins with a shared objective model. The combined portfolio must explain why the included initiatives belong together.

Similar data alone is not enough. The initiatives must support a common strategic goal, business capability, or measurable outcome.

The second element is a use-case cluster. This is the center of the model. Fowler's method suggests overlaying several use cases to improve product boundaries.

McKinsey recommends clustering use cases that depend on similar data. The cluster shows where shared demand exists and where the case for reusable data products becomes stronger. Source note: Designing data products. Source note: Scaling data products to generate more value.

The third element is a candidate data product set. These are the reusable data products that support the clustered use cases. IBM describes a data product as a reusable, self-contained package that combines data, metadata, semantics, and supporting material for business use. Source note: What is a data product.

Data mesh thinking extends that definition through domain ownership, product thinking, self-service infrastructure, and federated governance. Source note: Data mesh principles and logical architecture.

The fourth element is evidence. A Golden Portfolio should not be built from presentation language alone. It should contain business signals, value estimates, consumer demand, reuse potential, quality measures, lineage coverage, ownership clarity, readiness findings, and known delivery risks.

The fifth element is ownership. DataHub requires data products to belong to domains and supports explicit ownership roles around the grouped assets. This offers a useful pattern for a Golden Portfolio. It should have a business sponsor, a portfolio steward, and named domain owners for every included data product.

Source note: DataHub data product model.

The sixth element is executive readiness material. The combined portfolio should explain the strategic case, economic value, delivery model, financial requirements, commercial considerations, risks, dependencies, and management approach.

The final element is the relationship graph. The graph makes the portfolio traversable. It connects objectives to use cases, use cases to data products, signals to the claims they support, products to owners, and all selected elements back to their source portfolios.

Without the graph, the Golden Portfolio is a collection. With the graph, it becomes context.

## Provenance Is Essential

The Golden Portfolio only works if decision makers trust where each part came from. One objective may come from a customer experience portfolio. A use case may come from a service transformation portfolio. A signal may come from operational evidence. A candidate data product may already exist in another domain. Every element must retain its source portfolio, owner, version, supporting evidence, and decision history.

W3C PROV provides a strong foundation for this model. It defines provenance through entities, activities, and agents. It also supports named bundles of provenance records. One bundle can reference another without copying or overwriting the original material. Source note: W3C PROV Data Model.

The W3C guidance for linking provenance bundles strengthens this model. It explains how one provenance description can reference or extend another while preserving the origin and context of the source material. Source note: Linking across provenance bundles. This is close to the Golden Portfolio structure.

Each initiative portfolio acts as a source bundle. The Golden Portfolio becomes a new bundle that references selected elements from those source portfolios. It adds a strategic interpretation while preserving the original record.

The model should answer five questions for every included item. Where did it come from? Who owns it? What evidence supports it? Why was it included? What changed during consolidation?

Operational lineage should support this conceptual provenance. OpenLineage provides an open specification for collecting lineage metadata around datasets, jobs, and runs. It supports transparency, impact analysis, traceability, and accountability across data processing. Source note: OpenLineage.

For a Golden Portfolio, this lineage should roll upward into the portfolio view.

Leaders should see which products, source systems, pipelines, and upstream assets the proposed implementation depends on.

Without this traceability, the Golden Portfolio becomes another presentation. With it, the portfolio becomes an auditable decision object.

## Virtual Before Implementation

The first Golden Data Product Portfolio should remain virtual. It should group, compare, and connect source portfolios before the organization restructures teams, budgets, systems, or ownership. This protects the organization from premature consolidation.

Several initiatives may share one data product while keeping separate delivery teams. They may need a common platform foundation but different business ownership. They may belong under one investment case but remain separate operational products. The Golden Portfolio should make those choices visible. It should not force one answer.

DataHub's logical grouping model supports this approach. It treats a data product as a logical organization of related assets rather than requiring the creation of a new physical source-system object. Source note: DataHub data product model.

The Golden Portfolio should work in the same way. It should reference and organize before it merges or replaces anything. Only after approval should the Golden Portfolio become an implementation portfolio with funded workstreams, delivery backlogs, accountable teams, milestones, and outcome measures.

The Golden Portfolio is therefore the unit of strategic consolidation. It is not the unit of technical execution.

## Avoiding the Wrong Interpretation

The name Golden Portfolio must not be confused with the golden record concept used in master data management. A golden record is a verified or mastered representation of a business entity assembled from several source records. Source note: What is a golden record.

A Golden Data Product Portfolio is not a master record, a canonical row, or a single source of truth. It is a strategic synthesis of initiatives and reusable data product building blocks. It is also not a return to centralized control.

Data mesh moved away from the idea that one central team should define and certify all important data. Trust comes from domain ownership, shared standards, explicit quality guarantees, and federated governance. Source note: Data mesh principles and logical architecture.

The Golden Portfolio centralizes comparison and strategic synthesis. It does not centralize all product ownership or implementation authority.

It must also avoid becoming a label for every large collection of initiatives. A Golden Portfolio should only be created when the evidence shows meaningful shared objectives, clustered demand, reusable data products, and a stronger combined decision case.

If the synthesis does not improve the strategic, economic, operational, or financial case, it is not yet golden. It is still a discovery hypothesis.

## The Golden Portfolio in Maysano Portfolio Studio

The Golden Data Product Portfolio is part of the direction for Maysano Portfolio Studio. Portfolio Studio begins with the material organizations already use. This includes PowerPoint presentations, spreadsheets, workshop notes, strategy documents, reports, emails, and descriptions of objectives, signals, use cases, and product needs. The Studio turns that material into structured and versioned initiative portfolios. Each portfolio links business objectives, use cases, candidate data products, evidence, stakeholders, ownership, readiness findings, and decision material.

It also produces the machine-readable portfolio definitions and graph relationships that allow the same context to serve people, platforms, and AI agents. Once several portfolios exist, the Studio can examine them together.

It can identify recurring objectives, related use cases, overlapping data products, common source systems, repeated signals, shared stakeholders, and similar implementation requirements. These connections become candidates for a Golden Data Product Portfolio.

![Maysano Portfolio Studio flow from business material to implementation portfolio](portfolio-studio-flow.png "Maysano Portfolio Studio turns fragmented business material into a traceable strategic synthesis.")

The Studio should not silently merge the source portfolios. It should create a virtual strategic synthesis and show why each item was included. Every objective, use case, signal, and product must remain traceable to its original portfolio.

Leaders should be able to see where duplication exists, which products should be shared, which ownership boundaries remain, what evidence supports consolidation, and what the combined implementation case would look like.

AI agents should be able to inspect the same structure. They should be able to follow the graph, compare evidence, identify unsupported claims, detect overlaps, and explain the basis for each proposed consolidation.

The Studio then turns the Golden Portfolio into review material for leadership. It does not present the proposal as an approved truth. It presents it as an evidence-backed candidate for decision.

This distinction is important. Maysano Portfolio Studio does not decide that several initiatives belong together. It gives leaders and their AI agents the structured evidence needed to make that decision.

## A New Concept for Data Product Strategy

The research supports the building blocks behind the Golden Data Product Portfolio.

Portfolio management provides the strategic selection logic. Data product management provides the reusable product model. Use-case clustering provides the method for finding shared demand. Data mesh provides the ownership and governance principles. Provenance standards provide the traceability model.

Business-case frameworks provide the executive decision structure. The Open Data Products standards family provides the machine-readable structure for products, portfolios, relationships, vocabulary, and agent workflows.

The new contribution is bringing these parts together into one named object. A Golden Data Product Portfolio is the best evidence-backed version of a future implementation portfolio found by connecting several accepted or boardroom-ready initiative portfolios while preserving their provenance.

It is a rich context package for humans and machines alike. It contains the objectives, use cases, signals, evidence, products, owners, readiness material, and relationships needed to understand both what should be built and why.

It matters because organizations should not build separate point solutions when the evidence shows that several initiatives depend on the same larger capability.

The individual portfolios explain what each initiative wants. The Golden Data Product Portfolio explains when those initiatives should move forward together.
