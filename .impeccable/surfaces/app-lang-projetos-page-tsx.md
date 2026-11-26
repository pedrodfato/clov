---
version: 1
slug: "app-lang-projetos-page-tsx"
primary_target: "app/[lang]/projetos/page.tsx"
related_targets: ["components/projetos/Parede.tsx"]
---

# Surface: /projetos (pt) · /en/projects (en)

Mode: Experience. Visitor: founder/ops lead of a 5–50 person company browsing proof before asking for a quote. Action: WhatsApp with a prefilled quote request, either "a site in the style of <project>" or "a new style", plus site type. Content: the same 7 projects as the home section (5 live, 2 WIP without links), 1440x900 captures in public/projects. No invented metrics, dates or results.

## Direction contract

THESIS: The projects are pinned to a dark wall bigger than the screen; the visitor explores it by dragging, like a studio pin-up wall. Refuses the default grid of equal cards and the home's pinned carousel.

OWN-WORLD: Inherited Clov world: #0a0a0a ground, brand green #00e87a as the only light source, PP Mori + mono labels for coordinates and status. Screens in thin browser frames with a domain pill and a status dot (green live, striped WIP). Fine measuring grid on the wall with coordinate ticks; a minimap plots the viewport.

STORY: The visitor sees the full body of work at once, dives in, opens a project, and leaves with a quote request in the style they liked, or a new one from the empty "your site here" slot.

FIRST VIEWPORT: Entrance starts zoomed out showing the whole wall: grid draws from center, frames light up in a stagger, then the camera dives to scale 1 centered on FinalForms. Top-left: h1 "Projetos" and one-line lede over a vignette. Bottom: drag hint left, primary "Pedir orçamento" pill center, minimap right.

FORM: Draggable wall (structure 3 of 7 on my ordered list), seed key 9660a6a9.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

Signature interaction: drag/wheel/keyboard pan with inertia over the wall; opening a frame flies it from its wall position into the case dialog (FLIP), with the quote builder beside it.
