<template>
  <div>hello HelloWorld</div>
</template>
<script>
export default {
  name: "MyTest",
  mounted() {
    this.$myMsg.notify({
      content: "啦啦啦",
      type: "success",
      //time: 5500
    });
  },
};
</script>
<style>
</style>