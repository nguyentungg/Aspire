<template>
  <q-page-container :class="$style.Page">
    <router-view></router-view>
  </q-page-container>
</template>

<script>
export default {
  name: "PageIndex"
};
</script>
<style module lang="scss">
.Page {
  composes: q-pa-lg from global;
  h4 {
    margin-top: 0.75em;
    margin-bottom: 0.75em;
  }
}
</style>
