import { defineStore } from "pinia";

export const useInputStore = defineStore("input", {
  state: () => ({
    picture: "",
  }),
  persist: true, // Enable persistence
  actions: {
    setPicture(newPicture) {
      this.picture = newPicture;
    },
  },
});
