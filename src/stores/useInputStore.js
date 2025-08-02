import { defineStore } from "pinia";

export const useInputStore = defineStore("input", {
  state: () => ({
    token: "",
    picture: "",
  }),
  persist: true, // Enable persistence
  actions: {
    setToken(newToken) {
      this.token = newToken;
    },
    setPicture(newPicture) {
      this.picture = newPicture;
    },
    removeToken() {
      this.token = "";
    },
  },
});
