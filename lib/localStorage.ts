export const tdLocalStorage = {
  isAvailable: () => isLocalStorageAvailable(),
  getItem: (key: string) => {
    if (!isLocalStorageAvailable()) { return null }
    return window.localStorage.getItem(key)
  },
  setItem: (key: string, value: string) => {
    if (!isLocalStorageAvailable()) { return }
    window.localStorage.setItem(key, value)
  },
  removeItem: (key: string) => {
    if (!isLocalStorageAvailable()) { return }
    window.localStorage.removeItem(key)
  },
}

const isLocalStorageAvailable = () => {
  return typeof window !== 'undefined' && !!window.localStorage
}