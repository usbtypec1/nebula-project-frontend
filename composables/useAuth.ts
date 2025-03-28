export const useAuth = () => {
  const runtimeConfig = useRuntimeConfig()

  const login = async (telegramId: number) => {
    await $fetch("/auth/token/test", {
      baseURL: runtimeConfig.public.apiBaseUrl,
      method: "POST",
      query: { telegram_id: telegramId },
      credentials: "include",
    })
  }

  return { login }
}
