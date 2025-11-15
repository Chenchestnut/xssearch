import { defineStore } from "pinia";
import { use } from "react";

export const useInputStore = defineStore("input", {
  state: () => ({
    token: "",
    picture: "",
    userInfo: {
      name: "",
      email: "",
      id: "",
      permissions: "",
    },
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
      this.permissions = userInfo.permissions || "";
    },
    removeToken() {
      this.token = "";
    },
  },
});
