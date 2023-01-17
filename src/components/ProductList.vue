<template>
          <div class="product-container">
          <div
            class="new-class"
            v-for="(item, index) in Productsitem"
            :key="index"
          >
          <div class="slide-box">
            <div class="product-box">
              <a href="/">
                <div class="image-single">
                  <img :src="item.image" alt="" />
                </div>
              </a>
              <a href="/" class="wishlist"
                ><img src="../assets/Img/Heart.svg" alt=""
              /></a>
            </div>
            <div class="product-info">
              <p class="product-name">{{ item.name }}</p>
              <div class="price">
                <p>
                  <span class="price">Rs.{{ item.selling_price }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
         <div class="loader" v-show="dataCountFlag" v-observe-visibility="handleScroll"><img src="../assets/Img/giphy.gif" alt=""></div>
        </div>
</template>
<script>
export default {
  name: "Product-List",
props:['Productsitem','handleScroll','dataCountFlag',"isLoader"],
};
</script>
<style>
/* *********************** Product List Design *******************************/

.product-container{
       display: flex;
    flex-wrap: wrap;
    row-gap: 50px;
    align-items: center;
    margin-left: -15px;
    margin-right: -15px;
}
.new-class {
    width: 25%;
}
.slide-box{
      padding-left: 15px;
    padding-right: 15px;
}
 .product-box {
   position: relative;
    overflow: hidden;
}
.image-single img {
    width: 100%;
}
a.wishlist {
    z-index: 2;
    position: absolute;
    right: 5px;
    font-size: 0;
    display: block;
    height: 30px;
    width: 30px;
    text-align: center;
    border-radius: 30px;
    opacity: 1;
    color: #626262;
    text-transform: uppercase;
    text-decoration: none;
    pointer-events: none;
    padding-top: 7px;
    transition: all .1s;
    top: 5px;
}
.slide-box .product-name {
    margin-top: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #0C0C0C;
}
.price {
    margin: 5% 0%;
}
span.price {
  font-size: 17px!important;
    color: #4C0B36!important;
    font-family: Jost-medium;
}
.loader{
  width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
@media screen and (max-width: 950px) {
  .new-class {
      width: 33.33%;
  }
}
@media screen and (max-width: 768px) {
  .new-class {
      width: 50%;
  }
  .slide-box{
        padding-left: 15px;
      padding-right: 15px;
  }

}
</style>