import { defineStore } from "pinia";

export const useRecommendStore = defineStore("recommendResults", {
  state: () => ({
    matched_products_count: 0,
    recommendation: [
      {
        id: "",
        name: "",
        img: "",
        reason: "",
        spec: [],
      },
    ],
    // analysis: {
    //   summary: "",
    //   advantage: [],
    //   disadvantage: [],
    //   wordcloud: [
    //     {
    //       name: "",
    //       image_base64: "",
    //     },
    //   ],
    // },
    // all_reviews: [
    //   {
    //     source_product: "",
    //     source_platform: "",
    //     comment: "",
    //   },
    // ],
  }),
  persist: true, // Enable persistence
  actions: {
    saveRecommendResults(data) {
      this.matched_products_count = data.length;
      this.recommendation = data.recommendation.map((product) => ({
        id: product.id,
        name: product.product_name,
        img: product.img,
        reason: product.summary,
        spec:
          typeof product.spec === "string"
            ? product.spec.split("+")
            : ["暫無規格"],
      }));
    },
  },
});
