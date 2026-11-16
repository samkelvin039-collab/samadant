/**
 * Single source of truth for Samad business content.
 * Used by the website sections AND by the AI assistant's knowledge prompt,
 * so the assistant never drifts from what the site actually says.
 */

export const CONTACT_EMAIL = "samad@fourthgroup.co";

export type ServiceId =
  | "listopia"
  | "bookclub"
  | "profile"
  | "tiktok"
  | "trailer"
  | "mockup"
  | "cover"
  | "review"
  | "social";

export interface Service {
  id: ServiceId;
  title: string;
  summary: string;
  howItWorks: string;
  howItHelps: string;
  tags: string[];
}

export const SERVICES: Service[] = [
  {
    id: "listopia",
    title: "Goodreads Listopia Promotion",
    summary: "Help your book appear on relevant reader-curated Goodreads lists.",
    howItWorks:
      "We research active Listopia lists that match your book's genre, themes, age category and comparable titles. We review each list's rules and suitability, then identify appropriate, policy-respecting placement opportunities.",
    howItHelps:
      "Relevant lists give interested readers another way to discover your title while browsing books in a genre or topic they already enjoy.",
    tags: ["Genre research", "Relevant lists", "Discovery strategy"],
  },
  {
    id: "bookclub",
    title: "Goodreads Book Club Promotion",
    summary: "Find book clubs and reader communities whose interests fit your title.",
    howItWorks:
      "We research relevant groups, review their posting and promotion rules, and prepare a respectful introduction or discussion angle suited to each community. Outreach is tailored, never mass-posted.",
    howItHelps:
      "The right community context can introduce your book to readers who already enjoy similar genres and encourage meaningful discussion.",
    tags: ["Community research", "Group guidelines", "Discussion prompts"],
  },
  {
    id: "profile",
    title: "Goodreads Profile Optimization",
    summary: "Make your author profile and book information complete and consistent.",
    howItWorks:
      "We review your author bio, profile image, book details, series information, links and reader-facing description, then prepare a tidy update checklist for your approval.",
    howItHelps:
      "A consistent profile gives curious readers a clearer place to learn about you and explore your other books.",
    tags: ["Author bio", "Book details", "Profile consistency"],
  },
  {
    id: "tiktok",
    title: "TikTok Book Features",
    summary: "Present your book in a short, engaging, BookTok-friendly video feature.",
    howItWorks:
      "We identify the strongest hook in your blurb, choose a visual direction, and shape a short feature around the genre, mood, characters or central question. The creative is built for vertical video and captions.",
    howItHelps:
      "A concise visual introduction helps viewers quickly understand the feel of your book and decide whether they want to learn more.",
    tags: ["BookTok concepts", "Vertical video", "Reader-first hooks"],
  },
  {
    id: "trailer",
    title: "Book Trailer Creation",
    summary: "Turn the mood and hook of your book into a polished promotional video.",
    howItWorks:
      "We define the audience and key hook, plan a short storyboard, select suitable visuals and licensed audio, add title and author details, and prepare versions sized for your chosen platforms.",
    howItHelps:
      "A trailer gives readers a quick, memorable sense of your book and becomes a reusable asset for your website, launch posts and author updates.",
    tags: ["Storyboard", "Video editing", "Social-ready formats"],
  },
  {
    id: "mockup",
    title: "Book Mockup Design",
    summary: "Showcase your cover in a professional, realistic book presentation.",
    howItWorks:
      "Using your approved cover artwork, we create clean 3D-style book mockups or promotional compositions with thoughtful backgrounds, lighting and layout for your intended channel.",
    howItHelps:
      "A polished mockup helps your book look presentation-ready across author websites, social posts, newsletters and launch announcements.",
    tags: ["3D-style presentation", "Promotional graphics", "Cover showcase"],
  },
  {
    id: "cover",
    title: "Book Cover Editing",
    summary: "Refine an existing cover so its presentation feels clear and cohesive.",
    howItWorks:
      "Starting from your supplied cover file and edit brief, we adjust agreed elements such as typography, spacing, colour balance, alignment and promotional crops while preserving the book's intended identity.",
    howItHelps:
      "A clean, readable cover helps readers quickly understand the title and genre, even when it appears as a small thumbnail.",
    tags: ["Typography polish", "Layout refinement", "Promo-ready crops"],
  },
  {
    id: "review",
    title: "Book Review and Media Outreach Support",
    summary: "Help your book reach suitable reviewers and book media opportunities.",
    howItWorks:
      "We research reviewers and book media who cover your genre, prepare a concise and accurate pitch, organise approved review-copy information, and track responses. Reviews and opinions always remain the reviewer's independent choice.",
    howItHelps:
      "Well-matched outreach helps your book reach people who regularly discuss books like yours, with a clearer, more professional request.",
    tags: ["Reviewer research", "Pitch preparation", "Outreach tracking"],
  },
  {
    id: "social",
    title: "Social Media Book Marketing",
    summary: "Build a consistent, book-centred presence across selected social channels.",
    howItWorks:
      "We define content themes, plan a realistic posting calendar, develop captions and creative ideas, and review engagement signals to improve future content. Posting access and approvals are agreed in advance.",
    howItHelps:
      "A steady, recognisable presence helps readers follow your author journey and gives each book more opportunities to be discovered over time.",
    tags: ["Content calendar", "Creative planning", "Community engagement"],
  },
];

export const SERVICE_OPTIONS = [...SERVICES.map((s) => s.title), "I'm not sure yet"] as const;

export const PROCESS_STEPS = [
  {
    title: "Share Your Book",
    body: "You provide your book details and promotional goals — title, genre, audience, stage of publication and what you'd like to focus on.",
  },
  {
    title: "Choose Your Service",
    body: "Samad helps identify a suitable promotional approach and shapes a clear, agreed scope around your book and priorities.",
  },
  {
    title: "Prepare the Promotion",
    body: "The promotional materials and agreed activities are prepared — assets, research, content or outreach — for your review.",
  },
  {
    title: "Launch the Feature",
    body: "The agreed promotional work is delivered, with an update on completed tasks and practical next steps.",
  },
];

export const WHY_CHOOSE = [
  {
    title: "Author-focused marketing",
    body: "Every plan starts with your book — its genre, voice, readers and your goals.",
  },
  {
    title: "Creative promotional strategies",
    body: "Hooks, visuals and angles shaped around what makes your story distinctive.",
  },
  {
    title: "Multiple promotional channels",
    body: "Goodreads, TikTok, social media, reviewers and creative assets under one roof.",
  },
  {
    title: "Professional book presentation",
    body: "Mockups, trailers and polished covers that help your book look ready to be read.",
  },
  {
    title: "Reader discovery opportunities",
    body: "Thoughtfully researched lists, communities and reviewers who fit your title.",
  },
  {
    title: "Personalised support",
    body: "A scope built for your book, not a one-size-fits-all package.",
  },
  {
    title: "Clear communication",
    body: "Agreed scope, understandable updates and organised delivery from start to finish.",
  },
];

export const TRAILER_REFERENCES = [
  {
    title: "The One",
    author: "Kiera Cass",
    genre: "Young adult · Romance",
    note: "A polished publisher trailer with a strong mood, clear stakes and memorable visual identity.",
    url: "https://www.youtube.com/watch?v=qVDfV7gCCFE",
  },
  {
    title: "Rogue Lawyer",
    author: "John Grisham",
    genre: "Legal thriller",
    note: "A useful reference for pairing a recognisable premise with fast, focused visuals.",
    url: "https://www.youtube.com/watch?v=rNl9xvEMiUY",
  },
  {
    title: "Explosive Eighteen",
    author: "Janet Evanovich",
    genre: "Mystery · Comedy",
    note: "A reference for using a familiar series identity and a brisk promotional rhythm.",
    url: "https://www.youtube.com/watch?v=w5a8rWoq17k",
  },
  {
    title: "Diary of a Wimpy Kid",
    author: "Jeff Kinney",
    genre: "Children's · Comedy",
    note: "A reference for playful tone and a visual approach suited to younger readers and families.",
    url: "https://www.youtube.com/watch?v=5LfSpYwqhow",
  },
];

export const PARTNERS = [
  { name: "Fourth Group & Co.", url: "https://vm.tiktok.com/ZS9UsTyWVSe47-rGmXg/" },
  { name: "Wordsmith and Writers", url: "https://vm.tiktok.com/ZS9UsTqNS6vyw-lmcQm/" },
];

export const SUGGESTED_QUESTIONS = [
  "What book promotion services do you offer?",
  "How does Goodreads Listopia promotion work?",
  "Do you offer TikTok book features?",
  "How much does book promotion cost?",
  "How do I get my book featured?",
  "What information do you need from authors?",
  "How do I get started with Samad?",
];

export const ASSISTANT_NAME = "Samad AI Assistant";

export const ASSISTANT_WELCOME =
  "Welcome to Samad! I'm here to help you understand our book marketing services, promotional options, and how we support authors. Feel free to ask me anything about promoting your book or working with Samad.";

export const ASSISTANT_DISCLOSURE =
  "I'm an AI assistant. My responses are intended to help you understand Samad's services. Please confirm important project details directly with the agency.";

export function mailtoForService(title: string) {
  const subject = encodeURIComponent(`Inquiry: ${title}`);
  const body = encodeURIComponent(
    `Hi Samad,\n\nI'm interested in learning more about ${title}.\n\nBook title:\nGenre:\nBook link:\n\nThank you.`,
  );
  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}
