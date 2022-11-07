<template>
    <div class="img-box" v-on:mouseover.stop>
        <span class="plus" v-show="!prompt_open && !loading" @click="prompt_open = true">+</span>
        <div class="prompt-box" :class="{'visible': prompt_open}">
            <textarea
                class="prompt"
                placeholder="Enter a prompt"
                v-model="prompt"
            ></textarea>
            <span class="error" v-show="error">{{error}}</span>
            <button class="generate-btn" @click="generateImage">
                Generate
            </button>
        </div>
        <div class="loading_box" :class="{'visible': loading}">
            <div class="one">
                <div class="two"></div>
            </div>
        </div>
  </div>
</template>

<script>
const apiKey = "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"
export default {
    name: "ImageGenerator",
    props: {
        hover: Number,
    },
    data() {
        return {
            prompt: "", 
            error: "",
            prompt_open: false,
            loading: false,
        };
    },
    watch: {
        hover(){
            if(this.loading) return;
            this.prompt_open = false;
        }
    },
    methods: {
        async generateImage() {
            if(this.loading) return;
            this.error = "";
            let prompt = this.prompt;
            if(!prompt){
                this.error = "Please enter a prompt";
                return;
            }
            this.loading = true;
            console.log("generating image for prompt: ", prompt);

            // testing
            // {
            //     setTimeout(() => {
            //         this.loading = false;
            //         this.prompt = "";
            //         apiKey;
            //         let temp_url = "https://oaidalleapiprodscus.blob.core.windows.net/private/org-BbfSkJgXZJxNT27ZjdqUUHNL/user-uYWQW1h4jRZwJQNv0SYsm9lx/img-TiTv8QTdLzNj78ONipoQmVLH.png?st=2022-11-06T22%3A07%3A30Z&se=2022-11-07T00%3A07%3A30Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-11-06T20%3A37%3A34Z&ske=2022-11-07T20%3A37%3A34Z&sks=b&skv=2021-08-06&sig=IPPWt%2BVzChRjxxh%2BJrtyqfqRqq/HigqexAZi1ecGiqE%3D";
            //         this.$emit("image-generated", {url: temp_url, prompt});
            //     }, 3000);
            // }
            // real
            {
                // fetch request with header
                await fetch("https://api.openai.com/v1/images/generations", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${apiKey}`,
                    },
                    body: JSON.stringify({
                        prompt: prompt,
                        n: 1,
                        size: "256x256",
                    })
                }).then(res => res.json())
                .then(data => {
                    this.loading = false;
                    this.prompt = "";
                    // { created: Number, data[{url: String},...] }
                    // data.data[0].url = https://oaidalleapiprodscus.blob.core.windows.net/private/org-BbfSkJgXZJxNT27ZjdqUUHNL/user-uYWQW1h4jRZwJQNv0SYsm9lx/img-TiTv8QTdLzNj78ONipoQmVLH.png?st=2022-11-06T22%3A07%3A30Z&se=2022-11-07T00%3A07%3A30Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-11-06T20%3A37%3A34Z&ske=2022-11-07T20%3A37%3A34Z&sks=b&skv=2021-08-06&sig=IPPWt%2BVzChRjxxh%2BJrtyqfqRqq/HigqexAZi1ecGiqE%3D
                    console.log("Response:", data);
                    let url = data.data[0].url;
                    this.$emit("imageGenerated", {url, prompt});
                })
                .catch(err => {
                    this.error = "Error generating image";
                    console.log(err);
                });
            }
        },
    },
};
</script>

<style scoped>
.img-box{
    width: 300px; height: 300px;
    border-radius: 5px; overflow: hidden;
    flex-shrink: 0; margin: 10px; display: flex;
    padding: 5px; box-sizing: border-box; 
    position: relative; cursor: pointer;
}
.img-box:hover{
    box-shadow: 0px 0px 5px 5px rgba(0,0,0,0.25);
    background: rgba(66, 185, 131, 0.2);
}
.img-box .plus{
    font-size: 13em; margin: auto; z-index: 1;
    color: var(--color-primary); position: relative;
    transition: all 0.3s ease; opacity: 0.5;
}
.img-box:hover .plus{
    opacity: 1; transform: scale(1.3);
    color: white;
}
/* prompt box */
.prompt-box{
    display: flex; flex-direction: column; z-index: 2;
    width: 100%; height: 100%; position: absolute;
    top: 0; left: 0; background: var(--color-primary);
    overflow: hidden; transition: all 0.3s ease;
    align-items: center; transform: scale(0);
    background: rgba(66, 185, 131, 0.4);
}
.prompt-box.visible{
    transform: scale(1);
}
.prompt{
    width: 90%; height: 200px; background: white;
    border: none; outline: none; resize: none;
    color: black; font-size: 1.2em; padding: 10px;
    border-radius: 5px; margin: 15px auto auto auto;
    box-sizing: border-box; font-family: 'Roboto', sans-serif;
}
.error{
    color: maroon; display: block; text-align: center; padding: 5px 0px;
    font-size: 0.65em; text-transform: uppercase;
}
.generate-btn{
    width: 90%; height: 40px; background: var(--color-primary);
    border: none; outline: none; color: white; font-size: 1.2em;
    border-radius: 5px; margin: 0px auto 15px auto; position: relative;
    box-sizing: border-box; font-family: 'Roboto', sans-serif;
    cursor: pointer; transition: all 0.3s ease; cursor: pointer;
    background: linear-gradient(90deg, var(--color-secondary-alt) 40%, var(--color-secondary-alt-dark) 90%);
}
.generate-btn:hover{
    transform: scale(1.02);
}
.generate-btn:active{
    background: linear-gradient(90deg, var(--color-secondary-alt-dark) 40%, var(--color-secondary-alt) 90%);
}
/* loading */
.loading_box{
    width: 100%; height: 100%; position: absolute;
    top: 0; left: 0; background: rgba(0,0,0,0.5);
    z-index: 3; display: flex; align-items: center;
    justify-content: center; visibility: hidden;
}
.loading_box.visible{
    visibility: visible;
}
.loading_box .one,
.loading_box .two{
    display: flex; width: 100px; height: 100px;
    border-radius: 50%; background: transparent;
    border: 10px solid green; position: relative;
    border-color: var(--color-secondary) transparent var(--color-secondary) transparent;
    animation: spin 1s linear 0s infinite;
}
.loading_box .two{
    width: 70px; height: 70px; margin: auto;
    border-color: var(--color-secondary-alt) transparent var(--color-secondary-alt) transparent;
    animation: spin 0.5s linear 0s infinite reverse;
}
@keyframes spin { 
    100% { transform: rotate(360deg); } 
}
</style>