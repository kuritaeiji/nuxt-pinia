import { Pinia, PiniaPlugin } from 'pinia'
import axios, { AxiosRequestConfig } from 'axios'

export default defineNuxtPlugin(({ $pinia }) => {
  const pinia = $pinia as Pinia
  const instance = axios.create({
    baseURL: process.server
      ? 'http://localhost:3000/api'
      : 'http://localhost:3000/api',
    timeout: 3000,
    withCredentials: true
  })

  const piniaPlugin: PiniaPlugin = () => ({
    $get(url: string, params?: { [key: string]: any }) {
      const { data, error } = useAsyncData(() => {
        let config: AxiosRequestConfig
        const cookie = useRequestHeaders(['cookie']).cookie
        if (process.server && cookie) {
          config = { params, headers: { Cookie: cookie } }
        } else {
          config = { params }
        }
        return instance.get(url, config)
      })
      if (error.value) {
        showError(error.value)
      }

      return unref(data)!
    }
  })

  pinia.use(piniaPlugin)
})
