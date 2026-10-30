// All English copy for the agency site. `ro.ts` must match this shape exactly
// (it is typed as `Dictionary`), so add new keys here first.
//
// Rules: no testimonials, client logos, invented case studies or statistics,
// and no promises of specific results. Industries are who we build for, not
// a client list.

export const en = {
  meta: {
    ogLocale: "en_US",
    home: {
      title: "Closr Agency: AI systems that cut costs and grow sales",
      description:
        "Closr Agency designs, builds and runs AI agents and automations for small and mid-sized businesses: they answer every lead, book appointments, follow up and take repetitive work off your team.",
    },
  },

  common: {
    skipToContent: "Skip to content",
    opensInNewTab: "(opens Instagram in a new tab)",
    language: {
      label: "Language",
      en: "EN",
      ro: "RO",
      enName: "English",
      roName: "Română",
    },
  },

  nav: {
    label: "Main",
    services: "Services",
    process: "How we work",
    faq: "FAQ",
    cta: "Free audit",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },

  hero: {
    eyebrow: "AI automation agency",
    // Rendered in order; `glow: true` parts get the neon gradient.
    title: [
      { text: "AI systems that " },
      { text: "cut your costs", glow: true },
      { text: " and " },
      { text: "grow your sales.", glow: true },
    ],
    subtitle:
      "We design, build and run AI agents and automations for your business. They answer every lead, book appointments, follow up and take repetitive work off your team, while you stay in control.",
    primaryCta: "Book a free {minutes}-min audit",
    secondaryCta: "See what we build",
    ctaNote: "By Instagram DM. No forms, no obligation.",
  },

  // The live automation panel in the hero. It is labelled as an example.
  flow: {
    label: "Example automation: a dental clinic answering a new lead, booking an appointment and updating its CRM",
    title: "Automation run",
    example: "Example: dental clinic",
    running: "Running",
    completed: "Completed",
    working: "working…",
    steps: [
      { title: "New lead on WhatsApp", detail: "“Hi, how much is a check-up?”" },
      { title: "AI agent answers and qualifies", detail: "Replies with prices, asks what they need" },
      { title: "Appointment booked", detail: "Tuesday, 10:30, added to Google Calendar" },
      { title: "CRM updated", detail: "Lead saved to the pipeline, team notified" },
      { title: "Reminder scheduled", detail: "WhatsApp reminder the day before" },
    ],
    result: "Handled end to end, no manual work",
  },

  problem: {
    eyebrow: "The problem",
    title: "Your business leaks time and money where you can't see it.",
    subtitle:
      "Most small businesses don't lose money on one big mistake. They lose it every day, in small gaps between people, messages and tools.",
    items: [
      {
        title: "Repetitive work eats your team's day",
        body: "Copying data between apps, typing the same answers, sending offers and chasing invoices. Paid hours that don't grow the business.",
      },
      {
        title: "Leads wait and go cold",
        body: "Messages and calls that come in at night, on weekends or in busy hours get answered late, or not at all, and the customer buys elsewhere.",
      },
      {
        title: "Your tools don't talk to each other",
        body: "WhatsApp, email, your CRM and invoicing live in separate places, so details slip between them and someone has to stitch it all together.",
      },
    ],
  },

  outcomes: {
    eyebrow: "What changes",
    title: "Everything we build aims at two results.",
    subtitle: "Lower costs and higher sales. If an automation doesn't serve one of them, we don't build it.",
    costs: {
      title: "Lower costs",
      items: [
        "Repetitive tasks run on their own: data entry, offers, invoices, emails",
        "Common questions answered 24/7, without adding staff",
        "Fewer manual handoffs and less copy-paste between tools",
        "A monthly report that shows what ran automatically",
      ],
    },
    sales: {
      title: "Higher sales",
      items: [
        "Every lead gets a reply, day or night",
        "Automatic follow-ups, so no lead goes cold",
        "More booked appointments and calls",
        "Past customers reactivated, more Google reviews",
      ],
    },
  },

  services: {
    eyebrow: "Services",
    title: "AI systems built around how your business works.",
    subtitle: "We start from what happens to your customer, then pick the technology. Four systems cover most businesses.",
    core: [
      {
        title: "AI sales agents",
        body: "Qualify leads, follow up on their own, recover abandoned carts and suggest the right upsell, in your tone of voice.",
        tags: ["Lead qualification", "Follow-up", "Upsell"],
      },
      {
        title: "24/7 customer systems",
        body: "Take requests at any hour, sort them by urgency and hand anything sensitive to a person on your team.",
        tags: ["Requests", "Triage", "Human handoff"],
      },
      {
        title: "AI voice agents",
        body: "Answer and make phone calls with a natural voice, in Romanian or English, so no call goes unanswered.",
        tags: ["Inbound calls", "Outbound calls", "RO + EN"],
      },
      {
        title: "WhatsApp agents",
        body: "Run conversations on the official WhatsApp Business API: answers, catalog, bookings and reminders in one chat.",
        tags: ["WhatsApp Business API", "Catalog", "Bookings"],
      },
    ],
    extraTitle: "Also part of what we build",
    extra: [
      "Automatic bookings and reminders (Google Calendar, Calendly, clinic software)",
      "CRM integration and lead scoring (HubSpot, Pipedrive, Zoho)",
      "Website assistant trained on your documents: prices, policies, spec sheets",
      "Back-office automations: offers, invoices and emails (n8n, Make)",
      "Google reviews and reactivation of inactive customers",
      "Automation audit and a monthly performance report",
    ],
  },

  process: {
    eyebrow: "How we work",
    title: "From the first call to a system that runs every day.",
    subtitle: "No technical knowledge needed on your side. You tell us how the business works; we handle the rest.",
    stepLabel: "Step",
    steps: [
      {
        title: "Free audit",
        body: "A {minutes}-minute call where we look at how you handle leads, customers and admin work, and where AI helps most.",
      },
      {
        title: "Plan and quote",
        body: "A clear plan: what we automate first, what it costs and the timeline. You decide whether to go ahead.",
      },
      {
        title: "Build and test",
        body: "We build on your real tools and data, then you test every part before it goes live.",
      },
      {
        title: "Launch and improve",
        body: "The system goes live, we watch it closely and you get a monthly report on what it did.",
      },
    ],
  },

  principles: {
    eyebrow: "How we build",
    title: "Automation you stay in control of.",
    items: [
      {
        title: "A person is always one step away",
        body: "When the AI isn't sure, it hands the conversation to your team with the full history. You decide what it can and can't say.",
      },
      {
        title: "Built around your tools",
        body: "We connect to what you already use, from WhatsApp and Google Calendar to your CRM and invoicing, so your team doesn't learn a new system.",
      },
      {
        title: "Results you can check",
        body: "Every system comes with a monthly report: what ran automatically, which leads got answered, what was booked.",
      },
    ],
  },

  industries: {
    eyebrow: "Who it's for",
    title: "For small and mid-sized businesses that run on conversations.",
    subtitle: "Built for teams of 3 to 50 people that lose calls in the evening and answer WhatsApp from a personal phone, such as:",
    items: [
      "Dental clinics",
      "Car services",
      "Real estate agencies",
      "Beauty salons",
      "E-commerce stores",
      "Driving schools",
      "Furniture stores",
    ],
  },

  faq: {
    eyebrow: "FAQ",
    title: "Straight answers.",
    subtitle: "The questions business owners ask us before the audit.",
    items: [
      {
        q: "How much does it cost?",
        a: "It depends on what we automate, so we don't sell fixed packages. After the free audit you get a clear quote and a plan, and you decide whether to go ahead.",
      },
      {
        q: "How long until it's live?",
        a: "It depends on the scope. The plan after the audit includes a timeline, and we launch step by step, so you can test each part before it goes live.",
      },
      {
        q: "Do I need technical knowledge?",
        a: "No. We handle the setup, integrations and maintenance. You tell us how your business works and approve what the system does.",
      },
      {
        q: "What happens when the AI doesn't know the answer?",
        a: "It hands the conversation to a person on your team, with the full history, so your customer never gets a made-up answer.",
      },
      {
        q: "Which tools do you work with?",
        a: "WhatsApp Business, Instagram, Google Calendar, Calendly, CRMs such as HubSpot, Pipedrive and Zoho, invoicing tools such as SmartBill, and automation platforms such as n8n and Make. If you use something else, we check it during the audit.",
      },
      {
        q: "What about my customers' data?",
        a: "We connect only the data each automation needs and tell you which providers process it. How data is handled is part of the plan you approve before we build.",
      },
    ],
  },

  finalCta: {
    eyebrow: "Free audit",
    title: "Find out what you can automate first.",
    body: "In {minutes} minutes we look at how your business handles leads, customers and admin work, and show you where AI saves the most time and money.",
    perks: ["Free", "{minutes} minutes", "No obligation"],
    button: "Message us on Instagram",
    handleLabel: "Instagram",
  },

  footer: {
    tagline: "AI systems that cut costs and grow sales for small and mid-sized businesses.",
    sectionsHeading: "Explore",
    contactHeading: "Contact",
    languageHeading: "Language",
    instagram: "Instagram",
    rights: "All rights reserved.",
  },

  notFound: {
    title: "Page not found",
    body: "The page you're looking for doesn't exist or has moved.",
    cta: "Back to home",
  },
};

export type Dictionary = typeof en;
