type Data<Fields> = {
  [FieldName in keyof Fields]: Fields[FieldName]
}

type ValidationFn = {
  (value: any, fieldName: string, data?: any): void | string
}

type useFieldOption<FieldValue> = {
  initialValue: FieldValue
  inputValidations: ValidationFn[]
  blurValidations: ValidationFn[]
}

type ErrorMessages<Fields> = {
  [FieldName in keyof Fields]: string
}

type Handlers<Fields> = {
  [FieldName in keyof Fields]: () => void
}

export type FieldsValidation<Fields> = {
  [FieldName in keyof Fields]: useFieldOption<Fields[FieldName]>
}

export const required: ValidationFn = (value: string, fieldName: string) => {
  if (!value) {
    return `${fieldName}は必須項目です`
  }

  return undefined
}

export const short = (length: number) => (value: string, fieldName: string) => {
  if (!value) {
    return undefined
  }

  if (value.length > length) {
    return `${fieldName}は${length}以内で入力してください`
  }

  return undefined
}

export default function useFields<Fields extends object>(
  fieldsValidation: FieldsValidation<Fields>
) {
  const data = ref<Data<Fields>>(
    Object.keys(fieldsValidation).reduce((formObj, key) => {
      const fieldName = key as keyof Fields
      return {
        ...formObj,
        [fieldName]: fieldsValidation[fieldName].initialValue
      }
    }, {} as Data<Fields>)
  ) as Ref<Data<Fields>>

  const errorMessages = ref<ErrorMessages<Fields>>(
    Object.keys(fieldsValidation).reduce((messages, key) => {
      const fieldName = key as keyof Fields
      return { ...messages, [fieldName]: '' }
    }, {} as ErrorMessages<Fields>)
  )

  const inputHandlers = Object.keys(fieldsValidation).reduce(
    (handlers, key) => {
      const fieldName = key as keyof Fields
      const handler = () => {
        let errorMessage = ''
        fieldsValidation[fieldName].inputValidations.some(validationFn => {
          const result = validationFn(data.value[fieldName], key)
          if (result) {
            errorMessage = result
            return true
          }
          return false
        })
        errorMessages.value[fieldName] = errorMessage
      }
      return { ...handlers, [fieldName]: handler }
    },
    {} as Handlers<Fields>
  )

  const blurHandlers = Object.keys(fieldsValidation).reduce((handlers, key) => {
    const fieldName = key as keyof Fields
    const handler = () => {
      let errorMessage = ''
      fieldsValidation[fieldName].blurValidations.some(validationFn => {
        const result = validationFn(data.value[fieldName], key)
        if (result) {
          errorMessage = result
          return true
        }
        return false
      })
      errorMessages.value[fieldName] = errorMessage
    }
    return { ...handlers, [fieldName]: handler }
  }, {} as Handlers<Fields>)

  return { data, errorMessages, inputHandlers, blurHandlers }
}
