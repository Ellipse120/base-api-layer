export default defineNuxtPlugin((nuxtApp) => {
  // const { session } = useUserSession()

  const api: typeof $fetch = $fetch.create({
    baseURL: '',
    onRequest({ options }) {
      // if (session.value?.token) {
      //   options.headers.set('Authorization', `Bearer ${session.value?.token}`)
      // }
    },
    async onResponseError({ response }) {
      if (response.status === 400) {
        console.error(response._data?.message, ' ===Error')
      }
      if (response.status === 401) {
        await nuxtApp.runWithContext(() => navigateTo('/login'))
      }
    },
  })

  return {
    provide: {
      api,
    },
  }
})
