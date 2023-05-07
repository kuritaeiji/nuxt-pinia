<script setup lang="ts">
import { useUserStore } from '@/stores/useUserStore'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { users } = storeToRefs(userStore)
const { fetchUsers } = userStore
await fetchUsers()
</script>

<template>
  <div>
    <table>
      <tbody>
        <tr
          v-for="user of users"
          :key="user.id"
        >
          <td>{{ user.id }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.isInitialUser }}</td>
          <td v-show="user.editable()">編集する</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
