import { type RefreshResponse, type LoginResponse } from "~/types/auth"

export function useAuth() {
  const accessToken = useCookie<string | null>("access_token", {
    default: () => null,
  })
  const refreshToken = useCookie<string | null>("refresh_token", {
    default: () => null,
  })

  const isAuthenticated = computed((): boolean => accessToken.value !== null)

  const runtimeConfig = useRuntimeConfig()

  const login = async (initData: string) => {
    try {
      const responseData = await $fetch<LoginResponse>("/auth/token/", {
        baseURL: runtimeConfig.public.apiBaseUrl,
        method: "POST",
        body: { init_data: initData },
      })

      accessToken.value = responseData.access
      refreshToken.value = responseData.refresh
    } catch (error) {}
  }

  const logout = () => {
    // Пока что оставим пустым, можно будет добавить очищение/редирект
  }

  const refresh = async () => {
    if (!refreshToken.value) throw new Error("No refresh token")

    const responseData = await $fetch<RefreshResponse>("/auth/token/refresh/", {
      baseURL: runtimeConfig.public.apiBaseUrl,
      method: "POST",
      body: { refresh: refreshToken.value },
    })

    accessToken.value = responseData.access
  }

  return {
    login,
    logout,
    refresh,
    accessToken,
    refreshToken,
    isAuthenticated,
  }
}
