<template>
  <nav class="navbar-sticky">
    <div class="header">
      <div class="toggle for-mobile" @click="toggle()">
        <img src="../assets/Img/toggle.svg" alt="" />
      </div>
      <div :class="[checktoggle  ? 'navbar active-menu' : 'navbar']" @click="toggle()" >
        <div class="navbar-nav"  @click="toggle()">
          <div class="for-mobile close-btn" @click="toggle()" >
            <img src="../assets/Img/cancel.png" alt="" />
          </div>
          <ul>
            <li class="nav-item">
              <a href="#"
                ><span>WOMEN</span>
                <img src="../assets/Img/down-arrow.png" alt=""
              /></a>
            </li>
            <li class="nav-item">
              <a href="#"
                ><span> MEN</span>
                <img src="../assets/Img/down-arrow.png" alt=""
              /></a>
            </li>
            <li class="nav-item"><a href="#">SALE</a></li>
            <li class="nav-item">
              <a href="#"
                ><span> COLLECTION</span>
                <img src="../assets/Img/down-arrow.png" alt=""
              /></a>
            </li>
            <li class="nav-item for-mobile">
              <a href="#"
                ><span>OUR STORY</span>
                <img src="../assets/Img/down-arrow.png" alt=""
              /></a>
            </li>
            <li class="nav-item for-mobile"><a href="#">CRAFTSMANSHIP</a></li>
          </ul>
        </div>
      </div>
      <a href="#" class="logo d-none"
        ><img src="../assets/Img/logo.svg" alt=""
      /></a>
      <a href="#" class="mobile-logo"
        ><img src="../assets/Img/smallLogo.png" alt=""
      /></a>
      <div class="left">
        <div class="left-inner">
          <ul>
            <li>
              <a href="#"
                ><span>OUR STORY</span>
                <img src="../assets/Img/down-arrow.png" alt=""
              /></a>
            </li>
            <li><a href="#">CRAFTSMANSHIP</a></li>
          </ul>
        </div>
        <div class="logins">
          <ul>
            <li>
              <a href=""><img src="../assets/Img/search.svg" alt="" /></a>
            </li>
            <li>
              <a href=""><img src="../assets/Img/Heart.svg" alt="" /></a>
            </li>
            <li>
              <a href=""><img src="../assets/Img/shopping-bag.svg" alt="" /></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: "StickyNav",
  data() {
    return {
      checktoggle: false,
    };
  },
  methods: {
toggle(){
    console.log("called");
if(this.checktoggle==false){
    this.checktoggle=true;
}
else{
    this.checktoggle=false
}
}
  },
};
</script>