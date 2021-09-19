<template>
  <div>
    <q-avatar
      size="2rem"
      color="white"
      text-color="primary"
      icon="person"
      :class="$style.UserAvatar"
    >
      <q-menu>
        <div class="q-pa-sm">
          <q-btn
            color="primary"
            label="Logout"
            push
            size="md"
            v-close-popup
            @click="logout"
          />
        </div>
      </q-menu>
    </q-avatar>
    <span :class="$style.UserName"
      >{{ user.firstName }} {{ user.lastName }}</span
    >
  </div>
</template>
<script>
export default {
  name: "UserInfo",
  computed: {
    user() {
      return this.$store.state.user.me;
    }
  },
  methods: {
    logout() {
      this.$store.commit("user/logout");
      this.$router.push("/");
    }
  }
};
</script>
<style module>
.UserName {
  margin-left: 0.4rem;
  font-size: 0.9rem;
}
.UserAvatar {
  cursor: pointer;
}
</style>
