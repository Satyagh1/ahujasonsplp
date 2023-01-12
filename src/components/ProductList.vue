<template>
          <div class="product-container">
          <div
            class="slide-box"
            v-for="(item, index) in Products"
            :key="index"
          >
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
         <div  v-observe-visibility="handleScroll"></div>
        </div>
</template>
<script>
export default {
  name: "Product-List",
props:['Products','handleScroll','dataCount'],
};
</script>