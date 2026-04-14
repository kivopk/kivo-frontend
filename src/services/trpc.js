import { createTRPCClient, httpBatchLink } from '@trpc/client';

export const trpc = createTRPCClient({
  links: [
    httpBatchLink({
      url: import.meta.env.VITE_API_URL || 'http://localhost:4000/trpc',
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
