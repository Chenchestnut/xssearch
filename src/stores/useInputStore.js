import { defineStore } from "pinia";

export const useInputStore = defineStore("input", {
  state: () => ({
    token: "",
    picture: "",
    userInfo: {
      name: "",
      email: "",
      id: "",
      permission: "",
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
      this.userInfo.name = userInfo.name || "";
      this.userInfo.email = userInfo.email || "";
      this.userInfo.id = userInfo.id || "";
      this.userInfo.permission = userInfo.permission || "";
    },
    removeToken() {
      this.token = "";
    },
    updatePermission(newPermission) {
      this.userInfo.permission = newPermission;
    },
  },
});
