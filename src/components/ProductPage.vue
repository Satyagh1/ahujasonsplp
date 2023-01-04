<template>
  <div class="container-fluid product-list-main">
    <div class="container-fluid product-heading">
      <div class="product-width product-count">
        <div class="items">
          <h1>{{ response.name }}</h1>
          <p class="item_count font-bold">{{ response.count }}</p>
        </div>
      </div>
    </div>
    <div class="container-fluid inline-block">
      <div class="filter-top">
        <div class="sidebar-filter">
          <div>
            <div>
              <h3>
                <p
                  @click="showHideFilter"
                  :isOpen="isOpen"
                  class="hideFilterWrap"
                >
                  <img src="../assets/Img/filter-icon.svg" alt="" />
                  <span> {{ isOpen ? "show" : "hide" }}</span>
                  filter
                </p>
              </h3>
            </div>
          </div>
        </div>
        <div class="product-filter-section">
          <div class="row-filter">
            <div class="applied-filter">
              <ul v-for="(filter, i) in selectList" :key="i">
                <li>
                  <span>{{filter}}</span><a @click="rmByIndex(i)" class="remove" href="#">X</a>
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
      <div :class="[!isOpen ? 'sidebar-filter ' : 'sidebar-filter hidefilter']">
        <div class="sidebar-inner">
          <ul
            class="filter-component"
            v-for="(item, index) in response.filters"
            :key="index"
          >
            <button @click="toggleAccordion(index)" class="filter-box">
              <li>
                {{ item.filter_lable }}
                <span :class="[showlist == index ? 'show' : 'hide']"
                  ><img src="../assets/Img/minus-sign.png" alt=""
                /></span>
                <span :class="[showlist == index ? 'hide' : 'show']"
                  ><img src="../assets/Img/plus.png" alt=""
                /></span>
              </li>
            </button>
            <ul class="options_wrapper" v-if="showlist == index">
              <li class="women" v-for="(itemf, i) in item.options" :key="i">
                <input
                  type="checkbox"
                  :name="itemf.value_key"
                  :id="itemf.value_key"
                  v-model="selectList"
                  @click="selectAdd(itemf.code, itemf.value)"
                  :value="itemf.value"
                />
                <label :for="itemf.value_key" :value="itemf.value"
                  >{{ itemf.value }}
                </label>
              </li>
            </ul>
          </ul>
        </div>
      </div>
      <div :class="[isOpen ? 'product-page active' : 'product-page']">
        <ProductList :Products="Products" :handleScroll="handleScroll" />
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import ProductList from "./ProductList.vue";

export default {
  components: {
    ProductList,
  },
  data() {
    return {
      list: ref([]),
      page: 1,
      limit: 20,
      Products: [],
      response: [],
      isOpen: false,
      showlist: null,
      selectList:[],
      selected: [],
      checked:false,
      filterPassing:""
    };
  },
  methods: {
    check: function(e) {
      if (e.target.checked) {
        console.log(e.target.value)
      }
    },
    rmByIndex(index) {
      this.selectList.splice(index, 1);
    },
    indexFilter(array, value, code) {
      let index = array.findIndex(
        (a) => a.filter_value == value && a.filter_code == code
      );
      return index;
    },
    selectAdd(filter_code, filter_value) {
      let isvalue = this.indexFilter(
        this.selected,
        filter_value,
        filter_code
      );
      if (isvalue >= 0) {
        this.rmByIndex(isvalue);
      } else {
        let filter_key = filter_code.concat("-", filter_value);
        filter_key = filter_key.split(" ").join("+");
        let obj = {};
        obj["filter_filter_code"] = filter_code;
        obj["filter_value"] = filter_value;
        obj["filter_code"] = filter_key;

        this.selected.push(obj);
        console.log("selected data by filter", this.selected)
        for (let a in this.selected){
          console.log("before concat",this.filterPassing);
          this.filterPassing=this.filterPassing.concat("|",this.selected[a].filter_code)
          console.log("after Concat",this.filterPassing);
          console.log(this.selected[a].filter_code)
        }
      }
    },
    showHideFilter() {
      this.isOpen = !this.isOpen;
    },
    toggleAccordion(index) {
      if (index == this.showlist) {
        this.showlist = null;
      } else {
        this.showlist = index;
      }
    },
    async getData() {
      console.log("Adding Data in infinite scroll");
      const data = await fetch(
        `https://pim.wforwoman.com/pim/pimresponse.php/?service=category&store=1&url_key=top-wear-kurtas&page=${this.page}&count=${this.limit}&sort_by=&sort_dir=desc&filter=${this.filterPassing}`
      ).then((res) => res.json());
      const list = data.result;
      if (list.products.length >= this.limit) {
        this.Products = [...this.Products, ...list.products];
        this.response = list;
      }
    },
    handleScroll(isvisible) {
      if (!isvisible) {
        return;
      }
      this.page++;
      this.getData();
    },
  }, 
watch(){
  this.getData()
},
  mounted() {
    this.getData();
  },
};
</script>