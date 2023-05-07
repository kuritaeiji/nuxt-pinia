import { User } from '~~/domain/User'
import { defineStore } from 'pinia'
import { AxiosResponse } from 'axios'

export const useUserStore = defineStore('user', {
  state() {
    return {
      users: [] as User[]
    }
  },
  actions: {
    async fetchUsers() {
      const res: AxiosResponse<User[]> = await this.$get('/users')
      this.users = res.data.map(u => new User(u.id, u.email, u.isInitialUser))
    }
  }
})
