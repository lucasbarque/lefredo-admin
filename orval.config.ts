import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: 'http://localhost:3333/docs/json',
    output: {
      target: './src/http/api.ts',
      client: 'fetch',
      httpClient: 'fetch',
      // baseUrl: 'http://localhost:3333',
      override: {
        fetch: {
          includeHttpResponseReturnType: true,
        },
        mutator: {
          path: './custom-fetch.ts',
          name: 'customFetch',
        },
      },
    },
  },
});
