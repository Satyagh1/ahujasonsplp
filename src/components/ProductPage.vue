<template>
  <div class="container-fluid product-list-main">
    <div class="container-fluid product-heading">
      <div class="product-width product-count">
        <div class="items">
          <h1>{{response.name}}</h1>
          <p class="item_count font-bold">{{response.count
}}</p>
        </div>
      </div>
    </div>
    <div class="container-fluid inline-block">
      <div class="filter-top">
        <div class="sidebar-filter">
          <div>
            <div>
              <h3>
                <p class="hideFilterWrap">
                  <img src="../assets/Img/filter-icon.svg" alt="" />
                  <span>hide </span>
                  filter
                </p>
              </h3>
            </div>
          </div>
        </div>
        <div class="product-filter-section">
          <div class="row-filter">
            <div class="applied-filter">
              <ul>
                <li>
                  <span>Zari Border</span><a class="remove" href="#">X</a>
                </li>
              </ul>
            </div>
            <div class="product-sort">
              <div class="sort-product">
                <strong
                  >Sort by : &nbsp;
                  <div class="new">
                    <span>Newest</span>
                    <img
                      class="arrow-sort"
                      src="../assets/Img/down-arrow.png"
                      alt=""
                    />
                  </div>
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="product-main">
      <div class="sidebar-filter">
        <div class="sidebar-inner">
    <ul class="filter-component">
    <li class="filter-box" v-for="(item,index) in response.filters" :key="index">
      <label :for=item.filter_lable>{{item.filter_lable}}<span class="show">+</span><span class="hide">-</span></label>
      <ul class="" >
        <li class="women" v-for="(itemf, i) in item.options" :key="i" >
          <input type="checkbox" :name="itemf.value_key" :id=itemf.value_key>
          <label :for=itemf.value_key :value=itemf.value>{{itemf.value}}</label>
        </li>
      </ul>
    </li>
    </ul>
  </div>
      </div>
      <div class="product-page">
        <ProductList 
        :Products ="Products"
        :handleScroll="handleScroll"
         />
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import ProductList from './ProductList.vue';


export default {
  components: {
    ProductList,
  },
  data() {
    return {
      list: ref([]),
      page: 1,
      limit: 20,
    Products:[],
    response:[]
    };
  },
  methods: {
    
   async getData() {
      console.log("Adding 10 more data results");
    const data =  await fetch(
        `https://pim.wforwoman.com/pim/pimresponse.php/?service=category&store=1&url_key=top-wear-kurtas&page=${this.page}&count=${this.limit}&sort_by=&sort_dir=desc&filter=`
      ).then((res) => res.json())
        .catch((err) => console.log(err.message));
      const list = data.result;
      console.log("response",list);
      if (list.products.length >= this.limit) {
        this.Products = [...this.Products, ...list.products];
        console.log("nakjbnskjn",this.Products);
        this.response = list;
        console.log(this.response)
      } 
      },
      handleScroll(isvisible){
        if (!isvisible){return}
        console.log("handled")
        this.page++
        this.getData()
    },
  },
  mounted() {
    this.getData();
  },
};
</script>