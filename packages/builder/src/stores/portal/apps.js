import { writable } from "svelte/store"
import { get } from "builderStore/api"

export function createAppStore() {
  const store = writable([])

  async function load(status = "") {
    try {
      const res = await get(`/api/applications?status=${status}`)
      const json = await res.json()
      if (res.ok && Array.isArray(json)) {
        store.set(json)
      } else {
        store.set([])
      }
      return json
    } catch (error) {
      store.set([])
    }
  }

  return {
    subscribe: store.subscribe,
    load,
  }
}

export const apps = createAppStore()
