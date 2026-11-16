import { z } from "zod";

import { SERVICE_OPTIONS } from "@/lib/site-content";

/** Shared by the contact form (client-side) and the submit server function (server-side). */
export const inquirySchema = z.object({
  fullName: z.string().trim().min(1, "Please enter your full name.").max(100, "Name must be under 100 characters."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .email("Please enter a valid email address.")
    .max(255, "Email must be under 255 characters."),
  bookTitle: z.string().trim().min(1, "Please enter your book title.").max(200, "Title must be under 200 characters."),
  bookLink: z
    .string()
    .trim()
    .max(500, "Link must be under 500 characters.")
    .refine((v) => v === "" || /^https?:\/\/[^\s]+\.[^\s]+$/i.test(v), "Please enter a full link starting with http:// or https://."),
  service: z
    .string()
    .min(1, "Please choose a service.")
    .refine((v) => (SERVICE_OPTIONS as readonly string[]).includes(v), "Please choose a service from the list."),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more (at least 10 characters).")
    .max(3000, "Message must be under 3,000 characters."),
  // Honeypot: real visitors never see or fill this field.
  website: z.string().max(0).optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
