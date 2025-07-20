import { defineStore } from "pinia";

export const useSearchStore = defineStore("searchResults", {
  state: () => ({
    search_keyword: "",
    matched_products_count: 0,
    matched_products: [],
    advantage: [],
    disadvantage: [],
    wordcloud: [],
    summary: "",
    all_reviews: [],
  }),
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
      this.advantage = data.advantage;
      this.disadvantage = data.disadvantage;
      this.wordcloud = data.wordcloud;
      this.summary = data.summary;
      this.all_reviews = data.all_reviews;
    },
  },
});
