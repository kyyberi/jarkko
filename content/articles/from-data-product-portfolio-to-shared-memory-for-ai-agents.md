---
title: From Data Product Portfolio to Shared Memory for AI Agents
date: 2026-07-23
category: AI products
summary: Maysano turns the data product portfolio into shared memory that helps AI agents follow governed, replayable runs.
glance: Agents need connected product context, not only catalog entries. | A data product graph gives agents memory about goals, owners, evidence, and actions. | ODPR recipes make agent runs governed, repeatable, and easier to audit. | Maysano starts from the data product portfolio instead of chat history or a whole-company model.
status: published
---

Most companies already know how to list and describe their data products. They have catalogs with owners, sources, definitions, and links. These tools give people a useful view of what exists across the company.

AI agents need something more. An agent needs connected context. It needs to know what a data product is for, which business goal it supports, who owns it, what depends on it, which evidence applies, and what should happen next. This is the direction we are building into Maysano.

The market is moving toward agent memory. Parts of this idea already exist. Agent memory systems help agents carry context from one task or session to another. Knowledge graphs connect people, systems, events, and facts. Data catalogs are adding more business meaning. Workflow tools help agents follow set steps and record what happened.

Andrew Ng recently described why memory matters: "Memory turns a stateless LLM into an agent that learns over time." He also said that the design of agent memory is now one of the most debated topics in AI. This is where the data product graph becomes important. It gives the agent structured memory about products, goals, owners, links, evidence, and actions.

Maysano brings these parts together around one clear area: the company's data product landscape. It connects data products with business goals, use cases, owners, dependencies, signals, evidence, decisions, rules, and actions. The next step is to turn that landscape into shared memory for AI agents.

The result is more than a catalog. It becomes shared memory that agents can use.

![A static catalog becomes shared memory when data products are connected to business goals, owners, evidence, signals, and actions.](screenshot-2026-07-24-at-08-16-03-graph-based-ai-memory-poc.png "Maysano turns a static catalog into a connected product graph that agents can use as shared memory.")

## Starting from one node

An agent starts from one known point. This point might be a data product, a use case, a business goal, a signal, or a decision. From there, the agent follows the graph and collects only the context needed for the task.

Take a simple example. A customer transactions data product has a quality issue. The agent starts from that product and finds the use case that depends on it. It then finds the business goal linked to that use case, the team that owns the product, the other products that might be affected, and the latest quality evidence.

The agent does not need the full company catalog placed inside its prompt. It builds a small and focused view of the problem from the graph.

## The graph provides the memory

The graph provides the memory, while the recipe provides the rules for the run. This difference matters because many agent systems place the full process inside prompts or agent code. That makes the logic hard to see, review, update, and reuse.

Maysano takes a different path through Open Data Product Recipes, or ODPR, which is part of the ODPS standards family developed under the Linux Foundation. An ODPR recipe tells the agent which steps to follow. It defines where the agent should start, which links it should inspect, what evidence it must collect, which checks it must pass, which actions are allowed, and what type of result it should produce.

The process logic does not need to remain hidden inside agent code. Teams can read the recipe, review it, approve it, test it, reuse it, and update it. A different agent can follow the same recipe, and the process stays governed even when the agent technology changes.

For the data quality example, the recipe might tell the agent to find the affected data product, identify the use cases that depend on it, trace the linked business goals, locate the owner, inspect downstream products, collect the required evidence, and suggest the next approved action.

## Governed and replayable agent runs

"Replayable" may not sound as exciting as "fully autonomous." But in many companies, it matters more to see the agent follow an approved process, use the right evidence, and show how it reached the result. In some regulated or high-risk cases, this is not optional. It is required.

A replayable run shows what the agent did step by step. It records which recipe was used, where the agent started, which nodes it visited, which links it followed, which evidence it used, and how it reached the final answer.

The first Maysano version will show this as a slow-motion visual run. The viewer will see the agent move through the graph, collect context, follow the recipe, and decide what should happen next. This is more than a visual effect. It gives business, data, governance, and engineering teams a shared view of the agent's work. They see which information guided the result and whether the agent followed the approved process.

![An ODPR recipe gives an agent a replayable path through data product context, evidence, and approved actions.](screenshot-2026-07-24-at-08-16-13-graph-based-ai-memory-poc.png "A replayable agent run follows a recipe through data product, use case, objective, owner, evidence, and action steps.")

## How Maysano is different

The parts of this idea already exist in different tools. Memory tools help agents remember. Graph tools connect context. Data catalogs describe data assets. Workflow tools control steps. Tracing tools record what happened.

Maysano brings these parts together around standardized data products. ODPS defines the data products. ODPC defines the catalog. ODPG defines the graph. ODPR defines the process.

Maysano brings them together as shared memory and governed action for agents. It does not begin with chat history or try to model the whole company from the start. It begins with the company's data product portfolio and connects it to business goals, use cases, owners, evidence, signals, decisions, and actions.

It also uses open specifications. The memory and process do not need to stay locked inside one agent, one vendor, or one runtime. The same graph supports many agents. The same recipe guides different runs. The same run format supports replay, review, testing, and audit.

The opportunity is in the combination. The individual parts are not new. Companies already have data catalogs, business goals, governance rules, use cases, quality reports, and AI projects. These parts often sit in different systems and documents. Maysano connects them into a form that agents understand and use.

Companies built catalogs for people. Maysano turns the data product portfolio into shared memory for AI agents.

## See the first demo

This development started inside Maysano only a few weeks ago. The first working version is being prepared now. The first demo will show an agent moving through a data product graph, following an ODPR recipe, collecting the needed context, and producing a traceable result.

If your organization needs agents to work with governed data products instead of loose catalog text, get in touch. I can show how a data product portfolio can become shared memory, guided action, and a replayable operating layer for AI agents.
