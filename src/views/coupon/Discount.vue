<!--
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-22 20:24:34
 * @LastEditTime: 2024-03-29 12:40:53
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \admin-app\src\views\coupon\Discount.vue
 * @Description: api接口测试通过
-->
<template>
  <el-card class="discount">
    <div slot="header">
      <span>发行优惠券</span>
    </div>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="优惠券标题：" prop="title">
        <el-input
          show-word-limit
          v-model="form.title"
          placeholder="优惠券标题，例如：喜庆迎新春"
          maxlength="10"
        ></el-input>
      </el-form-item>
      <el-form-item label="使用门槛：" prop="limit">
        <el-input
          v-model="form.limit"
          placeholder="例如：填写20，即为满20元起使用"
        ></el-input>
      </el-form-item>
      <el-form-item label="使用额度：" prop="discount">
        <el-input v-model="form.discount" placeholder="优惠券额度"></el-input>
      </el-form-item>
      <el-form-item label="截止时间：" prop="expiresIn">
        <el-input
          v-model="form.expiresIn"
          placeholder="过期时间，如7日过期就输入7，1日过期就输入1"
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="issue('form')">发行</el-button>
        <el-button type="warning" @click="resetForm('form')">清空</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
  
  <script>
import { addCoupon } from "@/service/coupon";
import { dateFormat } from "@/utils/format";
export default {
  name: "DiscountPage",
  data() {
    let regExp1 = /^[1-9]\d*(\.\d*)?|0\.\d*[1-9]\d*$/; //正浮点数和正整数
    let regExp2 = /^[1-9]\d*(\.\d*)?|0(\.\d*[1-9]\d*)?$/; //正浮点数和正整数和0
    let regExp3 = /^[1-9]\d*(\.\d*)*$/; //正整数
    let validatedDiscount = (rule, value, callback) => {
      if (value === "") callback(new Error("请输入额度"));
      else if (value === "0") callback(new Error("额度为0，优惠券无意义"));
      else if (!regExp1.test(value)) callback(new Error("额度值应为数值类型"));
      else callback();
    };
    let validateLimit = (rule, value, callback) => {
      if (value === "") callback(new Error("请输入使用门槛"));
      else if (!regExp2.test(value)) callback(new Error("门槛值应为数值类型"));
      else callback();
    };
    let validateTitle = (rule, value, callback) => {
      if (value === "") callback(new Error("请输入优惠券标题"));
      else callback();
    };
    let validateExpiresIn = (rule, value, callback) => {
      if (value === "") callback(new Error("优惠券使用期不能为空"));
      else if (!regExp3.test(value))
        callback(new Error("请输入正确的日期数字"));
      else callback();
    };
    return {
      form: {
        title: "",
        discount: "",
        expiresIn: "",
        limit: "",
      },
      rules: {
        discount: [{ validator: validatedDiscount, trigger: "blur" }],
        limit: [{ validator: validateLimit, trigger: "blur" }],
        title: [{ validator: validateTitle, trigger: "blur" }],
        expiresIn: [{ validator: validateExpiresIn, trigger: "blur" }],
      },
    };
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    issue(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await addCoupon({
            create_time: dateFormat(new Date()),
            expireIn: this.form.expiresIn,
            title: this.form.title,
            discount: this.form.discount,
            limit: this.form.limit,
          });
          if (res.status) {
            this.$myMsg.notify({
              title: "成功",
              message: res.message,
              type: "success",
            });
          }
        } else return false;
      });
    },
  },
};
</script>
  
<style lang="less" scoped>
@btnW: 100px;

.discount {
  width: 70%;
  margin: 10vh auto 80px;
  max-width: 1200px;
  .el-card__body {
    justify-content: center;
  }
  .el-form {
    width: 55%;
    .el-button {
      width: @btnW;
    }
  }
}
</style>