import { defineStore } from "pinia";

export const useSearchStore = defineStore("searchResults", {
  state: () => ({
    search_keyword: "",
    matched_products_count: 0,
    matched_products: [],
    analysis: {
      summary: "",
      advantage: [],
      disadvantage: [],
      wordcloud: {},
    },
    all_reviews: [
      {
        source_product: "",
        source_platform: "",
        comment: "",
      },
    ],
  }),
  getters: {
    momoReviews: (state) => {
      return state.all_reviews
        .filter((review) => review.source_platform === "momo")
        .slice(0, 3);
    },
    pchomeReviews: (state) => {
      return state.all_reviews
        .filter((review) => review.source_platform === "pchome")
        .slice(0, 3);
    },
    tReviews: (state) => {
      return state.all_reviews
        .filter((review) => review.source_platform === "t")
        .slice(0, 3);
    },
    epriceReviews: (state) => {
      return state.all_reviews
        .filter((review) => review.source_platform === "eprice")
        .slice(0, 3);
    },
  },
  actions: {
    // setKeyword(newKeyword) {
    //   this.search_keyword = newKeyword;
    // },
    // setMatchedProductsCount(newCount) {
    //   this.matched_products_count = newCount;
    // },
    // setMatchedProducts(newProducts) {
    //   this.matched_products = newProducts;
    // },
    // setAdvantage(newAdvantage) {
    //   this.advantage = newAdvantage;
    // },
    // setDisadvantage(newDisadvantage) {
    //   this.disadvantage = newDisadvantage;
    // },
    // setWordcloud(newWordcloud) {
    //   this.wordcloud = newWordcloud;
    // },
    // setSummary(newSummary) {
    //   this.summary = newSummary;
    // },
    // setReview(newAllReview) {
    //   this.all_reviews = newAllReview;
    // },
    saveSearchResults(data) {
      this.search_keyword = data.keyword;
      this.matched_products_count = data.matched_products_count;
      this.matched_products = data.matched_products;
      this.analysis = {
        summary: data.analysis.summary,
        advantage: data.analysis.positive_keywords,
        disadvantage: data.analysis.negative_keywords,
        wordcloud: data.analysis.word_cloud_data,
      };
      this.all_reviews = data.all_reviews.map((review) => ({
        source_product: review.source_product,
        source_platform: review.source_platform,
        comment: review.comment,
      }));
    },
  },
});
