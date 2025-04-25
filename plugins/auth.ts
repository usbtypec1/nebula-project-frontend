export default defineNuxtPlugin((nuxtApp) => {
  const { accessToken } = useAuth()
  const runtimeConfig = useRuntimeConfig()

  const authorizedFetch = $fetch.create({
    baseURL: runtimeConfig.public.apiBaseUrl,
    onRequest({ options }) {
      if (accessToken.value) {
        console.log("Adding Authorization header")
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${accessToken.value}`,
        }
      }
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        await nuxtApp.runWithContext(() => navigateTo({ name: "auth-verify" }))
      }
    },
  })
  return {
    provide: {
      authorizedFetch,
    },
  }
})
