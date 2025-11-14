import VWave from 'v-wave'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VWave)
})
