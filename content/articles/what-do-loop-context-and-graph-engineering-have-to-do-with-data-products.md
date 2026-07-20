---
title: What Do Loop, Context, and Graph Engineering Have to Do With Data Products?
date: 2026-07-20
category: AI products
summary: Context, loop, and graph engineering show why data products need governed meaning, explicit relationships, and controlled operating workflows for AI agents.
glance: AI agents need product context, not loose documents. | Data products become governed context providers with owners, rules, quality, and purpose. | Loops need validation, review, evidence, and clear stopping points. | Graphs show business relationships and downstream impact that search alone misses.
status: published
---

The language around AI systems is changing. Prompt engineering shaped the early phase of generative AI because most work meant giving a model an instruction and reading the answer. As systems become more agentic, the prompt is only one part of a larger architecture.

The discussion has moved toward context engineering, loop engineering, and graph engineering. These terms describe different parts of the same problem. Context engineering determines what an AI system knows when it makes a decision. Loop engineering determines how it acts, checks results, and continues work. Graph engineering determines how it understands relationships, dependencies, and consequences.

These ideas are usually discussed as AI engineering patterns. They also expose a deeper data problem. An agent cannot work safely only because an organization has data in a warehouse, catalog, lakehouse, vector database, or document repository. The agent must understand what the data represents, why it exists, who owns it, how it should be accessed, which quality expectations apply, and whether it is suitable for the task.

Those are data product questions.

![Structured product context gives AI agents clearer signal than loose documents.](product-context-vs-loose-documents.png "A data product gives an agent high-signal context with ownership, access, quality, policy, and use-case meaning.")

## Context engineering needs product context

Context engineering is broader than prompt engineering. A 2025 research survey describes it as the systematic optimization of the information supplied to a large language model during inference. The survey groups the field around retrieval, generation, processing, and management of context. It also connects context engineering to retrieval-augmented generation, memory systems, tool use, and multi-agent systems.

This matters because the model response depends on the full information environment around the instruction. For a business agent, that environment might include product definitions, customer records, policies, service commitments, quality measurements, previous decisions, recent events, and tools available for action.

The engineering challenge is not to place as much information as possible into the context window. More text does not automatically produce better reasoning. The system must select relevant material, remove noise, preserve provenance, and present the information in a structure the model can interpret.

Most context systems are still document-oriented. A user asks a question, retrieval finds documents or text fragments, and similar passages are inserted into the prompt. That gives the agent evidence, but it rarely gives the agent a reliable understanding of the product behind that evidence.

A paragraph may describe a customer transaction table. It may not tell the agent whether that table belongs to an approved product, whether it meets its freshness target, which consumers it supports, or whether legal restrictions apply. It may not identify the owner, the approved access method, or the business objective behind the product.

A product-aware context system must answer more useful questions. What is the product designed to achieve? Which use cases does it support? Who owns it? How is it accessed? What quality and service commitments apply? Which policies govern its use? Which objectives, KPIs, signals, and other products does it connect to?

The Open Data Product Specification, or ODPS, provides this product-level structure. It describes a data product through machine-readable metadata covering access, quality, service levels, licensing, pricing, governance, and product strategy. The product definition carries more than a technical description. It carries the business and operating meaning needed for responsible consumption.

Open Data Product Catalogs, or ODPC, extends this context beyond one product. It places products inside catalogs and portfolios alongside objectives, use cases, KPIs, and signals. Open Data Product Vocabulary, or ODPV, provides shared terminology across these structures. Together, ODPS, ODPC, and ODPV turn context from loose text fragments into a machine-readable product environment.

## Data products become governed context providers

A data product is often described as data packaged for consumption. In an agentic environment, that definition needs to go further. A data product becomes a governed context provider.

The product supplies data, but it also supplies the information needed to interpret and use that data. This includes purpose, ownership, interfaces, quality expectations, service commitments, legal conditions, pricing, and strategic alignment. These elements help an agent decide whether the product fits the task.

This boundary matters because context needs accountability. When an agent receives a document fragment from a generic search index, responsibility can be unclear. When it receives information through a defined data product, there is an owner and a consumption agreement.

The same principle applies when the product is not a traditional table. A data product can expose an API, stream, model-ready feature set, analytical service, event feed, or another access component. What matters is that the product gives a stable, governed interface to useful data and the context needed to consume it.

![A data product turns raw enterprise data into trusted context for agents and consumers.](data-product-context-provider.png "A governed data product packages ownership, quality, access, service, and policy context around raw enterprise data.")

This gives organizations a practical way to manage agent context. Instead of letting every agent team build its own prompts, document indexes, and hidden assumptions, the organization can expose approved products with machine-readable descriptions. Agents can then choose context from products whose purpose and operating conditions are known.

The portfolio becomes the next level of context. A portfolio contains the products, objectives, use cases, signals, evidence, and relationships relevant to a business initiative. It gives the agent a bounded operating environment instead of unrestricted access to disconnected enterprise information.

## Loop engineering turns model calls into operating processes

Context determines what the agent knows at a moment. Loop engineering determines what the agent does with that knowledge.

Anthropic describes an agent as a model that directs its own processes and tool use while completing a task. In practice, the agent works through a loop. It plans, acts, observes the result, adjusts its approach, and repeats until the task is complete or human input is required.

The quality of an agentic system depends less on one model response than on the repeated process around it. A weak loop allows the agent to continue without clear limits, repeat failed actions, accept unverified outputs, or make important changes without review. A stronger loop defines validation, retry limits, evidence requirements, escalation paths, human checkpoints, and completion criteria.

Loop engineering is controlled iteration. It turns a sequence of model calls and tool actions into an observable operating process.

This maps directly to data product delivery. A data product does not become reliable when someone creates a YAML file or publishes a catalog entry. It moves through a process in which source material is interpreted, a product candidate is generated, structure is validated, missing information is identified, governance expectations are reviewed, and the result is approved or returned for more work.

![A data product candidate moves through an agent-supported loop of interpretation, generation, validation, review, improvement, and release.](data-product-operating-loop.png "Loop engineering turns product generation into a controlled operating process with policies, standards, review, and release gates.")

Consider an agent asked to create a data product candidate from business documents. The agent must extract product facts and identify likely consumers, use cases, owners, and signals. It can then generate a minimal product definition, validate it against the ODPS schema, compare terms with ODPV, and search the catalog for similar or related products.

When ownership, quality, or service information is missing, the loop should not invent it. The agent should record the gap, request input, or route the product for review. Once the missing information has been supplied, the agent can generate the remaining components and prepare the result for approval.

The value does not come from a prompt that says, "Generate an ODPS file." It comes from the controlled process around that generation.

The draft Open Data Product Recipe Specification, or ODPR, addresses this operating layer. It defines a vendor-neutral, machine-readable standard for repeatable data product delivery. It complements ODPS, ODPC, ODPG, and ODPV by describing how work around those artifacts can be declared, configured, validated, reviewed, and handed off.

ODPS defines what the data product is. ODPR defines how work involving that product should proceed. This separation prevents the product specification from becoming an execution script. It also prevents workflows from hiding inside private prompts, local code, or undocumented team habits.

## Loops also need evidence

An agent loop should not measure progress only through model confidence or the ability to produce an answer. It needs external evidence that the action achieved the intended result.

For a data product workflow, evidence might include successful schema validation, passing quality checks, confirmed access connectivity, resolved vocabulary references, completed review gates, and an approved release decision. These results give the loop observable state.

This matters because agents operate over multiple turns and often modify their environment as they work. Anthropic's guidance on evaluating agents notes that tool use, state changes, and adaptation make agents harder to assess than single-turn model responses. Reliable evaluation must therefore examine the path and intermediate outcomes, not only the final answer.

The same principle applies to data product delivery. A polished product description is not evidence that the product is ready. Readiness must come from checks against the product's declared requirements and the organization's review criteria.

A machine-readable product specification and recipe provide the loop with these references. The agent no longer evaluates its own work against vague expectations. It evaluates the result against schemas, contracts, gates, and review states.

## Graph engineering preserves business relationships

Context retrieval often treats information as separate objects. Graph engineering starts from the view that relationships are part of the information.

A graph can show that a product supports a use case, contributes to an objective, supplies a KPI, responds to an external signal, depends on another product, or inherits a governance condition. These connections often carry more business meaning than the isolated nodes.

Microsoft's GraphRAG work shows why this matters for AI systems. Baseline retrieval usually depends on semantic similarity between a question and text fragments. That approach struggles when the answer requires connecting information across many sources or understanding themes across a large collection. GraphRAG addresses this by extracting entities, relationships, and claims, organizing them into a graph and community hierarchy, and using those structures during retrieval.

The same logic applies to data product portfolios. A vector search might find products whose descriptions use words similar to "customer retention." A graph can show that a retention objective is measured by a churn KPI, that the KPI depends on several operational signals, and that those signals come from specific data products.

![Graph engineering keeps the relationship between objectives, use cases, data products, signals, and KPIs visible.](graph-engineering-business-relationships.png "When one data product breaks, graph relationships reveal the affected use cases, KPIs, signals, and objectives.")

The graph can also reveal that one product has failed its freshness target. It can then show which use cases, KPIs, and objectives depend on that product. This is more than retrieval. It is structured consequence analysis.

Open Data Product Graphs, or ODPG, provides this relationship layer for the ODPS family. It allows products to connect with objectives, use cases, KPIs, signals, governance objects, and other portfolio relationships. ODPG keeps these relationships separate from the individual product definitions, so ODPS files remain portable while the wider portfolio graph evolves around them.

Graph engineering becomes useful across the full data product lifecycle. During discovery, an agent can move from a business objective to the use cases, signals, and products connected to it. During product design, the graph can reveal missing dependencies, competing product proposals, or products that serve overlapping purposes. During governance, it can show which use cases and KPIs depend on a product whose quality, freshness, or service level has failed.

## Declared graphs and inferred graphs are different

Graph engineering in data product systems has two starting points. The system can infer a graph from documents, or the organization can declare a graph through machine-readable relationships.

Inferred graphs are useful when an organization has large amounts of unstructured source material. Systems such as GraphRAG extract entities and relationships from text and organize them into structures that support retrieval. This helps agents detect connections that were not already available in structured form.

The limit is that inferred relationships are still model-generated interpretations. They need provenance, confidence information, validation, and review. A suggested link between a product and a business objective might be plausible without being an approved organizational decision.

Declared graphs provide a different level of authority. An ODPG relationship can state that a product supports a defined use case or contributes to a specific objective. This relationship becomes part of the managed portfolio rather than a temporary inference made during retrieval.

The strongest approach combines both. AI can extract candidate relationships from business documents, product descriptions, strategy papers, and operational evidence. Those candidates can enter a review loop. People or governed rules can approve, reject, or revise them. Approved relationships then become part of the declared ODPG graph.

The inferred graph helps the organization find possible meaning. The declared graph records accepted meaning. Agents need to know which one they are using.

## The three disciplines form one operating system

Context, loop, and graph engineering address different parts of the same operating problem.

Context engineering determines which information an agent needs for the current task and how that information should be selected, structured, and presented. Loop engineering defines how the agent moves from one action to the next, how it checks results, how it responds to failure, and when it should stop or request human review. Graph engineering provides the relationship structure that allows the agent to understand dependencies, follow multi-step connections, and assess the wider effect of an action.

A reliable data product environment needs all three. Context without a controlled loop gives the agent useful information but no dependable operating process. A loop without enough context produces disciplined execution over weak evidence. Context and loops without a graph still leave the agent with a fragmented view of the portfolio.

Together, the three disciplines create a stronger foundation. Context supplies product facts, business meaning, policies, and current state. The graph connects those facts across products, use cases, objectives, signals, and governance structures. The loop uses both to guide action, validation, escalation, and improvement.

This is where the ODPS family provides a coherent model. ODPS describes the individual data product. ODPC describes the catalog and portfolio around it. ODPG describes relationships across products and business objects. ODPV aligns the language used across the system. ODPR describes repeatable processes, handoffs, controls, and review stages.

These specifications do not compete with agent frameworks. They provide a portable product, context, graph, and workflow layer beneath them.

![Context, loop, graph, ODPS-family standards, and the SDK combine into an agent-ready data product system.](odps-family-agent-ready-system.png "The ODPS family and SDK integrate context, loop, and graph engineering into an agent-ready operating model.")

## The SDK turns specifications into agent capabilities

Standards become useful to agents when their structures are available through executable operations.

The Open Data Products SDK provides a common runtime across the specification family. It allows developers, platforms, and agents to validate product definitions, inspect catalogs, traverse graphs, generate product candidates, execute recipes, resolve supporting structures, and produce compact representations for model context.

This gives agent developers an alternative to embedding every rule directly into a system prompt. An agent does not need the complete ODPS schema copied into every context window when it can call a validation function. It does not need an entire catalog inserted into the prompt when it can search ODPC. It does not need to infer every relationship from prose when it can traverse ODPG.

The same principle applies to workflow execution. Instead of hiding the operating process inside framework-specific code, the agent can interpret an ODPR recipe that declares the required steps, validation gates, inputs, outputs, and review conditions.

This reduces unnecessary context while increasing control. The model receives the information needed for the current task, while deterministic tools handle validation, search, graph traversal, and state transitions.

The SDK's MCP interface extends this approach to agent environments. MCP tools allow an agent to call capabilities without placing their full implementation or supporting documentation into the prompt. The model can request product validation, catalog search, graph traversal, or recipe operation and receive a structured result.

That is a practical expression of context engineering. The system keeps authoritative information outside the model, retrieves only what is needed, and uses tools for operations that should not depend on free-form reasoning.

## A practical data product example

Consider an agent supporting a government energy-efficiency initiative. A conventional retrieval system might index strategy papers, policies, consumption reports, datasets, meeting notes, and technical documentation. When a user asks a question, the system retrieves similar passages and asks the model to produce an answer.

A product-aware system gives the agent a more structured environment. ODPC can describe the initiative, its business objectives, use cases, KPIs, stakeholders, signals, and required data products. ODPG can connect energy-consumption products, weather products, tariff products, inspection products, and building-reference products to the use cases and outcomes they support.

ODPS can describe each product's ownership, access methods, quality expectations, service levels, governance rules, and strategic purpose. ODPV can align concepts such as consumption, efficiency, building type, reporting period, anomaly, and tariff across the portfolio. ODPR can describe how new products are generated, validated, reviewed, improved, and released.

The SDK can then help an agent inspect the portfolio, identify missing products, search for existing products, traverse dependencies, validate product definitions, generate candidates, and prepare material for review.

Suppose the weather product misses its freshness target. A document-oriented context system might still retrieve the latest available weather records without recognizing that the product has breached its declared commitment.

A graph-aware system can identify every use case, model, KPI, and objective that depends on that product. A loop-aware system can suspend affected outputs, run validation, select an approved fallback, request review, and record the decision.

Context explains what the weather product is and whether it remains suitable. The graph reveals what depends on it. The loop controls the response.

## From agent access to agent readiness

The current discussion often frames context, loop, and graph engineering as methods for improving agents. That is accurate, but incomplete. These disciplines also reveal weaknesses in how organizations manage data.

Context engineering exposes the limits of data without meaning, ownership, and consumption guidance. Graph engineering exposes the limits of isolated catalog entries that do not show dependencies or business consequences. Loop engineering exposes the limits of static governance documents that do not control operational behavior.

The answer should not be another agent framework that hides these issues inside application code. Organizations need an explicit layer between business intent, governed data, and agent execution.

The Open Data Products standards family provides the components of that layer. ODPS makes the individual data product understandable. ODPC makes the wider portfolio understandable. ODPG makes relationships understandable. ODPV makes the language consistent. ODPR makes the operating process explicit. The SDK turns those structures into agent capabilities.

This also changes the role of the data catalog. A conventional catalog helps people find technical assets. An agent-ready product portfolio must help machines decide which products fit a purpose, which constraints apply, what relationships matter, and which workflow should follow.

The future catalog is not only a search interface. It is part of the context system, graph, and operating loop.

Giving an agent access to data does not make the data agent-ready. Access is only one requirement. Agent readiness requires machine-readable meaning, clear ownership, declared interfaces, measurable quality, service commitments, policy conditions, shared vocabulary, relationship structures, and controlled operating processes.

Data products provide the manageable units for that structure. The ODPS family provides the common language. The SDK turns that language into operations an agent can use.

If your organization is moving from AI access to AI readiness, get in touch. I can help design the product context, graph relationships, workflow controls, and operating model needed for agents to work with governed data products in practice.
