# Metrics Baseline And Audit Note

## Capture Time
- Date: `2026-07-14`
- Source state: initial manual audit captured before refactor rebuild
- Note: exact old HTML archive preserve nahi ki gayi thi, isliye niche baseline me wahi facts rakhe gaye hain jo initial audit me clearly confirm hue the.

## Qualitative Baseline
- Previous index flat card count: `18`
- Official-action pages previously relied on support-side official notes rather than a strong primary official-action panel.
- Hero, body, trust, aur footer me repeated helper copy mil rahi thi.

## Repeated Pattern Audit
- Flat route-card dump index page par tha, grouped task routing nahi thi.
- "page kholkar agla useful step samjhein." jaisa filler repeated route copy me use ho raha tha.
- "Open next page", "Next journey", aur generic "Related pages" type sections multiple page families me aa rahe the.
- Official route visibility support rail me zyada buried thi.

## Template Mismatches Found
- Ayushman Card Kya Hai / PMJAY Kya Hai: old "hub-page.html" -> new "content-spoke"
- Ayushman Card Benefits: old "hub-page.html" -> new "content-spoke"
- Ayushman Card Eligibility: old "hub-page.html" -> new "tool-flow"
- Ayushman Card Beneficiary List Me Naam Kaise Dekhe: old "content-spoke.html" -> new "guide-process"
- Ayushman Card Download: old "hub-page.html" -> new "guide-process"
- Ayushman Card Hospital List and Use: old "hub-page.html" -> new "guide-process"
- Ayushman Card Correction: old "update-sensitive.html" -> new "guide-process"
- Ayushman Card Status Check: old "hub-page.html" -> new "troubleshooting"

## First-Rollout Baseline Note
- `index.html`: flat inventory style tha, grouped task routing nahi tha.
- `ayushman-card-eligibility`: tool-flow ke badle hub structure use ho raha tha.
- `ayushman-card-status-check`: troubleshooting-first ke badle hub-like routing tha.
- `ayushman-card-download`: readiness summary aur official action top par prominent nahi tha.
- `ayushman-card-beneficiary-list-name-check`: guide-process ke badle content-spoke jaisa structure tha.

## Live Metrics Availability
- Workspace me CTR, impressions, click-through, aur indexation ka live analytics export nahi mila.
- Isliye yahan structural baseline record ki gayi hai.
- Future production review ke liye recommended tracked signals:
  - primary official-action click
  - next-step click
  - visible route group usage
  - indexed page count
  - CTR and impressions from live tooling
