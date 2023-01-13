<template>
  <div class="container-fluid product-list-main">
    <div class="container-fluid product-heading">
      <div class="product-width product-count">
        <div class="items">
          <h1>{{ response.name }}</h1>
          <p class="item_count font-bold">{{ result.count }}</p>
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
                <strong
                  >Sort by : &nbsp;
                  <span class="sortby-arrow">{{ label }}</span>
                </strong>
                <ul class="sort-list">
                  <li
                    v-for="(sort, i) in response.sort"
                    :key="i"
                    :class="[sort.label == label ? 'liactive' : '']"
                    @click="getsort(sort.code, sort.label)"
                    :value="sort.label"
                  >
                    {{ sort.label }}
                  </li>
                </ul>
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
                  :checked="checkbox_control(itemf.value)"
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
        <ProductList :Products="Products" :handleScroll="handleScroll" :dataCount="dataCount" />
      </div>
    </div>
  </div>
</template>
<script>
import ProductList from "./ProductList.vue";

export default {
  components: {
    ProductList,
  },
  data() {
    return {
      page: 1,
      limit: 20,
      Products: [],
      response: [],
      result: [],
      flag: false,
      isOpen: false,
      isvisible:true,
      showlist: null,
      selected: [],
      checked: false,
      filterPassing: "",
      srt: "",
      label: "",
      dataCount: false,
    };
  },
  methods: {
    getsort(srt_code, srt_label) {
      this.srt = srt_code;
      this.label = srt_label;
      this.$router.push({query:{ ...this.$route.query,  sort: this.srt }}).catch(()=>{});
      console.log(this.srt, "this sort code");
    },
    rmByIndex(index) {
      this.selected.splice(index, 1);
      this.filterPassing = "";
      this.$router.push({ name: "Home" })

      for (let a in this.selected) {
        if (this.selected[this.selected.length - 1] === this.selected[a]) {
          this.filterPassing = this.filterPassing.concat(
            "",
            this.selected[a].filter_code
          );
            this.$router.push({query: { ...this.$route.query, filter: this.filterPassing }}).catch(()=>{});
        } else {
          this.filterPassing = this.filterPassing.concat(
            this.selected[a].filter_code,
            ","
          );
        }
      }
    },
    selectAdd(filter_code, filter_value) {
      this.filterPassing = "";
      let isvalue = this.indexFilter(this.selected, filter_code, filter_value);
      if (isvalue >= 0) {
        this.rmByIndex(isvalue);
      } else {
        let filter_key = filter_code.concat("-", filter_value);
        filter_key = filter_key.split(" ").join("%2B");
        filter_key = filter_key.split("&").join("%26");
        let obj = {};
        obj["filter_filter_code"] = filter_code;
        obj["filter_value"] = filter_value;
        obj["filter_code"] = filter_key;

        this.selected.push(obj);
        console.log(this.selected,"first selected ");
      }
      for (let a in this.selected) {
        if (this.selected[this.selected.length - 1] === this.selected[a]) {
          this.filterPassing = this.filterPassing.concat(
            "",
            this.selected[a].filter_code
          );
            // this.$router.push({query: this.$route.query, filter: this.filterPassing })
            this.$router.push({query: { ...this.$route.query, filter: this.filterPassing }}).catch(()=>{});
          console.log(this.$route.query.filter,"this is router");
          this.filterPassing=this.$route.query.filter
        } else { this.filterPassing = this.filterPassing.concat( this.selected[a].filter_code, "," );
        }
      }
    },
    indexFilter(arr, value, code) {
      let index = arr.findIndex(
        (x) => x.filter_filter_code == value && x.filter_value == code
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
     fetch(
        `https://pim.wforwoman.com/pim/pimresponse.php/?service=category&store=1&url_key=top-wear-kurtas&page=${this.page}&count=${this.limit}&sort_by=${this.srt}&sort_dir=desc&filter=${this.filterPassing}`
      )
        .then((res) => res.json())
        .then((data) => {
          const list = data.result;
          this.result = list;  
          if (this.result.count <=  this.limit) {
            console.log("main chla ");
            this.dataCount=true;
          }       
          if (this.flag == true) {
            this.response = list;
            this.flag = false;
          }
            this.Products = [...this.Products, ...list.products];
        })
.catch((error) => {
  console.log(error);
})
    },
    handleScroll(isVisible) {
      if (this.dataCount  && this.isvisible==isVisible){
        this.page++;
        this.getData();
      }
      else
      return;
      // // this.isvisible = isVisible;
      // if (this.isvisible==isVisible) {
      //   this.page++;
      //   this.getData();
      // }
      // this.isvisible=true;
      //   return;
    },
    checkbox_control(value) {
      let a =
        this.selected.findIndex((x) => x.filter_value == value) >= 0
          ? true
          : false;
      return a;
    },
  },
  watch: {
    selected: {
      handler() {
        this.page==1
        this.Products = [];
        this.getData();
      },
      deep: true,
    },
    srt: {
      handler(newVal, oldVal) {
        if (newVal != oldVal) {
          this.Products = [];
          this.getData();
        }
      },
      deep: true,
    },
  },
  mounted() {
    console.log('Mounted from Product Page')
    this.flag = true;
    this.label = "newest";
    console.log(this.$route.query);
    if(this.$route.query.filter !=  undefined){
      console.log("this is $route", this.$route.query);
      let a = this.$route.query.filter.split(",");
      console.log(a,"aaaaaa");
      a.forEach((el)=>{
        let val = el.split('-')
        console.log("aya", val)
        val[1] = val[1].split("%2B").join(" "); 
        val[1] = val[1].split("%26").join("&");
          this.selectAdd(val[0], val[1])
      })
      }else if(this.$route.query.sort!=undefined){
         let b = this.$route.query.sort
      console.log(b,"thiss is sort during mounted");
      this.getsort(b, b)
      }
      else{
        this.getData();
      }
  },
};
</script>
