<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  provide() {
    return {
      admin: this.admin,
    };
  },
  data() {
    return {
      admin: {
        admin_id: 0,
        password: "",
        avatar: "",
        username: "",
        phone: "",
        email: "",
        address: "",
        shop_name: "",
      },
    };
  },
};
</script>

<style>
@import url("./assets/css/normalize.css");
@import url("./assets/css/base.css");
</style>
