---
title: The ODPS Family Is Becoming the Alphabet of Data Products
date: 2026-05-17
category: Standards
summary: ODPS, ODPC, ODPG, and ODPV are becoming a shared language for people, platforms, and AI agents that need data products to work in practice.
glance: AI agents need context, not only data access. | ODPS, ODPC, ODPG, and ODPV each have a clear role in the standards family. | The SDK with MCP support turns the standards into an operational tool surface. | Release candidates are the right moment for practical review and feedback.
status: published
---

We are officially announcing the release candidates of the extended ODPS standards family, together with the full AI Agent SDK with MCP support built on top of those standards.

This is more than a documentation update. It is a shift from one specification into a family of standards that can help people, platforms, and AI agents describe, organize, connect, and interpret data products.

![The ODPS family becomes an alphabet for data products across humans, platforms, and AI agents.](odps-family-alphabet.png "The ODPS family gives data products a shared language.")

## The problem is not only data access

Most organizations are now asking how to make their data ready for AI. That is the right direction, but the question is often too narrow. The discussion usually focuses on access to datasets, APIs, catalogs, metadata, and technical integration. Those things matter, but they are not enough when AI agents start working with data products.

AI agents need more than access. They need context. They need to understand what a data product is, who owns it, what it contains, how it is accessed, what quality expectations apply, what terms mean, where the product belongs, and how it connects to business value.

Without that context, agents are forced to guess. They might find a dataset but not understand its purpose. They might read a catalog entry but not know which business objective it supports. They might see a KPI but not know which data product contributes to it. They might use a term differently from the team that created the product.

## The answer is the extended ODPS family

This is the problem the extended ODPS family is designed to address. ODPS is no longer only one specification standing alone. It is becoming part of a wider standards family for making data products easier to describe, organize, connect, and interpret.

Together, the release candidates form a standards family for describing products, organizing catalogs, connecting value, and defining vocabulary. ODPS defines the product. ODPC organizes catalogs. ODPG connects value. ODPV defines vocabulary. The AI Agent SDK with MCP support makes the family practical to use.

That is why I like the alphabet metaphor. Like an alphabet, each part of the ODPS family has its own role. One letter alone has limited value. The value comes when the letters are combined into a language that people and systems use. ODPS, ODPC, ODPG, and ODPV follow the same logic. Each standard has a clear purpose, but the real value comes when they are used together.

![The extended ODPS family links product definitions, catalogs, value graphs, and vocabulary into structured context for AI agents.](extended-odps-family.png "ODPS, ODPC, ODPG, and ODPV create structured context for AI agents.")

## What each standard does

The Open Data Product Specification, or ODPS, defines the data product itself. It describes the product, its ownership, access, support, data quality, licensing, pricing, and related product-level information. It helps turn a data product from a loose technical asset into something that gets managed, exchanged, governed, and reused.

The Open Data Product Catalog, or ODPC, organizes data products into catalogs. A single data product is useful, but organizations need to manage portfolios of products across domains, teams, use cases, and ecosystems. ODPC provides the catalog layer for organizing these products in a structured way.

The Open Data Product Graph, or ODPG, connects data products to value. It describes how data products relate to use cases, business objectives, KPIs, signals, and other elements that explain why the products matter. This matters because data products should not exist only as inventory items. They should connect to outcomes.

The Open Data Product Vocabulary, or ODPV, defines the shared vocabulary. It gives the standards family a common set of terms and meanings. Agents, platforms, and teams need consistent language. If the same term means different things in different places, interpretation becomes unreliable.

## Why this is an alphabet

Together, these standards form the alphabet of data products. ODPS defines products. ODPC organizes catalogs. ODPG connects value. ODPV defines vocabulary. The combination creates a context layer for data products.

This matters more now because context engineering is becoming central to how AI agents work. The challenge is no longer only how to give agents access to more data. The challenge is how to give agents the right structured context so they can understand, reason, and act with less guesswork.

For data products, that context needs to include product identity, ownership, access, quality, licensing, business purpose, portfolio structure, relationships, objectives, KPIs, signals, and vocabulary. These are not small details. They are the difference between an agent that only retrieves information and an agent that understands how a data product fits into a wider business and governance model.

The extended ODPS family is moving toward release candidates with this direction in mind. The aim is to make data products more readable, connected, and usable as structured context. This is useful for people who manage data product portfolios. It is useful for platforms that need interoperable metadata. It is also useful for AI agents that need to work across products, catalogs, graphs, and vocabularies.

## The SDK makes the language operational

The release candidate announcement also includes the full Open Data Products Python SDK with MCP support. The standards define the language, and the SDK makes that language operational.

The SDK gives developers, automation workflows, and AI agents a practical way to load, validate, explain, search, summarize, traverse, and work with ODPS family documents. It provides one consistent surface across ODPS, ODPC, ODPG, and ODPV.

The SDK also includes MCP support. This means agent hosts and MCP-capable tools can work with the standards family through a tool surface, not only through manual files or command-line usage. This includes support for Claude Code and Codex, so AI coding agents can validate, explain, search, summarize, and work with ODPS family documents directly from their development environment.

This is an important step because the ODPS family is not only meant to be read by people. It is meant to be used by AI agents as structured context. With MCP support, the standards become available as practical tools for agent workflows, helping agents work across ODPS, ODPC, ODPG, and ODPV with a consistent interface.

![The SDK gives AI agents an operational layer for loading, validating, explaining, searching, traversing, and summarizing ODPS family documents.](sdk-standards-operational-layer.png "The SDK turns the standards family into a practical operating layer.")

## From documentation to context layer

The shift is bigger than documentation. The ODPS family is becoming a structured context layer for data products. It helps people understand the portfolio. It helps platforms exchange metadata. It helps AI agents reason across data products with less uncertainty.

This is why the release candidates matter. They mark the move from one specification into a standards family, and from static documentation into agent-readable context supported by real tooling.

The ODPS family is becoming the alphabet of data products. That alphabet is now becoming part of how data products become readable by AI agents.

Feedback is welcome as ODPS, ODPC, ODPG, ODPV, and the AI Agent SDK with MCP support move toward stable releases.

If your organization is trying to make data products readable by people, platforms, and AI agents, get in touch. I can help turn the ODPS standards family, SDK, and adoption path into a practical operating model for real data product work.
