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
              <ul>
                <li v-for="(filter, i) in selected" :key="i">
                  <span>{{ filter.filter_value }}</span
                  ><a @click="rmByIndex(i)" class="remove" href="#">X</a>
                </li>
              </ul>
            </div>
            <div class="product-sort">
              <div class="sort-product">
                <strong>Sort by : &nbsp;</strong>
                <span class="sortby-arrow">Price: Low to High</span>
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
                  @click="selectAdd(itemf.code, itemf.value)"
                  :checked="abc(itemf.value)"
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
      selected: [],
      checked: false,
      filterPassing: [],
      uniqueArray: [],
      passing: "",
    };
  },
  methods: {
    check: function (e) {
      if (e.target.checked) {
        console.log(e.target.value);
      }
    },
    rmByIndex(index) {
      this.selected.splice(index, 1);
    },
    checkfilter() {
      console.log(this.selected);
    },
    selectAdd(filter_code, filter_value) {
      let isvalue = this.indexFilter(this.selected, filter_code, filter_value);
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
      }
    },
    indexFilter(arr, value, code) {
      let index = arr.findIndex(
        (x) => x.filter_code == value && x.filter_value == code
      );
      return index;
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
        `https://pim.wforwoman.com/pim/pimresponse.php/?service=category&store=1&url_key=top-wear-kurtas&page=${this.page}&count=${this.limit}&sort_by=&sort_dir=desc&filter=`
      ).then((res) => res.json());
      const list = data.result;
      this.response = list;
      if (this.response.products.length <= this.limit) {
        this.Products = [...this.Products, ...list.products];
      }
    },
    handleScroll(isvisible) {
      if (!isvisible) {
        return;
      }
      this.page++;
      this.getData();
    },
      abc(value) {
        
      let a =
        this.selected.findIndex((x) => x.filter_value == value) >= 0
          ? true
          : false;
      return a;
    },
  },
  computed: {

    filterdata() {
      let v = this.selectedAddOns.map((data) => {
        console.log("data", data);
      });
      return v;
    },
  },
  mounted() {
    this.getData();
  },
};
</script>