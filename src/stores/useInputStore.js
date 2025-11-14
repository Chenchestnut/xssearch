import { defineStore } from "pinia";

export const useInputStore = defineStore("input", {
  state: () => ({
    token: "",
    picture: "",
    name: "",
    email: "",
    id: "",
  }),
  persist: true, // Enable persistence
  actions: {
    setToken(newToken) {
      this.token = newToken;
    },
    setPicture(newPicture) {
      this.picture = newPicture;
    },
    setUserInfo(userInfo) {
      this.name = userInfo.name || "";
      this.email = userInfo.email || "";
      this.id = userInfo.id || "";
    },
    removeToken() {
      this.token = "";
    },
  },
});
