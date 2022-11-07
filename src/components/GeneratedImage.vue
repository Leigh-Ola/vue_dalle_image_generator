<template>
  <div class="img-box" v-on:mouseover.stop="show_alt = true">
    <img :src="image.url" :alt="image.prompt"  />
    <div class="alt-text" :class="{'visible': show_alt }">
        <!-- <font-awesome-icon @click="download" class="icon" icon="fa-solid fa-file-arrow-down" /> -->
        <font-awesome-icon @click="download" class="icon" icon="fa-solid fa-download" />
        {{image.prompt}}
    </div>
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
        hover: Number,
    },
    data() {
        return {
            show_alt: false,
        };
    },
    watch: {
        hover(){
            this.show_alt = false;
        }
    },
    methods:{
        download(){
            var url= this.image.url;
            window.location.assign(url);
            // var link = document.createElement('a');
            // link.href = url;
            // link.download = url.substr(url.lastIndexOf('/') + 1);
            // link.click();
        }
    }
};
</script>

<style scoped>
.img-box{
    width: 300px; height: 300px; position: relative;
    border-radius: 5px; overflow: hidden;
    flex-shrink: 0; margin: 10px; padding: 8px;
    box-sizing: border-box; transition: all 0.3s ease;
}
/* responsive */
@media screen and (max-width: 600px){
    .img-box{
        width: 350px; height: 350px;
    }
}
.img-box:hover{
    box-shadow: 0px 0px 5px 5px rgba(0,0,0,0.2);
}
.img-box img{
    width: 100%; height: 100%;
    object-fit: cover; position: relative;
    transition: all 0.3s ease; z-index: 1;
}
.img-box:hover img{
    transform: scale(1.05);
}
.img-box .alt-text{
    position: absolute; top: 0; left: 0;
    width: 100%; height: 100%; z-index: 2;
    background: rgba(0,0,0,0.62); color: white;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.9em; font-weight: 600;
    text-align: center; padding: 10px; opacity: 0;
    box-sizing: border-box; transition: all 0.3s ease;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
.img-box .alt-text.visible{
    opacity: 1;
}
.alt-text .icon{
    position: absolute; right: 5px; top: 5px; display: inline;
    font-size: 2.5em;
    padding: 5px; 
}
</style>