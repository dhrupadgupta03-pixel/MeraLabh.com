# Site Output Refactor Map

## Scope
- Working folder: `/home/dhrupad/Documents/MeraLabh.com/Keyword Output/ sandbox/site-output`
- Date: `2026-07-14`
- Goal: page-family mapping lock karke sabhi required pages ko Hindi-first, task-first, library-compliant structure me rebuild karna.

## Tasks
1. Page mapping lock ki gayi.
2. Template-family mismatches identify kiye gaye.
3. Copy contract ko Hindi-first banaya gaya.
4. Repeated routing aur filler text remove kiya gaya.
5. Official-action panel aur decision-route-cards patterns apply kiye gaye.
6. Baseline note capture kiya gaya.
7. Rebuild aur QA scripts add kiye gaye.

## Subtasks
- First-screen UX ko page family ke hisab se badalna.
- Support rail ko trust/reference/disclaimer contract tak simit rakhna.
- Har page me ek hi canonical template family declare karna.
- Har page par ek hi primary `Agla sahi kadam` section rakhna.
- Official action ko support rail se utha kar primary content me lana.
- QA rules ke liye machine-checkable markers add karna.

## Page Ledger
| Page | Family | One-line intent | SERP fit | Decision | Official source |
| --- | --- | --- | --- | --- | --- |
| Hub index | hub-page | User ko apni Ayushman zarurat ke hisab se sahi page jaldi chunna hai. | Routing hub | keep separate | Route-level official links page cards ke andar milte hain. |
| Ayushman Card Kya Hai / PMJAY Kya Hai | content-spoke | Ayushman Card aur PMJAY ka basic matlab samajhna. | Explainer / definition | rework as content-spoke | PMJAY scheme explanation and beneficiary identity framing. |
| PMJAY Full Form | content-spoke | PMJAY ka full form aur context samajhna. | Definition page | keep separate | Official scheme naming and full-form usage. |
| Ayushman Card Benefits | content-spoke | Scheme ke major fayde aur boundaries samajhna. | Benefits explainer | rework as content-spoke | PMJAY hospitalization coverage framing. |
| Ayushman Card Disease List and Coverage | content-spoke | Coverage kaise samjhein aur kya assume na karein. | Coverage explainer | keep separate | Official package and empanelled hospital context. |
| Ayushman Card Eligibility | tool-flow | Final official check se pehle ek simple fit-check samajhna. | Eligibility pre-check | rework as tool-flow | Official beneficiary portal - https://beneficiary.nha.gov.in/ |
| Ayushman Card Beneficiary List Me Naam Kaise Dekhe | guide-process | Beneficiary list me naam dekhne ka safest path samajhna. | Guide / process help | rework as guide-process | Official beneficiary portal - https://beneficiary.nha.gov.in/ |
| Ayushman Card Download | guide-process | Download ke liye sahi route aur readiness samajhna. | Task guide | rework as guide-process | Official Ayushman app - https://play.google.com/store/apps/details?id=org.nha.pmjay&hl=en |
| Ayushman Card Download Aadhaar Se | guide-process | Aadhaar route se download flow samajhna. | Route-specific guide | keep separate | Official Ayushman app - https://play.google.com/store/apps/details?id=org.nha.pmjay&hl=en |
| Ayushman Card Download Mobile Number Se | guide-process | Mobile number route se download flow samajhna. | Route-specific guide | keep separate | Official Ayushman app - https://play.google.com/store/apps/details?id=org.nha.pmjay&hl=en |
| Ayushman Card Documents Required | guide-process | Download ya verification se pehle kya ready rakhna hai samajhna. | Readiness guide | keep separate | Official Ayushman app - https://play.google.com/store/apps/details?id=org.nha.pmjay&hl=en |
| Ayushman Card Status Check | troubleshooting | Status check ke baad issue type chun kar sahi fix route lena. | Troubleshooting hub | rework as troubleshooting | Official beneficiary portal - https://beneficiary.nha.gov.in/ |
| Ayushman Card Pending Status | troubleshooting | Pending status ka matlab aur agla safe step samajhna. | Issue-specific troubleshooting | keep separate | Official beneficiary portal - https://beneficiary.nha.gov.in/ |
| Ayushman Card Rejected Status | troubleshooting | Rejected status ke common कारण aur official recovery path samajhna. | Issue-specific troubleshooting | keep separate | Official beneficiary portal - https://beneficiary.nha.gov.in/ |
| Ayushman Card Not Showing | troubleshooting | Record ya card na dikhne par quick checks samajhna. | Issue-specific troubleshooting | keep separate | Official beneficiary portal - https://beneficiary.nha.gov.in/ |
| Ayushman Card Hospital List and Use | guide-process | Hospital search aur card use se pehle verification path samajhna. | Guide / process help | rework as guide-process | Official hospital search - https://hospitals.pmjay.gov.in/Search/ |
| Ayushman Card Kaise Use Kare | guide-process | Hospital visit ke time card ka practical use samajhna. | Guide / process help | keep separate | Official hospital search - https://hospitals.pmjay.gov.in/Search/ |
| Ayushman Card Validity and Changes | update-sensitive | Validity aur rule change date-sensitive tareeke se samajhna. | Update-sensitive page | keep separate | Official beneficiary portal - https://beneficiary.nha.gov.in/ |
| Ayushman Card Correction | guide-process | Correction cases aur official edit route samajhna. | Guide / process help | rework as guide-process | Official Ayushman app - https://play.google.com/store/apps/details?id=org.nha.pmjay&hl=en |

## First rollout
- index.html
- Ayushman Card Eligibility
- Ayushman Card Status Check
- Ayushman Card Download
- Ayushman Card Beneficiary List Me Naam Kaise Dekhe

## Second rollout
- Ayushman Card Pending Status
- Ayushman Card Rejected Status
- Ayushman Card Not Showing
- Ayushman Card Download Aadhaar Se
- Ayushman Card Download Mobile Number Se
- Ayushman Card Correction
- Ayushman Card Hospital List and Use
- Ayushman Card Documents Required
- Ayushman Card Kaise Use Kare

## Final rollout
- Ayushman Card Kya Hai / PMJAY Kya Hai
- PMJAY Full Form
- Ayushman Card Benefits
- Ayushman Card Disease List and Coverage
- Ayushman Card Validity and Changes

## Notes
- Existing 18-page scope ko retain kiya gaya, kyunki current content set me har page ka user intent alag hai.
- `ayushman-card-eligibility` ko tool-flow family me move kiya gaya.
- `ayushman-card-status-check` ko troubleshooting hub banaya gaya.
- `ayushman-card-download`, `ayushman-card-beneficiary-list-name-check`, `ayushman-card-hospital-list-use`, aur `ayushman-card-correction` ko guide-process structure me rebuild kiya gaya.
- `ayushman-card-kya-hai` aur `ayushman-card-benefits` ko hub se content-spoke me convert kiya gaya.
