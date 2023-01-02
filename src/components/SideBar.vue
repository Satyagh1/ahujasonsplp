<template>
  <div class="sidebar-inner">
    <ul class="filter-component">
    <li class="filter-box">
      <a href="#" class="dropdown-toggle mobile-active">Gender</a>
      <ul class="collapse list-unstyled mobile-active">
        <li class="women">
          <div>
            <a href="#" value="Gender_Women" class="check" >Women
              <span class="filter-count" style="display: none"> () </span></a>
          </div>
        </li>
      </ul>
    </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Side-Bar",
};
</script>