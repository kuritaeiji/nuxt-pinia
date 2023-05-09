import 'pinia'
import { NuxtApp } from 'nuxt/app'

declare module 'pinia' {
  export interface PiniaCustomProperties {
    // $get(
    //   url: string,
    //   params?:
    //     | {
    //         [key: string]: any
    //       }
    //     | undefined
    // ): AxiosResponse<any, any>
    $get(url: string): AsyncData<unknown, FetchError<any> | null>
  }
}
