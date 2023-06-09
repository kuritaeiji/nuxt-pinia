import { Pinia, PiniaPlugin } from 'pinia'

export default defineNuxtPlugin(({ $pinia }) => {
  const pinia = $pinia as Pinia
  // const instance = axios.create({
  //   baseURL: process.server
  //     ? 'http://localhost:3000/api'
  //     : 'http://localhost:3000/api',
  //   timeout: 3000,
  //   withCredentials: true
  // })

  // const piniaPlugin: PiniaPlugin = () => ({
  //   async $get(url: string, params?: { [key: string]: any }) {
  //     const { data, error } = await useAsyncData(async () => {
  //       let config: AxiosRequestConfig
  //       const cookie = useRequestHeaders(['cookie']).cookie
  //       if (process.server && cookie) {
  //         config = { params, headers: { Cookie: cookie } }
  //       } else {
  //         config = { params }
  //       }
  //       return await instance.get(url, config)
  //     })
  //     if (error.value) {
  //       showError(error.value)
  //     }

  //     return unref(data)!
  //   }
  // })

  const headers = useRequestHeaders(['cookie'])

  const piniaPlugin: PiniaPlugin = () => ({
    $get(url: string) {
      if (process.server && headers) {
        console.log('server')
        return useFetch(url, { headers })
      }

      return useFetch(url)
    }
  })

  pinia.use(piniaPlugin)
})
