import { createTRPCClient, httpBatchLink } from '@trpc/client';

const getBaseUrl = () => {
  // Leverage Vercel Server-Side Rewrite Proxy in production to completely bypass CORS issues
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    return '/trpc';
  }

  let url = import.meta.env.VITE_API_URL || 'http://localhost:4000/trpc';
  // Ensure it doesn't end with a slash to avoid double slashes when TRPC appends paths
  if (url.endsWith('/')) {
    url = url.slice(0, -1);
  }
  return url;
};

export const trpc = createTRPCClient({
  links: [
    httpBatchLink({
      url: getBaseUrl(),
      // Pass JWT authorization header
      headers() {
        const token = localStorage.getItem('access_token');
        return {
          Authorization: token ? `Bearer ${token}` : undefined,
        };
      },
    }),
  ],
});
