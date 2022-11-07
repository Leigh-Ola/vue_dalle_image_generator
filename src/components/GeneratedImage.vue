<template>
  <div class="img-box">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <img :src="image.url" :alt="image.prompt"  />
  </div>
</template>

<script>
export default {
    name: "GeneratedImage",
    props: {
        image: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
        };
    },
};
</script>

<style scoped>
.img-box{
    width: 300px; height: 300px;
    border-radius: 5px; overflow: hidden;
    flex-shrink: 0; margin: 10px; padding: 8px;
    box-sizing: border-box; transition: all 0.3s ease;
}
.img-box:hover{
    box-shadow: 0px 0px 5px 5px rgba(0,0,0,0.2);
}
.img-box img{
    width: 100%; height: 100%;
    object-fit: cover; position: relative;
    transition: all 0.3s ease;
}
.img-box:hover img{
    transform: scale(1.05);
}
</style>