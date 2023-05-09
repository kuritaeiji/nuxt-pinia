import { User } from '~/domain/User'

export default defineEventHandler(event => {
  const cookies = parseCookies(event)
  console.log(cookies)
  return [
    {
      id: 1,
      email: '1@pinia.com',
      isInitialUser: false
    },
    {
      id: 2,
      email: '2@pinia.com',
      isInitialUser: true
    }
  ] as User[]
})
