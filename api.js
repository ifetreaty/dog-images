import axios from "axios";

let baseURL = process.env.VUE_APP_DOG_IMAGES_URL;

export const $http = axios.create({
  baseURL,
});
