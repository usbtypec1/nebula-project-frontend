import { type AccountsResponse } from "~/types/accounts"

export const useAccountList = () => {
  return useAuthorizedFetch<AccountsResponse>("/v1/accounting/accounts/")
}
