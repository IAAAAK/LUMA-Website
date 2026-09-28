// English copy, taken from design/home-en-desktop.html.
// ar.ts must provide the same shape (enforced by the Dictionary type).

const en = {
  meta: {
    title: "LUMA — AI agents & WhatsApp solutions",
    description:
      "LUMA builds AI agents that answer, qualify and follow up on WhatsApp, your website, your app and by voice — with human handoff built in.",
  },
  nav: {
    homeLabel: "LUMA home",
    product: "Product",
    how: "How it works",
    integrations: "Integrations",
    pricing: "Pricing",
    faq: "FAQ",
    signIn: "Sign in",
    bookDemo: "Book a demo",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    switchLabel: "العربية",
  },
  hero: {
    badge: "AI agents + WhatsApp Business API",
    title: "Turn every WhatsApp conversation into a qualified lead.",
    lead: "LUMA builds AI agents that answer, qualify and follow up — on WhatsApp, your website, your app and by voice — then hand off to your team the moment a human is needed.",
    primary: "Book a demo",
    secondary: "See pricing",
    checks: ["Plans from $50/month", "Inbound messages are free", "Human handoff built in"],
    chat: {
      name: "Sales Assistant",
      status: "AI agent · WhatsApp",
      messages: [
        { from: "customer", text: "Hi, I need a quote for 20 laptops for our new office." },
        { from: "agent", text: "Happy to help! Which city are you in, and when do you need them delivered?" },
        { from: "customer", text: "Dubai, before the end of the month." },
        { from: "agent", text: "Perfect. I've passed your request to our sales team — someone will call you today." },
      ],
      qualified: "Lead qualified · assigned to sales",
      placeholder: "Type a message",
    },
    campaign: { label: "CAMPAIGN", title: "Q4 offers — VIP list", note: "Sending via approved template" },
    handoff: { title: "Handed to a human", note: "Agent joined the chat" },
  },
  trust: { label: "Trusted by growing teams across the GCC", placeholder: "[CLIENT LOGO]" },
  features: {
    eyebrow: "ONE PLATFORM",
    title: "Everything your team needs to sell and support on WhatsApp.",
    lead: "Build an agent once, train it on your knowledge base, and put it to work across every channel your customers use.",
    items: [
      { title: "AI agents with a knowledge base", body: "Create an agent, give it your documents and FAQs, and link it to your website or app in minutes." },
      { title: "WhatsApp campaigns at scale", body: "Send offers, reminders and announcements through the official WhatsApp Business API with approved templates." },
      { title: "Lead capture & qualification", body: "Agents ask the right questions, capture details and pass only qualified leads to your sales team." },
      { title: "Voice AI chat", body: "Let customers talk to your agent by voice — same knowledge, same qualification flow." },
      { title: "Human handoff & team inbox", body: "When a conversation needs a person, your team takes over in one shared inbox — with full context." },
      { title: "Contacts, audiences & usage", body: "Segment contacts for targeted campaigns and track every credit in a clear usage ledger." },
    ],
  },
  how: {
    eyebrow: "HOW IT WORKS",
    title: "Live in three steps.",
    steps: [
      { title: "Create your agent", body: "Set its tone and goals, then upload your knowledge base — products, prices, policies." },
      { title: "Connect your channels", body: "Link your WhatsApp Business number, website and app. Add your team as users." },
      { title: "Engage, qualify, hand off", body: "Your agent answers around the clock, runs campaigns and passes hot leads to your people." },
    ],
  },
  integrations: {
    eyebrow: "INTEGRATIONS",
    title: "Connected to the systems you already run.",
    lead: "Send invoices and documents straight to customers and vendors on WhatsApp, and launch campaigns from inside your ERP or CRM.",
    list: ["Microsoft Dynamics 365 Business Central", "Custom integrations built by Innovative Tech", "[MORE INTEGRATIONS]"],
    flow: [
      { label: "YOUR ERP / CRM", title: "Business Central", note: "Invoice · Send via WhatsApp" },
      { label: "PLATFORM", title: "LUMA", note: "Picks template · sends" },
      { label: "CUSTOMER", title: "WhatsApp", note: "Invoice received" },
    ],
  },
  useCases: {
    title: "Built for every team that talks to customers.",
    items: [
      { title: "Sales", body: "Capture and qualify inbound leads 24/7, then route them to the right rep." },
      { title: "Customer support", body: "Answer common questions instantly from your knowledge base; escalate the rest." },
      { title: "Finance", body: "Deliver invoices, statements and reminders where customers actually read them." },
      { title: "Marketing", body: "Run segmented WhatsApp campaigns and announcements with approved templates." },
    ],
  },
  pricing: {
    eyebrow: "PRICING",
    title: "Simple plans. Pay for what you send.",
    monthly: "Monthly",
    yearly: "Yearly · save 25%",
    perMonth: "/month",
    perMonthYearly: "/mo, billed yearly",
    mostPopular: "MOST POPULAR",
    plans: {
      starter: {
        name: "Starter",
        tagline: "For small teams getting started",
        cta: "Choose Starter",
        features: ["2 AI agents", "60,000 credits / month", "5,000 WhatsApp messages", "1 number · 2 users", "Email support"],
      },
      pro: {
        name: "Pro",
        tagline: "For growing sales & support teams",
        cta: "Choose Pro",
        features: ["10 AI agents", "900,000 credits / month", "75,000 WhatsApp messages", "3 numbers · 10 users", "Priority support & onboarding"],
      },
      enterprise: {
        name: "Enterprise",
        tagline: "For high-volume operations",
        cta: "Talk to sales",
        features: ["Unlimited AI agents", "3,000,000 credits / month", "250,000 WhatsApp messages", "Unlimited numbers & users", "Dedicated support & SLA"],
      },
    },
    metaNote: "Meta's WhatsApp conversation fees are billed separately by Meta and are not included in LUMA plans.",
  },
  credits: {
    eyebrow: "HOW CREDITS WORK",
    title: "Transparent usage. No surprises.",
    lead: "Estimate what you'll use, pick the plan that fits, and top up only when you need more.",
    topUpCallout: {
      strong: "Need a little more?",
      before: "Top up any paid plan with",
      offer: "200,000 extra credits for just $20",
      after: "(~3,333 AI messages). No plan change, no commitment. Buy as many as you need. Top-up credits never expire.",
    },
    whatCallout: {
      strong: "What are AI Credits?",
      before: "AI Credits power every interaction — text replies, voice calls and training.",
      rate: "$1 = 10,000 credits.",
      after: "Top up $20 for 200,000 extra credits (~3,333 AI messages).",
    },
    stats: [
      { value: "200,000", label: "credits for just $20" },
      { value: "60", label: "credits per AI message" },
      { value: "600", label: "credits per voice AI minute" },
      { value: "3,333", label: "AI messages for just $20" },
    ],
    calculator: {
      title: "AI Credit Calculator",
      subtitle: "Estimate your monthly usage and find the right plan. (AI messages & voice only)",
      messagesLabel: "AI Messages / month",
      minutesLabel: "Voice AI minutes / month",
      messagesMax: "10,000+",
      minutesMax: "500+",
      messagesRow: "AI Messages ({n} × 60)",
      voiceRow: "Voice AI ({n} min × 600)",
      totalRow: "Total credits / month",
      recommended: "RECOMMENDED PLAN",
      included: "{n} credits/month included",
      getPlan: "Get {plan}",
    },
    packs: {
      title: "Top-up packs",
      note: "WhatsApp: 12 credits per outbound message · inbound & session messages free",
    },
  },
  faq: {
    title: "Questions, answered.",
    items: [
      { q: "Are WhatsApp fees included in my plan?", a: "No. Meta bills its WhatsApp conversation fees directly to your Meta Business account. Your LUMA plan covers the platform, AI agents, campaigns and support." },
      { q: "What happens if I run out of credits?", a: "Add a one-time top-up pack from $20. Top-up credits never expire." },
      { q: "Can a real person take over a conversation?", a: "Yes. Human handoff lets your team step in at any point, with the full chat history in view." },
      { q: "Can LUMA connect to our ERP or CRM?", a: "Yes — Business Central is supported today, and Innovative Tech builds custom integrations for other systems." },
    ],
  },
  cta: {
    title: "See LUMA working on your own WhatsApp number.",
    lead: "A 30-minute demo, tailored to your business.",
    primary: "Book a demo",
    whatsapp: "Chat with us on WhatsApp",
  },
  footer: {
    tagline: "AI agents for WhatsApp, web, app and voice. A product of Innovative Tech.",
    product: "Product",
    features: "Features",
    pricing: "Pricing",
    integrations: "Integrations",
    company: "Company",
    about: "About Innovative Tech",
    privacy: "Privacy policy",
    terms: "Terms",
    contact: "Contact",
    email: "[EMAIL]",
    phone: "[PHONE / WHATSAPP]",
    office: "[OFFICE LOCATION]",
  },
  demo: {
    metaTitle: "Book a demo — LUMA",
    title: "Book your LUMA demo",
    lead: "Tell us a little about your business and we'll show you LUMA working on WhatsApp — in 30 minutes.",
    name: "Full name",
    email: "Work email",
    whatsapp: "WhatsApp number",
    company: "Company",
    country: "Country",
    useCase: "What would you like to use LUMA for? (optional)",
    consentData: "I agree that LUMA may process my details to arrange a demo, as described in the {privacy}.",
    consentWhatsapp: "I agree to be contacted by LUMA on WhatsApp about my demo request.",
    privacyLink: "privacy policy",
    submit: "Request my demo",
    submitting: "Sending…",
    planInterest: "Plan you're interested in: {plan}",
    errors: {
      required: "Please fill in all required fields and accept both checkboxes.",
      server: "Something went wrong. Please try again, or chat with us on WhatsApp.",
      captcha: "Please complete the security check.",
    },
    thanks: {
      title: "Thank you — we've got your request.",
      body: "Our team will contact you shortly on WhatsApp or email to schedule your demo.",
      back: "Back to the homepage",
    },
  },
  legal: {
    privacyTitle: "Privacy policy",
    termsTitle: "Terms of service",
    placeholder: "This page is being prepared and will be published before launch.",
    back: "Back to the homepage",
  },
};

type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? Widen<U>[]
    : { [K in keyof T]: Widen<T[K]> };

export type Dictionary = Widen<typeof en>;

export default en satisfies Dictionary;
