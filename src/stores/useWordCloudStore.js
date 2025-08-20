import { defineStore } from "pinia";

export const useWordCloudStore = defineStore("wordCloudIndex", {
  state: () => ({
    wordCloudIndex: "",
  }),
  persist: true, // Enable persistence
  actions: {
    setWordCloudIndex(index) {
      this.wordCloudIndex = index;
    },
  },
});
