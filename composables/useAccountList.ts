import { type AccountsResponse } from "~/types/accounts"

export const useAccountList = () => {
  const runtimeConfig = useRuntimeConfig()

  return useFetch<AccountsResponse>("/v1/accounting/accounts/", {
    baseURL: runtimeConfig.app.baseURL,
    credentials: "include",
  })
}
