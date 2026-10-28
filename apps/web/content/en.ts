// All English copy for the site. `ro.ts` must match this shape exactly
// (it is typed as `Dictionary`), so add new keys here first.
//
// Rules: no testimonials, customer logos or invented statistics. Where social
// proof would go, leave it out until there are real results.

export const en = {
  meta: {
    ogLocale: "en_US",
    home: {
      title: "Closr: AI setters that reply, qualify and book calls 24/7",
      description:
        "Closr's AI setters answer your WhatsApp, Instagram and Telegram DMs around the clock, qualify every lead with your questions and send your booking link to the ones who fit.",
    },
    privacy: {
      title: "Privacy Policy | Closr",
      description: "How Closr collects, uses and protects your personal data.",
    },
    terms: {
      title: "Terms of Service | Closr",
      description: "The terms that apply when you use the Closr website and waitlist.",
    },
  },

  common: {
    skipToContent: "Skip to content",
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
    howItWorks: "How it works",
    features: "Features",
    pricing: "Pricing",
    faq: "FAQ",
    cta: "Join the waitlist",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },

  hero: {
    eyebrow: "AI setters for WhatsApp, Instagram & Telegram",
    titleStart: "AI setters that reply to every DM",
    titleHighlight: "24/7",
    titleEnd: "and book the call for you.",
    subtitle:
      "Closr answers your leads on WhatsApp, Instagram and Telegram within moments, day or night. It asks your qualifying questions and sends your booking link to the people who fit. You step in only when you want to.",
    primaryCta: "Join the waitlist",
    secondaryCta: "See demo",
    channelsLabel: "Works on",
  },

  // The animated chat in the hero. "Your brand" is a stand-in for the
  // customer's business, not a real or invented company.
  demo: {
    label: "Demo: an AI setter qualifies a new lead and sends a booking link",
    businessName: "Your brand",
    online: "AI setter · online",
    typing: "typing…",
    inputPlaceholder: "Message",
    messages: [
      { from: "lead", text: "Hi! Saw your post about the coaching program. How does it work?" },
      {
        from: "ai",
        text: "Hey, thanks for reaching out! 👋 Quick question first so I point you the right way: what's your main goal right now?",
      },
      { from: "lead", text: "Grow my online store. Sales have been flat for months." },
      {
        from: "ai",
        text: "Got it. Roughly where are you today: just starting, or already making consistent sales?",
      },
      { from: "lead", text: "Consistent sales, but I want to double them." },
      {
        from: "ai",
        text: "That's exactly who the program is built for. Next step is a free 20-minute call with the team. Want to pick a time?",
      },
      { from: "lead", text: "Yes please!" },
      { from: "ai", text: "Here's the link, choose any slot that works for you:", booking: true },
    ],
    booking: {
      title: "Strategy call",
      meta: "20 min · Video call",
      cta: "Pick a time",
    },
    pipeline: "Lead qualified · Call booked",
  },

  problem: {
    eyebrow: "The problem",
    title: "Every slow reply is a lead you paid for and lost.",
    subtitle:
      "People message when they're ready to buy. That moment doesn't wait for business hours, and it doesn't wait for your setter to finish their lunch.",
    items: [
      {
        title: "Slow replies lose leads",
        body: "Leads message several businesses at once. Answer hours later and they've often booked with whoever replied first.",
      },
      {
        title: "Setters are expensive",
        body: "A good setter costs a salary plus commission, takes weeks to train, and still has bad days, sick days and a notice period.",
      },
      {
        title: "Setters sleep",
        body: "DMs arrive at 11 pm, on Sundays and from other time zones. By morning the inbox is a backlog and your warmest leads have gone cold.",
      },
    ],
  },

  howItWorks: {
    eyebrow: "How it works",
    title: "Three steps from DMs to booked calls.",
    subtitle:
      "No code and no scripts to babysit. You set the rules once, and your setter follows them in every conversation.",
    stepLabel: "Step",
    steps: [
      {
        title: "Connect your accounts",
        body: "Link WhatsApp Business, Instagram and Telegram through their official APIs. Every conversation lands in one inbox.",
        tags: ["WhatsApp", "Instagram", "Telegram"],
      },
      {
        title: "Train your setter",
        body: "Describe your offer, add the qualifying questions you'd ask, and paste your booking link. Pick the tone: friendly, direct or formal.",
        tags: ["Offer", "Questions", "Booking link"],
      },
      {
        title: "It qualifies and books",
        body: "Your setter replies, asks your questions, tags each lead and sends the booking link to the ones who fit. Take over any chat in one click.",
        tags: ["Qualify", "Book", "Take over"],
      },
    ],
  },

  channels: {
    eyebrow: "Channels",
    title: "Meet leads where they already message you.",
    subtitle: "One setter, one inbox, three channels, all on official APIs.",
    officialApi: "Official API",
    items: [
      {
        name: "WhatsApp",
        api: "WhatsApp Business Platform (Cloud API)",
        body: "Reply to leads coming from your ads, website and QR codes in the same voice you use in person.",
      },
      {
        name: "Instagram",
        api: "Instagram Messaging API",
        body: "Handle DMs and story replies on your professional account so no warm lead sits unanswered.",
      },
      {
        name: "Telegram",
        api: "Telegram Bot API",
        body: "Answer leads from your channel or community through a dedicated bot that speaks for your business.",
      },
    ],
  },

  features: {
    eyebrow: "Features",
    title: "Everything a great setter does, minus the time off.",
    subtitle:
      "Built to sound like a person, follow your process to the letter, and hand the conversation back to you whenever you want it.",
    stages: ["New", "Qualifying", "Qualified", "Booked"],
    items: [
      {
        key: "humanReplies",
        title: "Human-like replies",
        body: "Typing indicators and natural delays, short messages in your tone of voice. No walls of text, no robotic instant answers.",
      },
      {
        key: "qualification",
        title: "Lead qualification & pipeline",
        body: "Asks your questions, scores the answers and moves every lead through your stages automatically.",
      },
      {
        key: "takeover",
        title: "Human takeover",
        body: "Jump into any conversation in one click. The AI pauses in that chat until you hand it back.",
      },
      {
        key: "multiLanguage",
        title: "Multi-language",
        body: "Replies in the language your lead writes in, from English to Romanian and beyond.",
      },
      {
        key: "inbox",
        title: "Unified inbox",
        body: "WhatsApp, Instagram and Telegram in one place, with lead status, notes and the full history.",
      },
      {
        key: "analytics",
        title: "Analytics",
        body: "Track response times, qualification rate and calls booked per channel, so you can see what's working and fix what isn't.",
      },
      {
        key: "security",
        title: "Secure & multi-tenant",
        body: "Every workspace is isolated, data is encrypted in transit and at rest, and team access is role-based.",
      },
    ],
  },

  pricing: {
    eyebrow: "Pricing",
    title: "Simple plans that grow with you.",
    subtitle:
      "Joining the waitlist is free and doesn't commit you to anything. You'll pick a plan when we launch.",
    recommended: "Recommended",
    cta: "Join the waitlist",
    note: "Final pricing will be announced at launch.",
    // TBD: every price below is a placeholder. Replace "TBD" with the real
    // price (for example "€49") before launch. Plan limits are placeholders too.
    tiers: [
      {
        name: "Starter",
        price: "TBD", // TBD: placeholder, set real price
        period: "/ month",
        description: "For solo coaches and small businesses trying their first AI setter.",
        highlighted: false,
        features: [
          "1 AI setter", // TBD: placeholder limit
          "1 channel", // TBD: placeholder limit
          "Unified inbox",
          "Lead qualification & pipeline",
          "Human takeover",
        ],
      },
      {
        name: "Pro",
        price: "TBD", // TBD: placeholder, set real price
        period: "/ month",
        description: "For growing teams whose sales happen in the DMs.",
        highlighted: true,
        features: [
          "Everything in Starter",
          "3 AI setters", // TBD: placeholder limit
          "WhatsApp, Instagram & Telegram",
          "Multi-language replies",
          "Analytics dashboard",
        ],
      },
      {
        name: "Agency",
        price: "TBD", // TBD: placeholder, set real price
        period: "/ month",
        description: "For agencies running setters for several clients.",
        highlighted: false,
        features: [
          "Everything in Pro",
          "Multiple client workspaces", // TBD: placeholder limit
          "Team roles & permissions",
          "Per-client analytics",
          "Priority support",
        ],
      },
    ],
  },

  faq: {
    eyebrow: "FAQ",
    title: "Straight answers.",
    subtitle: "Including the compliance questions you should be asking any AI setter.",
    items: [
      {
        q: "Is this allowed by WhatsApp and Instagram?",
        a: "Yes. Closr connects through Meta's official WhatsApp Business Platform (Cloud API) and the Instagram Messaging API, and through the official Bot API on Telegram. No scraping, no browser automation and no unofficial apps that could put your accounts at risk. Your setter also follows each platform's messaging rules, such as WhatsApp's 24-hour customer service window.",
      },
      {
        q: "Is it a general-purpose chatbot?",
        a: "No. Your setter only talks about your business: your offer, your FAQs, your qualifying questions and your booking link. If someone asks about something unrelated, it politely steers back or hands the chat to you. It won't invent prices or promises you didn't give it.",
      },
      {
        q: "Will people know they're talking to an AI?",
        a: "Your setter writes naturally, but it isn't built to deceive anyone. If someone sincerely asks whether they're talking to a bot or a person, it tells the truth: it's an AI assistant for your business. It also offers to bring in a human.",
      },
      {
        q: "Can I take over a conversation?",
        a: "Anytime. Open the chat in your inbox and click Take over. The AI pauses in that conversation until you hand it back, while every other chat keeps running.",
      },
      {
        q: "Which languages does it speak?",
        a: "It replies in the language your lead writes in, including English and Romanian, and you can set a default language for each channel.",
      },
      {
        q: "Which booking tools does it work with?",
        a: "Anything that gives you a booking link, such as Calendly, Cal.com or Google Calendar appointment pages. Your setter sends the link once a lead qualifies.",
      },
      {
        q: "How is my data handled?",
        a: "Closr is multi-tenant by design: each business's conversations and settings are isolated from every other account. Data is encrypted in transit and at rest, and we never sell it. Full details will be in our privacy policy before launch.",
      },
      {
        q: "When can I start, and what will it cost?",
        a: "Waitlist members get access first, and we'll email you when your spot opens. Pricing will be announced before launch. Joining the waitlist is free and doesn't commit you to anything.",
      },
    ],
  },

  waitlist: {
    eyebrow: "Early access",
    title: "Stop losing leads to slow replies.",
    subtitle: "Join the waitlist and be among the first to put an AI setter on your DMs.",
    perks: ["Free to join", "No commitment", "First access when we launch"],
    form: {
      emailLabel: "Email",
      emailPlaceholder: "you@company.com",
      businessLabel: "Business name",
      optional: "optional",
      businessPlaceholder: "Your business",
      channelLabel: "Which channel matters most?",
      channels: {
        whatsapp: "WhatsApp",
        instagram: "Instagram",
        telegram: "Telegram",
        all: "All three",
      },
      honeypotLabel: "Leave this field empty",
      submit: "Join the waitlist",
      submitting: "Joining…",
      consentBefore: "We'll only email you about Closr. Read our",
      consentLink: "Privacy Policy",
      consentAfter: ".",
    },
    errors: {
      emailRequired: "Enter your email address.",
      emailInvalid: "That email address doesn't look right.",
      businessTooLong: "Keep the business name under 120 characters.",
      channelRequired: "Choose a channel.",
      server: "Something went wrong on our side. Please try again.",
      notConfigured: "The waitlist isn't connected yet. Please try again later.",
      network: "Couldn't reach the server. Check your connection and try again.",
    },
    success: {
      createdTitle: "You're on the list 🎉",
      createdBody: "Thanks! We'll email you as soon as your spot opens.",
      existsTitle: "You're already on the list",
      existsBody: "This email is already signed up. We'll be in touch.",
    },
  },

  footer: {
    tagline:
      "AI setters that reply, qualify leads and book calls on WhatsApp, Instagram and Telegram, 24/7.",
    productHeading: "Product",
    legalHeading: "Legal",
    languageHeading: "Language",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    rights: "All rights reserved.",
  },

  legal: {
    placeholderNotice:
      "Placeholder: this page will be replaced with a complete, reviewed version before launch and before Meta app review.",
    lastUpdatedLabel: "Last updated",
    lastUpdated: "October 28, 2026",
    backHome: "Back to home",
    privacy: {
      title: "Privacy Policy",
      intro:
        "This policy explains what personal data Closr collects through this website and waitlist, why we collect it and what rights you have.",
      sections: [
        {
          heading: "Who we are",
          body: [
            "Closr (\"we\", \"us\") builds AI setters for WhatsApp, Instagram and Telegram. The product is in pre-launch. You can reach us at [contact email].",
          ],
        },
        {
          heading: "What we collect",
          body: [
            "When you join the waitlist we collect your email address, your business name (if you provide it), the channel you're most interested in and the language of the page you signed up on.",
            "We don't use advertising trackers on this website.",
          ],
        },
        {
          heading: "Why we collect it",
          body: [
            "Only to contact you about early access and product updates for Closr. Our legal basis is your consent, which you can withdraw at any time. We never sell your data.",
          ],
        },
        {
          heading: "Where it's stored",
          body: [
            "Waitlist data is stored in a database hosted by Supabase, which acts as our data processor. Only our server can write to it.",
          ],
        },
        {
          heading: "How long we keep it",
          body: ["Until you ask us to delete it, or until the waitlist closes, whichever comes first."],
        },
        {
          heading: "Your rights",
          body: [
            "Under the GDPR you can ask to access, correct or delete your data, or object to its processing, by emailing [contact email]. You can also complain to your data protection authority; in Romania that's ANSPDCP.",
          ],
        },
        {
          heading: "Messaging data (after launch)",
          body: [
            "Once Closr launches, this policy will also describe how we process messages from connected WhatsApp, Instagram and Telegram accounts, as required by those platforms.",
          ],
        },
      ],
    },
    terms: {
      title: "Terms of Service",
      intro: "These terms apply when you use the Closr website and join the waitlist.",
      sections: [
        {
          heading: "The waitlist",
          body: [
            "Joining the waitlist is free and doesn't create any obligation to buy. We may email you at the address you provided about early access and product updates.",
          ],
        },
        {
          heading: "Pre-launch information",
          body: [
            "Features, plans and prices on this website describe what we're building and may change before launch.",
          ],
        },
        {
          heading: "Acceptable use",
          body: [
            "Please don't submit false information, sign up other people without their permission, or try to disrupt or overload the website.",
          ],
        },
        {
          heading: "Liability",
          body: [
            "The website is provided as is. To the extent the law allows, we aren't liable for indirect losses arising from its use.",
          ],
        },
        {
          heading: "Contact",
          body: ["Questions about these terms? Email us at [contact email]."],
        },
      ],
    },
  },

  notFound: {
    title: "Page not found",
    body: "The page you're looking for doesn't exist or has moved.",
    cta: "Back to home",
  },
};

export type Dictionary = typeof en;
