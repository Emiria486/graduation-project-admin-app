<!--
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-22 22:38:40
 * @LastEditTime: 2024-04-01 13:08:56
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \admin-app\src\views\shop\ShopAvatar.vue
 * @Description: 修改管理员用户头像（已通过api测试）
-->
<template>
  <div class="shopAvatar">
    <el-card>
      <div slot="header" class="title">头像修改</div>
      <div class="a-cantainer">
        <div class="upload-box" @click="toggleShow">
          <img src="@/assets/img/add-img.png" alt="选择图片" />
          <div class="describe">选择图片</div>
        </div>
        <el-divider direction="vertical"></el-divider>
        <div class="avatar-now">
          <el-avatar :src="avatarTemp" :size="90"></el-avatar>
          <div class="describe">当前头像</div>
        </div>
        <my-upload
          method="PUT"
          img-format="png"
          v-model="show"
          :width="180"
          :height="180"
          :noRotate="false"
          :field="field"
          :url="uploadUrl"
          :headers="headers"
          @crop-success="cropSuccess"
          @crop-upload-success="cropUploadSuccess"
          @crop-upload-fail="cropUploadFail"
        ></my-upload>
      </div>
      <div class="explain">
        <p>图片像素360 * 360极佳，仅支持JPG、PNG等格式，需小于2M</p>
      </div>
    </el-card>
    <div class="attention">
      <i class="el-icon-info"></i>
      此处修改的是客服的头像，店铺尚不支持
    </div>
  </div>
</template>
<script>
import "babel-polyfill";
import myUpload from "vue-image-crop-upload";
import { API_BASE_URL } from "@/service";
export default {
  name: "ShopAvatar",
  inject: ["admin"],
  data() {
    return {
      uploadUrl: `${API_BASE_URL}/avatar_upload`,
      avatarTemp: this.admin.avatar,
      show: false,
      username: this.admin.username,
    };
  },
  components: {
    "my-upload": myUpload,
  },
  computed: {
    field() {
      return `${this.username}_avatar`;
    },
    headers() {
      return { authorization: "Bearer " + localStorage.getItem("adminToken") };
    },
  },
  methods: {
    toggleShow() {
      this.show = !this.show;
    },
    //裁剪成功回调
    cropSuccess(imgDataUrl, field) {
      this.avatarTemp = imgDataUrl;
      console.log(field);
    },
    //上传成功回调
    cropUploadSuccess(jsonData, field) {
      this.admin.avatar = this.avatarTemp;
      console.log(jsonData);
      console.log(field);
    },
    //上传失败回调
    cropUploadFail(status, field) {
      console.log(status);
      console.log(this.uploadUrl);
      console.log(field);
      if (status === 401) {
        this.$myMsg.notify({
          content: "未授权，请登录！",
          type: "error",
        });
        this.$router.push("/login");
      }
    },
  },
};
</script>
<style lang="less" scoped>
@import url("../../assets/less/mixins.less");
@spacing: 50px;
.vicp-step1 {
  cursor: pointer;
  user-select: none;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.shopAvatar {
  margin: 10vh auto 0;
  width: 70%;
  max-width: 1200px;
  .el-card__body {
    display: block;
  }
  .a-cantainer {
    min-height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: myFont3;
  }
  .upload-box {
    width: 110px;
    height: 110px;
    margin-right: @spacing;
    background: #dfe6e9;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
      width: 40%;
      height: 40%;
    }

    .describe {
      color: #666;
      font-size: 12px;
      margin-top: 5px;
    }
  }
  .el-divider {
    height: 120px;
  }
  .avatar-now {
    margin-left: @spacing;
    .describe {
      text-align: center;
      color: #999;
      margin-top: 10px;
      font-size: 14px;
    }
  }
  .explain {
    margin-top: 20px;
    p {
      text-align: center;
      color: #999;
      font-size: 12px;
    }
  }
  .attention {
    margin-top: 30px;
    text-align: center;
    font-size: 16px;
    font-family: myFont3;
  }
}
</style>