<template>
  <div class="container-fluid product-list-main">
    <div class="container-fluid product-heading">
      <div class="product-width product-count">
        <div class="items">
          <h1>Women Pashmina Shawls</h1>
          <p class="item_count font-bold">810 Item</p>
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
                    <li><span>Zari Border</span><a class="remove" href="#">X</a></li>
                </ul>
            </div>
            <div class="product-sort">
              <div class="sort-product">
                <strong>Sort by : &nbsp;
                  <div class="new"><span>Newest</span>
                  <img class="arrow-sort" src="../assets/Img/down-arrow.png" alt="">
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
          <SideBar/>
        </div>
        <div class="product-page">
          <ProductList/>
        </div>
    </div>
  </div>
</template>
<script>
import ProductList from './ProductList.vue';
import SideBar from './SideBar.vue';
export default {
  components: { 
    ProductList,
        SideBar
     },
    name:"My-Product",

        };
</script>