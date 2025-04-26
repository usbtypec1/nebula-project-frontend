import { type Account, type AccountsResponse } from "~/types/accounts"

export const useAccountList = () => {
  return useAuthorizedFetch<AccountsResponse>("/v1/accounting/accounts/")
}

export const useAccountById = (accountId: number) => {
  const url = `/v1/accounting/accounts/${accountId}/`
  return useAuthorizedFetch<Account>(url)
}

export const useGroupedAccounts = (
  accounts: Ref<Account[]>,
  maxSize: number
) => {
  const groupedAccounts = computed(() => {
    const groups: Account[][] = []
    for (let i = 0; i < accounts.value.length; i += maxSize) {
      groups.push(accounts.value.slice(i, i + maxSize))
    }
    return groups
  })
  const shouldInsertButton = (groupIndex: number, groupLength: number) => {
    const isLastGroup = groupIndex === groupedAccounts.value.length - 1
    return isLastGroup && groupLength < maxSize
  }
  const shouldAddSeparateButton = computed(() => {
    const lastGroup = groupedAccounts.value.at(-1)
    return (
      groupedAccounts.value.length === 0 ||
      (lastGroup && lastGroup.length === maxSize)
    )
  })

  return {
    groupedAccounts,
    shouldInsertButton,
    shouldAddSeparateButton,
  }
}
