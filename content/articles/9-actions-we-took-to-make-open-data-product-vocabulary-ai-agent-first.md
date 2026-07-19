---
title: 9 Actions We Took to Make Open Data Product Vocabulary AI-Agent-First
date: 2026-05-10
category: Standards
summary: How the Open Data Product Vocabulary was reshaped so people, tools, and AI agents can use the same product language.
glance: AI agents need standards they can read, validate, and use directly. | ODPV gives ODPS, ODPC, and ODPG one shared vocabulary layer. | The work keeps 59 terms easier to find, reuse, validate, and govern. | Missing terms should become reviewed extensions, not scattered agent inventions.
status: published
---

AI agents are moving from experiments to operating models. That changes what a data product standard has to do.

A standard can no longer be only a document for people. It also has to be a working surface for software and agents. Agents need to find the right files, understand terms, validate structure, follow relationships, reuse identifiers, and know what to do when meaning is missing.

The pressure is already visible. Abu Dhabi's Government Digital Strategy 2025-2027 aims to make Abu Dhabi the world's first fully AI-native government by 2027, backed by AED13 billion investment, 100% sovereign cloud adoption, and full AI integration into government services. The UAE has also announced a framework to deploy agentic AI across 50% of government sectors and operations within two years.

The same shift is visible in the private sector. Klarna said its AI assistant handled 2.3 million conversations in its first month, equal to two-thirds of its customer service chats. It also said the assistant did work equal to 700 full-time agents, reduced repeat inquiries by 25%, and cut average resolution time from 11 minutes to under 2 minutes. Later reports about quality concerns made the lesson sharper: agents can scale fast, but scale alone is not enough.

Salesforce's Agentic Enterprise Index reported 119% growth in agents created and deployed by participating organizations in the first half of 2025. It also reported that agent actions grew at an average rate of 80% month over month. Customer service, internal business automation, and sales were the top use cases.

## Why vocabulary matters

Open Data Product Vocabulary, or ODPV, was drafted with this shift in mind. It is part of the Open Data Products standards family. ODPS defines data products. ODPC defines reusable catalog and portfolio objects. ODPG defines relationships between products, catalogs, use cases, objectives, KPIs, and signals.

ODPV defines the shared language that helps people, tools, and AI agents use these standards in the same way. Without that shared language, every catalog, portfolio, marketplace, tool, and agent starts to invent its own terms. That creates noise where organizations need trust.

![ODPV creates a shared vocabulary layer across the Open Data Product standards family.](odpv-shared-vocabulary.png "ODPV gives ODPS, ODPC, and ODPG one reusable vocabulary layer.")

## The 9 actions

The first action was to add `/llms.txt` as an agent entry point. This file explains what ODPV is, where the important files are, how agents should use them, and what output is expected. It gives agents a direct guide instead of forcing them to crawl the whole site and guess the structure.

The second action was to create `/vocab/terms.jsonl`. Agents often work through retrieval, search, embeddings, and lightweight lookup. A JSONL file gives one term per line, with each line as a self-contained JSON object. That makes the vocabulary easier to use in RAG pipelines, agent memory, lookup services, and validation workflows.

The third action was to keep YAML as the canonical source. ODPV keeps `/vocab/odpv.yaml` as the maintained source of truth. JSON, JSONL, and section files are generated from it. This keeps the vocabulary easier to manage for maintainers and more predictable for tools.

The fourth action was to add JSON for JSON-native tools. Many developer tools and agent workflows expect JSON first. `/vocab/odpv.json` makes the vocabulary easier to consume without custom conversion logic.

The fifth action was to split the vocabulary into scoped files: `/vocab/core.yaml`, `/vocab/value.yaml`, `/vocab/governance.yaml`, and `/vocab/relationships.yaml`. This helps agents load only the part they need. An agent working on graph relationships can load relationship terms. An agent explaining business value can focus on value terms. An agent checking governance language can load governance terms.

![ODPV is structured for humans, tools, and AI agents through files such as llms.txt, JSONL, schema, YAML, and JSON.](odpv-ai-agent-first.png "ODPV was structured so agents can discover, validate, and use the vocabulary.")

The sixth action was to add schema validation through `/schema/odpv.schema.json`. Agents should not only read vocabulary files. They should also detect malformed terms, missing attributes, and structural issues before using or extending the vocabulary.

The seventh action was to add examples for every term. ODPV now includes examples for all 59 terms. Definitions explain meaning. Examples show use. For AI agents, this reduces ambiguity and helps prevent semantic drift.

The eighth action was to define relationship terms with domain and range guidance. This helps agents choose relationship terms more consistently when working with data products, catalogs, use cases, objectives, KPIs, signals, and governance objects. ODPV provides stable relationship names and meanings. ODPG provides the graph structure.

The ninth action was to define a governance path for missing terms. Agents should not invent official ODPV terms. When a required meaning is missing, they should suggest an extension term, explain the gap, and propose a GitHub issue for review. This protects the vocabulary from uncontrolled drift.

## What this changes

AI-native government, AI-native enterprises, and AI-native data ecosystems need standards that agents can use directly. A PDF or web page is not enough.

Agents need structured files, stable identifiers, retrieval formats, schema validation, examples, relationship semantics, and contribution rules. ODPV gives the Open Data Products standards family this shared vocabulary layer.

That makes the standards family more than machine-readable. It makes it easier to discover, validate, retrieve, govern, and connect. It also gives teams a practical way to keep people, tools, and agents aligned around the same meaning.

The real shift is simple. The vocabulary is not only written for people reading documentation. It is written for agents that search, reason, validate, link, and extend open data product ecosystems.

If your organization is trying to make data product standards usable by teams, platforms, catalogs, or AI agents, get in touch. I can help turn the vocabulary, governance path, and implementation model into something your organization can use without creating another layer of confusion.
