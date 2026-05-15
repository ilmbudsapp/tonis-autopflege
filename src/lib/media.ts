import { GALLERY_WEBP_FILENAMES } from "@/generated/galleryWebp";
import { WORK_VIDEO_CLIPS } from "@/generated/workVideos";
import { BASE } from "@/lib/assets";

export const GALLERY_IMAGE_URLS = GALLERY_WEBP_FILENAMES.map((f) => `${BASE}assets/gallery-webp/${f}`);

const WORK_VIDEO_BASE = `${BASE}assets/videos/work/`;

export type WorkVideoClip = {
  src: string;
  poster: string;
  title: string;
  text: string;
};

export const WORK_VIDEOS: WorkVideoClip[] = WORK_VIDEO_CLIPS.map((c, i) => ({
  src: `${WORK_VIDEO_BASE}${c.file}`,
  poster: `${WORK_VIDEO_BASE}posters/${c.poster}`,
  title: `Referenzvideo ${i + 1}`,
  text: "Ausschnitt aus der Aufbereitung — Politur, Innenraum oder Finish.",
}));
