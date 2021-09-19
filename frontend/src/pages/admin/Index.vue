<template>
  <div :class="$style.AdminPage">
    <q-drawer
      :value="true"
      show-if-above
      :width="200"
      :breakpoint="500"
      :class="$style.SideBar"
    >
      <q-scroll-area class="fit">
        <q-list>
          <q-item clickable :active-class="$style.Active" to="/admin/customers">
            Customers
          </q-item>
          <q-item clickable :active-class="$style.Active" to="/admin/loans">
            Loans
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <div class="q-px-md">
        <router-view></router-view>
      </div>
    </q-page-container>
  </div>
</template>
<script>
export default {
  name: "IndexAdmin"
};
</script>
<style module lang="scss">
.AdminPage a {
  &,
  &:hover,
  &:focus,
  &:visited {
    text-decoration: none;
    color: inherit;
  }
}
.SideBar {
  > * {
    background: #e0e0e0;
  }
  :global(.q-item) {
    min-height: unset;
    padding: {
      top: 12px;
      bottom: 12px;
    }
  }
}
.Active {
  composes: text-primary from global;
  font-weight: 700;
  background: #d0d0d0;
}
</style>
