import { defineStore } from "pinia";

export const useInputStore = defineStore("input", {
  state: () => ({
    text: "",
  }),
  actions: {
    setText(newText) {
      this.text = newText;
    },
  },
});
