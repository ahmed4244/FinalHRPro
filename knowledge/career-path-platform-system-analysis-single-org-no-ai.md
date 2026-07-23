---
title: "Career-path platform — system analysis (single-org, no AI)"
type: reference
created: 2026-07-23
tags: []
status: accepted
---

# Career-Path Platform — System Analysis

Scope decisions: single-org internal tool · no AI (deterministic) · self-assessment + manager review.

## 1. Scope & context
Internal tool for ONE company. Employees see their position on the engineering ladder, the gap
to the next level, and what closes it. Managers validate. HR/admin curates the framework. No ML —
every recommendation is a deterministic lookup: "your level requires X; you have Y; gap = X−Y."

Actors (3 roles):
- Employee — view own path, self-rate skills, see gaps, track progress
- Manager — above + review/validate reports' self-ratings, mark promotion-readiness
- HR/Admin — curate the framework (levels, skills, tools, certs, criteria), manage users, org-wide reports

## 2. Core modules
1. Framework catalog — curated career model (levels → skills/tools/certs/criteria). Admin-editable.
2. Employee profile — identity, current level, track, manager.
3. Self-assessment — employee rates themselves against their level's required skills.
4. Manager review — manager confirms/adjusts ratings, adds evidence, signs off.
5. Gap analysis & path view — read surface: current vs required, computed gap, next-level checklist.
6. Progress tracking — history over time; are gaps closing?
7. Admin/reporting — org-wide dashboards (bench strength per level, common gaps).

## 3. Data model

Two halves: the framework (curated, shared) and the person (per-employee state).

### A. Framework entities (admin-curated)
- Track: id, name — backend/frontend/data-ml/devops, or "general"
- Level: id, name, rank (1–4), track_id, description — L1–L4; track_id null = general/early rungs
- Skill: id, name, category (technical/behavioral), description
- Tool: id, name, category (language/cloud/ci-cd/…)
- Certification: id, name, vendor, value_tier (valued/optional) — UAE-weighted
- PromotionCriterion: id, level_id, description, measurable_signal
- LevelRequirement: id, level_id, requirable_type, requirable_id, target_proficiency, weight
  — THE PIVOT: links a Level to a Skill/Tool/Cert with a required proficiency.
    "L2 requires Skill:system-design@3, Tool:Docker@2, Cert:AWS-SAA optional."
    Adding a requirement = one row, no code change.

### B. Person entities (per-employee)
- User: id, name, email, role, manager_id — role = employee/manager/admin
- Employee: user_id, current_level_id, track_id, hire_date
- SkillRating: id, employee_id, skill_id, self_score, manager_score, updated_at
- ToolProficiency: id, employee_id, tool_id, self_score, manager_score
- EarnedCertification: id, employee_id, certification_id, earned_date
- Review: id, employee_id, reviewer_id, cycle, status, promotion_ready, notes — draft→submitted→signed
- AssessmentSnapshot: id, employee_id, taken_at, payload — frozen state over time → progress trend

### C. Computed layer (derived on read, not stored)
- Gap = for the employee's NEXT level, every LevelRequirement where manager_score < target_proficiency.
- Readiness % = requirements met ÷ total requirements for next level.
- Path = ordered LevelRequirements grouped by skill/tool/cert.
Each rating holds TWO scores (self + manager). Gap always computes off manager_score (validated truth).

## 4. Architecture — conventional 3-tier web app

Client (browser): SvelteKit UI — employee path view, assessment forms, manager review queue, admin catalog
   ↓ HTTPS / JSON
Application server (SvelteKit endpoints or small API — Node/Express, FastAPI):
   auth & RBAC (3 roles), assessment/review workflow, gap-analysis compute (deterministic), framework CRUD
   ↓ SQL
Relational DB — PostgreSQL: framework tables + person tables (schema in §3)

Why these choices for these constraints:
- Relational DB (Postgres), not NoSQL — highly relational data; core op is a join-heavy gap query.
- SvelteKit — already used in this repo; reuse the skill.
- Monolith, not microservices — single org, no AI, modest scale. One deployable.
- RBAC, not multi-tenancy — single company; only role-based permissions + manager→report scoping.
- No AI infra — no vector DB, no LLM gateway, no model hosting. Phase 2 if ever.

## 5. Key workflows
1. Assessment cycle: admin opens cycle → employee self-rates vs next-level reqs → submits →
   manager reviews, adjusts scores, marks readiness → snapshot frozen.
2. Daily employee use: log in → path view (readiness %, gap checklist) → update progress.
3. Framework curation: admin edits levels/skills/certs → flows to everyone's gap calc instantly (just data).

## 6. Non-functional (right-sized)
- Scale: hundreds–low-thousands of employees. Single Postgres + one app server is ample.
- Auth: email/password or company SSO (SAML/OIDC) if available.
- Audit: reviews and snapshots append-only/immutable — promotion paper-trail.
- Privacy: ratings are sensitive HR data — employees see only their own, managers only reports', admin aggregate.

## 7. Suggested MVP cut
Ship first:
- Framework catalog (seed from the SWE career-path research note) + admin CRUD
- Employee profile + self-assessment
- Manager review + gap/path view
Defer: progress trends across cycles, org-wide reporting, SSO, evidence-linking, then (much later) AI.

## Relation to prior research
Section 3A (framework entities) is exactly the Level → {Skill, Tool, Cert, Criterion} structure from
[[swe-career-path-framework-uae-junior-to-staff]]. The domain model is consistent.
