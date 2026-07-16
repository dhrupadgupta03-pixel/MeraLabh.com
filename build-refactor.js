#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = __dirname;
const recordsPath = path.join(root, "../artifacts/10_structured_content_records.json");
const libraryRoot = "/home/dhrupad/Documents/MeraLabh.com/Design lib/atomic-library";
const stylesRoot = path.join(root, "styles");
const today = "2026-07-14";
const websiteUrl = "https://www.meralabh.com";

const OFFICIAL = {
  beneficiary: {
    label: "Official beneficiary portal",
    url: "https://beneficiary.nha.gov.in/",
  },
  app: {
    label: "Official Ayushman app",
    url: "https://play.google.com/store/apps/details?id=org.nha.pmjay&hl=en",
  },
  hospital: {
    label: "Official hospital search",
    url: "https://hospitals.pmjay.gov.in/Search/",
  },
};

const TEMPLATE_FAMILIES = {
  index: "hub-page",
  "ayushman-card-kya-hai": "content-spoke",
  "pmjay-full-form": "content-spoke",
  "ayushman-card-benefits": "content-spoke",
  "ayushman-card-disease-list-coverage": "content-spoke",
  "ayushman-card-eligibility": "tool-flow",
  "ayushman-card-beneficiary-list-name-check": "guide-process",
  "ayushman-card-download": "guide-process",
  "ayushman-card-download-aadhaar-se": "guide-process",
  "ayushman-card-download-mobile-number-se": "guide-process",
  "ayushman-card-documents-required": "guide-process",
  "ayushman-card-kaise-use-kare": "guide-process",
  "ayushman-card-hospital-list-use": "guide-process",
  "ayushman-card-correction": "guide-process",
  "ayushman-card-status-check": "troubleshooting",
  "ayushman-card-pending-status": "troubleshooting",
  "ayushman-card-rejected-status": "troubleshooting",
  "ayushman-card-not-showing": "troubleshooting",
  "ayushman-card-validity-changes": "update-sensitive",
};

const PAGE_AUDIT = {
  index: {
    intent: "User ko apni Ayushman zarurat ke hisab se sahi page jaldi chunna hai.",
    serpFit: "Routing hub",
    decision: "keep separate",
    officialSource: "Route-level official links page cards ke andar milte hain.",
  },
  "ayushman-card-kya-hai": {
    intent: "Ayushman Card aur PMJAY ka basic matlab samajhna.",
    serpFit: "Explainer / definition",
    decision: "rework as content-spoke",
    officialSource: "PMJAY scheme explanation and beneficiary identity framing.",
  },
  "pmjay-full-form": {
    intent: "PMJAY ka full form aur context samajhna.",
    serpFit: "Definition page",
    decision: "keep separate",
    officialSource: "Official scheme naming and full-form usage.",
  },
  "ayushman-card-benefits": {
    intent: "Scheme ke major fayde aur boundaries samajhna.",
    serpFit: "Benefits explainer",
    decision: "rework as content-spoke",
    officialSource: "PMJAY hospitalization coverage framing.",
  },
  "ayushman-card-disease-list-coverage": {
    intent: "Coverage kaise samjhein aur kya assume na karein.",
    serpFit: "Coverage explainer",
    decision: "keep separate",
    officialSource: "Official package and empanelled hospital context.",
  },
  "ayushman-card-eligibility": {
    intent: "Final official check se pehle ek simple fit-check samajhna.",
    serpFit: "Eligibility pre-check",
    decision: "rework as tool-flow",
    officialSource: `${OFFICIAL.beneficiary.label} - ${OFFICIAL.beneficiary.url}`,
  },
  "ayushman-card-beneficiary-list-name-check": {
    intent: "Beneficiary list me naam dekhne ka safest path samajhna.",
    serpFit: "Guide / process help",
    decision: "rework as guide-process",
    officialSource: `${OFFICIAL.beneficiary.label} - ${OFFICIAL.beneficiary.url}`,
  },
  "ayushman-card-download": {
    intent: "Download ke liye sahi route aur readiness samajhna.",
    serpFit: "Task guide",
    decision: "rework as guide-process",
    officialSource: `${OFFICIAL.app.label} - ${OFFICIAL.app.url}`,
  },
  "ayushman-card-download-aadhaar-se": {
    intent: "Aadhaar route se download flow samajhna.",
    serpFit: "Route-specific guide",
    decision: "keep separate",
    officialSource: `${OFFICIAL.app.label} - ${OFFICIAL.app.url}`,
  },
  "ayushman-card-download-mobile-number-se": {
    intent: "Mobile number route se download flow samajhna.",
    serpFit: "Route-specific guide",
    decision: "keep separate",
    officialSource: `${OFFICIAL.app.label} - ${OFFICIAL.app.url}`,
  },
  "ayushman-card-documents-required": {
    intent: "Download ya verification se pehle kya ready rakhna hai samajhna.",
    serpFit: "Readiness guide",
    decision: "keep separate",
    officialSource: `${OFFICIAL.app.label} - ${OFFICIAL.app.url}`,
  },
  "ayushman-card-status-check": {
    intent: "Status check ke baad issue type chun kar sahi fix route lena.",
    serpFit: "Troubleshooting hub",
    decision: "rework as troubleshooting",
    officialSource: `${OFFICIAL.beneficiary.label} - ${OFFICIAL.beneficiary.url}`,
  },
  "ayushman-card-pending-status": {
    intent: "Pending status ka matlab aur agla safe step samajhna.",
    serpFit: "Issue-specific troubleshooting",
    decision: "keep separate",
    officialSource: `${OFFICIAL.beneficiary.label} - ${OFFICIAL.beneficiary.url}`,
  },
  "ayushman-card-rejected-status": {
    intent: "Rejected status ke common कारण aur official recovery path samajhna.",
    serpFit: "Issue-specific troubleshooting",
    decision: "keep separate",
    officialSource: `${OFFICIAL.beneficiary.label} - ${OFFICIAL.beneficiary.url}`,
  },
  "ayushman-card-not-showing": {
    intent: "Record ya card na dikhne par quick checks samajhna.",
    serpFit: "Issue-specific troubleshooting",
    decision: "keep separate",
    officialSource: `${OFFICIAL.beneficiary.label} - ${OFFICIAL.beneficiary.url}`,
  },
  "ayushman-card-hospital-list-use": {
    intent: "Hospital search aur card use se pehle verification path samajhna.",
    serpFit: "Guide / process help",
    decision: "rework as guide-process",
    officialSource: `${OFFICIAL.hospital.label} - ${OFFICIAL.hospital.url}`,
  },
  "ayushman-card-kaise-use-kare": {
    intent: "Hospital visit ke time card ka practical use samajhna.",
    serpFit: "Guide / process help",
    decision: "keep separate",
    officialSource: `${OFFICIAL.hospital.label} - ${OFFICIAL.hospital.url}`,
  },
  "ayushman-card-validity-changes": {
    intent: "Validity aur rule change date-sensitive tareeke se samajhna.",
    serpFit: "Update-sensitive page",
    decision: "keep separate",
    officialSource: `${OFFICIAL.beneficiary.label} - ${OFFICIAL.beneficiary.url}`,
  },
  "ayushman-card-correction": {
    intent: "Correction cases aur official edit route samajhna.",
    serpFit: "Guide / process help",
    decision: "rework as guide-process",
    officialSource: `${OFFICIAL.app.label} - ${OFFICIAL.app.url}`,
  },
};

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function writeFile(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, "utf8");
}

function copyFile(from, to) {
  ensureDir(path.dirname(to));
  fs.copyFileSync(from, to);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function stripSlash(urlPath) {
  return String(urlPath || "").replace(/^\/+|\/+$/g, "");
}

function routeForSlug(slug) {
  return `/${stripSlash(slug)}/`;
}

function relHref(fromSlug, toPath) {
  if (!toPath || /^https?:\/\//.test(toPath)) return toPath;
  const cleaned = stripSlash(toPath);
  const depth = stripSlash(fromSlug).split("/").filter(Boolean).length;
  const prefix = depth > 0 ? "../".repeat(depth) : "";
  return cleaned ? `${prefix}${cleaned}/` : `${prefix || "./"}`;
}

function assetHref(slug, fileName) {
  const depth = stripSlash(slug).split("/").filter(Boolean).length;
  const prefix = depth > 0 ? "../".repeat(depth) : "";
  return `${prefix}styles/${fileName}`;
}

function titleCaseWords(text) {
  return String(text || "")
    .replace(/[-/]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const recordData = readJson(recordsPath);
const records = recordData.records || [];
const bySlug = new Map(records.map((record) => [record.slug, record]));
const DISPLAY_TITLES = {
  "ayushman-card-kya-hai": "What Is Ayushman Card and PMJAY?",
  "ayushman-card-beneficiary-list-name-check": "How to Check Your Name in the Ayushman Beneficiary List",
  "ayushman-card-download-aadhaar-se": "Ayushman Card Download by Aadhaar",
  "ayushman-card-download-mobile-number-se": "Ayushman Card Download by Mobile Number",
  "ayushman-card-kaise-use-kare": "How to Use the Ayushman Card",
};

function displayTitleForSlug(slug) {
  const cleaned = stripSlash(slug);
  return DISPLAY_TITLES[cleaned] || bySlug.get(cleaned)?.page_title || titleCaseWords(cleaned);
}

function internalLink(slug) {
  const cleaned = stripSlash(slug);
  return {
    slug: cleaned,
    title: displayTitleForSlug(cleaned),
    href: routeForSlug(cleaned),
  };
}

function officialAction(label, url, note) {
  return { label, url, note };
}

function choiceCard(title, fit, action, href) {
  return { title, fit, action, href };
}

function nextCard(slug, reason, titleOverride) {
  const link = internalLink(slug);
  return {
    title: titleOverride || link.title,
    href: link.href,
    reason,
  };
}

function step(title, body) {
  return { title, body };
}

function noteItem(title, body, href) {
  return { title, body, href };
}

const PAGE_SPECS = {
  "ayushman-card-kya-hai": {
    heroEyebrow: "सीधी जानकारी",
    lead: "Ayushman Card, PMJAY योजना, और official portal का फर्क एक नज़र में समझें।",
    summaryTitle: "सीधा जवाब",
    summaryBody: "Ayushman Card beneficiary पहचान के लिए होता है। PMJAY उस government health scheme का नाम है जिसके तहत eligible परिवार empanelled hospital में इलाज सुविधा ले सकते हैं।",
    answerGroups: [
      noteItem("Ayushman Card क्या है", "यह वही card या beneficiary identity proof है जो PMJAY record से जुड़ता है।"),
      noteItem("PMJAY क्या है", "Pradhan Mantri Jan Arogya Yojana scheme का नाम है. Card scheme नहीं, scheme ka access proof है।"),
      noteItem("किससे confuse न करें", "ABHA, Ayushman Card, aur PMJAY ek hi cheez nahi hain. ABHA health ID अलग विषय है।"),
    ],
    nextSteps: [
      nextCard("ayushman-card-eligibility", "अगर पहले यह जानना है कि आप eligible हो सकते हैं या नहीं।"),
      nextCard("ayushman-card-benefits", "अगर coverage aur scheme ke fayde samajhne hain."),
      nextCard("ayushman-card-download", "अगर aap card access ya download route dekhna chahte hain."),
    ],
    trust: [
      noteItem("सरल अर्थ", "यह page basic फर्क clear करता है, official processing नहीं करता।"),
      noteItem("सही शब्द", "Card, scheme, beneficiary portal, aur hospital route ko alag-alag naam se dikhaya gaya hai."),
      noteItem("अगला safe कदम", "Eligibility ya download page par tabhi jayen jab aapka kaam wahi ho."),
    ],
    references: [
      noteItem("Official scheme framing", "PMJAY scheme explanation aur beneficiary context ko dhyan me rakhkar copy likhi gayi hai."),
    ],
    disclaimer: "यह page समझाने के लिए है. Final verification official source par hi karein.",
    meta: ["Explainer", "Hindi-first", "No fake action"],
  },
  "pmjay-full-form": {
    heroEyebrow: "परिभाषा",
    lead: "PMJAY ka full form aur iska practical matlab jaldi samajh lijiye.",
    summaryTitle: "Full form",
    summaryBody: "PMJAY ka full form Pradhan Mantri Jan Arogya Yojana hai. Ayushman Bharat ke health coverage ecosystem me yahi scheme naam sabse zyada use hota hai.",
    answerGroups: [
      noteItem("कहाँ दिखता है", "Official portal, training material, aur scheme references me PMJAY short form aata hai."),
      noteItem("User ke liye iska matlab", "Agar page ya app par PMJAY likha ho, to aam taur par yahi Ayushman beneficiary scheme context hota hai."),
      noteItem("गलत समझ से बचें", "Sirf full form jaan lena eligibility ya card approval ka proof nahi hota."),
    ],
    nextSteps: [
      nextCard("ayushman-card-kya-hai", "अगर card aur scheme ka पूरा फर्क dekhna hai."),
      nextCard("ayushman-card-eligibility", "अगर ab eligibility pre-check dekhna hai."),
      nextCard("ayushman-card-download", "अगर ab official route tak pahunchna hai."),
    ],
    trust: [
      noteItem("Focused page", "Yeh page sirf term ka अर्थ clear karta hai."),
      noteItem("No overclaim", "Full form ke baad bhi final process official route par hi hota hai."),
      noteItem("Simple copy", "Chhote vakya rakhe gaye hain taki search intent turant solve ho."),
    ],
    references: [
      noteItem("Official naming", "PMJAY official scheme naming ke exact form ko preserve kiya gaya hai."),
    ],
    disclaimer: "Term samajhna alag baat hai, official beneficiary check alag step hai.",
    meta: ["Definition", "Exact official term"],
  },
  "ayushman-card-benefits": {
    heroEyebrow: "फायदे समझें",
    lead: "Scheme ke fayde samajhiye, lekin har treatment ko automatic covered na maaniye.",
    summaryTitle: "सीधा जवाब",
    summaryBody: "PMJAY ka main fayda empanelled hospitals me government-backed hospitalization support hai. Par exact coverage package, case, aur hospital acceptance par depend karta hai.",
    answerGroups: [
      noteItem("मुख्य फायदा", "Eligible beneficiary ko listed treatment packages ke hisab se support mil sakta hai."),
      noteItem("कहाँ limitation aati hai", "Har disease, har hospital, ya har service bina check ke covered nahi maani ja sakti."),
      noteItem("Practical rule", "Hospital aur package fit official route se verify karna sabse safe rahta hai."),
    ],
    nextSteps: [
      nextCard("ayushman-card-disease-list-coverage", "अगर disease ya treatment coverage ko aur साफ dekhna hai."),
      nextCard("ayushman-card-hospital-list-use", "अगर kaun sa hospital use karna hai ye dekhna hai."),
      nextCard("ayushman-card-eligibility", "अगर pehle fit-check karna baaki hai."),
    ],
    trust: [
      noteItem("Benefit boundary", "Fayde samjhana aur final package promise karna alag baat hai."),
      noteItem("Hospital context", "Empanelled hospital acceptance ko hamesha alag verify karein."),
      noteItem("User-first wording", "Copy ko short aur practical rakha gaya hai."),
    ],
    references: [
      noteItem("Official coverage framing", "Hospitalization aur package-based coverage context ko dhyan me rakha gaya hai."),
    ],
    disclaimer: "Coverage ke final details ke liye official hospital route ya support ko verify karein.",
    meta: ["Benefits", "Coverage with caution"],
  },
  "ayushman-card-disease-list-coverage": {
    heroEyebrow: "Coverage detail",
    lead: "Disease list ko fixed promise ki तरह na dekhein. Coverage package aur hospital context se samjhein.",
    summaryTitle: "सीधा जवाब",
    summaryBody: "Ayushman coverage ko ek single open disease list ki तरह dekhna misleading ho sakta hai. Sahi approach hai package, hospital, aur case context ko official route se verify karna.",
    answerGroups: [
      noteItem("क्या देखें", "Treatment package, hospital acceptance, aur beneficiary status sab saath me matter karte hain."),
      noteItem("क्या assume na karein", "Internet par mili random disease list ko final approval list na maaniye."),
      noteItem("कब official check karein", "Jab treatment, surgery, ya hospital choice ka real decision lena ho."),
    ],
    official: officialAction(OFFICIAL.hospital.label, OFFICIAL.hospital.url, "Hospital search aur treatment context official side se verify karein."),
    nextSteps: [
      nextCard("ayushman-card-hospital-list-use", "अगर ab hospital search aur acceptance ka route dekhna hai."),
      nextCard("ayushman-card-benefits", "अगर general scheme benefits par wapas jana hai."),
      nextCard("ayushman-card-eligibility", "अगर pehle eligibility clarity chahiye."),
    ],
    trust: [
      noteItem("Overclaim se bachav", "Is page ka goal realistic expectation dena hai."),
      noteItem("Official terms safe rakhe gaye", "Package aur hospital jaise terms user recognition ke liye maintain kiye gaye hain."),
      noteItem("Fast next step", "Official route top ke paas rakha gaya hai."),
    ],
    references: [
      noteItem("Official package context", "Coverage language ko cautious aur verification-led rakha gaya hai."),
    ],
    disclaimer: "Treatment coverage ka अंतिम निर्णय official system aur hospital verification se hi milega.",
    meta: ["Coverage", "Official verification needed"],
  },
  "ayushman-card-eligibility": {
    heroEyebrow: "Fast fit-check",
    lead: "Yeh real checker nahi hai. Yeh sirf aapko sahi official next step tak le jaane wala simple pre-check mockup hai.",
    summaryTitle: "पहले यह समझें",
    summaryBody: "Final eligibility official beneficiary record se hi milti hai. Yahan sirf apna अगला सही step samajhiye.",
    toolIntro: "Teen simple choices se apna अगला कदम चुनें.",
    toolFields: [
      {
        id: "family-record",
        label: "Aapko kya sabse zyada pata hai?",
        type: "select",
        options: [
          "Mujhe nahi pata ki mera naam list me hai ya nahi",
          "Mera naam shayad hai par confirm nahi hai",
          "Naam mil gaya hai, ab agla step chahiye",
        ],
      },
      {
        id: "proof-ready",
        label: "Kya basic details ready hain?",
        type: "select",
        options: [
          "Haan, Aadhaar ya family details ready hain",
          "Kuch details missing hain",
          "Pehle sirf samajhna hai",
        ],
      },
    ],
    feedbackMap: {
      "Mujhe nahi pata ki mera naam list me hai ya nahi": "Sabse pehle beneficiary list check route dekhiye. Final jawab wahi milega.",
      "Mera naam shayad hai par confirm nahi hai": "Official beneficiary portal par naam verify karna abhi sabse sahi step hai.",
      "Naam mil gaya hai, ab agla step chahiye": "Aap next me download ya status route dekh sakte hain, lekin official confirmation ko base banaiye.",
    },
    official: officialAction(OFFICIAL.beneficiary.label, OFFICIAL.beneficiary.url, "Final eligibility aur beneficiary confirmation official PMJAY system par hi hoti hai."),
    routeCards: [
      choiceCard("Beneficiary list check", "Jab naam confirm nahi hai", "Naam verify ka route dekhein", "/ayushman-card-beneficiary-list-name-check/"),
      choiceCard("Documents readiness", "Jab details ya proof ready nahi hain", "Kya ready rakhna hai dekhein", "/ayushman-card-documents-required/"),
      choiceCard("Download ya status", "Jab naam mil chuka hai", "Agla action page chunen", "/ayushman-card-download/"),
    ],
    nextSteps: [
      nextCard("ayushman-card-beneficiary-list-name-check", "Yeh eligibility ke baad sabse practical official verification step hai."),
      nextCard("ayushman-card-documents-required", "Agar proof ready nahi hai to yahan se shuru karein."),
      nextCard("ayushman-card-status-check", "Agar pehle se record hai aur issue aa raha hai to yeh page useful hai."),
    ],
    trust: [
      noteItem("Mockup only", "Yeh page live eligibility engine nahi hai."),
      noteItem("One CTA rule", "Primary official action ko top flow me rakha gaya hai, footer me nahi."),
      noteItem("ABHA mix nahi", "Eligibility copy me ABHA ko alag rakha gaya hai."),
    ],
    references: [
      noteItem("Official source", "Beneficiary verification ke liye official PMJAY beneficiary route use hota hai.", OFFICIAL.beneficiary.url),
    ],
    disclaimer: "Yahan diya gaya fit-check sirf guidance hai. Final decision official records se hi milega.",
    meta: ["Tool-flow", "One CTA", "Guided pre-check"],
  },
  "ayushman-card-beneficiary-list-name-check": {
    heroEyebrow: "Naam verify karein",
    lead: "Agar aapko list me naam dekhna hai, to safest path official beneficiary portal ya official app hi hai.",
    summaryTitle: "Before you start",
    summaryBody: "Naam check karne se pehle state, family details, ya Aadhaar-linked details ready rakhein. Search result milne par hi next page jaise download ya status check useful banega.",
    official: officialAction(OFFICIAL.beneficiary.label, OFFICIAL.beneficiary.url, "Real lookup sirf official system par hota hai. MeraLabh lookup perform nahi karta."),
    steps: [
      step("Search route chunen", "Portal ya app me wahi route kholen jahan aapke paas matching details ho, jaise family ya Aadhaar-linked details."),
      step("Details dhyan se bharien", "Naam, district, state, ya required family detail ko sahi format me dobara check karke enter karein."),
      step("Result milne par agla step chunen", "Naam mil jaye to download ya status page par jayen. Naam na mile to eligibility aur document details phir se verify karein."),
    ],
    highlights: [
      noteItem("Common galti", "Unofficial websites par beneficiary search karna."),
      noteItem("Dusri galti", "ABHA record ko PMJAY beneficiary result samajh lena."),
    ],
    nextSteps: [
      nextCard("ayushman-card-download", "Naam confirm ho gaya hai aur card access chahiye."),
      nextCard("ayushman-card-status-check", "Naam ya process ke baad issue aa raha hai."),
      nextCard("ayushman-card-eligibility", "Agar pehle eligibility understanding dubara dekhni hai."),
    ],
    trust: [
      noteItem("Official-first", "Lookup action ko top par strong panel me rakha gaya hai."),
      noteItem("Readiness summary", "First card me hi user ko kya ready rakhna hai bataya gaya hai."),
      noteItem("No dead end", "Result ke baad direct next-step cards diye gaye hain."),
    ],
    references: [
      noteItem("Official support path", "Beneficiary search official PMJAY route par hota hai.", OFFICIAL.beneficiary.url),
    ],
    disclaimer: "Search result official system ka output hota hai. MeraLabh usse change nahi kar sakta.",
    lastReviewed: "Last reviewed: 2026-07-14. Beneficiary flow me future change ho to official route ko dobara check karein.",
    meta: ["Guide", "Official lookup near top"],
  },
  "ayushman-card-download": {
    heroEyebrow: "Download मार्गदर्शन",
    lead: "Download ka kaam official app ya official beneficiary-side flow se hota hai. Pehle सही route aur readiness samajhiye.",
    summaryTitle: "Before you start",
    summaryBody: "Download se pehle yeh clear karein ki aap Aadhaar route use karenge, mobile route use karenge, ya documents readiness dekhni hai. Is page ka kaam aapko fastest official route tak pahunchana hai.",
    routeCards: [
      choiceCard("Aadhaar route", "Jab Aadhaar-linked verification possible ho", "Aadhaar se download flow dekhein", "/ayushman-card-download-aadhaar-se/"),
      choiceCard("Mobile route", "Jab registered mobile se access mil sakta ho", "Mobile number flow dekhein", "/ayushman-card-download-mobile-number-se/"),
      choiceCard("Documents readiness", "Jab pehle proof ready karna ho", "Documents page dekhein", "/ayushman-card-documents-required/"),
    ],
    official: officialAction(OFFICIAL.app.label, OFFICIAL.app.url, "Download ya e-KYC ka real action official Ayushman app ya supported official route par hota hai."),
    steps: [
      step("Apna route choose karein", "Aadhaar, mobile, ya documents readiness me se wahi route kholen jo aapki current स्थिति se match karta ho."),
      step("Official app ya route par continue karein", "Unofficial APK, random portals, ya copied login pages se bachein."),
      step("Download ke baad status ya use page dekhein", "Agar download complete na ho ya next action chahiye ho to relevant page par jayen."),
    ],
    highlights: [
      noteItem("Ready rakhein", "Basic ID details, matching mobile, aur beneficiary confirmation helpful rahte hain."),
      noteItem("Avoid karein", "Fake `download now` pages ya direct on-site processing promise."),
    ],
    nextSteps: [
      nextCard("ayushman-card-download-aadhaar-se", "Agar Aadhaar-based route use karna hai."),
      nextCard("ayushman-card-download-mobile-number-se", "Agar mobile se access try karna hai."),
      nextCard("ayushman-card-status-check", "Agar download ke baad ya pehle status issue aa raha hai."),
    ],
    trust: [
      noteItem("Route-first layout", "First screen par hi route chooser cards diye gaye hain."),
      noteItem("Official prominence", "Main official action primary content me rakha gaya hai."),
      noteItem("No fake processing", "Page sirf guidance deta hai, download nahi karta."),
    ],
    references: [
      noteItem("Official download path", "Ayushman app official access route ke roop me use hoti hai.", OFFICIAL.app.url),
    ],
    disclaimer: "Final download success beneficiary verification aur official flow par depend karta hai.",
    lastReviewed: "Last reviewed: 2026-07-14. App flow future me badle to official source ko phir se verify karein.",
    meta: ["Guide", "Decision routes", "Official action near top"],
  },
  "ayushman-card-download-aadhaar-se": {
    heroEyebrow: "Aadhaar route",
    lead: "Aadhaar-based download tabhi useful hai jab official flow aapke beneficiary record ko match kar sake.",
    summaryTitle: "Before you start",
    summaryBody: "Aadhaar-linked route use karne se pehle beneficiary confirmation aur matching details ready rakhein. Yeh page aapko sequence samjhata hai, official download nahi karta.",
    official: officialAction(OFFICIAL.app.label, OFFICIAL.app.url, "Aadhaar-based download official app ya official supported flow me hi complete hota hai."),
    steps: [
      step("Beneficiary detail verify karein", "Aadhaar route tab asaan hota hai jab aapka beneficiary record pehle se matchable ho."),
      step("Official app kholen", "Official Ayushman app me login ya verification steps ko dhyan se follow karein."),
      step("Download ya next issue route choose karein", "Agar mismatch aaye to documents ya status page dekhkar correction direction samjhein."),
    ],
    highlights: [
      noteItem("Common issue", "Aadhaar hona aur beneficiary match hona ek hi baat nahi hai."),
      noteItem("Safe habit", "OTP ya ID kisi unofficial page par mat daaliye."),
    ],
    nextSteps: [
      nextCard("ayushman-card-documents-required", "Agar proof readiness dubara dekhni hai."),
      nextCard("ayushman-card-status-check", "Agar process me issue aa raha hai."),
      nextCard("ayushman-card-download", "Agar route choice par wapas jana hai."),
    ],
    trust: [
      noteItem("Specific route", "Yeh page sirf Aadhaar-based path ko explain karta hai."),
      noteItem("Official dependency", "Final action official app ke bina nahi hota."),
      noteItem("Clear onward links", "Issue aane par exact next pages diye gaye hain."),
    ],
    references: [
      noteItem("Official app route", "Ayushman app download flow ka main official path hai.", OFFICIAL.app.url),
    ],
    disclaimer: "Aadhaar route availability har user ke record par depend kar sakti hai.",
    lastReviewed: "Last reviewed: 2026-07-14. Route rules badalne par official app instructions ko priority dein.",
    meta: ["Guide", "Aadhaar route"],
  },
  "ayushman-card-download-mobile-number-se": {
    heroEyebrow: "Mobile route",
    lead: "Mobile number se access tabhi chalega jab official system aapke beneficiary record ko us route se match kare.",
    summaryTitle: "Before you start",
    summaryBody: "Registered ya usable mobile detail aur beneficiary match sabse important base hai. Is page ka kaam aapko official mobile route samjhana hai.",
    official: officialAction(OFFICIAL.app.label, OFFICIAL.app.url, "Mobile number se real access official app ya official route me hi hota hai."),
    steps: [
      step("Mobile detail ko base samjhein", "Sirf mobile number hona kaafi nahi. Record match aur official verification bhi zaruri ho sakti hai."),
      step("Official route par login ya verify karein", "App ya portal me wahi option use karein jo mobile-based access ke liye diya gaya ho."),
      step("Mismatch par alternate page use karein", "Agar access na mile to documents, beneficiary check, ya status page dekhein."),
    ],
    highlights: [
      noteItem("Common issue", "Purana ya non-matching mobile number process ko rok sakta hai."),
      noteItem("Safe habit", "Unknown app links ya copied login screens se bachein."),
    ],
    nextSteps: [
      nextCard("ayushman-card-documents-required", "Agar pehle proof aur details ko organize karna hai."),
      nextCard("ayushman-card-status-check", "Agar login ke baad bhi issue aa raha hai."),
      nextCard("ayushman-card-download", "Agar main route chooser par wapas jana hai."),
    ],
    trust: [
      noteItem("Route clarity", "Is page me sirf mobile route par focus rakha gaya hai."),
      noteItem("Official-first", "Primary action direct official source par bhejta hai."),
      noteItem("No portal clone", "MeraLabh login surface imitate nahi karta."),
    ],
    references: [
      noteItem("Official app route", "Mobile-based access official app ya official flow ke through hi samjha jaye.", OFFICIAL.app.url),
    ],
    disclaimer: "Mobile route har case me available ho, yeh maan kar na chalein.",
    lastReviewed: "Last reviewed: 2026-07-14. Official mobile flow badle to app instructions ko priority dein.",
    meta: ["Guide", "Mobile route"],
  },
  "ayushman-card-documents-required": {
    heroEyebrow: "Readiness page",
    lead: "Documents list ko final fixed list na maaniye. Route ke hisab se basic proof ready rakhiye aur final requirement official side se confirm kijiye.",
    summaryTitle: "Before you start",
    summaryBody: "Aksar identity detail, family detail, aur matching beneficiary information ka role hota hai. Exact document requirement route aur local process par depend kar sakti hai.",
    official: officialAction(OFFICIAL.app.label, OFFICIAL.app.url, "Final document requirement official app, portal, ya support path par verify karein."),
    steps: [
      step("Basic identity aur family detail ready rakhein", "Jo details beneficiary search ya verification me use hoti hain unko ek jagah rakhein."),
      step("Apna actual route clear karein", "Download, beneficiary check, ya correction - har route ka exact ask thoda alag ho sakta hai."),
      step("Official screen par final list confirm karein", "Kisi bhi third-party list ko final rule samajhkar process start na karein."),
    ],
    highlights: [
      noteItem("Common galti", "Ek blog par mili generic list ko har state aur har route ke liye final maan lena."),
      noteItem("Practical tip", "Proof ko scan, photo, aur readable form me ready rakhna helpful ho sakta hai."),
    ],
    nextSteps: [
      nextCard("ayushman-card-download", "Agar ab download route choose karna hai."),
      nextCard("ayushman-card-download-aadhaar-se", "Agar Aadhaar-based route dekhna hai."),
      nextCard("ayushman-card-download-mobile-number-se", "Agar mobile route try karna hai."),
    ],
    trust: [
      noteItem("Cautious copy", "Page certainty nahi, readiness deta hai."),
      noteItem("Official confirmation", "Main official confirmation ko top flow me rakha gaya hai."),
      noteItem("Action-led next step", "Readiness ke baad seedha route cards diye gaye hain."),
    ],
    references: [
      noteItem("Official readiness note", "Final requirement ko official route par hi confirm kiya jana chahiye.", OFFICIAL.app.url),
    ],
    disclaimer: "Document ask local ya route-specific bhi ho sakta hai. Isliye final list official side se hi lein.",
    lastReviewed: "Last reviewed: 2026-07-14. Document ask future me change ho to official source ko dobara check karein.",
    meta: ["Guide", "Readiness first"],
  },
  "ayushman-card-status-check": {
    heroEyebrow: "Issue-led help",
    lead: "Status check ke baad sabse pehle problem type chunen. Har issue ka agla कदम alag ho sakta hai.",
    summaryTitle: "Quick start",
    summaryBody: "Agar aapko pending, rejected, ya record not showing jaisa issue dikh raha hai, to pehle official beneficiary route se base status dobara verify karein. Uske baad niche sahi issue card kholen.",
    routeCards: [
      choiceCard("Pending status", "Jab process ruk gaya dikhe", "Pending issue page kholen", "/ayushman-card-pending-status/"),
      choiceCard("Rejected status", "Jab reject ya mismatch dikh raha ho", "Rejected issue page kholen", "/ayushman-card-rejected-status/"),
      choiceCard("Record not showing", "Jab card ya naam hi na dikhe", "Not showing page kholen", "/ayushman-card-not-showing/"),
    ],
    official: officialAction(OFFICIAL.beneficiary.label, OFFICIAL.beneficiary.url, "Status ka real check official beneficiary route ya supported official app par hi hota hai."),
    fixes: [
      step("Base status ko phir se verify karein", "Search detail, state, ya family information me chhoti mismatch bhi result badal sakti hai."),
      step("Issue-specific page kholen", "Pending, rejected, aur not showing ke liye alag fix path diya gaya hai."),
      step("Download ya correction tabhi dekhein", "Jab issue type clear ho jaye tab agla page choose karein, warna journey confuse hogi."),
    ],
    nextSteps: [
      nextCard("ayushman-card-pending-status", "Agar current screen par pending dikh raha hai."),
      nextCard("ayushman-card-rejected-status", "Agar reject ya verification fail dikh raha hai."),
      nextCard("ayushman-card-not-showing", "Agar result hi visible nahi ho raha."),
    ],
    trust: [
      noteItem("Troubleshooting first", "Background ke badle likely fixes ko top par rakha gaya hai."),
      noteItem("Official action visible", "Support rail me chhupane ke bajay official check primary flow me diya gaya hai."),
      noteItem("One question rule", "Yeh page ka main kaam issue type clear karna hai."),
    ],
    references: [
      noteItem("Official verification route", "Beneficiary-side status aur record check official PMJAY route se hota hai.", OFFICIAL.beneficiary.url),
    ],
    disclaimer: "MeraLabh status check run nahi karta. Yeh page sirf सही troubleshooting route tak le jata hai.",
    lastReviewed: "Last reviewed: 2026-07-14. Official status flow badle to beneficiary portal ko priority dein.",
    meta: ["Troubleshooting", "Likely fixes first", "Issue chooser"],
  },
  "ayushman-card-pending-status": {
    heroEyebrow: "Pending issue",
    lead: "Pending ka matlab aksar process complete nahi hua, verification ruk gaya, ya official update abhi baaki hai.",
    summaryTitle: "Sabse likely matlab",
    summaryBody: "Pending dekhte hi reject maan lena sahi nahi hai. Pehle official route par status dobara verify karein aur phir niche diye gaye fix blocks dekhein.",
    official: officialAction(OFFICIAL.beneficiary.label, OFFICIAL.beneficiary.url, "Pending status ka real refresh aur re-check official beneficiary system se hi hota hai."),
    fixes: [
      step("Verification abhi complete nahi hua", "Portal ya app me record update hone me time lag sakta hai. Fresh search se dobara check karein."),
      step("Kuch detail ya proof pending ho sakta hai", "Naam, family, ya required verification detail mismatch ho to process ruk sakta hai."),
      step("Agla route clear karein", "Agar pending lamba chal raha hai to status hub ya correction context dekhna useful ho sakta hai."),
    ],
    highlights: [
      noteItem("Galti se bachें", "Pending ko direct rejection samajhkar naya random process start mat karein."),
      noteItem("Practical habit", "Search details aur date note karke dobara official check karein."),
    ],
    nextSteps: [
      nextCard("ayushman-card-status-check", "Agar issue type comparison dubara dekhna hai."),
      nextCard("ayushman-card-rejected-status", "Agar status badal kar reject ho gaya ho."),
      nextCard("ayushman-card-download", "Agar verification ke baad access step dekhna hai."),
    ],
    trust: [
      noteItem("Fix-first layout", "Likely reason aur safe next step top flow me rakha gaya hai."),
      noteItem("Official dependency", "Pending solve karne ka final control official system par hi hota hai."),
      noteItem("No filler", "Generic intro ko hatakar direct issue copy rakhi gayi hai."),
    ],
    references: [
      noteItem("Official beneficiary route", "Pending re-check ke liye official beneficiary portal use karein.", OFFICIAL.beneficiary.url),
    ],
    disclaimer: "Long pending cases me official support ya local assistance ki bhi zarurat ho sakti hai.",
    lastReviewed: "Last reviewed: 2026-07-14. Future workflow changes ke liye official route ko follow karein.",
    meta: ["Troubleshooting", "Pending issue"],
  },
  "ayushman-card-rejected-status": {
    heroEyebrow: "Rejected issue",
    lead: "Rejected status aksar mismatch, incomplete verification, ya unsupported record condition ki तरफ इशारा करता hai.",
    summaryTitle: "Sabse likely matlab",
    summaryBody: "Reject dikhne par pehla kaam hai official route par detail dobara dekhna aur samajhna ki issue eligibility, record, ya correction se जुड़ा hai.",
    official: officialAction(OFFICIAL.beneficiary.label, OFFICIAL.beneficiary.url, "Rejected status ko official route se verify karke hi correction ya next action choose karein."),
    fixes: [
      step("Mismatch ko dhyan se dekhein", "Naam, family detail, ya verification mismatch rejection ka common कारण ho sakta hai."),
      step("Correction context samjhein", "Agar issue editable detail se जुड़ा hai to correction page aapka अगला कदम ho sakta hai."),
      step("Fresh official verification karein", "Unofficial advice ke badle official status route ko base banaiye."),
    ],
    highlights: [
      noteItem("Galti se bachें", "Rejected dekhkar turant random re-application route par mat jayen."),
      noteItem("Practical tip", "Screenshot, date, aur exact message note karna helpful ho sakta hai."),
    ],
    nextSteps: [
      nextCard("ayushman-card-correction", "Agar issue correction ya update से जुड़ा lag raha hai."),
      nextCard("ayushman-card-status-check", "Agar overall issue chooser par wapas jana hai."),
      nextCard("ayushman-card-download", "Agar verification dubara clear hone ke baad access dekhna hai."),
    ],
    trust: [
      noteItem("Issue-led copy", "Hero aur first card me hi rejection ka practical meaning diya gaya hai."),
      noteItem("Official-first", "Primary panel direct official verification par bhejta hai."),
      noteItem("Clear onward path", "Correction aur status hub dono clearly linked hain."),
    ],
    references: [
      noteItem("Official verification route", "Rejected status ko official beneficiary route par hi confirm karein.", OFFICIAL.beneficiary.url),
    ],
    disclaimer: "Har rejected case ka same कारण nahi hota. Isliye official detail dekhe bina fix assume na karein.",
    lastReviewed: "Last reviewed: 2026-07-14. Official rejection messaging badle to fresh verification karein.",
    meta: ["Troubleshooting", "Rejected issue"],
  },
  "ayushman-card-not-showing": {
    heroEyebrow: "Record not showing",
    lead: "Agar card ya beneficiary record dikh hi nahi raha, to sabse pehle search detail aur official route ko phir se verify karein.",
    summaryTitle: "Sabse likely matlab",
    summaryBody: "Record not showing ka मतलब yeh nahi ki aap pakka ineligible hain. Kai baar issue search mismatch, route confusion, ya incomplete verification ka hota hai.",
    official: officialAction(OFFICIAL.beneficiary.label, OFFICIAL.beneficiary.url, "Record visibility ka final check official beneficiary route se hi hoga."),
    fixes: [
      step("Search detail dobara match karein", "State, family, ya beneficiary search input me chhoti गलती result ko blank kar sakti hai."),
      step("Sahi route use karein", "ABHA ya unrelated portal ko PMJAY beneficiary search ke badle use na karein."),
      step("Need ho to correction context dekhein", "Agar record detail hi galat lag rahi hai to correction page useful ho sakta hai."),
    ],
    highlights: [
      noteItem("Common confusion", "ABHA aur PMJAY beneficiary records ko ek samajhna."),
      noteItem("Practical tip", "Pehle same official route par ek fresh search karke phir issue page compare karein."),
    ],
    nextSteps: [
      nextCard("ayushman-card-status-check", "Agar issue chooser aur baaki problem types compare karna hai."),
      nextCard("ayushman-card-pending-status", "Agar blank result ke baad pending related issue lag raha hai."),
      nextCard("ayushman-card-correction", "Agar record detail galat hone ka doubt hai."),
    ],
    trust: [
      noteItem("Quick fix focus", "Background ke bajay direct likely checks diye gaye hain."),
      noteItem("Official source visible", "Primary content me hi official re-check panel rakha gaya hai."),
      noteItem("No unsupported promise", "Page record ko on-site recover karne ka दावा nahi karta."),
    ],
    references: [
      noteItem("Official beneficiary route", "Record visibility check ke liye official PMJAY path use karein.", OFFICIAL.beneficiary.url),
    ],
    disclaimer: "Visible result na milna kai कारणों se ho sakta hai. Final answer official verification se hi milega.",
    lastReviewed: "Last reviewed: 2026-07-14. Official search flow badle to beneficiary portal ko priority dein.",
    meta: ["Troubleshooting", "Record not showing"],
  },
  "ayushman-card-hospital-list-use": {
    heroEyebrow: "Hospital route",
    lead: "Hospital list dekhna aur card use karna do connected steps hain. Pehle सही hospital verify karein, phir use journey samjhein.",
    summaryTitle: "Before you start",
    summaryBody: "Hospital search ka सबसे safe base official PMJAY hospital search hai. Wahi se check karein ki hospital listed hai, aur phir treatment ya acceptance details directly verify karein.",
    official: officialAction(OFFICIAL.hospital.label, OFFICIAL.hospital.url, "Empanelled hospital check aur package context ke liye official hospital search use karein."),
    steps: [
      step("Official hospital search kholen", "Sabse pehle listed hospital ka naam, location, ya search filter official route par dekhein."),
      step("Acceptance aur service context verify karein", "Sirf list me naam dekh lena kaafi nahi. Treatment package ya acceptance ko hospital se confirm karein."),
      step("Use guide par move karein", "Hospital milne ke baad card ka practical use samajhne ke liye next page dekhein."),
    ],
    highlights: [
      noteItem("Common galti", "Random hospital blogs ko final empanelled list samajh lena."),
      noteItem("Practical tip", "Hospital se pehle hi poochh lein ki PMJAY package ya beneficiary process kaise chalega."),
    ],
    nextSteps: [
      nextCard("ayushman-card-kaise-use-kare", "Agar hospital mil gaya hai aur अब use journey dekhni hai."),
      nextCard("ayushman-card-benefits", "Agar pehle coverage aur benefits samajhne hain."),
      nextCard("ayushman-card-status-check", "Agar beneficiary verification ya status ka issue aa raha hai."),
    ],
    trust: [
      noteItem("Official-first", "Hospital search panel ko top flow me rakha gaya hai."),
      noteItem("No overclaim", "Page hospital acceptance ka promise nahi karta."),
      noteItem("Task completion", "Search ke baad exact next use page diya gaya hai."),
    ],
    references: [
      noteItem("Official hospital search", "Empanelled hospital route ke liye official PMJAY search use hota hai.", OFFICIAL.hospital.url),
    ],
    disclaimer: "Hospital acceptance aur treatment fit ko final maan ne se pehle direct verify karein.",
    lastReviewed: "Last reviewed: 2026-07-14. Empanelled hospital list future me badal sakti hai.",
    meta: ["Guide", "Hospital verification"],
  },
  "ayushman-card-kaise-use-kare": {
    heroEyebrow: "Use journey",
    lead: "Card ka practical use tab hota hai jab beneficiary verification clear ho aur hospital PMJAY route ko accept karta ho.",
    summaryTitle: "Before you start",
    summaryBody: "Hospital visit se pehle beneficiary status, hospital acceptance, aur basic supporting details clear rakhna useful hota hai. Yeh page treatment claim promise nahi karta; yeh safe use journey samjhata hai.",
    official: officialAction(OFFICIAL.hospital.label, OFFICIAL.hospital.url, "Hospital use se pehle official hospital search ya listed route ko verify karein."),
    steps: [
      step("Hospital aur beneficiary base verify karein", "Listed hospital aur beneficiary record dono clear hone chahiye."),
      step("Visit ke time matching details saath rakhein", "Jo details verification me use hoti hain unko readily available rakhein."),
      step("Hospital-side process ko follow karein", "Package, admission, ya support process hospital aur official workflow ke hisab se samjhein."),
    ],
    highlights: [
      noteItem("Common galti", "Card hone ko automatic treatment approval maan lena."),
      noteItem("Practical tip", "Hospital par pahunchnese pehle call ya counter verification helpful ho sakta hai."),
    ],
    nextSteps: [
      nextCard("ayushman-card-hospital-list-use", "Agar pehle hospital search route par wapas jana hai."),
      nextCard("ayushman-card-benefits", "Agar scheme benefit framing dubara dekhni hai."),
      nextCard("ayushman-card-status-check", "Agar beneficiary ya access issue aa raha hai."),
    ],
    trust: [
      noteItem("Task-first", "First card me hi use journey ka practical base diya gaya hai."),
      noteItem("Official dependency", "Final action hospital aur official verification par hi depend karta hai."),
      noteItem("No vague filler", "Steps ko direct action language me rakha gaya hai."),
    ],
    references: [
      noteItem("Official hospital route", "Hospital verification ko official search context se joda gaya hai.", OFFICIAL.hospital.url),
    ],
    disclaimer: "Treatment acceptance aur package fit ko final maan ne se pehle hospital se confirm karein.",
    lastReviewed: "Last reviewed: 2026-07-14. Hospital-side workflow change ho sakta hai.",
    meta: ["Guide", "Practical use"],
  },
  "ayushman-card-validity-changes": {
    heroEyebrow: "Date-sensitive page",
    lead: "Validity, renewal, aur rule change wali baatein hamesha date ke saath samjhein. Yahan freshness top par dikhayi gayi hai.",
    summaryTitle: "Current status summary",
    summaryBody: "Ayushman Card validity ko fixed lifetime promise ya fixed expiry rule samajhna risky ho sakta hai. Jo bhi current position ho, use exact review date ke saath dekhna aur official route se verify karna zaruri hai.",
    updatedTitle: "Last reviewed",
    updatedBody: "2026-07-14 ko review kiya gaya. Agar is date ke baad official rules, renewal logic, ya beneficiary handling badle ho, to official source ko priority dein.",
    answerGroups: [
      noteItem("Validity question ka aam matlab", "User aksar poochta hai ki card kab tak chalega, dubara banana padega ya details update karni hongi."),
      noteItem("Change kahan aa sakta hai", "Renewal wording, correction process, beneficiary visibility, ya support route me badlav aa sakta hai."),
      noteItem("Safe habit", "Date-sensitive page ko bina review ke final truth na maaniye."),
    ],
    official: officialAction(OFFICIAL.beneficiary.label, OFFICIAL.beneficiary.url, "Current official position ko beneficiary route ya official support context se verify karein."),
    nextSteps: [
      nextCard("ayushman-card-correction", "Agar validity sawal ka real issue detail correction ya update se जुड़ा hai."),
      nextCard("ayushman-card-status-check", "Agar current record visibility ya status bhi dekhna hai."),
      nextCard("ayushman-card-documents-required", "Agar proof readiness ka angle samajhna hai."),
    ],
    trust: [
      noteItem("Freshness first", "Last reviewed block ko primary flow ke top me rakha gaya hai."),
      noteItem("No fake recency", "Date ko sirf real review ke saath dikhaya gaya hai."),
      noteItem("Official dependency", "Time-sensitive questions ko official verification se joda gaya hai."),
    ],
    references: [
      noteItem("Official verification route", "Validity ya current rule doubt me official beneficiary route helpful rahta hai.", OFFICIAL.beneficiary.url),
    ],
    disclaimer: "Date-sensitive page par stale advice follow karna risky ho sakta hai. Final check official source par karein.",
    lastReviewed: "Review date: 2026-07-14. Future change detect hote hi page ko dobara verify karna hoga.",
    meta: ["Update-sensitive", "Freshness near top"],
  },
  "ayushman-card-correction": {
    heroEyebrow: "Correction help",
    lead: "Correction ka kaam official route se hota hai. Pehle yeh clear karein ki issue kya hai aur kis detail ko verify karna hai.",
    summaryTitle: "Before you start",
    summaryBody: "Har correction ka same route nahi hota, par common cases me beneficiary detail, mismatch, ya update context ko samajhna padta hai. Yeh page aapko safe process flow deta hai.",
    official: officialAction(OFFICIAL.app.label, OFFICIAL.app.url, "Correction ya edit support official app ya official supported flow par hi complete hota hai."),
    steps: [
      step("Issue type note karein", "Naam, family detail, visibility, ya status se जुड़ा exact issue identify karein."),
      step("Official route par supported option dekhein", "Official app ya approved path me wahi correction support use karein jo aapke issue se match karta ho."),
      step("Verification ke baad status dobara dekhein", "Correction request ke baad status ya beneficiary record ko fresh check karna useful hota hai."),
    ],
    highlights: [
      noteItem("Common galti", "Random operator promises ya unofficial edit forms par bharosa karna."),
      noteItem("Practical tip", "Issue ka screenshot aur matching detail note karke process start karein."),
    ],
    nextSteps: [
      nextCard("ayushman-card-status-check", "Agar correction ke baad status dekhna hai."),
      nextCard("ayushman-card-validity-changes", "Agar question rule change ya validity se जुड़ा hai."),
      nextCard("ayushman-card-documents-required", "Agar proof readiness dubara dekhni hai."),
    ],
    trust: [
      noteItem("Guide-process fit", "Page ko action order aur readiness summary ke saath rebuild kiya gaya hai."),
      noteItem("Official action visible", "Main official panel primary content me rakha gaya hai."),
      noteItem("No fake edit", "Page correction perform nahi karta."),
    ],
    references: [
      noteItem("Official app path", "Correction support ko official Ayushman app context se joda gaya hai.", OFFICIAL.app.url),
    ],
    disclaimer: "Correction completion ka final control official workflow aur verification par depend karta hai.",
    lastReviewed: "Last reviewed: 2026-07-14. Correction path future me badle to official app ko priority dein.",
    meta: ["Guide", "Correction support"],
  },
};

function parentTrail(record) {
  if (!record?.parent_hub_title) return "Ayushman help";
  return displayTitleForSlug(record.parent_hub_slug) || record.parent_hub_title;
}

function uniqStrings(items) {
  return [...new Set((items || []).filter(Boolean))];
}

function routeHint(slug) {
  const cleaned = stripSlash(slug);
  const hints = {
    "ayushman-card-kya-hai": {
      fit: "Best if you want the basic scheme overview",
      action: "Open the core explainer",
      reason: "Use this page when you want the clearest explanation of the card and the PMJAY scheme.",
    },
    "pmjay-full-form": {
      fit: "Best if you only need the term explained",
      action: "Open the definition page",
      reason: "Use this page when you want the full form and quick context for PMJAY.",
    },
    "ayushman-card-benefits": {
      fit: "Best if you want to understand coverage at a high level",
      action: "Open the benefits page",
      reason: "Use this page when you want to understand the main benefits and their limits.",
    },
    "ayushman-card-disease-list-coverage": {
      fit: "Best if you need cautious coverage guidance",
      action: "Open the coverage page",
      reason: "Use this page when you need a careful explanation of treatment and package coverage.",
    },
    "ayushman-card-eligibility": {
      fit: "Best if you want a quick fit check",
      action: "Open the eligibility guide",
      reason: "Use this page when you want to understand the safest next step before an official check.",
    },
    "ayushman-card-beneficiary-list-name-check": {
      fit: "Best if you need to confirm whether a name appears in the beneficiary list",
      action: "Open the beneficiary list guide",
      reason: "Use this page when you want the safest route to check the beneficiary list.",
    },
    "ayushman-card-download": {
      fit: "Best if you need the safest download route",
      action: "Open the download guide",
      reason: "Use this page when you want to choose the right download path and official action.",
    },
    "ayushman-card-download-aadhaar-se": {
      fit: "Best if you plan to use the Aadhaar route",
      action: "Open the Aadhaar route guide",
      reason: "Use this page when you want the Aadhaar-based download path.",
    },
    "ayushman-card-download-mobile-number-se": {
      fit: "Best if you plan to use the mobile number route",
      action: "Open the mobile route guide",
      reason: "Use this page when you want the mobile-number-based download path.",
    },
    "ayushman-card-documents-required": {
      fit: "Best if you need to prepare documents first",
      action: "Open the document checklist page",
      reason: "Use this page when you want to prepare the right details before an official step.",
    },
    "ayushman-card-status-check": {
      fit: "Best if you need to identify the problem type first",
      action: "Open the troubleshooting hub",
      reason: "Use this page when you want to choose the right status-related issue path.",
    },
    "ayushman-card-pending-status": {
      fit: "Best if the status is still pending",
      action: "Open the pending status guide",
      reason: "Use this page when the official system still shows a pending status.",
    },
    "ayushman-card-rejected-status": {
      fit: "Best if the status shows rejection or mismatch",
      action: "Open the rejected status guide",
      reason: "Use this page when the official system shows a rejection or mismatch.",
    },
    "ayushman-card-not-showing": {
      fit: "Best if the record is not visible at all",
      action: "Open the not-showing guide",
      reason: "Use this page when the card or beneficiary record is not visible.",
    },
    "ayushman-card-hospital-list-use": {
      fit: "Best if you need the official hospital route",
      action: "Open the hospital guide",
      reason: "Use this page when you need to verify hospitals and understand safe next steps.",
    },
    "ayushman-card-kaise-use-kare": {
      fit: "Best if you want to understand how the card is used in practice",
      action: "Open the card use guide",
      reason: "Use this page when you want to understand the practical hospital-use flow.",
    },
    "ayushman-card-validity-changes": {
      fit: "Best if your question depends on dates or recent rule changes",
      action: "Open the update-sensitive page",
      reason: "Use this page when you need date-aware guidance about validity or changes.",
    },
    "ayushman-card-correction": {
      fit: "Best if you need an official correction path",
      action: "Open the correction guide",
      reason: "Use this page when you need to understand the safest correction workflow.",
    },
  };

  return hints[cleaned] || {
    fit: "Best if this page matches your current task",
    action: "Open this page",
    reason: "Use this page when it matches the next task you need to complete.",
  };
}

function buildNextSteps(record, limit = 3) {
  const candidateSlugs = uniqStrings([
    ...(record.related_internal_links || []).map(stripSlash),
    ...(record.next_best_page_slugs || []).map(stripSlash),
    ...(record.child_spoke_slugs || []).map(stripSlash),
    ...(record.sibling_hub_slugs || []).map(stripSlash),
  ]).filter((slug) => slug && slug !== record.slug);

  return candidateSlugs.slice(0, limit).map((slug) => {
    const hint = routeHint(slug);
    return nextCard(slug, hint.reason);
  });
}

function buildRouteCards(record) {
  const candidateSlugs = uniqStrings([
    ...(record.child_spoke_slugs || []).map(stripSlash),
    ...(record.related_internal_links || []).map(stripSlash),
    ...(record.next_best_page_slugs || []).map(stripSlash),
    ...(record.sibling_hub_slugs || []).map(stripSlash),
  ]).filter((slug) => slug && slug !== record.slug);

  return candidateSlugs.slice(0, 3).map((slug) => {
    const link = internalLink(slug);
    const hint = routeHint(slug);
    return choiceCard(link.title, hint.fit, hint.action, link.href);
  });
}

function officialNote(record, family) {
  if (!record.official_action_required) return "";
  if (family === "tool-flow") return "Final eligibility confirmation happens on the official PMJAY beneficiary system.";
  if (family === "troubleshooting") return "Use the official route to confirm the issue before acting on any fix.";
  if (family === "guide-process") return "This page explains the path, but the real action still happens on the official route.";
  if (family === "update-sensitive") return "Check the official source if the process or rule may have changed after the review date.";
  return "Use the official route for the final step whenever the page calls for it.";
}

function buildAnswerGroups(record) {
  const groups = [
    noteItem("What this page helps you with", record.search_intent_summary),
  ];

  if (record.abha_confusion_note) {
    groups.push(noteItem("Important distinction", record.abha_confusion_note));
  }

  if (record.evidence_requirements?.length) {
    groups.push(noteItem("What to verify", record.evidence_requirements[0]));
  }

  return groups;
}

function buildHighlights(record) {
  if (record.common_user_mistakes?.length) {
    return record.common_user_mistakes.slice(0, 3).map((item, index) =>
      noteItem(index === 0 ? "Common mistake" : `Common mistake ${index + 1}`, item),
    );
  }

  if (record.orientation_points?.length) {
    return record.orientation_points.slice(0, 3).map((item, index) =>
      noteItem(index === 0 ? "Keep in mind" : `Keep in mind ${index + 1}`, item),
    );
  }

  return [];
}

const STEP_OVERRIDES = {
  "ayushman-card-beneficiary-list-name-check": [
    step("Choose the search route that matches your details", "Start with the official route that matches the information you already have, such as family details or Aadhaar-linked details."),
    step("Verify the details carefully on the official screen", "Check the name, state, district, or family details before you search so that you do not create a false mismatch."),
    step("Move to the next page only after you see a result", "If the record appears, continue to the download or status path. If it does not, review eligibility or document readiness first."),
  ],
  "ayushman-card-download": [
    step("Choose the route that fits your situation", "Start with the Aadhaar route, the mobile-number route, or the document-readiness page based on what you already know."),
    step("Continue only on the official app or official route", "Avoid copied login screens, unofficial APKs, and pages that promise to download the card directly for you."),
    step("Use a follow-up page if the process does not complete", "If the route fails or you need the next step, move to the status or troubleshooting path instead of guessing."),
  ],
  "ayushman-card-download-aadhaar-se": [
    step("Confirm that the beneficiary record can be matched", "The Aadhaar route works best when the official system can already match the beneficiary details correctly."),
    step("Use the official Ayushman app", "Open the official app and follow the supported Aadhaar-based access or verification path there."),
    step("Complete the official verification before download", "If e-KYC or another official check is required, finish that step before expecting the card download to work."),
  ],
  "ayushman-card-download-mobile-number-se": [
    step("Start with the mobile number that matches the record", "The route only works when the official system can connect the mobile number to the beneficiary record."),
    step("Open the official app or supported official route", "Use the mobile-based access path on the official surface instead of relying on third-party pages."),
    step("Finish the official verification before download", "If the system asks for confirmation or matching checks, complete those steps before trying to download the card."),
  ],
  "ayushman-card-documents-required": [
    step("Prepare the basic identity and family details first", "Keep the information ready that the official route is most likely to ask for during beneficiary or download steps."),
    step("Choose the official app or portal route you actually need", "Document expectations can vary by route, so pick the exact path before assuming the checklist is final."),
    step("Confirm the final requirement on the official screen", "Treat outside lists as preparation help only, not as the last word on what the process will ask for."),
  ],
  "ayushman-card-hospital-list-use": [
    step("Start with the official hospital search", "Use the official PMJAY hospital search to confirm that the hospital is listed before you rely on it."),
    step("Verify acceptance and treatment context with the hospital", "A listed hospital may still require you to confirm package fit, availability, or acceptance at the hospital level."),
    step("Move to the card-use guide after hospital verification", "Once the hospital route is clear, continue to the practical card-use page for the next step."),
  ],
  "ayushman-card-kaise-use-kare": [
    step("Verify the beneficiary record and hospital first", "The safest starting point is a clear beneficiary record plus a hospital that accepts the PMJAY route."),
    step("Carry the details that the hospital may need", "Bring the beneficiary and supporting details that match the official route so the hospital can verify them more easily."),
    step("Follow the hospital-side process carefully", "Use the hospital's PMJAY process and confirm package or support details before assuming treatment will proceed automatically."),
  ],
  "ayushman-card-correction": [
    step("Identify the exact issue first", "Start by naming the actual problem, such as a mismatch, visibility issue, or status-related detail."),
    step("Use the supported correction path on the official surface", "Follow the official app or another supported official route that matches the issue you need to correct."),
    step("Check the status again after the correction step", "Once a correction request is submitted, return to the status or beneficiary route to confirm what changed."),
  ],
  "ayushman-card-pending-status": [
    step("Confirm the pending result on the official route", "Check the same status again on the official route before assuming the process has failed."),
    step("Look for the most likely cause", "Pending status often means more time, a mismatch, or an incomplete verification step such as e-KYC."),
    step("Choose the next official path if the issue remains", "If the pending status continues, move to the status hub or the correction path instead of starting a random new process."),
  ],
  "ayushman-card-rejected-status": [
    step("Verify the rejection details on the official route", "Start by checking the official rejection message or details instead of relying on guesswork."),
    step("Check for mismatch or verification problems", "Look for a name, family, or ID mismatch, or another verification problem that could explain the rejection."),
    step("Choose the correction or official support path", "If the cause is still unclear, move to the correction or official support route instead of trying an unrelated workaround."),
  ],
  "ayushman-card-not-showing": [
    step("Recheck the search details carefully", "Small input differences can make the record appear missing even when the issue is only a search mismatch."),
    step("Try the matching official route again", "Use the correct official portal or app path for the exact kind of search you need to perform."),
    step("Escalate to the next safe path only if the issue remains", "If the record is still not visible, move to the status or correction path instead of assuming ineligibility."),
  ],
};

const HIGHLIGHT_OVERRIDES = {
  "ayushman-card-beneficiary-list-name-check": [
    noteItem("Common mistake", "Using unofficial websites for beneficiary searches."),
    noteItem("Another common mistake", "Treating ABHA as if it were the PMJAY beneficiary list."),
  ],
  "ayushman-card-download": [
    noteItem("Keep in mind", "Download success still depends on official verification and the supported route."),
    noteItem("Avoid this mistake", "Do not trust pages that promise direct downloads without the official app or official route."),
  ],
  "ayushman-card-download-aadhaar-se": [
    noteItem("Keep in mind", "Having Aadhaar is not the same as having a beneficiary record that the official system can match."),
    noteItem("Avoid this mistake", "Do not enter sensitive details on unofficial pages or copied login screens."),
  ],
  "ayushman-card-download-mobile-number-se": [
    noteItem("Keep in mind", "The mobile route depends on a number the official system can match to the beneficiary record."),
    noteItem("Avoid this mistake", "Do not assume every mobile number route will work for every beneficiary case."),
  ],
  "ayushman-card-documents-required": [
    noteItem("Common mistake", "Treating a random blog checklist as the final official requirement."),
    noteItem("Good habit", "Use the page as a preparation guide, then confirm the final requirement on the official route."),
  ],
  "ayushman-card-hospital-list-use": [
    noteItem("Common mistake", "Assuming any hospital blog list is the same as the official empanelled list."),
    noteItem("Good habit", "Confirm treatment fit and acceptance with the hospital after you verify the official listing."),
  ],
  "ayushman-card-kaise-use-kare": [
    noteItem("Common mistake", "Treating card possession as automatic treatment approval."),
    noteItem("Good habit", "Verify hospital acceptance and the beneficiary route before you depend on the card at the hospital."),
  ],
  "ayushman-card-correction": [
    noteItem("Common mistake", "Following unsupported operator promises or unofficial edit forms."),
    noteItem("Good habit", "Write down the exact mismatch or issue before you begin the correction path."),
  ],
  "ayushman-card-pending-status": [
    noteItem("Common mistake", "Treating a pending status as if it already means rejection."),
    noteItem("Good habit", "Note the exact status and then repeat the official check before you change routes."),
  ],
  "ayushman-card-rejected-status": [
    noteItem("Common mistake", "Starting a random workaround before checking the official rejection details."),
    noteItem("Good habit", "Use the official rejection message as the basis for the next step."),
  ],
  "ayushman-card-not-showing": [
    noteItem("Common mistake", "Treating a search problem as if it automatically proves ineligibility."),
    noteItem("Good habit", "Repeat the search on the correct official route before moving to a new conclusion."),
  ],
};

function buildTrustItems(record, family) {
  const familyLabel = {
    "content-spoke": "Focused answer",
    "guide-process": "Step-by-step guidance",
    "troubleshooting": "Issue-first layout",
    "tool-flow": "Guided pre-check",
    "update-sensitive": "Freshness-first layout",
  }[family] || "Focused guidance";

  return [
    noteItem(familyLabel, "The first screen is designed to answer the main question before sending the user anywhere else."),
    noteItem("Official boundary", record.trust_disclaimer || "This page explains the process but does not perform the official action."),
    noteItem("Next-step clarity", "Every route and next-step link explains why that page is useful."),
  ];
}

function buildReferences(record) {
  const references = [];
  if (record.official_action_required && record.official_route_label && record.official_route_url) {
    references.push(noteItem(record.official_route_label, "Use this official route when you need the final, real-world action or verification.", record.official_route_url));
  }

  for (const item of record.evidence_requirements || []) {
    references.push(noteItem("Support note", item));
  }

  return references.slice(0, 3);
}

function buildLastReviewed(record) {
  if (!record.last_updated_required) return "";
  if (record.effective_date_text) return record.effective_date_text;
  return `Last reviewed: ${today}. Recheck the official source if the process changes after this date.`;
}

function heroEyebrow(family) {
  return {
    "content-spoke": "Focused answer",
    "guide-process": "Step-by-step guide",
    "troubleshooting": "Troubleshooting help",
    "tool-flow": "Guided pre-check",
    "update-sensitive": "Date-sensitive guidance",
  }[family] || "Ayushman help";
}

function buildPageContent(record, family, spec) {
  const official = record.official_action_required
    ? officialAction(record.official_route_label, record.official_route_url, officialNote(record, family))
    : null;

  const base = {
    heroEyebrow: heroEyebrow(family),
    lead: record.search_intent_summary,
    summaryTitle: family === "content-spoke" ? "Direct answer" : family === "troubleshooting" ? "Start here" : family === "update-sensitive" ? "Current status summary" : "Before you start",
    summaryBody: record.direct_answer_summary,
    meta: uniqStrings([
      record.primary_intent,
      family === "tool-flow" ? "Tool-first" : "",
      family === "troubleshooting" ? "Likely fixes first" : "",
      family === "update-sensitive" ? "Date-aware" : "",
    ]),
    official,
    nextSteps: buildNextSteps(record),
    trust: buildTrustItems(record, family),
    references: buildReferences(record),
    disclaimer: record.trust_disclaimer || "Use the official source for the final action or final confirmation.",
    lastReviewed: buildLastReviewed(record),
  };

  if (family === "content-spoke") {
    return {
      ...base,
      answerGroups: buildAnswerGroups(record),
    };
  }

  if (family === "guide-process") {
    return {
      ...base,
      routeCards: buildRouteCards(record),
      steps: STEP_OVERRIDES[record.slug] || (record.step_sequence || []).map((item, index) => step(index === 0 ? "Check the starting point" : index === 1 ? "Use the official route" : "Continue with the next safe step", item)),
      highlights: HIGHLIGHT_OVERRIDES[record.slug] || buildHighlights(record),
    };
  }

  if (family === "troubleshooting") {
    return {
      ...base,
      routeCards: buildRouteCards(record),
      fixes: STEP_OVERRIDES[record.slug] || (record.step_sequence || []).map((item, index) => step(index === 0 ? "Confirm the issue on the official route" : index === 1 ? "Check the likely cause" : "Choose the next safe step", item)),
      highlights: HIGHLIGHT_OVERRIDES[record.slug] || buildHighlights(record),
    };
  }

  if (family === "update-sensitive") {
    return {
      ...base,
      answerGroups: buildAnswerGroups(record),
      updatedTitle: "Last reviewed",
      updatedBody: record.effective_date_text || `Reviewed on ${today}. Recheck the official source if anything changes after this date.`,
    };
  }

  if (family === "tool-flow") {
    return {
      ...base,
      summaryTitle: "Understand the next step first",
      routeCards: buildRouteCards(record),
      toolIntro: "Use these simple choices to understand the safest next step.",
      toolFields: [
        {
          id: "family-record",
          label: "What do you know right now?",
          type: "select",
          options: [
            "I do not know whether my name is in the beneficiary list",
            "I think my name may be there, but I need to confirm it",
            "My name is already visible, and I need the next official step",
          ],
        },
        {
          id: "proof-ready",
          label: "Are your basic details ready?",
          type: "select",
          options: [
            "Yes, I have basic family or ID details ready",
            "Some details may still be missing",
            "I only want to understand the route first",
          ],
        },
      ],
      feedbackMap: {
        "I do not know whether my name is in the beneficiary list": "Start with the beneficiary list guide. That is the safest first step before assuming eligibility.",
        "I think my name may be there, but I need to confirm it": "Use the official beneficiary portal to confirm the record before moving to download or status steps.",
        "My name is already visible, and I need the next official step": "You can move to the download or status path next, but keep the official verification result as your base.",
      },
    };
  }

  return base;
}

function heroMeta(record, content) {
  const items = uniqStrings(content.meta || []);
  return items
    .map((item) => `<span class="chip">${escapeHtml(item)}</span>`)
    .join("");
}

function renderOfficialAction(fromSlug, action) {
  if (!action) return "";
  return `
    <article class="official-action-panel" data-qa="official-action-panel">
      <p class="section-label">Official next step</p>
      <h2 class="card-title">${escapeHtml(action.label)}</h2>
      <p class="note">${escapeHtml(action.note)}</p>
      <div class="cluster">
        <a class="button" href="${escapeHtml(action.url)}" target="_blank" rel="nofollow noopener" data-track="official-action">Open ${escapeHtml(action.label)}</a>
      </div>
    </article>
  `;
}

function renderDecisionRoutes(fromSlug, cards, label = "Route choices") {
  if (!cards?.length) return "";
  return `
    <article class="card stack-lg">
      <p class="section-label">${escapeHtml(label)}</p>
      <div class="component-grid decision-route-grid">
        ${cards
          .map((card) => `
            <a class="component-card decision-route-card" href="${escapeHtml(relHref(fromSlug, card.href))}" data-track="decision-route">
              <p class="route-fit">${escapeHtml(card.fit)}</p>
              <h3 class="component-title">${escapeHtml(card.title)}</h3>
              <p class="component-copy">${escapeHtml(card.action)}</p>
              <span class="route-action">Open this route</span>
            </a>
          `)
          .join("")}
      </div>
    </article>
  `;
}

function renderAnswerGroups(groups) {
  if (!groups?.length) return "";
  return `
    <article class="card stack-lg">
      <p class="section-label">Key points</p>
      <div class="reference-list">
        ${groups
          .map((item) => `
            <div class="reference-item">
              <h3 class="ref-title">${escapeHtml(item.title)}</h3>
              <p class="ref-copy">${escapeHtml(item.body)}</p>
            </div>
          `)
          .join("")}
      </div>
    </article>
  `;
}

function renderSteps(label, steps) {
  if (!steps?.length) return "";
  return `
    <article class="card stack-lg">
      <p class="section-label">${escapeHtml(label)}</p>
      <ul class="faq-list">
        ${steps
          .map((item, index) => `
            <li class="faq-item">
              <h3 class="faq-q">Step ${index + 1}. ${escapeHtml(item.title)}</h3>
              <p class="faq-a">${escapeHtml(item.body)}</p>
            </li>
          `)
          .join("")}
      </ul>
    </article>
  `;
}

function renderNextSteps(fromSlug, steps) {
  if (!steps?.length) return "";
  return `
    <article class="card stack-lg">
      <p class="section-label">Next best step</p>
      <ul class="link-list">
        ${steps
          .map((item, index) => `
            <li class="link-item">
              <div class="thumb">${String(index + 1).padStart(2, "0")}</div>
              <div class="link-copy">
                <h3 class="link-title"><a href="${escapeHtml(relHref(fromSlug, item.href))}" data-track="next-step">${escapeHtml(item.title)}</a></h3>
                <p>${escapeHtml(item.reason)}</p>
              </div>
            </li>
          `)
          .join("")}
      </ul>
    </article>
  `;
}

function renderHighlights(items, label = "Keep in mind") {
  if (!items?.length) return "";
  return `
    <article class="card stack-lg">
      <p class="section-label">${escapeHtml(label)}</p>
      <div class="reference-list">
        ${items
          .map((item) => `
            <div class="reference-item">
              <h3 class="ref-title">${escapeHtml(item.title)}</h3>
              <p class="ref-copy">${escapeHtml(item.body)}</p>
            </div>
          `)
          .join("")}
      </div>
    </article>
  `;
}

function renderTrust(spec) {
  return `
    <article class="card stack-lg">
      <div class="trust-strip">
        <p class="section-label">Trust notes</p>
        <div class="trust-grid">
          ${(spec.trust || [])
            .map((item) => `
              <div class="trust-item">
                <strong>${escapeHtml(item.title)}</strong>
                <span>${escapeHtml(item.body)}</span>
              </div>
            `)
            .join("")}
        </div>
      </div>
    </article>
  `;
}

function renderReferences(spec) {
  return `
    <article class="card stack-lg">
      <p class="section-label">Official support</p>
      <div class="reference-list">
        ${(spec.references || [])
          .map((item) => `
            <div class="reference-item">
              <h3 class="ref-title">${escapeHtml(item.title)}</h3>
              <p class="ref-copy">
                ${escapeHtml(item.body)}
                ${item.href ? ` <a class="ref-link" href="${escapeHtml(item.href)}" target="_blank" rel="nofollow noopener">Official link</a>` : ""}
              </p>
            </div>
          `)
          .join("")}
      </div>
    </article>
  `;
}

function renderDisclaimer(spec) {
  if (!spec.disclaimer) return "";
  return `
    <article class="card stack-md">
      <div class="disclaimer-block">
        <p class="section-label">Important note</p>
        <p class="note">${escapeHtml(spec.disclaimer)}</p>
      </div>
    </article>
  `;
}

function renderLastReviewed(spec) {
  if (!spec.lastReviewed) return "";
  return `
    <article class="card stack-md">
      <div class="updated-block" data-qa="last-reviewed">
        <span class="doc-status">Last reviewed</span>
        <p class="note">${escapeHtml(spec.lastReviewed)}</p>
      </div>
    </article>
  `;
}

function renderSupport(spec) {
  return `
    <aside class="support">
      ${renderTrust(spec)}
      ${renderReferences(spec)}
      ${spec.lastReviewed ? renderLastReviewed(spec) : ""}
      ${renderDisclaimer(spec)}
    </aside>
  `;
}

function renderContentSpoke(record, content) {
  return `
    <section class="primary">
      <article class="card stack-lg">
        <h2 class="card-title">${escapeHtml(content.summaryTitle)}</h2>
        <p>${escapeHtml(content.summaryBody)}</p>
      </article>
      ${renderAnswerGroups(content.answerGroups)}
      ${renderOfficialAction(record.slug, content.official)}
      ${renderNextSteps(record.slug, content.nextSteps)}
    </section>
  `;
}

function renderGuideProcess(record, content) {
  const routeChoices = content.routeCards?.length
    ? `
        <div class="stack-md">
          <p class="section-label">Fast route choices</p>
          <div class="component-grid decision-route-grid">
            ${content.routeCards
              .map((card) => `
                <a class="component-card decision-route-card" href="${escapeHtml(relHref(record.slug, card.href))}" data-track="decision-route">
                  <p class="route-fit">${escapeHtml(card.fit)}</p>
                  <h3 class="component-title">${escapeHtml(card.title)}</h3>
                  <p class="component-copy">${escapeHtml(card.action)}</p>
                  <span class="route-action">Open this route</span>
                </a>
              `)
              .join("")}
          </div>
        </div>
      `
    : "";

  return `
    <section class="primary">
      <article class="card stack-lg">
        <h2 class="card-title">${escapeHtml(content.summaryTitle)}</h2>
        <p>${escapeHtml(content.summaryBody)}</p>
        ${routeChoices}
      </article>
      ${renderOfficialAction(record.slug, content.official)}
      ${renderSteps("Step-by-step flow", content.steps)}
      ${renderHighlights(content.highlights)}
      ${renderNextSteps(record.slug, content.nextSteps)}
    </section>
  `;
}

function renderTroubleshooting(record, content) {
  const issueChooser = content.routeCards?.length
    ? `
        <div class="stack-md">
          <p class="section-label">Choose the issue that fits best</p>
          <div class="component-grid decision-route-grid">
            ${content.routeCards
              .map((card) => `
                <a class="component-card decision-route-card" href="${escapeHtml(relHref(record.slug, card.href))}" data-track="decision-route">
                  <p class="route-fit">${escapeHtml(card.fit)}</p>
                  <h3 class="component-title">${escapeHtml(card.title)}</h3>
                  <p class="component-copy">${escapeHtml(card.action)}</p>
                  <span class="route-action">Open this route</span>
                </a>
              `)
              .join("")}
          </div>
        </div>
      `
    : "";

  return `
    <section class="primary">
      <article class="card stack-lg">
        <h2 class="card-title">${escapeHtml(content.summaryTitle)}</h2>
        <p>${escapeHtml(content.summaryBody)}</p>
        ${issueChooser}
      </article>
      ${renderOfficialAction(record.slug, content.official)}
      ${renderSteps("Likely fixes", content.fixes)}
      ${renderHighlights(content.highlights, "Avoid these mistakes")}
      ${renderNextSteps(record.slug, content.nextSteps)}
    </section>
  `;
}

function renderUpdateSensitive(record, content) {
  return `
    <section class="primary">
      <article class="card stack-lg">
        <h2 class="card-title">${escapeHtml(content.summaryTitle)}</h2>
        <p>${escapeHtml(content.summaryBody)}</p>
      </article>
      <article class="card stack-md">
        <div class="updated-block" data-qa="last-reviewed">
          <span class="doc-status">${escapeHtml(content.updatedTitle)}</span>
          <p class="note">${escapeHtml(content.updatedBody)}</p>
        </div>
      </article>
      ${renderAnswerGroups(content.answerGroups)}
      ${renderOfficialAction(record.slug, content.official)}
      ${renderNextSteps(record.slug, content.nextSteps)}
    </section>
  `;
}

function renderToolFlow(record, content) {
  const fieldHtml = (content.toolFields || [])
    .map(
      (field) => `
        <div class="field">
          <label for="${escapeHtml(field.id)}">${escapeHtml(field.label)}</label>
          <select id="${escapeHtml(field.id)}" class="input">
            ${field.options.map((option) => `<option>${escapeHtml(option)}</option>`).join("")}
          </select>
        </div>
      `,
    )
    .join("");

  return `
    <section class="primary" aria-label="Eligibility pre-check">
      <article class="card stack-lg official-action-panel" data-qa="official-action-panel">
        <h2 class="card-title">${escapeHtml(content.summaryTitle)}</h2>
        <p>${escapeHtml(content.summaryBody)}</p>
        <p class="section-label">Guided pre-check</p>
        <p class="note">${escapeHtml(content.toolIntro)}</p>
        <div class="field-shell">
          ${fieldHtml}
        </div>
        <div class="button-block">
          <a class="button" href="${escapeHtml(content.official.url)}" target="_blank" rel="nofollow noopener" data-track="official-action">Open ${escapeHtml(content.official.label)}</a>
          <p class="button-meta">${escapeHtml(content.official.note)}</p>
          <div class="feedback" id="eligibility-feedback">The safest first step is to confirm the beneficiary record on the official route.</div>
        </div>
      </article>
      ${renderDecisionRoutes(record.slug, content.routeCards, "Useful next routes")}
      ${renderNextSteps(record.slug, content.nextSteps)}
    </section>
  `;
}

function renderPrimary(record, content) {
  const family = TEMPLATE_FAMILIES[record.slug];
  if (family === "content-spoke") return renderContentSpoke(record, content);
  if (family === "guide-process") return renderGuideProcess(record, content);
  if (family === "troubleshooting") return renderTroubleshooting(record, content);
  if (family === "update-sensitive") return renderUpdateSensitive(record, content);
  if (family === "tool-flow") return renderToolFlow(record, content);
  throw new Error(`Unsupported family for ${record.slug}`);
}

function renderPage(record) {
  const family = TEMPLATE_FAMILIES[record.slug];
  const content = buildPageContent(record, family, PAGE_SPECS[record.slug]);
  const canonicalUrl = `${websiteUrl}${routeForSlug(record.slug)}`;
  const displayTitle = displayTitleForSlug(record.slug);
  const breadcrumb = `Home / ${parentTrail(record)} / ${displayTitle}`;
  const script = family === "tool-flow"
    ? `
  <script>
    const familyField = document.querySelector("#family-record");
    const feedback = document.querySelector("#eligibility-feedback");
    const lookup = ${JSON.stringify(content.feedbackMap)};
    familyField?.addEventListener("change", () => {
      const message = lookup[familyField.value] || "Start with the official beneficiary check before choosing the next route.";
      feedback.textContent = message;
    });
  </script>`
    : "";

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(displayTitle)} | MeraLabh</title>
  <meta name="description" content="${escapeHtml(content.summaryBody)}" />
  <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />
  <link rel="stylesheet" href="${escapeHtml(assetHref(record.slug, "tokens.css"))}" />
  <link rel="stylesheet" href="${escapeHtml(assetHref(record.slug, "base.css"))}" />
  <link rel="stylesheet" href="${escapeHtml(assetHref(record.slug, "components.css"))}" />
  <script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": record.schema_type || "Article",
    headline: displayTitle,
    description: content.summaryBody,
    url: canonicalUrl,
    inLanguage: "en-IN",
    about: record.target_query,
    isPartOf: websiteUrl,
  })}</script>
</head>
<body data-template-family="${escapeHtml(family)}">
  <div class="page"><div class="shell">
    <header class="topbar">
      <a class="brand" href="${escapeHtml(relHref(record.slug, "/"))}">
        <div class="logo">ML</div>
        <div class="brand-copy">
          <p class="kicker">MeraLabh</p>
          <p class="brand-title">Ayushman help</p>
        </div>
      </a>
      <nav class="utility-links">
        <a class="chip" href="${escapeHtml(relHref(record.slug, "/"))}">All routes</a>
      </nav>
    </header>
    <main class="hero" data-qa="hero">
      <div class="hero-copy">
        <nav class="breadcrumbs">${escapeHtml(breadcrumb)}</nav>
        <p class="eyebrow">${escapeHtml(content.heroEyebrow)}</p>
        <h1 class="hero-title">${escapeHtml(displayTitle)}</h1>
        <div class="lead"><p>${escapeHtml(content.lead)}</p></div>
        <div class="meta-pills">${heroMeta(record, content)}</div>
      </div>
    </main>
    <div class="layout">
      ${renderPrimary(record, content)}
      ${renderSupport(content)}
    </div>
    <footer class="page-footer">
      <p>MeraLabh is a guidance site. The final official action always happens on the official source.</p>
    </footer>
  </div></div>${script}
</body>
</html>`;
}

function renderIndex() {
  const groups = [
    {
      title: "Start with the basics",
      copy: "Use these pages when you want to understand the scheme, PMJAY, or the main benefits first.",
      cards: [
        nextCard("ayushman-card-kya-hai", routeHint("ayushman-card-kya-hai").reason),
        nextCard("pmjay-full-form", routeHint("pmjay-full-form").reason),
        nextCard("ayushman-card-benefits", routeHint("ayushman-card-benefits").reason),
      ],
    },
    {
      title: "Eligibility and beneficiary checks",
      copy: "Use these pages when you need to understand eligibility or confirm whether a beneficiary record exists.",
      cards: [
        nextCard("ayushman-card-eligibility", routeHint("ayushman-card-eligibility").reason),
        nextCard("ayushman-card-beneficiary-list-name-check", routeHint("ayushman-card-beneficiary-list-name-check").reason),
      ],
    },
    {
      title: "Download and access",
      copy: "Use these pages when you need the safest download route, document readiness, or access help.",
      cards: [
        nextCard("ayushman-card-download", routeHint("ayushman-card-download").reason),
        nextCard("ayushman-card-download-aadhaar-se", routeHint("ayushman-card-download-aadhaar-se").reason),
        nextCard("ayushman-card-download-mobile-number-se", routeHint("ayushman-card-download-mobile-number-se").reason),
        nextCard("ayushman-card-documents-required", routeHint("ayushman-card-documents-required").reason),
      ],
    },
    {
      title: "Status and problem solving",
      copy: "Use these pages when you need to identify a status issue and move to the safest fix path.",
      cards: [
        nextCard("ayushman-card-status-check", routeHint("ayushman-card-status-check").reason),
        nextCard("ayushman-card-pending-status", routeHint("ayushman-card-pending-status").reason),
        nextCard("ayushman-card-rejected-status", routeHint("ayushman-card-rejected-status").reason),
        nextCard("ayushman-card-not-showing", routeHint("ayushman-card-not-showing").reason),
      ],
    },
    {
      title: "Hospitals and card use",
      copy: "Use these pages when you need hospital verification, cautious coverage guidance, or practical card-use help.",
      cards: [
        nextCard("ayushman-card-disease-list-coverage", routeHint("ayushman-card-disease-list-coverage").reason),
        nextCard("ayushman-card-hospital-list-use", routeHint("ayushman-card-hospital-list-use").reason),
        nextCard("ayushman-card-kaise-use-kare", routeHint("ayushman-card-kaise-use-kare").reason),
      ],
    },
    {
      title: "Validity and corrections",
      copy: "Use these pages when your question depends on changing rules, review dates, or correction support.",
      cards: [
        nextCard("ayushman-card-validity-changes", routeHint("ayushman-card-validity-changes").reason),
        nextCard("ayushman-card-correction", routeHint("ayushman-card-correction").reason),
      ],
    },
  ];

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Ayushman Help Hub | MeraLabh</title>
  <meta name="description" content="Find the right Ayushman Card, PMJAY, eligibility, download, status, hospital, and correction help page quickly." />
  <link rel="stylesheet" href="styles/tokens.css" />
  <link rel="stylesheet" href="styles/base.css" />
  <link rel="stylesheet" href="styles/components.css" />
</head>
<body data-template-family="hub-page">
  <div class="page"><div class="shell">
    <header class="topbar">
      <a class="brand" href="./index.html">
        <div class="logo">ML</div>
        <div class="brand-copy">
          <p class="kicker">MeraLabh</p>
          <p class="brand-title">Ayushman help hub</p>
        </div>
      </a>
      <nav class="utility-links">
        <span class="chip">18 refactored pages</span>
      </nav>
    </header>
    <main class="hero" data-qa="hero">
      <div class="hero-copy">
        <nav class="breadcrumbs">Home / Ayushman help hub</nav>
        <p class="eyebrow">Task-based routing</p>
        <h1 class="hero-title">Find the right Ayushman help fast</h1>
        <div class="lead"><p>Use this hub when you want to understand the scheme, choose the right official route, solve a status issue, or move to the next safe step without guessing.</p></div>
        <div class="meta-pills">
          <span class="chip">Grouped by task</span>
          <span class="chip">No flat card dump</span>
          <span class="chip">English-first</span>
        </div>
      </div>
    </main>
    <div class="layout">
      <section class="primary">
        <article class="card stack-lg">
          <h2 class="card-title">Start here</h2>
          <p>Each group is built around a different user task. Start by identifying what you need right now, then open the page that matches that task instead of scanning every route.</p>
        </article>
        ${groups
          .map(
            (group) => `
              <article class="card stack-lg">
                <p class="section-label">${escapeHtml(group.title)}</p>
                <p class="note">${escapeHtml(group.copy)}</p>
                <div class="component-grid decision-route-grid">
                  ${group.cards
                    .map(
                      (card) => `
                        <a class="component-card decision-route-card" href="${escapeHtml(card.href.slice(1))}" data-track="decision-route">
                          <p class="route-fit">${escapeHtml(group.title)}</p>
                          <h3 class="component-title">${escapeHtml(card.title)}</h3>
                          <p class="component-copy">${escapeHtml(card.reason)}</p>
                          <span class="route-action">Open this page</span>
                        </a>
                      `,
                    )
                    .join("")}
                </div>
              </article>
            `,
          )
          .join("")}
      </section>
      <aside class="support">
        <article class="card stack-lg">
          <div class="trust-strip">
            <p class="section-label">Trust notes</p>
            <div class="trust-grid">
              <div class="trust-item"><strong>Task-first routing</strong><span>The hub groups pages by real user tasks instead of showing a flat list of routes.</span></div>
              <div class="trust-item"><strong>Official actions stay visible</strong><span>Pages that require an official next step show that action in the main flow, not buried in the side rail.</span></div>
              <div class="trust-item"><strong>No dead ends</strong><span>Every route points to a useful next step with a clear reason to click.</span></div>
            </div>
          </div>
        </article>
        <article class="card stack-lg">
          <p class="section-label">Official support</p>
          <div class="reference-list">
            <div class="reference-item"><h3 class="ref-title">Beneficiary and status</h3><p class="ref-copy">Use the official beneficiary route for list checks, status checks, and real beneficiary verification. <a class="ref-link" href="${OFFICIAL.beneficiary.url}" target="_blank" rel="nofollow noopener">Official link</a></p></div>
            <div class="reference-item"><h3 class="ref-title">Download and app</h3><p class="ref-copy">Use the official Ayushman app for supported app-based download and access steps. <a class="ref-link" href="${OFFICIAL.app.url}" target="_blank" rel="nofollow noopener">Official link</a></p></div>
          </div>
        </article>
        <article class="card stack-md">
          <div class="disclaimer-block">
            <p class="section-label">Important note</p>
            <p class="note">MeraLabh is a guide site. Official processing and live record changes do not happen here.</p>
          </div>
        </article>
      </aside>
    </div>
  </div></div>
</body>
</html>`;
}

function buildRefactorMap() {
  const rolloutGroups = {
    first: [
      "index",
      "ayushman-card-eligibility",
      "ayushman-card-status-check",
      "ayushman-card-download",
      "ayushman-card-beneficiary-list-name-check",
    ],
    second: [
      "ayushman-card-pending-status",
      "ayushman-card-rejected-status",
      "ayushman-card-not-showing",
      "ayushman-card-download-aadhaar-se",
      "ayushman-card-download-mobile-number-se",
      "ayushman-card-correction",
      "ayushman-card-hospital-list-use",
      "ayushman-card-documents-required",
      "ayushman-card-kaise-use-kare",
    ],
    final: [
      "ayushman-card-kya-hai",
      "pmjay-full-form",
      "ayushman-card-benefits",
      "ayushman-card-disease-list-coverage",
      "ayushman-card-validity-changes",
    ],
  };

  const rows = Object.keys(PAGE_AUDIT)
    .map((slug) => {
      const audit = PAGE_AUDIT[slug];
      const family = TEMPLATE_FAMILIES[slug];
      const title = slug === "index" ? "Hub index" : bySlug.get(slug)?.page_title || slug;
      return `| ${title} | ${family} | ${audit.intent} | ${audit.serpFit} | ${audit.decision} | ${audit.officialSource} |`;
    })
    .join("\n");

  const rolloutText = Object.entries(rolloutGroups)
    .map(([label, slugs]) => {
      const heading = label === "first" ? "First rollout" : label === "second" ? "Second rollout" : "Final rollout";
      return `## ${heading}\n${slugs
        .map((slug) => `- ${slug === "index" ? "index.html" : bySlug.get(slug)?.page_title || slug}`)
        .join("\n")}`;
    })
    .join("\n\n");

  return `# Site Output Refactor Map

## Scope
- Working folder: \`${root}\`
- Date: \`${today}\`
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
- Har page par ek hi primary \`Agla sahi kadam\` section rakhna.
- Official action ko support rail se utha kar primary content me lana.
- QA rules ke liye machine-checkable markers add karna.

## Page Ledger
| Page | Family | One-line intent | SERP fit | Decision | Official source |
| --- | --- | --- | --- | --- | --- |
${rows}

${rolloutText}

## Notes
- Existing 18-page scope ko retain kiya gaya, kyunki current content set me har page ka user intent alag hai.
- \`ayushman-card-eligibility\` ko tool-flow family me move kiya gaya.
- \`ayushman-card-status-check\` ko troubleshooting hub banaya gaya.
- \`ayushman-card-download\`, \`ayushman-card-beneficiary-list-name-check\`, \`ayushman-card-hospital-list-use\`, aur \`ayushman-card-correction\` ko guide-process structure me rebuild kiya gaya.
- \`ayushman-card-kya-hai\` aur \`ayushman-card-benefits\` ko hub se content-spoke me convert kiya gaya.
`;
}

function buildBaselineNote(previousIndexHtml) {
  const templateMismatches = Object.entries(TEMPLATE_FAMILIES)
    .filter(([slug, family]) => slug !== "index" && bySlug.get(slug)?.template_name?.replace(".html", "") !== family)
    .map(([slug, family]) => `- ${bySlug.get(slug)?.page_title || slug}: old "${bySlug.get(slug)?.template_name}" -> new "${family}"`)
    .join("\n");

  return `# Metrics Baseline And Audit Note

## Capture Time
- Date: \`${today}\`
- Source state: initial manual audit captured before refactor rebuild
- Note: exact old HTML archive preserve nahi ki gayi thi, isliye niche baseline me wahi facts rakhe gaye hain jo initial audit me clearly confirm hue the.

## Qualitative Baseline
- Previous index flat card count: \`18\`
- Official-action pages previously relied on support-side official notes rather than a strong primary official-action panel.
- Hero, body, trust, aur footer me repeated helper copy mil rahi thi.

## Repeated Pattern Audit
- Flat route-card dump index page par tha, grouped task routing nahi thi.
- "page kholkar agla useful step samjhein." jaisa filler repeated route copy me use ho raha tha.
- "Open next page", "Next journey", aur generic "Related pages" type sections multiple page families me aa rahe the.
- Official route visibility support rail me zyada buried thi.

## Template Mismatches Found
${templateMismatches}

## First-Rollout Baseline Note
- \`index.html\`: flat inventory style tha, grouped task routing nahi tha.
- \`ayushman-card-eligibility\`: tool-flow ke badle hub structure use ho raha tha.
- \`ayushman-card-status-check\`: troubleshooting-first ke badle hub-like routing tha.
- \`ayushman-card-download\`: readiness summary aur official action top par prominent nahi tha.
- \`ayushman-card-beneficiary-list-name-check\`: guide-process ke badle content-spoke jaisa structure tha.

## Live Metrics Availability
- Workspace me CTR, impressions, click-through, aur indexation ka live analytics export nahi mila.
- Isliye yahan structural baseline record ki gayi hai.
- Future production review ke liye recommended tracked signals:
  - primary official-action click
  - next-step click
  - visible route group usage
  - indexed page count
  - CTR and impressions from live tooling
`;
}

function writeStyles() {
  copyFile(path.join(libraryRoot, "styles/tokens.css"), path.join(stylesRoot, "tokens.css"));
  copyFile(path.join(libraryRoot, "styles/base.css"), path.join(stylesRoot, "base.css"));
  copyFile(path.join(libraryRoot, "styles/components.css"), path.join(stylesRoot, "components.css"));
}

function main() {
  const previousIndexHtml = fs.existsSync(path.join(root, "index.html")) ? fs.readFileSync(path.join(root, "index.html"), "utf8") : "";
  writeFile(path.join(root, "refactor-map.md"), buildRefactorMap());
  writeFile(path.join(root, "metrics-baseline.md"), buildBaselineNote(previousIndexHtml));
  writeStyles();

  for (const record of records) {
    if (!PAGE_SPECS[record.slug]) continue;
    writeFile(path.join(root, record.slug, "index.html"), renderPage(record));
  }

  writeFile(path.join(root, "index.html"), renderIndex());
}

main();
