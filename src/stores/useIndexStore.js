import { defineStore } from "pinia";

export const useIndexStore = defineStore("Index", {
  state: () => ({
    index: "",
  }),
  persist: true, // Enable persistence
  actions: {
    setIndex(index) {
      this.index = index;
    },
  },
});
