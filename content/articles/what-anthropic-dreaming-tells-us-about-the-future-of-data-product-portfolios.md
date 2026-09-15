---
title: What Anthropic Dreaming Tells Us About the Future of Data Product Portfolios
date: 2026-08-11
category: AI products
summary: Anthropic Dreaming points toward a durable data product portfolio that preserves organizational context independently of any AI model.
glance: Raw history is not enough; portfolio context must be consolidated for the next decision. | Structured relationships turn fragmented business material into organizational memory. | The portfolio should remain portable and durable even when AI models and vendors change. | Versioned context supports one connected workflow from business goals to monitored outcomes.
status: published
---

Anthropic has attracted attention with a feature called "Dreaming." The name sounds more exotic than the underlying mechanism. Claude's managed agents accumulate information across sessions, and Dreaming periodically reviews that memory, removes duplication, resolves stale or conflicting information, reorganizes what matters, and produces a new memory store for future sessions. Anthropic describes it as a way for an agent to reflect on previous work and curate its memory.

A recent article by Jaroslaw Wasowski takes a more critical view. Much of the value, he argues, comes from something surprisingly straightforward: persistent context, stored in relatively simple structures, cleaned periodically, and presented back to the model when needed. He also raises an important question about vendor dependency. If accumulated memory becomes essential to how your AI works, who owns that context, and how easily can it move to another model or platform?

![Anthropic Dreaming consolidates raw history from past sessions into curated memory for future work.](screenshot-2026-08-11-at-12-16-44-chatgpt-portfolio-builder-10-minutes.webp "Anthropic Dreaming periodically consolidates accumulated session history into cleaner, structured memory.")

That discussion matters far beyond AI agent memory. It describes a problem we see constantly in data product portfolio management. Organizations already have huge amounts of context. The problem is that most of it does not persist in a form that supports the next decision.

## The problem is not a lack of information

A data product initiative rarely begins with an empty page. There are strategy documents, business objectives, workshop notes, spreadsheets, architecture material, use cases, market signals, previous decisions, governance requirements, and presentations.

The problem starts when all that knowledge stays in its original containers.

- A presentation prepared for one steering meeting rarely becomes useful context for the next initiative.

- A spreadsheet describing candidate data products does not automatically explain why those products matter.

- A use case document might identify an important business problem without connecting it to the objectives, products, and expected outcomes around it.

As the initiative progresses, more material appears. New decisions replace old assumptions. Priorities change, risks emerge, delivery status changes, and another business unit starts something related. Eventually, the organization has plenty of information but little persistent portfolio context.

This resembles the problem Anthropic is addressing with agent memory. Raw history is not enough. It needs to be consolidated into something useful for future reasoning.

## From agent memory to portfolio memory

The analogy becomes useful when we move from an individual AI agent to an enterprise data product portfolio. An agent needs to remember what happened, what remains important, and what has changed. A portfolio needs the same capability.

For a data product portfolio, persistent context includes business objectives, use cases, signals, candidate and approved data products, expected value, KPIs, risks, assumptions, dependencies, decisions, ownership, and delivery status. The value does not come from each item in isolation. It comes from the relationships between them.

A data product matters because it supports one or more use cases. Those use cases exist because the organization wants to achieve particular business objectives. Signals from customers, markets, regulation, or operations might strengthen or weaken the case. Decisions affect which products move forward. Delivery produces new evidence that changes the portfolio again.

Once these relationships persist, the portfolio stops behaving like a collection of documents. It starts behaving like organizational memory. That is the direction we have taken with Maysano Studio.

## Structure the context before asking AI to reason over it

A common AI approach is to put documents into a retrieval system and let a model search them when somebody asks a question. That has value, but it leaves much of the interpretation to each individual AI interaction.

Studio takes a different approach. The first step is to turn fragmented business inputs into structured portfolio context. Business objectives, use cases, signals, and data product needs become explicit objects. Their relationships become explicit as well. The resulting portfolio has catalog and graph representations supported by open data product specifications such as ODPS, ODPC, and ODPG.

![Fragmented business material becomes persistent portfolio context, a structured portfolio, a graph, and a foundation for AI decisions.](screenshot-2026-08-11-at-12-15-07-chatgpt-portfolio-builder-10-minutes.webp "Maysano transforms fragmented business material into structured portfolio context and a graph that supports AI analysis and decisions.")

The model then reasons over that structure. Instead of asking only, "What does this document say?", leaders can ask:

- Which proposed data products contribute to the highest-priority objectives?

- Which important use cases have weak product support?

- Where do multiple initiatives depend on the same data product?

- Which assumptions might threaten an approval decision?

- Which products have high strategic influence across a combined portfolio?

That is closer to portfolio intelligence than document chat.

For readers working with the standards family in practice, my [Scalable Data Product Value Management with Agent ready SDK](https://www.udemy.com/course/scalable-data-product-value-management-with-agent-ready-sdk/) course connects ODPS, catalogs, value graphs, and SDK validation workflows.

## The portfolio should survive the model

This is where Wasowski's vendor lock-in argument becomes especially relevant. If years of accumulated organizational knowledge become trapped inside one AI vendor's proprietary memory system, switching models becomes much harder than changing an API endpoint. The accumulated context becomes part of the dependency.

For enterprise portfolio management, that is the wrong ownership model. The AI model should be replaceable. The portfolio should remain.

Business objectives should not belong to Anthropic, OpenAI, Google, or another model provider. Neither should the relationships between objectives, use cases, data products, signals, decisions, and outcomes.

This is one reason open specifications matter. If portfolio context exists as portable, inspectable artifacts rather than opaque model memory, different models and AI runtimes can reason over the same underlying portfolio. One workload might use OpenAI, another Anthropic, and a sensitive workload might later move to a local model. The reasoning engine changes. The business context stays intact.

That separation becomes increasingly important as AI enters enterprise decision processes.

## Context also needs to evolve

Persistent context alone is not enough. It needs a lifecycle. Anthropic's explanation of Dreaming makes the reason clear: agent memory grows incrementally and eventually contains duplicated, stale, or contradictory information. Dreaming creates a reorganized memory store instead of carrying the entire raw history forward forever.

Data product portfolios face the same problem. A portfolio created in January should not remain frozen while the organization changes around it. A business objective gets reprioritized. A proposed product gets rejected. A new signal changes the investment case. Delivery reveals a larger-than-expected dependency. Another initiative introduces a product that overlaps with an existing proposal.

The portfolio must absorb those changes without losing its history. Versioning matters. Portfolio analysis should operate on the current structured state while preserving earlier states for traceability.

The goal is not to remember everything. It is to maintain the best current representation of what the organization knows while retaining evidence of how it got there.

## Workflow as Product carries the context forward

Persistent portfolio context connects directly to Workflow as Product. A data product does not exist independently from the process that takes it from business need to operational use.

Someone identifies a business problem. The organization connects that problem to objectives and signals. Candidate data products emerge. People analyze value, cost, dependencies, and risk. A decision body approves or rejects investment. Approved products move into delivery, and delivery status and outcomes feed new information back into the portfolio.

If each phase produces a separate document and then forgets the previous phase, context degrades at every handover. If the workflow operates over a persistent portfolio, each phase enriches the same context.

Studio therefore treats portfolio creation, portfolio conversation, approval preparation, export to delivery, and outcome monitoring as parts of one connected workflow. The portfolio is the context carried through that workflow.

![A seven-step portfolio workflow carries persistent context from business goals through delivery to outcome monitoring.](screenshot-2026-08-11-at-12-07-05-chatgpt-portfolio-builder-10-minutes.webp "Persistent portfolio context connects business goals, portfolio building, AI conversation, boardroom preparation, approval, delivery, and outcome monitoring.")

## The boardroom needs memory too

The effect becomes especially visible when an initiative reaches a decision forum. Executives do not need another pile of generated content. They need a clear explanation of why the initiative exists, which business outcome it supports, which alternatives exist, what value is expected, which risks and assumptions matter, and what decision they are being asked to make.

If the portfolio already contains this context, AI has a much stronger foundation for preparing the boardroom package. It also has a stronger foundation for challenging the proposal.

A CEO-oriented conversation with the portfolio might focus on strategic alignment and outcomes. A CFO perspective might challenge value assumptions, cost, and prioritization. A portfolio manager might investigate dependencies or gaps. The underlying portfolio stays the same while the reasoning perspective changes.

This is the difference between generating a presentation with AI and building a decision package from persistent organizational context. The presentation is an output. The portfolio is the memory.

## From one initiative to organizational intelligence

The idea becomes more interesting when several portfolio initiatives are combined. One portfolio might make sense in isolation. Three portfolios together might reveal something entirely different.

Several business units might depend on the same proposed data product. Two initiatives might unknowingly solve the same problem. One product might connect to an unusually large number of strategic objectives and use cases. Another might look important locally but contribute little across the wider enterprise portfolio.

Graph analysis exposes these patterns. Measures such as strategic influence, connectedness, and dependency concentration become meaningful because the graph represents business context rather than generic technical relationships.

This is where persistent portfolio context starts moving toward organizational intelligence. The system does not simply remember what happened in one initiative. It gives the organization a growing representation of how its objectives, opportunities, use cases, and data products relate across initiatives.

## AI needs better context more than more documents

Anthropic Dreaming makes a broader AI lesson visible. The next improvement in enterprise AI will not come only from larger models. It will also come from giving models better-maintained context.

Anthropic is applying that idea to agent memory. The same principle applies to data product portfolios. Organizations already have the information. The harder task is turning it into durable context, preserving its relationships, keeping it current, and making it available to whichever AI or human needs to reason over it next.

For data product management, that means moving beyond disconnected business cases, spreadsheets, presentations, and chat sessions.

The portfolio itself needs memory. And that memory should belong to the organization, not the model vendor.
