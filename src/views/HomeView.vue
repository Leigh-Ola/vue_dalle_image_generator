<template>
  <div class="home" v-on:mouseover.stop="hover+=1">
    <ImageGenerator :hover="hover" v-on:image-generated="newImage" />
    <GeneratedImage v-for="image in images" v-bind:key="image.timestamp" :image="image" :hover="hover" />
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
    padding: 0px; justify-content: flex-start; align-items: center;
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
    // "url": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-BbfSkJgXZJxNT27ZjdqUUHNL/user-uYWQW1h4jRZwJQNv0SYsm9lx/img-XmhwHyjvCAMgvGWj61MfLJsN.png?st=2022-11-07T11%3A01%3A26Z&se=2022-11-07T13%3A01%3A26Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-11-07T04%3A28%3A36Z&ske=2022-11-08T04%3A28%3A36Z&sks=b&skv=2021-08-06&sig=SBimeOBUeNXkRDy9zjr0naLY4pAnlu9tsEUymgt0%2Bnw%3D",
    // "prompt": "evil santa",
    // "timestamp": 1667822487601
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
