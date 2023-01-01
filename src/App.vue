<template>
<div>
  <TopNav />
<StickyNav/>
</div>
</template>

<script>
import TopNav from './components/TopNav.vue'
import "./assets/css/style.css"
import StickyNav from './components/StickyNav.vue'

export default {
  name: 'App',
  components: {
    TopNav,
    StickyNav
  }
}
</script>


