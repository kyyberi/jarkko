---
title: Palantir Ontology vs. Maysano Product Graph
date: 2026-08-29
category: Data products
summary: Palantir Ontology and the Maysano Product Graph both help agents use enterprise context, but they structure that context at different layers.
glance: Palantir structures operational context around enterprise objects, links, logic, actions, and security. | Maysano structures portfolio context around productized data and AI capabilities. | Both approaches support agents, but they answer different context questions. | The architectures can coexist when ontology sits below product and portfolio context.
status: published
---

Enterprise AI has made an old data problem more visible. Giving an AI agent access to databases, APIs, documents, and data lakes does not give it enough context to operate reliably.

The agent still needs to understand what the data represents, which sources the organization trusts, how concepts relate, what business purpose the information serves, what governance applies, and which actions belong to the process.

Palantir has addressed this problem for years through its Ontology and the applications and agents operating on top of it. Maysano approaches the same problem from another starting point. Instead of organizing enterprise context mainly around objects, relationships, and actions, Maysano starts with productized data and AI capabilities, then connects those capabilities through a Product Graph that carries business, governance, and operating context.

The difference is not at the agent layer. Both approaches place AI agents above structured enterprise context. The more useful distinction sits underneath those agents, in the structure they use to understand the organization and locate the capabilities they need.

Disclosure: I am the founder of Maysano. The architectural foundations behind Maysano and its product-centered model were established before I became involved with the Palantir platform through my work in Abu Dhabi. Working with Palantir has given me a practical reference point for comparing two approaches that emerged independently but now address closely related enterprise AI questions.

![Maysano organizes enterprise systems, data products, AI products, the Product Graph, and agents into a connected flow.](screenshot-2026-08-28-at-18-02-12-chatgpt-maysano.png "Maysano flow: enterprise systems feed productized capabilities, which are connected through the Product Graph for agents and applications.")

## Palantir Structures Operational Context

Palantir places the Ontology between enterprise data and the applications, workflows, and AI agents that use it. The purpose is to translate technical data structures into a representation that reflects how the organization understands its operational world.

Instead of requiring an agent to reason directly over tables, schemas, and source systems, the Ontology presents concepts such as customers, accounts, transactions, equipment, or locations as objects. Links connect those objects. Logic describes how they behave. Actions define what users and agents do with them. Security governs access to the underlying capabilities.

This gives the agent a structured operating environment rather than a collection of disconnected data sources. A customer exists as an object with known relationships to accounts and transactions. Those relationships remain available to applications and agents without every implementation rebuilding the same understanding from raw data.

Actions then provide a governed route from understanding the operating state to doing something with it. The simplified architecture moves from enterprise systems and data into datasets and models, then into the Palantir Ontology, and finally into agents, applications, and workflows. The Ontology acts as the operational context layer underneath consumption.

## Maysano Structures Product Context

Maysano also places structured context underneath applications and agents, but it starts from a different managed abstraction: the productized capability.

Customer information, for example, might exist across several systems and hundreds of tables. At the Maysano level, the relevant enterprise capability might instead be a Customer 360 Data Product. That product has a defined purpose, owner, consumers, interfaces, quality expectations, governance, and relationships with other capabilities.

The same logic extends to AI. An AI capability becomes an AI product with a defined purpose and known dependencies rather than remaining an implementation detail attached to a particular application. This creates a stable boundary between the underlying technology and the consumers that rely on the capability.

The Maysano Product Graph then connects these products to the wider context in which they operate. Products relate to business objectives, initiatives, owners, governance, dependencies, evidence, consumers, and operational recipes. The graph represents more than technical lineage. It captures why a capability exists, how it relates to other capabilities, and how the organization expects it to be used.

The resulting architecture moves from enterprise systems and data into Data Products and AI Products, then into the Maysano Product Graph, and finally into agents and applications. The product boundary sits before the graph because the graph is not intended to turn raw enterprise data into context directly. It organizes already productized capabilities and connects them to their business and operating environment.

## Both End in Agents

The comparison becomes misleading if it is reduced to objects versus products. Palantir has its own agent layer, and those agents operate on top of the Ontology. Maysano also places agents above the Product Graph and the productized capabilities represented within it.

The more useful comparison is between two ways of structuring context underneath agents.

Palantir gives the agent an operational representation of enterprise objects, their relationships, available logic, actions, and security. Maysano gives the agent a portfolio representation of trusted products, business intent, dependencies, governance, and reusable operational context.

![Palantir and Maysano both support AI agents, but structure context differently underneath them.](screenshot-2026-08-28-at-18-02-17-chatgpt-maysano.png "Palantir centers context on enterprise objects and actions. Maysano centers context on productized capabilities and their portfolio relationships.")

The difference is easier to see when the main dimensions are placed side by side.

![A side-by-side comparison of Palantir Ontology and the Maysano Product Graph across ten dimensions.](screenshot-2026-08-28-at-18-19-58-chatgpt-maysano.png "Palantir focuses on operational objects and actions. Maysano focuses on product contracts, ownership, dependencies, lifecycle, and portfolio governance.")

A financial services example makes this difference more concrete. Within Palantir, Customer, Account, Transaction, and Payment might exist as operational objects. Their relationships are explicit, and an agent works with those objects, follows their links, and invokes governed actions.

Within Maysano, the portfolio might contain a Customer 360 Data Product, a Transaction Data Product, a Fraud Detection AI Product, and an investigation capability. The Product Graph describes how those capabilities depend on one another, which business initiatives they support, who owns them, and which governance applies.

The Palantir context helps an agent understand the operational state of the business. It answers questions such as which accounts belong to a customer, which transactions occurred, how those transactions relate, and which actions are available.

The Maysano context addresses a different level of the same environment. It helps an agent identify which product provides trusted customer information, which AI capability depends on that product, why the product exists, who owns it, which other products it depends on, and which recipe describes how it should be used.

## Productization Changes What an Agent Consumes

This product boundary matters because access to data does not automatically tell an agent how the organization expects that data to be used.

Consider an agent investigating unusual financial activity. Giving it access to ten databases does not identify which source is authoritative. It does not explain whether a dataset exists for operational use or experimentation, whether its quality is appropriate for a regulated workflow, who owns it, or whether another team already provides the same information through a supported interface.

A Data Product addresses that problem by creating a defined consumption boundary around the capability. Purpose, ownership, semantics, interfaces, policies, and service expectations travel with the product rather than remaining scattered across documentation and organizational knowledge.

The Product Graph adds another layer around that boundary. It connects the product to its business purpose, dependencies, governance, and related capabilities. An agent therefore gains context about both what it should consume and why that capability exists within the wider portfolio.

This becomes more relevant as agents themselves become reusable enterprise capabilities. Organizations are likely to operate many investigation, forecasting, reporting, optimization, and decision-support agents. Those agents need known dependencies on Data Products, AI Products, and operational recipes instead of individually reconstructing the same enterprise context.

Maysano is moving toward this model through the Open Data Products standards family. Product specifications describe the products themselves. Catalogs organize the portfolio. Graphs describe relationships between those products and their surrounding context. Recipes describe reusable operational flows. Together, these structures provide machine-readable context that different agents reuse across implementations.

## The Architectures Can Coexist

The comparison becomes more interesting when the two approaches are treated as complementary rather than mutually exclusive.

A Palantir Ontology might sit underneath a Maysano-managed Data Product. Palantir would provide the operational representation of enterprise objects, relationships, logic, and actions. The Data Product would create a defined consumption boundary around a selected part of that capability. Maysano would then place the product inside the wider portfolio and connect it to business objectives, ownership, governance, dependent AI products, and agents.

The resulting architecture moves from enterprise systems into Palantir data and Ontology, then through Data Products into the Maysano Product Graph, and finally into enterprise applications and AI agents.

![A combined architecture can place ontology below product and portfolio context.](screenshot-2026-08-28-at-18-02-23-chatgpt-maysano.png "Ontology can provide operational context underneath data products, while Maysano provides product and portfolio context above.")

A Customer 360 Data Product provides a useful example. Palantir might maintain the operational customer representation and relationships underneath it. The Data Product exposes a governed capability based on that information. Maysano then describes the product as part of the enterprise portfolio, including why it exists, which initiatives depend on it, who owns it, which AI products consume it, and which agents rely on those capabilities.

The same Maysano model also applies when Palantir is absent. A Data Product might sit on Databricks, Snowflake, an API platform, operational databases, a lakehouse, or a combination of technologies. The underlying platform remains part of the implementation context, while the product becomes the stable capability presented to consumers and agents.

This is also why open standards matter to the Maysano architecture. Product definitions and relationships should survive changes in underlying technology. The portfolio represents enterprise capabilities rather than reproducing the structure of one technology platform.

## From Context Engineering to Portfolio Context

Early enterprise generative AI often treated context engineering mainly as a retrieval problem. The system found relevant documents or data, assembled them around a prompt, and gave the model enough information to answer a question.

Operational agents require more structure. They need relationships, authority, policies, dependencies, trusted capabilities, and available actions. They also need to understand the boundaries within which those capabilities operate.

Palantir addresses this through an Ontology that models the operational world of the organization. Its agents reason and act against that representation.

Maysano adds another type of context by organizing productized data and AI capabilities into a portfolio graph. Its agents operate against governed products while using the graph to understand purpose, dependencies, ownership, and operating context.

An ontology-centered architecture asks how enterprise data becomes a coherent operational representation of the organization. A product-centered architecture asks how enterprise data and AI become governed capabilities, how those capabilities relate, and how humans and agents determine which ones to use.

These approaches address different levels of enterprise context. Organizations operating sophisticated AI environments are likely to need both. Operational context explains the world the agent is acting in. Portfolio context explains which governed capabilities the agent should use within that world.

Both support AI agents. The difference lies in how they structure the context underneath them.

If your organization is trying to connect enterprise AI agents with trusted data products, product governance, and reusable portfolio context, get in touch and we can discuss where ontology, product boundaries, and graph-based operating context should sit in your architecture.
