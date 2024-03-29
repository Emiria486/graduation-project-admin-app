<!--
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-22 22:35:19
 * @LastEditTime: 2024-03-29 17:39:29
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \admin-app\src\views\food\AddFood.vue
 * @Description: 未通过api测试
-->
<template>
  <el-card class="addFood">
    <div slot="header">
      <span>添加新菜式</span>
    </div>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item prop="food_name" label="菜名：">
        <el-input
          v-model="form.food_name"
          placeholder="菜名"
          maxlength="10"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item class="type" prop="status" label="是否可售：">
        <el-select v-model="form.status" placeholder="是否可售">
          <el-option
            v-for="status in FoodStatus"
            :key="status"
            :label="`${status ? '可以' : '不可以'}销售`"
            :value="status"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="price" prop="price" label="价格：">
        <el-input v-model="form.price" placeholder="单位：元"></el-input>
      </el-form-item>
      <el-form-item prop="description" label="描述：">
        <el-input
          v-model="form.description"
          type="textarea"
          placeholder="菜品描述。（建议填写原材料，配料，制作流程等）"
          :rows="3"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
        <el-button type="warning" @click="resetForm('form', 'upload')"
          >清 空</el-button
        >
      </el-form-item>
    </el-form>
    <div class="upload-box">
      <div class="title">
        <i class="el-icon-upload"></i>
        添加菜品图片
      </div>
      <el-upload
        ref="upload"
        list-type="picture-card"
        :limit="1"
        :auto-upload="false"
        :headers="headers"
        :action="uploadServer"
        :file-list="fileList"
        :http-request="addFoodMenu"
        :on-exceed="handleExceed"
        :on-change="handleChange"
        :on-remove="handleRemove"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <div class="tip">图片大小640*640极佳，目前最多上传1张图片</div>
    </div>
  </el-card>
</template>
  
<script>
import { API_BASE_URL } from "@/service";
import { addNewFoodToMenu } from "@/service/food";
export default {
  name: "AddFood",
  data() {
    let regExp = /^[1-9]\d*(\.\d+)?$/;
    let validatePrice = (rule, value, callback) => {
      if (value === "") return callback(new Error("请输入价格"));
      else if (!regExp.test(value))
        return callback(new Error("请正确填写价格"));
      else return callback();
    };
    return {
      FoodStatus: [0, 1],
      uploadServer: `${API_BASE_URL}/food`,
      form: {
        food_name: "",
        status: 1,
        price: 0,
        description: "",
        isdelete: 0,
      },
      rules: {
        price: [{ validator: validatePrice, trigger: "blur" }],
      },
      fileList: [],
      fileStatus: true,
    };
  },
  computed: {
    headers() {
      return {
        authorization: "Bearer " + localStorage.getItem("adminToken"),
        // "Content-Type": "multipart/form-data",
      };
    },
  },
  methods: {
    async addFoodMenu(param) {
      const formData = new FormData();
      formData.append(
        "food",
        JSON.stringify({
          food_name: this.form.food_name,
          price: this.form.price,
          status: this.form.status,
          description: this.form.description,
          isdelete: this.form.isdelete,
        })
      );
      formData.append("files", param.file);
      console.log("addFoodMenu上传food参数", formData.getItem("food"));
      console.log("addFoodMenu上传图片参数", formData.getItem("files"));

      const res = await addNewFoodToMenu(formData);

      if (res.status) {
        this.$myMsg.notify({
          content: "菜品信息已添加",
          type: "success",
        });
      }
      return false;
    },
    onSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid && this.fileList.length) {
          if (!this.fileStatus) {
            this.$myMsg.notify({
              content: "上传之前请先处理好错误的图片格式！",
              type: "error",
            });
          } else {
            this.$refs["upload"].submit();
          }
        } else {
          this.$myMsg.notify({
            content: "请认真填写好菜式信息！",
            type: "error",
          });
          return false;
        }
      });
    },
    resetForm(formName, uploadName) {
      this.$refs[formName].resetFields();
      this.$refs[uploadName].clearFiles();
    },
    handleExceed() {
      this.$myMsg.notify({
        type: "warning",
        content: "抱歉，目前最多上传1张图片",
      });
    },

    handleChange(file, fileList) {
      this.fileList = fileList;

      const isIMAGE =
        file.raw.type === "image/jpeg" ||
        file.raw.type === "image/jpg" ||
        file.raw.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2; //图片需小于2M

      if (!isIMAGE) {
        this.$myMsg.notify({
          content: "上传文件只能是图片格式!",
          type: "error",
        });
      }
      if (!isLt2M) {
        this.$myMsg.notify({
          content: "上传文件大小不能超过 2MB!",
          type: "warning",
        });
      }
      this.fileStatus = isIMAGE && isLt2M;
    },
    handleRemove(file, fileList) {
      this.fileList = fileList;
    },
  },
};
</script>
<style lang="less" scoped>
@import url("../../assets/less/mixins");
.addFood {
  width: 70%;
  max-width: 1200px;
  margin: 10vh auto 30px;
  .el-form {
    width: 55%;
  }

  .el-card__body {
    height: 400px;
  }

  .type {
    width: 250px;
  }
  .el-input,
  .el-textarea {
    width: 85%;
  }

  .el-button {
    width: 80px;
  }
  .upload-box {
    width: 45%;
    i {
      color: #909399;
    }
    .title,
    .tip {
      font-size: 16px;
      font-family: myFont3;
    }
    .title {
      margin-bottom: 20px;
    }
    .tip {
      margin-top: 20px;
    }
    img {
      width: 100%;
      height: auto;
    }
  }
}
</style>