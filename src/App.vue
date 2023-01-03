<template>
  <div >
    <TopNav />
    <StickyNav />
  <MyProduct  />
  </div>
</template>

<script>
import TopNav from './components/TopNav.vue'
import "./assets/css/style.css"
import StickyNav from './components/StickyNav.vue'
import MyProduct from './components/ProductPage.vue';
export default {
  name: 'App',
  components: {
    TopNav,
    StickyNav,
    MyProduct,
  },
  };
</script>


