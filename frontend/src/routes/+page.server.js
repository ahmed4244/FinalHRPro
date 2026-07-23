import { redirect } from '@sveltejs/kit';

// The app is the career tracker — open straight onto it.
export const load = () => {
  throw redirect(307, '/ladder');
};
