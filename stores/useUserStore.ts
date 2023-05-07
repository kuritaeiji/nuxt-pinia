import { User } from '~~/domain/User'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state() {
    return {
      users: [] as User[]
    }
  },
  actions: {
    async fetchUsers() {
      const { data }: { data: Ref<User[]> } = await this.$get('/api/users')
      this.users = data.value.map(u => new User(u.id, u.email, u.isInitialUser))
    }
  }
})
