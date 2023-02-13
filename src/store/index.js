import { $http } from "../../api";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    dogImages: [],
    isNotFound: false,
    dogInfo: {},
  },
  mutations: {
    setImages(state, images) {
      state.dogImages = images;
    },
    setNotFound(state, isNotFound) {
      state.isNotFound = isNotFound;
      [[]];
    },
    setDogInfo(state, dogInfo) {
      state.dogInfo = dogInfo;
    },
  },
  actions: {
    fetchDogImages(context) {
      return $http.get("breed/greyhound/images").then((response) => {
        context.commit("setImages", response?.data?.message);
        return response?.data?.message;
      });
    },
    searchImages(context) {
      let url = $http.get("breed/greyhound/images");
      let searchParam = url.split("/");
      let exactBreed = searchParam[3];
      console.log(exactBreed, "ifeolu");
      if (exactBreed > 0) {
        this.loading = true;
        return $http
          .get("breed" + exactBreed)
          .then(async (response) => {
            const photos = await response.data;
            context.commit("setNotFound", false);
            context.commit("setImages", photos);
            this.loading = false;
          })
          .catch(() => {
            context.commit("setNotFound", true);
          });
      } else {
        context.commit("setNotFound", false);
      }
    },
    dogInfo() {
      this.$router.push({ name: "/about" });
    },
  },
  getters: {
    getImages(state) {
      return state.dogImages;
    },
    getNotFound(state) {
      return state.isNotFound;
    },
    getDogInfo(state) {
      return state.dogInfo;
    },
  },
});
