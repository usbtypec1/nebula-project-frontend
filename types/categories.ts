export enum CategoryType {
    Expense = 1,
    Income = 2,
}

export interface Category {
    id: number
    name: string
    parent_id: number | null
    type: CategoryType
    created_at: string
    updated_at: string
}

export interface CategoryCreateEvent {
    name: string
    type: CategoryType
}
