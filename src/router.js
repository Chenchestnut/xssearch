import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./components/HomePage.vue";
import LogIn from "./components/LogIn.vue";
import Register from "./components/Register.vue";
import SearchPage from "./components/SearchPage.vue";
import SearchPageCache from "./components/SearchPageCache.vue";
import SearchResult from "./components/SearchResult.vue";
import RecommendPage from "./components/RecommendPage.vue";
import RecommendPageCache from "./components/RecommendPageCache.vue";
import RecommendResult from "./components/RecommendResult.vue";
import Membership from "./components/Membership.vue";
import ComparePage from "./components/ComparePage.vue";
import CompareResult from "./components/CompareResult.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/login", component: LogIn },
  // { path: "/register", component: Register },
  { path: "/search", component: SearchPage },
  { path: "/searchPagecache", component: SearchPageCache },
  { path: "/searchResult", component: SearchResult },
  { path: "/recommend", component: RecommendPage },
  { path: "/recommendPageCache", component: RecommendPageCache },
  { path: "/recommendResult", component: RecommendResult },
  // { path: "/membership", component: Membership },
  { path: "/compare", component: ComparePage },
  { path: "/compareResult", component: CompareResult },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
