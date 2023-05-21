export default (url: string) => {
  const { data, error, execute } = useFetch(url)

  const isInitial = true
  const get = async () => {
    if (isInitial) {
      await execute({ _initial: true })
    } else {
      await execute({ _initial: false })
    }

    if (error) {
      showError('エラー')
    }
  }

  return { data, get }
}
