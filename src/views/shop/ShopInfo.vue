<!--
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-22 22:38:51
 * @LastEditTime: 2024-03-29 17:38:47
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \admin-app\src\views\shop\ShopInfo.vue
 * @Description: 通过API接口测试
-->
<template>
  <div class="shopInfo">
    <el-card>
      <div slot="header">店铺基础信息</div>
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="店铺名：">
          <el-input v-model="form.shop_name"></el-input>
        </el-form-item>
        <el-form-item label="客服昵称：" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="电话号码：" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱：" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="商家地址：" prop="address">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateInfo">提交信息</el-button>
          <el-button type="warning" @click="resetForm">清 空</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { updateAdminInfo } from "@/service/admin-info";
export default {
  inject: ["admin"],
  data() {
    return {
      form: {
        shop_name: "",
        phone: "",
        address: "",
        email: "",
        username: "",
      },
    };
  },
  async mounted() {
    const { admin } = this;
    console.log("shopeInfo的admin",admin)
    // this.form = admin;
    this.form.shop_name=admin.shop_name
    this.form.phone=admin.phone
    this.form.address=admin.address
    this.form.email=admin.email
    this.form.username=admin.username
  },
  methods: {
    resetForm() {
      this.$refs["form"].resetFields();
    },
    async updateInfo() {
      const res = await updateAdminInfo({
        shop_name: this.form.shop_name,
        phone: this.form.phone,
        address: this.form.address,
        email: this.form.email,
        username: this.form.username,
      });
      if (res.status) {
        this.$myMsg.notify({
          content: "修改信息成功",
          type: "success",
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
@btnW: 100px;
.shopInfo {
  width: 70%;
  margin: 10vh auto 80px;

  .el-card__body {
    justify-content: center;
    align-items: center;
  }

  .el-form {
    width: 50%;
  }

  .el-button {
    min-width: @btnW;
  }
}
</style>