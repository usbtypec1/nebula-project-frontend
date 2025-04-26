import type { Category } from "~/types/categories"

export const useCategoryList = () => {
  return useAuthorizedFetch<Category[]>("/v1/accounting/categories/", {
    transform: (data: { categories: Category[] }): Category[] => {
      return data.categories
    },
  })
}
