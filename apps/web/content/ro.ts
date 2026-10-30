// Toate textele în limba română. Structura trebuie să fie identică cu `en.ts`
// (tipul `Dictionary` o verifică la compilare).
//
// Reguli: fără testimoniale, logo-uri de clienți sau statistici inventate.

import type { Dictionary } from "./en";

export const ro: Dictionary = {
  meta: {
    ogLocale: "ro_RO",
    home: {
      title: "Closr: setteri AI care răspund, califică și programează apeluri 24/7",
      description:
        "Setterii AI Closr răspund non-stop la mesajele tale pe WhatsApp, Instagram și Telegram, califică fiecare lead cu întrebările tale și trimit link-ul de programare celor potriviți.",
    },
    privacy: {
      title: "Politica de confidențialitate | Closr",
      description: "Cum colectează, folosește și protejează Closr datele tale personale.",
    },
    terms: {
      title: "Termeni și condiții | Closr",
      description: "Termenii care se aplică atunci când folosești site-ul și lista de așteptare Closr.",
    },
  },

  common: {
    skipToContent: "Sari la conținut",
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
    howItWorks: "Cum funcționează",
    features: "Funcționalități",
    pricing: "Prețuri",
    faq: "Întrebări",
    cta: "Intră pe lista de așteptare",
    openMenu: "Deschide meniul",
    closeMenu: "Închide meniul",
  },

  hero: {
    eyebrow: "Setteri AI pentru WhatsApp, Instagram și Telegram",
    titleStart: "Setteri AI care răspund la fiecare mesaj,",
    titleHighlight: "24/7,",
    titleEnd: "și îți programează apelurile.",
    subtitle:
      "Closr le răspunde lead-urilor tale pe WhatsApp, Instagram și Telegram în câteva clipe, zi și noapte. Pune întrebările tale de calificare și trimite link-ul de programare oamenilor potriviți. Tu intervii doar când vrei.",
    primaryCta: "Intră pe lista de așteptare",
    secondaryCta: "Vezi demo",
    channelsLabel: "Funcționează pe",
  },

  demo: {
    label: "Demo: un setter AI califică un lead nou și îi trimite link-ul de programare",
    businessName: "Brandul tău",
    online: "Setter AI · online",
    typing: "scrie…",
    inputPlaceholder: "Mesaj",
    messages: [
      { from: "lead", text: "Salut! Am văzut postarea despre programul de coaching. Cum funcționează?" },
      {
        from: "ai",
        text: "Salut, mersi că ne-ai scris! 👋 Întâi o întrebare rapidă, ca să te îndrum corect: care e obiectivul tău principal acum?",
      },
      { from: "lead", text: "Să-mi cresc magazinul online. Vânzările stagnează de câteva luni." },
      {
        from: "ai",
        text: "Înțeleg. Cam unde ești acum: abia la început sau ai deja vânzări constante?",
      },
      { from: "lead", text: "Am vânzări constante, dar vreau să le dublez." },
      {
        from: "ai",
        text: "Exact pentru asta e gândit programul. Următorul pas e un apel gratuit de 20 de minute cu echipa. Vrei să alegi o oră?",
      },
      { from: "lead", text: "Da, te rog!" },
      { from: "ai", text: "Uite link-ul, alege orice interval îți convine:", booking: true },
    ],
    booking: {
      title: "Apel de strategie",
      meta: "20 min · Apel video",
      cta: "Alege o oră",
    },
    pipeline: "Lead calificat · Apel programat",
  },

  problem: {
    eyebrow: "Problema",
    title: "Fiecare răspuns întârziat e un lead plătit și pierdut.",
    subtitle:
      "Oamenii îți scriu când sunt gata să cumpere. Momentul acela nu așteaptă programul de lucru și nici pauza de prânz a setterului tău.",
    items: [
      {
        title: "Răspunsurile lente pierd lead-uri",
        body: "Lead-urile scriu mai multor firme deodată. Dacă răspunzi după câteva ore, de multe ori au programat deja cu cine a răspuns primul.",
      },
      {
        title: "Setterii costă mult",
        body: "Un setter bun înseamnă salariu plus comision, săptămâni de training și, oricum, zile proaste, concedii medicale și preaviz.",
      },
      {
        title: "Setterii dorm",
        body: "Mesajele vin la 11 noaptea, duminica și din alte fusuri orare. Dimineața inbox-ul e plin, iar cele mai calde lead-uri s-au răcit.",
      },
    ],
  },

  howItWorks: {
    eyebrow: "Cum funcționează",
    title: "Trei pași de la mesaje la apeluri programate.",
    subtitle:
      "Fără cod și fără scripturi de supravegheat. Setezi regulile o singură dată, iar setterul le respectă în fiecare conversație.",
    stepLabel: "Pasul",
    steps: [
      {
        title: "Conectezi conturile",
        body: "Legi WhatsApp Business, Instagram și Telegram prin API-urile lor oficiale. Toate conversațiile ajung într-un singur inbox.",
        tags: ["WhatsApp", "Instagram", "Telegram"],
      },
      {
        title: "Îți antrenezi setterul",
        body: "Descrii oferta, adaugi întrebările de calificare pe care le-ai pune tu și lipești link-ul de programare. Alegi tonul: prietenos, direct sau formal.",
        tags: ["Oferta", "Întrebări", "Link de programare"],
      },
      {
        title: "Califică și programează",
        body: "Setterul răspunde, pune întrebările tale, etichetează fiecare lead și trimite link-ul de programare celor potriviți. Preiei orice conversație dintr-un clic.",
        tags: ["Califică", "Programează", "Preiei tu"],
      },
    ],
  },

  channels: {
    eyebrow: "Canale",
    title: "Ajungi la lead-uri acolo unde îți scriu deja.",
    subtitle: "Un setter, un inbox, trei canale, toate pe API-uri oficiale.",
    officialApi: "API oficial",
    items: [
      {
        name: "WhatsApp",
        api: "WhatsApp Business Platform (Cloud API)",
        body: "Răspunzi lead-urilor venite din reclame, de pe site sau din coduri QR, cu aceeași voce pe care o folosești față în față.",
      },
      {
        name: "Instagram",
        api: "Instagram Messaging API",
        body: "Gestionezi mesajele directe și răspunsurile la story-uri de pe contul profesional, ca niciun lead cald să nu rămână fără răspuns.",
      },
      {
        name: "Telegram",
        api: "Telegram Bot API",
        body: "Răspunzi lead-urilor din canalul sau comunitatea ta printr-un bot dedicat, care vorbește în numele afacerii tale.",
      },
    ],
  },

  features: {
    eyebrow: "Funcționalități",
    title: "Tot ce face un setter bun, fără zile libere.",
    subtitle:
      "Gândit să sune ca un om, să-ți urmeze procesul întocmai și să-ți predea conversația oricând o vrei înapoi.",
    stages: ["Nou", "În calificare", "Calificat", "Programat"],
    items: [
      {
        key: "humanReplies",
        title: "Răspunsuri ca de la om",
        body: "Indicator de scriere și pauze naturale, mesaje scurte pe tonul tău. Fără ziduri de text, fără răspunsuri robotice instantanee.",
      },
      {
        key: "qualification",
        title: "Calificare și pipeline",
        body: "Pune întrebările tale, evaluează răspunsurile și mută automat fiecare lead prin etapele tale.",
      },
      {
        key: "takeover",
        title: "Preluare umană",
        body: "Intri în orice conversație dintr-un clic. AI-ul se oprește în acel chat până i-l predai înapoi.",
      },
      {
        key: "multiLanguage",
        title: "Mai multe limbi",
        body: "Răspunde în limba în care scrie lead-ul, de la română la engleză și nu numai.",
      },
      {
        key: "inbox",
        title: "Inbox unificat",
        body: "WhatsApp, Instagram și Telegram într-un singur loc, cu statusul lead-ului, notițe și tot istoricul.",
      },
      {
        key: "analytics",
        title: "Statistici",
        body: "Urmărești timpii de răspuns, rata de calificare și apelurile programate pe fiecare canal, ca să vezi ce merge și ce trebuie reparat.",
      },
      {
        key: "security",
        title: "Securitate și multi-tenant",
        body: "Fiecare workspace e izolat, datele sunt criptate în tranzit și în repaus, iar accesul echipei se face pe roluri.",
      },
    ],
  },

  pricing: {
    eyebrow: "Prețuri",
    title: "Planuri simple, care cresc odată cu tine.",
    subtitle: "Plătești lunar sau primești 2 luni gratuit cu plata anuală.",
    billing: {
      label: "Perioada de facturare",
      monthly: "Lunar",
      yearly: "Anual",
      yearlyBadge: "2 luni gratuit",
    },
    perMonth: "/lună",
    perYear: "/an",
    billedMonthly: "Facturat lunar",
    billedYearly: "{price}/lună, facturat anual",
    mostPopular: "Cel mai ales",
    cta: "Încearcă {days} zile gratuit",
    comingSoon: "În curând",
    // {days}, {replies} și {cancelDay} vin din content/pricing.ts.
    trial: "Fiecare plan începe cu {days} zile gratuit: {replies} în perioada de probă, card necesar, anulezi oricând înainte de ziua {cancelDay}.",
    vatNote: "Prețurile nu includ TVA.",
    creditsNote: "1 credit = 1 răspuns AI trimis unui lead. Creditele planului se resetează în fiecare lună și nu se reportează.",
    replyCount: { one: "{n} răspuns AI", few: "{n} răspunsuri AI", other: "{n} de răspunsuri AI" },
    plans: {
      starter: {
        name: "Starter",
        description: "Pentru fondatori independenți și afaceri mici care își iau primul setter AI.",
      },
      growth: {
        name: "Growth",
        description: "Pentru afacerile care vând în fiecare zi prin mesaje.",
      },
      scale: {
        name: "Scale",
        description: "Pentru echipe și afaceri cu volum mare.",
      },
    },
    features: {
      replies: { one: "{n} răspuns AI / lună", few: "{n} răspunsuri AI / lună", other: "{n} de răspunsuri AI / lună" },
      setters: { one: "{n} setter AI", few: "{n} setteri AI", other: "{n} de setteri AI" },
      settersUnlimited: "Setteri AI nelimitați",
      channelOne: "1 canal (WhatsApp, Instagram sau Telegram)",
      channelsAllNamed: "Toate canalele: WhatsApp, Instagram, Telegram",
      channelsAll: "Toate canalele",
      users: {
        one: "{n} utilizator în dashboard",
        few: "{n} utilizatori în dashboard",
        other: "{n} de utilizatori în dashboard",
      },
      leadScore: "Scor AI și rezumat AI pentru fiecare lead",
      takeover: "Inbox cu preluare umană",
      pipeline: "Pipeline de lead-uri (tabel + board)",
      basicStats: "Statistici de bază",
      emailSupport: "Suport pe email",
      everythingIn: "Tot ce include {plan}, plus:",
      followUps: "Follow-up automat (niciun lead nu se răcește)",
      netSales: "Urmărirea vânzărilor nete: vezi cât aduc mesajele tale",
      fullAnalytics: "Statistici complete + raport lunar de rezultate",
      calendar: "Programări în Google Calendar",
      prioritySupport: "Suport prioritar",
      voiceNotes: "Mesaje vocale cu vocea ta, doar cu acord înregistrat",
      onboarding: "Onboarding făcut împreună: îți antrenăm setterul alături de tine",
      whatsappSupport: "Suport direct pe WhatsApp",
    },
    packs: {
      title: "Ai nevoie de mai multe răspunsuri? Reîncarci oricând.",
      subtitle: "Dacă rămâi fără credite înainte de finalul lunii, cumperi un pachet extra dintr-un clic. Setterul tău nu se oprește.",
      credits: { one: "{n} credit", few: "{n} credite", other: "{n} de credite" },
      save: "Economisești {pct}%",
      note: "Creditele extra se folosesc după cele lunare și rămân valabile {months} luni. Disponibile pe orice plan.",
    },
    compare: {
      title: "Compară planurile",
      show: "Vezi comparația completă",
      hide: "Ascunde comparația",
      featureColumn: "Funcționalitate",
      included: "Inclus",
      notIncluded: "Nu e inclus",
      rows: {
        replies: "Răspunsuri AI / lună",
        setters: "Setteri AI",
        channels: "Canale",
        users: "Utilizatori în dashboard",
        leadScore: "Scor și rezumat AI pentru lead-uri",
        takeover: "Preluare umană",
        followUps: "Follow-up automat",
        netSales: "Urmărirea vânzărilor nete",
        analytics: "Statistici",
        calendar: "Programări în Google Calendar",
        voiceNotes: "Mesaje vocale cu acord",
        onboarding: "Onboarding",
        support: "Suport",
      },
      values: {
        unlimited: "Nelimitat",
        oneChannel: "1 din 3",
        allChannels: "Toate cele 3",
        basic: "De bază",
        full: "Complete + raport lunar",
        doneWithYou: "Făcut împreună",
        email: "Email",
        priority: "Prioritar",
        whatsapp: "WhatsApp direct",
      },
    },
    // Răspunsurile pot folosi {days}, {replies} și {cancelDay} din content/pricing.ts.
    faq: {
      title: "Întrebări despre prețuri",
      items: [
        {
          q: "Ce este un credit?",
          a: "Un credit = un răspuns AI trimis unui lead. Citirea mesajelor, scorurile și rezumatele sunt gratuite.",
        },
        {
          q: "Ce se întâmplă dacă rămân fără credite?",
          a: "Setterul oprește răspunsurile AI noi și primești o alertă. Cumperi un pachet extra sau treci pe un plan mai mare, iar el continuă imediat. Poți oricând să răspunzi manual din inbox.",
        },
        {
          q: "Pot schimba planul oricând?",
          a: "Da. Trecerea pe un plan mai mare se aplică imediat, iar trecerea pe unul mai mic de la următoarea dată de facturare.",
        },
        {
          q: "Există o perioadă gratuită?",
          a: "Da, {days} zile gratuit, cu {replies}. Ai nevoie de card, dar dacă anulezi oricând înainte de ziua {cancelDay}, nu plătești nimic.",
        },
        {
          q: "Luați comision din vânzările mele?",
          a: "Nu. Plătești planul și atât.",
        },
        {
          q: "Datele mele sunt în siguranță?",
          a: "Conversațiile sunt stocate criptat în UE (Frankfurt). Mesajele sunt procesate de furnizorul nostru de AI doar ca să scrie răspunsurile și nu sunt folosite niciodată la antrenarea modelelor AI.",
        },
      ],
    },
  },

  faq: {
    eyebrow: "Întrebări frecvente",
    title: "Răspunsuri directe.",
    subtitle: "Inclusiv întrebările de conformitate pe care ar trebui să le pui oricărui setter AI.",
    items: [
      {
        q: "E permis de WhatsApp și Instagram?",
        a: "Da. Closr se conectează prin platformele oficiale Meta, WhatsApp Business Platform (Cloud API) și Instagram Messaging API, iar pe Telegram prin Bot API-ul oficial. Fără scraping, fără automatizări de browser și fără aplicații neoficiale care ți-ar putea pune conturile în pericol. Setterul respectă și regulile fiecărei platforme, cum ar fi fereastra de 24 de ore pentru conversații pe WhatsApp.",
      },
      {
        q: "E un chatbot general?",
        a: "Nu. Setterul vorbește doar despre afacerea ta: oferta, întrebările frecvente, întrebările de calificare și link-ul de programare. Dacă cineva întreabă despre altceva, readuce politicos discuția la subiect sau îți predă conversația. Nu inventează prețuri sau promisiuni pe care nu i le-ai dat.",
      },
      {
        q: "Vor ști oamenii că vorbesc cu un AI?",
        a: "Setterul scrie natural, dar nu e făcut să păcălească pe nimeni. Dacă cineva întreabă sincer dacă vorbește cu un bot sau cu un om, primește adevărul: e un asistent AI al afacerii tale. Apoi se oferă să aducă un om în conversație.",
      },
      {
        q: "Pot prelua eu o conversație?",
        a: "Oricând. Deschizi conversația în inbox și apeși Preia. AI-ul se oprește în acel chat până i-l predai înapoi, iar celelalte conversații merg mai departe.",
      },
      {
        q: "Ce limbi vorbește?",
        a: "Răspunde în limba în care scrie lead-ul, inclusiv română și engleză, iar pentru fiecare canal poți seta o limbă implicită.",
      },
      {
        q: "Cu ce aplicații de programare funcționează?",
        a: "Cu orice aplicație care îți dă un link de programare, de exemplu Calendly, Cal.com sau paginile de programări din Google Calendar. Setterul trimite link-ul după ce lead-ul e calificat.",
      },
      {
        q: "Cum sunt tratate datele mele?",
        a: "Closr e multi-tenant din construcție: conversațiile și setările fiecărei afaceri sunt izolate de celelalte conturi. Datele sunt criptate în tranzit și în repaus și nu le vindem niciodată. Toate detaliile vor fi în politica de confidențialitate înainte de lansare.",
      },
      {
        q: "Când pot începe și cât va costa?",
        a: "Cei de pe lista de așteptare primesc acces primii, iar noi îți scriem când îți vine rândul. Fiecare plan începe cu o perioadă gratuită, iar toate planurile și prețurile le găsești mai sus, la secțiunea Prețuri. Înscrierea e gratuită și nu te obligă la nimic.",
      },
    ],
  },

  waitlist: {
    eyebrow: "Acces timpuriu",
    title: "Nu mai pierde lead-uri din cauza răspunsurilor lente.",
    subtitle: "Intră pe lista de așteptare și fii printre primii care pun un setter AI pe mesajele lor.",
    perks: ["Înscriere gratuită", "Fără obligații", "Acces primul la lansare"],
    form: {
      emailLabel: "Email",
      emailPlaceholder: "tu@firma.ro",
      businessLabel: "Numele afacerii",
      optional: "opțional",
      businessPlaceholder: "Afacerea ta",
      channelLabel: "Ce canal contează cel mai mult?",
      channels: {
        whatsapp: "WhatsApp",
        instagram: "Instagram",
        telegram: "Telegram",
        all: "Toate trei",
      },
      honeypotLabel: "Lasă acest câmp gol",
      submit: "Intră pe listă",
      submitting: "Se trimite…",
      consentBefore: "Îți scriem doar despre Closr. Citește",
      consentLink: "Politica de confidențialitate",
      consentAfter: ".",
    },
    errors: {
      emailRequired: "Introdu adresa de email.",
      emailInvalid: "Adresa de email nu pare corectă.",
      businessTooLong: "Numele afacerii trebuie să aibă sub 120 de caractere.",
      channelRequired: "Alege un canal.",
      server: "A apărut o problemă la noi. Te rugăm să încerci din nou.",
      notConfigured: "Lista de așteptare nu e conectată încă. Te rugăm să revii mai târziu.",
      network: "Nu am putut contacta serverul. Verifică conexiunea și încearcă din nou.",
    },
    success: {
      createdTitle: "Ești pe listă 🎉",
      createdBody: "Mulțumim! Îți scriem imediat ce îți vine rândul.",
      existsTitle: "Ești deja pe listă",
      existsBody: "Acest email e deja înscris. Revenim cu vești.",
    },
  },

  footer: {
    tagline:
      "Setteri AI care răspund, califică lead-uri și programează apeluri pe WhatsApp, Instagram și Telegram, 24/7.",
    productHeading: "Produs",
    legalHeading: "Legal",
    languageHeading: "Limbă",
    privacy: "Politica de confidențialitate",
    terms: "Termeni și condiții",
    rights: "Toate drepturile rezervate.",
  },

  legal: {
    placeholderNotice:
      "Variantă provizorie: această pagină va fi înlocuită cu o versiune completă și verificată înainte de lansare și de evaluarea aplicației de către Meta.",
    lastUpdatedLabel: "Ultima actualizare",
    lastUpdated: "28 octombrie 2026",
    backHome: "Înapoi la pagina principală",
    privacy: {
      title: "Politica de confidențialitate",
      intro:
        "Această politică explică ce date personale colectează Closr prin acest site și prin lista de așteptare, de ce le colectăm și ce drepturi ai.",
      sections: [
        {
          heading: "Cine suntem",
          body: [
            "Closr („noi”) construiește setteri AI pentru WhatsApp, Instagram și Telegram. Produsul este în etapa de pre-lansare. Ne poți scrie la [adresă de email de contact].",
          ],
        },
        {
          heading: "Ce colectăm",
          body: [
            "Când te înscrii pe lista de așteptare colectăm adresa ta de email, numele afacerii (dacă îl completezi), canalul care te interesează cel mai mult și limba paginii pe care te-ai înscris.",
            "Nu folosim trackere de publicitate pe acest site.",
          ],
        },
        {
          heading: "De ce le colectăm",
          body: [
            "Doar ca să te contactăm despre accesul timpuriu și noutățile Closr. Temeiul legal este consimțământul tău, pe care îl poți retrage oricând. Nu vindem niciodată datele tale.",
          ],
        },
        {
          heading: "Unde sunt stocate",
          body: [
            "Datele listei de așteptare sunt stocate într-o bază de date găzduită de Supabase, care acționează ca persoană împuternicită. Doar serverul nostru poate scrie în ea.",
          ],
        },
        {
          heading: "Cât timp le păstrăm",
          body: ["Până ne ceri să le ștergem sau până la închiderea listei de așteptare, oricare survine prima."],
        },
        {
          heading: "Drepturile tale",
          body: [
            "Conform GDPR, poți cere accesul la date, rectificarea sau ștergerea lor ori te poți opune prelucrării, scriindu-ne la [adresă de email de contact]. Poți depune și o plângere la autoritatea de protecție a datelor; în România aceasta este ANSPDCP.",
          ],
        },
        {
          heading: "Datele din mesaje (după lansare)",
          body: [
            "După lansarea Closr, această politică va descrie și modul în care prelucrăm mesajele din conturile conectate de WhatsApp, Instagram și Telegram, așa cum cer aceste platforme.",
          ],
        },
      ],
    },
    terms: {
      title: "Termeni și condiții",
      intro: "Acești termeni se aplică atunci când folosești site-ul Closr și te înscrii pe lista de așteptare.",
      sections: [
        {
          heading: "Lista de așteptare",
          body: [
            "Înscrierea pe lista de așteptare este gratuită și nu creează nicio obligație de cumpărare. Îți putem scrie la adresa furnizată despre accesul timpuriu și noutățile produsului.",
          ],
        },
        {
          heading: "Informații de pre-lansare",
          body: [
            "Funcționalitățile, planurile și prețurile de pe acest site descriu ce construim și se pot schimba până la lansare.",
          ],
        },
        {
          heading: "Utilizare acceptabilă",
          body: [
            "Te rugăm să nu trimiți informații false, să nu înscrii alte persoane fără acordul lor și să nu încerci să perturbi sau să supraîncarci site-ul.",
          ],
        },
        {
          heading: "Răspundere",
          body: [
            "Site-ul este oferit „ca atare”. În măsura permisă de lege, nu răspundem pentru pierderi indirecte rezultate din utilizarea lui.",
          ],
        },
        {
          heading: "Contact",
          body: ["Ai întrebări despre acești termeni? Scrie-ne la [adresă de email de contact]."],
        },
      ],
    },
  },

  notFound: {
    title: "Pagina nu a fost găsită",
    body: "Pagina pe care o cauți nu există sau a fost mutată.",
    cta: "Înapoi la pagina principală",
  },
};
