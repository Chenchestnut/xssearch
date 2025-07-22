import { defineStore } from "pinia";

export const useInputStore = defineStore("input", {
  state: () => ({
    text: "",
  }),
  persist: true, // Enable persistence
  actions: {
    setText(newText) {
      this.text = newText;
    },
  },
});
