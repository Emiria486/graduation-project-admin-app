<!--
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-22 22:38:09
 * @LastEditTime: 2024-04-01 13:31:29
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \admin-app\src\views\order\OrderDeal.vue
 * @Description: api接口测试通过（websocket未测试）
-->
<template>
  <div class="orderDeal" v-if="show">
    <template v-if="orders.length">
      <el-card
        class="order-item anim-up"
        shadow="hover"
        v-for="(item, index) in orders"
        :key="item"
      >
        <div slot="header" class="order-title">
          <span class="order-number"
            >订单编号：&nbsp;{{ item.userOrder.order_id }}</span
          >
          <span>
            发起时间：&nbsp;{{ item.userOrder.create_time | timeFormat }}
          </span>
        </div>
        <div class="order-info">
          <el-avatar :src="item.userInfo.avatar" :size="50"></el-avatar>
          <div class="order-info-base">
            <div class="item">
              <i class="el-icon-user-solid"></i>
              收货人：{{ item.userInfo.username }}
            </div>
            <div class="item">
              <i class="el-icon-phone"></i>
              手机号：{{ item.userInfo.phone }}
            </div>
            <div class="item">
              <i class="el-icon-location"></i>
              收货地址：{{ item.userInfo.address }}
            </div>
            <div class="item">
              <i class="flag-o"></i>
              就餐形式：{{ transformOrderType(item.userOrder.order_type) }}
            </div>
          </div>
        </div>
        <div class="buttonGroup">
          <span class="total">
            总额：{{ item.userOrder.price | priceFormat }}
          </span>
          <el-dropdown :hide-on-click="false">
            <span class="details">明细<i class="el-icon-arrow-up"></i></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="food in item.foods" :key="food">
                <span class="el-dropdown-item-detail-name">
                  {{ food.food_name }}
                </span>
                &nbsp;
                <span class="el-dropdown-item-detail-number">
                  {{ food.number | numberFormat }}
                </span>
                <span class="el-dropdown-item-detail-price">
                  {{ food.price | priceFormat }}
                </span>
              </el-dropdown-item>
              <el-dropdown-item>
                <span>优惠</span>
                <span class="el-dropdown-item-detail-price">
                  {{ item.userOrder.discount | priceFormat }}
                </span>
              </el-dropdown-item>
              <el-dropdown-item>
                <span>包装费</span>
                <span class="el-dropdown-item-detail-price">
                  {{ (item.userOrder.order_type - 1) | priceFormat }}
                </span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button
            type="primary"
            size="small"
            @click="accept(index, item.userOrder.order_id)"
            >接单</el-button
          >
          <el-button
            type="warning"
            size="small"
            @click="reject(index, item.userOrder.order_id)"
            >拒绝</el-button
          >
        </div>
      </el-card>
    </template>
    <p class="order-none" v-else>目前尚无订单信息</p>
  </div>
</template>

<script>
export default {
  name: "OrderPage",
  props: {
    orders: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      show: true,
    };
  },
  computed: {
    localOrders() {
      return this.orders.length > 0 ? this.orders : [];
    },
  },
  methods: {
    transformOrderType(value) {
      switch (value) {
        case 1:
          return "堂食";
        case 2:
          return "打包";
        case 3:
          return "外卖";
      }
    },
    accept(index, id) {
      this.localOrders.splice(index, 1);
      console.log("accept接收订单id", id);
      console.log(id);
    },
    reject(index, id) {
      this.localOrders.splice(index, 1);
      console.log("reject拒接订单id", id);
    },
  },
  filters: {
    numberFormat(val) {
      return "x" + val;
    },
    priceFormat(val) {
      return "￥" + parseFloat(val).toFixed(2);
    },
    timeFormat(val) {
      const date = new Date(val);

      const year = date.getFullYear();

      let month = date.getMonth() + 1;
      if (month < 10) month = "0" + month;

      let day = date.getDate();
      if (day < 10) day = "0" + day;

      let hour = date.getHours();
      if (hour < 10) hour = "0" + hour;

      let minutes = date.getMinutes();
      if (minutes < 10) minutes = "0" + minutes;

      let seconds = date.getSeconds();
      if (seconds < 10) seconds = "0" + seconds;
      return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
    },
  },
};
</script>

<style lang="less" scoped>
@import url("../../assets/less/mixins.less");
@cardH: 160px;
@el-card__body_padding: 40px;
@keyframes up {
  from {
    opacity: 0;
    transform: translateY(80px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.orderDeal {
  width: 70%;
  max-width: 1200px;
  margin: 0 auto 120px;
  .order-none {
    margin: 15vh auto 0;
    text-align: center;
    color: #7f8c8d;
    font-size: 24px;
    font-family: myFont1;
  }
  .order-title {
    display: flex;
    justify-content: space-between;
    font-family: myFont1;
    font-size: 14px;
  }
  .order-info {
    display: flex;
    align-items: center;
    font-family: myFont3;
  }
  .order-info-base {
    margin-left: 20px;
    .item:nth-child(1),
    .item:nth-child(2) {
      margin-bottom: 6px;
    }
  }
  .anim-up {
    animation: up 0.6s;
  }
  el-card__body {
    position: relative;
    display: block;
    padding-left: @el-card__body_padding;
    padding-right: @el-card__body_padding;
  }
  .el-card {
    margin-top: 30px;
  }
  .buttonGroup {
    margin-top: 10px;
    text-align: right;
    font-family: myFont3;
    .total {
      vertical-align: -4px;
      margin-right: 10px;
      color: #e74c3c;
      font-weight: 700;
    }
    .details {
      margin-right: 20px;
      vertical-align: -4px;
      color: #909399;
      cursor: pointer;
      i {
        transition: transform 0.5s;
      }
    }
    .details:hover i {
      transform: rotate(180deg);
    }
    .el-button {
      min-width: 80px;
      font-size: 12px;
    }
  }
  @media screen and (min-width: 1380px) {
    .el-card {
      height: @cardH;
    }
  }
}
</style>