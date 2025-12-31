export const socialLinks = {
  facebook: "https://www.facebook.com/imagineentertainment",
  instagram: "https://www.instagram.com/imagine.ent.sl",
  tiktok: "https://www.tiktok.com/@imagineentertainmentsl",
  youtube: "https://youtube.com/@theimagineent",
  linkedin: "https://www.linkedin.com/company/imagineentertainmentsl",
} as const;

export type SocialPlatform = keyof typeof socialLinks;
