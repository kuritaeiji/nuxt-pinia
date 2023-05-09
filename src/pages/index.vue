<script setup lang="ts">
import { storeToRefs } from 'pinia'
// import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import useUserStore from '@/stores/useUserStore'

const userStore = useUserStore()
const { users } = storeToRefs(userStore)
const { fetchUsers } = userStore
await fetchUsers()
console.log(users)

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().required().email()
})

useForm({
  validationSchema: schema
})

// const a = {
//   a: 1,
//   b: 2
// }

// type BlurHandlers = {
//   [key in keyof typeof a as `blur-${key}`]: string
// }

// const { value: name, errorMessage: nameError } = useField('name')
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
