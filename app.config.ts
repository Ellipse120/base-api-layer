export default defineAppConfig({
  myLayer: {
    name: 'Hello from Base API Nuxt layer'
  }
})

declare module '@nuxt/schema' {
  interface AppConfigInput {
    myLayer?: {
      /** Project name */
      name?: string
    }
  }
}
