import type { UseFetchOptions } from "nuxt/app"

export function useAuthorizedFetch<T>(
  url: string | (() => string),
  options?: UseFetchOptions<T>
) {
  const { $authorizedFetch } = useNuxtApp()
  return useFetch(url, {
    ...options,
    $fetch: $authorizedFetch as typeof $fetch,
  })
}
