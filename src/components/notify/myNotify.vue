<!--
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-22 20:58:02
 * @LastEditTime: 2024-03-22 21:03:12
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \admin-app\src\components\notify\myNotify.vue
 * @Description: 提示弹窗的模板
-->
<template>
  <transition name="slide-fade">
    <div class="my-notify" v-if="notifyFlag">
      <div class="notify success" v-if="type == 'success'">
        <div class="tip">
          <span>成功</span>
        </div>
        <div class="content">{{ content }}</div>
      </div>
      <div class="notify error" v-else-if="type == 'error'">
        <div class="tip">
          <span>错误</span>
        </div>
        <div class="content">{{ content }}</div>
      </div>
      <div class="notify warning" v-else-if="type == 'warning'">
        <div class="tip">
          <span>警告</span>
        </div>
        <div class="content">{{ content }}</div>
      </div>
    </div>
  </transition>
</template>
   
  <style scoped>
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
.notify-wrap {
  background-color: #1afa29;
}
.my-notify {
  margin: 10px;
  width: 350px;
}
.notify {
  position: relative;
  right: 10px;
  padding-left: 10px;
  width: 320px;
  height: 70px;
  border-radius: 4px;
  background-color: rgb(255, 244, 224);
  box-shadow: -5px 5px 12px 0 rgba(204, 204, 204, 0.8);
  animation: show cubic-bezier(0.18, 0.89, 0.32, 1.28) 0.4s;
}
.success {
  border-left: 10px solid #1afa29;
}
.error {
  border-left: 10px solid #d81e06;
}
.warning {
  border-left: 10px solid #f4ea2a;
}
.notify .tip {
  height: 30px;
  margin-bottom: 5px;
  line-height: 30px;
}
.notify .tip span {
  line-height: 30px;
  font-size: 17px;
  font-weight: 600;
}
.notify .content {
  width: 320px;
  height: 30px;
  font-size: 15px;
}
@keyframes show {
  0% {
    right: -350px;
  }
  100% {
    right: 10px;
  }
}
</style>