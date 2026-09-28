import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/demo"].map((path) => ({
    url: `${SITE_URL}/en${path}`,
    alternates: { languages: { en: `${SITE_URL}/en${path}`, ar: `${SITE_URL}/ar${path}` } },
  }));
}
