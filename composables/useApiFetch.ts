import type { UseFetchOptions } from "nuxt/app";

export function useApiFetch<T>(
  url: string | (() => string),
  options?: UseFetchOptions<T>
) {
  const runtimeConfig = useRuntimeConfig();
  const accessToken = useCookie("accessToken");
  return useFetch(url, {
    ...options,
    baseURL: runtimeConfig.public.apiBaseUrl,
    async onRequest({ options }) {
      if (!accessToken.value) {
        await navigateTo({ name: "auth-failed" });
      } else {
        options.headers.set("Authorization", `Bearer ${accessToken.value}`);
      }
    },
    $fetch: useNuxtApp().$api as typeof $fetch,
  });
}
