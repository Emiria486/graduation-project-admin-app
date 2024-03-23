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
    this.form = admin;
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