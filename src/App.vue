<template>
  <nav>
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> -->
    <h1>DallE Image Generator</h1>
  </nav>
  <router-view />
</template>

<style>
body{
  margin: 0px; padding: 0px; font-size: 16px;
}
/* register a color variable */
:root {
  --color-primary: #42b983;
  --color-primary-alt: #048e69;
  --color-primary-dark: #144f35;
  --color-primary-alt-dark: #02392a;
  --color-secondary: #425eb9;
  --color-secondary-alt: #0732bd;
  --color-secondary-dark: #222f5b;
  --color-secondary-alt-dark: #031550;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0px; 
  padding: 0px; 
  display: flex; flex-flow: column nowrap;
  width: 100%; height: 100vh;
  box-sizing: border-box;
  /* background-color: var(--color-primary); */
  min-height: 100vh; min-width: 100vw;
}

nav {
  padding: 0px; height: 120px; text-align: center;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  color: white; font-size: 2em; letter-spacing: 2pt;
  /* background-color: var(--color-primary); */
  display: flex; justify-content: center; align-items: center;
  /*  */
  background: -webkit-linear-gradient(0deg, var(--color-primary), var(--color-primary-alt), var(--color-secondary-alt), var(--color-secondary-alt-dark));
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
