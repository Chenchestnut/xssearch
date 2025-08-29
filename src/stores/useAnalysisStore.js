import { defineStore } from "pinia";

export const useAnalysisStore = defineStore("analysisResults", {
  state: () => ({
    search_keyword: "",
    analysis: {
      summary: "",
      advantage: [],
      disadvantage: [],
      wordcloud: "",
    },
    all_reviews: [
      {
        star: "",
        // source_product: "",
        // source_platform: "",
        comment: "",
      },
    ],
  }),
  persist: true, // Enable persistence
  getters: {
    // momoReviews: (state) => {
    //   return state.all_reviews
    //     .filter((review) => review.source_platform === "momo")
    //     .slice(0, 3);
    // },
    // pchomeReviews: (state) => {
    //   return state.all_reviews
    //     .filter((review) => review.source_platform === "pchome")
    //     .slice(0, 3);
    // },
    // phone_padReviews: (state) => {
    //   return state.all_reviews
    //     .filter((review) => review.source_platform === "phone_pad")
    //     .slice(0, 3);
    // },
    // epriceReviews: (state) => {
    //   return state.all_reviews
    //     .filter((review) => review.source_platform === "eprice")
    //     .slice(0, 3);
    // },
  },
  actions: {
    saveAnalysisResults(data) {
      this.search_keyword = data.search_keyword;
      this.analysis = {
        summary: data.analysis.summary,
        advantage: data.analysis.positive_keywords,
        disadvantage: data.analysis.negative_keywords,
        wordcloud: data.analysis.word_cloud_data,
      };
      this.all_reviews = data.all_reviews.map((review) => ({
        // source_product: review.source_product,
        // source_platform: review.source_platform,
        comment: review.comment,
        star: review.star,
      }));
    },
  },
});
