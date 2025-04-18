export const useAuth = () => {
  const runtimeConfig = useRuntimeConfig()

  const login = async (initData: string) => {
    await $fetch("/auth/token/", {
      baseURL: runtimeConfig.public.apiBaseUrl,
      method: "POST",
      body: { init_data: initData },
      credentials: "include",
    })
  }

  const loginTest = async (userId: number) => {
    await $fetch("/auth/token/", {
      baseURL: runtimeConfig.public.apiBaseUrl,
      method: "POST",
      body: { user_id: userId },
      credentials: "include",
    })
  }

  return { login, loginTest }
}
