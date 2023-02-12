<template>
  <div class="home">
    <link href="./clusterize.css" rel="stylesheet" />
    <nav class="navbar">
      <form class="searchbar">
        <label>
          <span class="screen-reader-only">Search:</span>
          <input
            v-model="tag"
            placeholder="search for a dog"
            type="text"
            class="searchbar-input"
          />
        </label>
        <button
          type="submit"
          class="btn btn--green btn--go"
          @click.prevent="searchImages"
        >
          Go
        </button>
      </form>
    </nav>
    <div id="scrollArea" class="clusterize-scroll wrapper">
      <p v-if="loading" class="text-centered">Loading...</p>
      <ul v-else id="contentArea" class="clusterize-content image-card-grid">
        <image-card v-for="image in images" :key="image.id" :image="image" />
        <li class="clusterize-no-data">Loading data…</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ImageCard from "../components/ImageCard.vue";

export default {
  components: { ImageCard },
  name: "HomePage",
  data() {
    return {
      loading: false,
      tag: "",
      images: [],
      scrollId: "scrollArea",
      contentId: "contentArea",
      rows_in_block: 100
    };
  },
  computed: {
    ...mapGetters(["getImages", "getNotFound"]),
  },
  mounted() {
    let clusterizeScript = document.createElement("script");
    clusterizeScript.setAttribute("src", "./clusterize.min.js");
    document.head.appendChild(clusterizeScript);
  },
  methods: {
    ...mapActions(["fetchDogImages", "searchImages"]),
  },
  async created() {
    // console.log(this.$store, "bernard");
    // this.searchImages();
    this.images = await this.fetchDogImages();
    console.log(this.images);
  },
  // setup(__, { root }) {
  //   const store = root.$store;
  // },
};
</script>

<style lang="scss">
.screen-reader-only {
  height: 1px;
  width: 1px;
  position: absolute;
  left: -100000px;
}
.text-centered {
  text-align: center;
}
.wrapper {
  margin: 0 auto;
  max-width: 800px;
  @media only screen and (max-width: 799px) {
    max-width: 100%;
    margin: 0 1.5rem;
  }
}
.image-card-grid {
  list-style: none;
  margin: 0.5rem 0;
  padding: 0;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}
.navbar {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: #f0f0f0;
}
.searchbar {
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 549px) {
    width: 100%;
    label {
      width: 80%;
    }
  }
}
.searchbar-input {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 1rem;
  border: 1px solid gray;
  min-width: 300px;
  @media only screen and (max-width: 549px) {
    min-width: 0;
    width: 100%;
  }
}
.btn {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 20px;
  background: transparent;
  border: none;
}
.btn--green {
  background: #42b983;
  color: white;
  font-weight: bold;
}
.btn--go {
  padding: 0.5rem 2rem;
  margin-left: 1rem;
}
</style>
