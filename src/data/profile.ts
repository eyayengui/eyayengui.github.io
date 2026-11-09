/**
 * Personal information used across the site.
 * Leave a field empty ('') while it is unknown: the UI then shows a clearly
 * marked "coming soon" placeholder instead of a broken link.
 */
export interface Profile {
  name: string;
  initials: string;
  /** Professional email, e.g. 'eya.yengui@example.com' */
  email: string;
  /** Full URL, e.g. 'https://github.com/username' */
  github: string;
  /** Full URL, e.g. 'https://www.linkedin.com/in/username' */
  linkedin: string;
  /** Path relative to /public */
  cvFile: string;
}

export const profile: Profile = {
  name: 'Eya Yengui',
  initials: 'EY',
  email: 'yenguieya6@gmail.com',
  github: 'https://github.com/eyayengui',
  linkedin: 'https://www.linkedin.com/in/eya-yengui-423b60250/',
  cvFile: 'cv/Eya_Yengui_CV.pdf',
};

/** Resolve a file from /public, respecting the deployment base path. */
export const publicUrl = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

/** Resolve either an absolute URL or a /public relative path. */
export const resolveUrl = (path: string) => (/^https?:\/\//.test(path) ? path : publicUrl(path));
