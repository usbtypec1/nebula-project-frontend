<template>
  <div class="flex justify-center mt-12">
    <ProgressSpinner />
  </div>
</template>

<script setup lang="ts">
import { useWebApp } from "vue-tg"

let { initData } = useWebApp()
initData = "user=%7B%22id%22%3A896678539%2C%22first_name%22%3A%22Eldos%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22usbtypec%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2F-oiEvK_9XDcCqcadgr9ID9tvhq4oSraVDn3BVTA2JT8.svg%22%7D&chat_instance=-3112389086695501293&chat_type=private&auth_date=1740114286&signature=8yzxyMxFG06lMhZi2W9QDudctfBpx9n4sN7j02B8-kMxHOvUhgl7DXWDAN4iaC9xIQsuJoOpQlK-uosF2g2vDg&hash=2774c318e827c4027ba35bf2fb9d40e3713afe2efc548bd26197ae68ebc74241"

const { login, refresh, refreshToken, isAuthenticated } = useAuth()

onMounted(async () => {
  if (refreshToken.value) {
    await refresh()
  } else if (initData && initData.length > 0) {
    await login(initData)
  }
  if (isAuthenticated.value) {
    await navigateTo({ name: "index" })
  } else {
    await navigateTo({ name: "auth-failed" })
  }
})
</script>
