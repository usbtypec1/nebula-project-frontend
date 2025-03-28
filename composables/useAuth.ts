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

  return { login }
}
