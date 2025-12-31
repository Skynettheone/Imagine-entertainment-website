export const socialLinks = {
  facebook: "https://facebook.com/imaginesl",
  instagram: "https://instagram.com/imagine_sl",
  tiktok: "https://tiktok.com/@imagineentertainment",
  youtube: "https://youtube.com/@imagineentertainment",
  linkedin: "https://linkedin.com/company/imagine-entertainment-pvt-ltd",
} as const;

export type SocialPlatform = keyof typeof socialLinks;
