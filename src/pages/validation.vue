<script setup lang="ts">
import useFields, {
  FieldsValidation,
  required,
  short
} from '../../composables/useFields'

const validationOption: FieldsValidation<{
  email: string
  name: string
}> = {
  email: {
    initialValue: '',
    inputValidations: [short(10)],
    blurValidations: [required]
  },
  name: {
    initialValue: '',
    inputValidations: [short(10)],
    blurValidations: [required]
  }
}

const { data, errorMessages, blurHandlers } = useFields(validationOption)
</script>

<template>
  <div>
    <NuxtLink to="/">ホームに戻る</NuxtLink>
    <input
      v-model="data.email"
      type="text"
      @blur="blurHandlers.email"
    />
    <div>{{ errorMessages.email }}</div>
    <input
      v-model="data.name"
      type="text"
      @blur="blurHandlers.name"
    />
    <div>{{ errorMessages.name }}</div>
  </div>
</template>
