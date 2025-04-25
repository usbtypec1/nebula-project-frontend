export default defineNuxtRouteMiddleware(async (to, from) => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated.value && to.name !== "auth-verify") {
    return navigateTo({ name: "auth-verify" })
  }
})
