import { $http } from "../../api";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    dogImages: [],
    isNotFound: false,
  },
  mutations: {
    setImages(state, images) {
      state.dogImages = images;
    },
    setNotFound(state, isNotFound) {
      state.isNotFound = isNotFound;[[]]
    },
  },
  actions: {
    fetchDogImages(context) {
      return $http.get("breed/greyhound/images").then((response) => {
        context.commit("setImages", response?.data?.message);
        return response?.data?.message
      });
    },
    searchImages(context, searchParam) {
      if (searchParam.length > 0) {
        this.loading = true;
        return $http
          .get("breed" + searchParam)
          .then(async (response) => {
            const data = await response.data;
            context.commit("setNotFound", false);
            context.commit("setImages", data);
            this.loading = false;
          })
          .catch(() => {
            context.commit("setNotFound", true);
          });
      } else {
        context.commit("setNotFound", false);
      }
    },
  },
  getters: {
    getImages(state) {
      return state.dogImages;
    },
    getNotFound(state) {
      return state.isNotFound;
    },
  },
});