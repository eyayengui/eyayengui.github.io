import { useEffect, useState } from 'react';
import { profile, publicUrl } from '../data/profile';

export type CvStatus = 'checking' | 'available' | 'missing';

let cached: Promise<CvStatus> | null = null;

/** Checks once whether the CV PDF really exists (SPA servers answer 200 + HTML for missing files). */
function checkCv(): Promise<CvStatus> {
  cached ??= fetch(publicUrl(profile.cvFile), { method: 'HEAD' })
    .then((res) => {
      const type = res.headers.get('content-type') ?? '';
      return res.ok && type.includes('pdf') ? 'available' : 'missing';
    })
    .catch((): CvStatus => 'missing');
  return cached;
}

export function useCvAvailable(): CvStatus {
  const [status, setStatus] = useState<CvStatus>('checking');
  useEffect(() => {
    let active = true;
    checkCv().then((s) => active && setStatus(s));
    return () => {
      active = false;
    };
  }, []);
  return status;
}

export const cvUrl = () => publicUrl(profile.cvFile);
