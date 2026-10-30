// Toate textele în limba română. Structura trebuie să fie identică cu `en.ts`
// (tipul `Dictionary` o verifică la compilare).
//
// Reguli: fără testimoniale, logo-uri de clienți, studii de caz sau statistici
// inventate și fără promisiuni de rezultate concrete.

import type { Dictionary } from "./en";

export const ro: Dictionary = {
  meta: {
    ogLocale: "ro_RO",
    home: {
      title: "Closr Agency: sisteme AI care scad costurile și cresc vânzările",
      description:
        "Closr Agency proiectează, construiește și administrează agenți AI și automatizări pentru afaceri mici și mijlocii: răspund fiecărui lead, fac programări, trimit follow-up și preiau munca repetitivă a echipei.",
    },
  },

  common: {
    skipToContent: "Sari la conținut",
    opensInNewTab: "(deschide Instagram într-o filă nouă)",
    language: {
      label: "Limbă",
      en: "EN",
      ro: "RO",
      enName: "English",
      roName: "Română",
    },
  },

  nav: {
    label: "Principal",
    services: "Servicii",
    process: "Cum lucrăm",
    faq: "Întrebări",
    cta: "Audit gratuit",
    openMenu: "Deschide meniul",
    closeMenu: "Închide meniul",
  },

  hero: {
    eyebrow: "Agenție de automatizare cu AI",
    title: [
      { text: "Sisteme AI care " },
      { text: "îți scad costurile", glow: true },
      { text: " și " },
      { text: "îți cresc vânzările.", glow: true },
    ],
    subtitle:
      "Proiectăm, construim și administrăm agenți AI și automatizări pentru afacerea ta. Răspund fiecărui lead, fac programări, trimit follow-up și preiau munca repetitivă a echipei, iar tu păstrezi controlul.",
    primaryCta: "Audit gratuit de {minutes} de minute",
    secondaryCta: "Vezi ce construim",
    ctaNote: "Prin DM pe Instagram. Fără formulare, fără obligații.",
  },

  flow: {
    label: "Exemplu de automatizare: o clinică dentară răspunde unui lead nou, face o programare și actualizează CRM-ul",
    title: "Automatizare în lucru",
    example: "Exemplu: clinică dentară",
    running: "În lucru",
    completed: "Finalizată",
    working: "lucrează…",
    steps: [
      { title: "Lead nou pe WhatsApp", detail: "„Bună, cât costă o consultație?”" },
      { title: "Agentul AI răspunde și califică", detail: "Trimite prețurile, întreabă ce îi trebuie" },
      { title: "Programare făcută", detail: "Marți, 10:30, adăugată în Google Calendar" },
      { title: "CRM actualizat", detail: "Lead salvat în pipeline, echipa e anunțată" },
      { title: "Reminder programat", detail: "Mesaj pe WhatsApp cu o zi înainte" },
    ],
    result: "Rezolvat cap-coadă, fără muncă manuală",
  },

  problem: {
    eyebrow: "Problema",
    title: "Afacerea ta pierde timp și bani acolo unde nu te uiți.",
    subtitle:
      "Majoritatea afacerilor mici nu pierd bani dintr-o greșeală mare. Îi pierd zilnic, în golurile mici dintre oameni, mesaje și aplicații.",
    items: [
      {
        title: "Munca repetitivă mănâncă ziua echipei",
        body: "Date copiate dintr-o aplicație în alta, aceleași răspunsuri scrise iar și iar, oferte trimise de mână, facturi urmărite. Ore plătite care nu fac afacerea să crească.",
      },
      {
        title: "Lead-urile așteaptă și se răcesc",
        body: "Mesajele și apelurile care vin seara, în weekend sau în orele aglomerate primesc răspuns târziu sau deloc, iar clientul cumpără de la altcineva.",
      },
      {
        title: "Aplicațiile tale nu comunică între ele",
        body: "WhatsApp, emailul, CRM-ul și facturarea stau în locuri separate, așa că detaliile se pierd pe drum și cineva trebuie să le lege manual.",
      },
    ],
  },

  outcomes: {
    eyebrow: "Ce se schimbă",
    title: "Tot ce construim țintește două rezultate.",
    subtitle: "Costuri mai mici și vânzări mai mari. Dacă o automatizare nu servește niciunul dintre ele, nu o construim.",
    costs: {
      title: "Costuri mai mici",
      items: [
        "Sarcinile repetitive merg singure: introducere de date, oferte, facturi, emailuri",
        "Întrebările frecvente primesc răspuns 24/7, fără angajări în plus",
        "Mai puține predări manuale și mai puțin copy-paste între aplicații",
        "Un raport lunar care arată ce s-a făcut automat",
      ],
    },
    sales: {
      title: "Vânzări mai mari",
      items: [
        "Fiecare lead primește răspuns, zi și noapte",
        "Follow-up automat, ca niciun lead să nu se răcească",
        "Mai multe programări și apeluri stabilite",
        "Clienți vechi reactivați, mai multe recenzii pe Google",
      ],
    },
  },

  services: {
    eyebrow: "Servicii",
    title: "Sisteme AI construite după cum funcționează afacerea ta.",
    subtitle: "Pornim de la ce se întâmplă cu clientul tău, apoi alegem tehnologia. Patru sisteme acoperă majoritatea afacerilor.",
    core: [
      {
        title: "Agenți AI de vânzări",
        body: "Califică lead-urile, trimit singuri follow-up, recuperează coșurile abandonate și propun upsell-ul potrivit, pe tonul tău.",
        tags: ["Calificare lead-uri", "Follow-up", "Upsell"],
      },
      {
        title: "Sisteme active 24/7",
        body: "Preiau cereri la orice oră, le triază după urgență și predau tot ce e delicat unui om din echipa ta.",
        tags: ["Cereri", "Triere", "Preluare umană"],
      },
      {
        title: "Agenți vocali AI",
        body: "Preiau și dau apeluri cu voce naturală, în română sau engleză, ca niciun apel să nu rămână fără răspuns.",
        tags: ["Apeluri primite", "Apeluri date", "RO + EN"],
      },
      {
        title: "Agenți pe WhatsApp",
        body: "Conversații pe WhatsApp Business API oficial: răspunsuri, catalog, programări și remindere în același chat.",
        tags: ["WhatsApp Business API", "Catalog", "Programări"],
      },
    ],
    extraTitle: "Mai construim și",
    extra: [
      "Programări automate și remindere (Google Calendar, Calendly, soft de clinică)",
      "Integrare CRM și scoring de lead-uri (HubSpot, Pipedrive, Zoho)",
      "Asistent pe site antrenat pe documentele tale: prețuri, politici, fișe tehnice",
      "Automatizări de back-office: oferte, facturi și emailuri (n8n, Make)",
      "Recenzii pe Google și reactivarea clienților inactivi",
      "Audit de automatizare și raport lunar de performanță",
    ],
  },

  process: {
    eyebrow: "Cum lucrăm",
    title: "De la primul apel la un sistem care merge în fiecare zi.",
    subtitle: "Nu ai nevoie de cunoștințe tehnice. Ne spui cum funcționează afacerea, iar noi ne ocupăm de restul.",
    stepLabel: "Pasul",
    steps: [
      {
        title: "Audit gratuit",
        body: "Un apel de {minutes} de minute în care vedem cum gestionezi lead-urile, clienții și munca administrativă și unde te ajută AI-ul cel mai mult.",
      },
      {
        title: "Plan și ofertă",
        body: "Un plan clar: ce automatizăm întâi, cât costă și în cât timp. Tu decizi dacă mergem mai departe.",
      },
      {
        title: "Construim și testăm",
        body: "Construim pe aplicațiile și datele tale reale, iar tu testezi fiecare parte înainte să intre live.",
      },
      {
        title: "Lansăm și îmbunătățim",
        body: "Sistemul intră live, îl urmărim îndeaproape și primești lunar un raport cu ce a făcut.",
      },
    ],
  },

  principles: {
    eyebrow: "Cum construim",
    title: "Automatizări peste care tu ai controlul.",
    items: [
      {
        title: "Un om e mereu la un pas distanță",
        body: "Când AI-ul nu e sigur, predă conversația echipei tale, cu tot istoricul. Tu decizi ce are voie să spună și ce nu.",
      },
      {
        title: "Construit pe aplicațiile tale",
        body: "Ne conectăm la ce folosești deja, de la WhatsApp și Google Calendar la CRM și facturare, ca echipa să nu învețe un sistem nou.",
      },
      {
        title: "Rezultate pe care le poți verifica",
        body: "Fiecare sistem vine cu un raport lunar: ce s-a făcut automat, ce lead-uri au primit răspuns, ce s-a programat.",
      },
    ],
  },

  industries: {
    eyebrow: "Pentru cine",
    title: "Pentru afaceri mici și mijlocii care trăiesc din conversații.",
    subtitle: "Gândit pentru echipe de 3 până la 50 de oameni care pierd apeluri seara și răspund pe WhatsApp de pe telefonul personal, de exemplu:",
    items: [
      "Clinici dentare",
      "Service-uri auto",
      "Agenții imobiliare",
      "Saloane de înfrumusețare",
      "Magazine online",
      "Școli de șoferi",
      "Magazine de mobilă",
    ],
  },

  faq: {
    eyebrow: "Întrebări frecvente",
    title: "Răspunsuri directe.",
    subtitle: "Întrebările pe care ni le pun antreprenorii înainte de audit.",
    items: [
      {
        q: "Cât costă?",
        a: "Depinde de ce automatizăm, așa că nu vindem pachete fixe. După auditul gratuit primești o ofertă clară și un plan, iar tu decizi dacă mergem mai departe.",
      },
      {
        q: "În cât timp e gata?",
        a: "Depinde de complexitate. Planul de după audit include un calendar, iar lansăm pas cu pas, ca să poți testa fiecare parte înainte să intre live.",
      },
      {
        q: "Am nevoie de cunoștințe tehnice?",
        a: "Nu. Ne ocupăm noi de configurare, integrări și mentenanță. Tu ne spui cum funcționează afacerea și aprobi ce face sistemul.",
      },
      {
        q: "Ce se întâmplă când AI-ul nu știe răspunsul?",
        a: "Predă conversația unui om din echipa ta, cu tot istoricul, așa că un client nu primește niciodată un răspuns inventat.",
      },
      {
        q: "Cu ce aplicații lucrați?",
        a: "WhatsApp Business, Instagram, Google Calendar, Calendly, CRM-uri precum HubSpot, Pipedrive și Zoho, soft de facturare precum SmartBill și platforme de automatizare precum n8n și Make. Dacă folosești altceva, verificăm la audit.",
      },
      {
        q: "Ce se întâmplă cu datele clienților mei?",
        a: "Conectăm doar datele de care are nevoie fiecare automatizare și îți spunem ce furnizori le procesează. Modul în care tratăm datele face parte din planul pe care îl aprobi înainte să construim.",
      },
    ],
  },

  finalCta: {
    eyebrow: "Audit gratuit",
    title: "Află ce poți automatiza primul.",
    body: "În {minutes} de minute ne uităm la cum gestionează afacerea ta lead-urile, clienții și munca administrativă și îți arătăm unde economisește AI-ul cel mai mult timp și bani.",
    perks: ["Gratuit", "{minutes} de minute", "Fără obligații"],
    button: "Scrie-ne pe Instagram",
    handleLabel: "Instagram",
  },

  footer: {
    tagline: "Sisteme AI care scad costurile și cresc vânzările afacerilor mici și mijlocii.",
    sectionsHeading: "Explorează",
    contactHeading: "Contact",
    languageHeading: "Limbă",
    instagram: "Instagram",
    rights: "Toate drepturile rezervate.",
  },

  notFound: {
    title: "Pagina nu a fost găsită",
    body: "Pagina pe care o cauți nu există sau a fost mutată.",
    cta: "Înapoi la pagina principală",
  },
};
