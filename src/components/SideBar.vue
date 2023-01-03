<template>
  <div class="sidebar-inner">
    <ul class="filter-component">
    <li class="filter-box" v-for="(item,index) in list.filters" :key="index">
      <label :for=item.filter_lable>{{item.filter_lable}} </label>
      <ul class="" v-for="(itemf, i) in item.options" :key="i">
        <li class="women" >
          <input type="checkbox">
          <label :for=itemf.value_key :value=itemf.value>{{itemf.value}}</label>
        </li>
      </ul>
    </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Side-Bar",
  props:['list'],
};
</script>