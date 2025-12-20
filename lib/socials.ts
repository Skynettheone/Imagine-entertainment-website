export const socialLinks = {
  facebook: "https://facebook.com",
  instagram: "https://instagram.com",
  twitter: "https://twitter.com",
  linkedin: "https://linkedin.com",
} as const;

export type SocialPlatform = keyof typeof socialLinks;
