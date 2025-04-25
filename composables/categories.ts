export const useCategories = () => {
  const runtimeConfig = useRuntimeConfig()

  const { data, status } = useFetch("/v1/accounting/categories/", {
    baseURL: runtimeConfig.public.apiBaseUrl,
    method: "GET",
    credentials: "include",
  })

  return { data, status }
}
