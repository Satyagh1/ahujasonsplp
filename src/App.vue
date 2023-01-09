<template>
  <div >
    <TopNav />
    <StickyNav />
  <MyProduct  />
<MyFooter/>

  </div>
</template>

<script>
import "./assets/css/style.css"
import "./assets/css/phone.css"
import TopNav from './components/TopNav.vue'
import StickyNav from './components/StickyNav.vue'
import MyProduct from './components/ProductPage.vue';
import MyFooter from './components/Footer.vue';
export default {
  name: 'App',
  components: {
    TopNav,
    StickyNav,
    MyProduct,
    MyFooter
  },
  };
</script>


