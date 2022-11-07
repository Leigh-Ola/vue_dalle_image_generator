<template>
  <div class="home" v-on:mouseover.stop="hover+=1">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->

    <!-- <GeneratedImage :image="image" /> -->
    <ImageGenerator :hover="hover" v-on:image-generated="newImage" />
    <GeneratedImage v-for="image in images" v-bind:key="image.timestamp" :image="image" />
  </div>
</template>

<style scoped>
.home {
  width: 100%; flex-grow: 1;
  /* background: gold; */
  display: flex; 
  justify-content: flex-start; align-items: flex-start;
  flex-flow: row wrap; overflow: hidden; overflow-y: scroll;
  padding: 20px; box-sizing: border-box;
}
.home::-webkit-scrollbar {
  display: none;
}
/* responsive */
@media (max-width: 600px) {
  .home {
    flex-flow: column nowrap; margin: auto; width: calc(100% - 40px);
  }
}
</style>

<script>
// @ is an alias to /src
import GeneratedImage from "@/components/GeneratedImage.vue";
import ImageGenerator from "@/components/ImageGenerator.vue";

export default {
  name: "HomeView",
  components: {
    GeneratedImage, ImageGenerator
  },
  data: () => ({
    hover: 0,
    images: [{
      url: "https://oaidalleapiprodscus.blob.core.windows.net/private/org-BbfSkJgXZJxNT27ZjdqUUHNL/user-uYWQW1h4jRZwJQNv0SYsm9lx/img-TiTv8QTdLzNj78ONipoQmVLH.png?st=2022-11-06T22%3A07%3A30Z&se=2022-11-07T00%3A07%3A30Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-11-06T20%3A37%3A34Z&ske=2022-11-07T20%3A37%3A34Z&sks=b&skv=2021-08-06&sig=IPPWt%2BVzChRjxxh%2BJrtyqfqRqq/HigqexAZi1ecGiqE%3D",
      prompt: "yadda yadda",
      timestamp: new Date().getTime()
    }] // { url, prompt }
  }),
  methods: {
    newImage(data){
      console.log("New Image Received: ", data);
      data.timestamp = new Date().getTime();
      this.images.unshift(data);
    }
  }
};
</script>
