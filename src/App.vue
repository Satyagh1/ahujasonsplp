<template>
  <div>
    <TopNav />
    <StickyNav />
  <ProductPage />
      </div>
</template>

<script>
import TopNav from './components/TopNav.vue'
import "./assets/css/style.css"
import StickyNav from './components/StickyNav.vue'
import { ref } from "vue";
import ProductPage from './components/ProductPage.vue';
export default {
  name: 'App',
  components: {
    TopNav,
    StickyNav,
    ProductPage,
  },
  data () {
    return {
      list:ref([]),
      page :1,
    }
  },
    methods:{
    getData(){
      fetch(`https://pim.wforwoman.com/pim/pimresponse.php/?service=category&store=1&url_key=top-wear-kurtas&page=1&count=20&sort_by=&sort_dir=desc&filter=`)
      .then (res => res.json())
      .then(data => this.list=data.result.products)
      if (this.list.length < 20){
        this.list;
      console.log(this.list);
      }
        else {
          this.list.loaded();
        }
        this.page++;
        console.log(this.page)
    }
},
mounted(){
  this.getData()
},
}
</script>


