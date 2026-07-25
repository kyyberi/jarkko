---
title: Why a Data Product Catalog Was Not Enough for Maysano
date: 2026-07-25
category: AI products
summary: Maysano needs a data product graph because catalogs manage inventory while agents need operating context, relationships, review, and approved shared memory.
glance: Catalogs manage inventory; graphs show the operating model. | Maysano treats relationships, decisions, policies, and signals as first-class context. | Agent memory must be reviewed and approved before it becomes shared truth. | The ODPS family separates products, catalogs, graphs, vocabulary, and recipes.
status: published
---

Maysano began with a familiar idea. If the goal was to manage a portfolio of data products, then a catalog looked like the natural structure. A catalog can document products, assign owners, record lifecycle state, group products by domain, and help people find what already exists.

That foundation is still useful. Maysano still needs catalogs and the data management systems behind them. But the catalog was not enough for the problem Maysano had to solve.

The important question changed. It was no longer only, "Which data products do we have?" It also became, "Why do they exist, what do they support, what affects them, and what should happen next?"

![Maysano moves from a product-centered catalog view to a graph-based operating model and reviewed shared memory for agents.](screenshot-2026-07-25-at-10-54-17-chatgpt-maysano.png "A catalog manages product inventory. A graph represents the operating model around products, goals, policies, signals, decisions, and agent memory.")

## What catalogs handle well

Catalogs are essential for managing data assets and data products. They help teams see what exists, who owns it, where it belongs, how it is accessed, and what state it is in. They support discovery, metadata, quality information, governance, classification, and lifecycle management.

Maysano depends on that layer. It does not try to replace data catalogs, metadata platforms, governance systems, storage platforms, integration layers, or the systems that operate the underlying data estate.

The issue was not whether catalogs are valuable. The issue was whether a catalog-centered model could represent the wider operating environment around data products. In a catalog, the product is usually the main object. The surrounding context supports the product. Maysano needed to model a broader system where the product was only one important object among many.

## The product was no longer the center

A data product does not create value through its definition alone. Its purpose comes from the business objective it supports, the decisions it improves, the use cases it enables, and the outcomes it helps produce.

As Maysano developed, more objects became important in their own right. Objectives, use cases, signals, policies, recipes, source documents, decisions, owners, and review states all had to be visible and connected. The portfolio was no longer only about listing products or managing their lifecycle. It had to show how business intent, products, evidence, policies, decisions, and execution move together.

This changed the nature of the portfolio. A product entry could no longer carry all the meaning around the work. The relationships around the product became part of the model.

## The relationships became the model

The limits of a catalog-centered approach became clearer as the number of relationships increased.

One objective might be supported by several products. One product might serve several use cases. One use case might depend on products from different domains. A policy might affect a group of products and workflows. A signal might change the priority of several initiatives. A recipe might guide different agents through the same review and approval process.

These relationships do not form one stable hierarchy. They cross team boundaries, change over time, and mean different things depending on where the user starts.

A leader might start with an objective and ask which products and use cases support it. A product owner might start with a product and inspect dependencies, evidence, policies, and business alignment. A governance specialist might start with a policy and trace where it applies. An AI agent might start with a recipe and identify the needed inputs, products, rules, outputs, and review conditions.

Once these paths became central to how the portfolio was used, the relationships were no longer supporting details. They had become the operating model itself.

## Why the graph felt natural

A graph gave Maysano a more natural structure because it did not force one object to remain at the center.

Products, objectives, use cases, policies, signals, decisions, recipes, and source materials can all exist as connected nodes. Their relationships can be explicit, typed, reviewed, and maintained. Any meaningful element can become the starting point for understanding the surrounding context.

This makes the portfolio easier to explore from different perspectives. It also makes harder questions easier to ask. Which products support this objective? Which use cases would be affected if this product changed? Which policy applies to this workflow? Which source document supports this decision? Where is ownership missing? Which products have no clear business alignment? Which signals suggest that a portfolio priority should change?

The graph was not chosen because graphs sound more modern than catalogs. It was chosen because the problem itself was relational.

![Catalog and graph serve different roles in Maysano: inventory and lifecycle on one side, operating context and relationships on the other.](screenshot-2026-07-25-at-11-01-54-chatgpt-maysano.png "The catalog remains the inventory layer. The graph becomes the operating environment for intent, dependencies, decisions, and next actions.")

## From updated catalog to living portfolio

A living portfolio needs more than updated product records. It combines current state with accepted organizational knowledge. It records where work stands, but also why the work exists, which evidence supports it, which decisions shaped it, which relationships have been accepted, and how the portfolio has changed through review and execution.

When a business objective changes, the relevant products and use cases should become visible. When a new signal appears, its effect on priorities should be traceable. When a policy changes, the affected products, recipes, and workflows should be identifiable. When ownership or review status changes, that change should become part of the shared operating context.

The portfolio therefore acts as more than an inventory. It becomes a maintained representation of how the organization creates, governs, and develops value through data products.

## The graph as shared organizational memory

The graph also creates the foundation for AI agents to work inside the portfolio.

A graph does not become shared organizational memory only because information is connected. The information must also be reviewed, governed, versioned, and accepted as part of the organization's context.

An agent might infer that a product supports a business objective. That inference should not automatically become organizational truth. It should enter a review process. Once approved, the relationship becomes part of the managed graph, and later agents can use it as accepted portfolio context.

The same principle applies to ownership, product status, governance conditions, dependencies, and business alignment. The graph contains both state and knowledge. State records where the work currently stands. Knowledge records what the organization has accepted as meaningful.

![Agent inferences become shared memory only after review and approval in the managed graph.](screenshot-2026-07-25-at-10-53-12-chatgpt-maysano.png "Maysano separates agent inference from accepted memory so later agents can rely on reviewed context.")

This gives agents continuity across runs without allowing temporary model outputs to become authoritative by default. Agents can inspect the objective behind a product, the policies that apply, the signals affecting its priority, and the recipe governing the work. They do not need to rebuild the same understanding from separate prompts and disconnected documents each time they act.

## Catalogs and graphs serve different purposes

The distinction between catalogs and graphs should not be seen as a fight between technologies.

A catalog manages inventory and product lifecycle information. A graph represents the wider network of intent, evidence, relationships, decisions, governance, and execution around that inventory.

A catalog can include relationships, and some catalog platforms provide graph-based views. The deeper difference is the operating model. In a catalog-centered model, the product remains the main managed object and the surrounding context supports it. In Maysano, the relationships across the full portfolio are treated as first-class parts of the system.

The catalog therefore remains an essential part of the underlying data management layer. The graph becomes the structure through which Maysano represents the broader operating environment.

## Maysano builds above data management

The underlying data management estate continues to manage data assets, technical metadata, storage, quality, access, integration, processing, and operational controls.

Maysano builds above this layer. It connects managed products and assets to business intent, use cases, evidence, governance, decisions, workflows, and agent activity.

This division matters. Maysano does not duplicate the role of the catalog or try to manage every technical detail of the data estate. It provides the connected operating context around those systems.

The result is an environment where the organization can understand not only which products exist, but why they matter, how they relate, and how work around them should proceed.

## The standards beneath Maysano

The same separation of concerns is present in the machine-readable standards used beneath Maysano.

The Open Data Product Specification family, developed under the Linux Foundation, does not treat the data product definition as the whole system. The family separates product definitions, catalogs, graphs, shared vocabulary, and executable recipes into distinct but connected structures.

The Open Data Product Specification describes the product. The Open Data Product Catalog supports the organization and exchange of product collections. The Open Data Product Graph makes relationships across the portfolio explicit. The vocabulary layer supports shared meaning. Recipes describe governed processes, inputs, outputs, validation steps, and review conditions.

This structure reflects the same realization that shaped Maysano. Catalogs remain necessary, but they are not expected to capture the whole operating model alone.

## The Python SDK makes the model executable

The Python SDK published on top of the standards brings the same thinking into applications and agent workflows.

The SDK provides operations for validating product definitions, working with catalogs, traversing graphs, interpreting recipes, resolving supporting structures, and generating portfolio outputs. This allows tools and agents to work with the standards through executable functions instead of depending only on documents or application-specific logic.

This matters because the operating model should not remain trapped inside one application. Product definitions, catalog structures, graph relationships, and recipes should be portable across tools and usable by developers and AI agents.

The standards provide the shared structures. The SDK provides the runtime operations. Maysano turns them into a managed operating environment.

## From inventory to operating model

The design direction became clear once Maysano was understood as more than a system for listing and managing data products.

The organization still needs the catalog. It still needs product ownership, lifecycle management, metadata, quality information, and technical governance. Those capabilities remain essential.

Maysano addresses the layer above them. It represents how business intent becomes products and use cases, how evidence and policies shape decisions, how workflows govern change, and how AI agents operate within accepted organizational context.

The catalog tells the organization which products it has and helps manage them. The graph connects those products to the intent, evidence, decisions, policies, and workflows that give them meaning.

If your organization has a catalog but still struggles to connect data products to business intent, portfolio decisions, governance, and AI agent work, get in touch. I can help you design the operating layer that turns inventory into usable shared context.
