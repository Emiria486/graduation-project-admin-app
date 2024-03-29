<!--
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-22 22:38:24
 * @LastEditTime: 2024-03-29 12:41:21
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \admin-app\src\views\order\OrderSearch.vue
 * @Description: api接口测试通过
-->
<template>
  <div class="orderSearch">
    <div class="date-search">
      <label for="date-picker">订单查询：</label>
      <el-date-picker
        id="date-picker"
        v-model="searchDate"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      />
      <el-button type="primary" @click="submitSearch">搜索</el-button>
    </div>
    <el-card class="order-container">
      <div slot="header">{{ date }} 订单</div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="id" label="订单号" width="160"></el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="100">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="80"></el-table-column>
        <el-table-column
          prop="phone"
          label="电话"
          width="140"
        ></el-table-column>
        <el-table-column prop="type" label="类型" width="100">
          <template slot-scope="scope">
            <el-tag :type="scope.row.type | tagType">
              {{ scope.row.type }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="90"
        ></el-table-column>
        <el-table-column label="地址">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              placement="bottom-end"
              :content="scope.row.address"
              :open-delay="1000"
            >
              <div class="address">{{ scope.row.address }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" class-name="operation">
          <template slot-scope="scope">
            <el-dropdown>
              <el-button type="primary" size="mini">
                订购详情<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="detail in scope.row.details"
                  :key="detail.order_id"
                >
                  <span class="detail-name">{{ detail.food.food_name }} </span
                  >&nbsp;
                  <span class="detail-number">
                    {{ detail.food.number | numberFormat }}
                  </span>
                  <span class="el-dropdown-item-detail-price">
                    {{ detail.food.price | priceFormat }}
                  </span>
                </el-dropdown-item>
                <el-dropdown-item>
                  <span> 合计：</span>
                  <span class="el-dropdown-item-detail-total">
                    {{ scope.row.total }}
                  </span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button type="danger" size="mini">退款</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-pagination
      layout="sizes, prev, pager, next"
      :total="tableTotal"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="pageStart"
    >
    </el-pagination>
  </div>
</template>
<script>
import { getdateFormatToday, dateFormat } from "@/utils/format";
import { getOrdersByDateAndPagination } from "@/service/order";
export default {
  name: "OrderSearch",
  filters: {
    tagType(value) {
      if (value === "堂食") return "primary";
      else if (value === "打包") return "success";
      else return "danger";
    },
    numberFormat(val) {
      return "x" + val;
    },
    priceFormat(val) {
      return "￥" + parseFloat(val).toFixed(2);
    },
  },
  data() {
    return {
      date: "",
      tableData: [],
      tableTotal: 0,
      pageSize: 10,
      pageStart: 1,
      searchDate: [
        getdateFormatToday("2024-01-01"),
        getdateFormatToday(new Date()),
      ],
    };
  },
  async created() {
    let { orders, users, orderFoods, count } = (await this.searchOrder()).data;
    console.log("得到的orders", orders);
    orders.forEach((order) => {
      const user = users.find((item) => item.user_id === order.user_id);
      const obj = {
        id: order.order_id,
        create_time: dateFormat(order.create_time),
        address: order.address,
        type: this.transformOrderType(order.order_type),
        name: user.username,
        phone: user.phone,
        status: this.transformOrderStatus(order.status),
        details: orderFoods.filter((item) => item.order_id === order.order_id),
        total: order.price,
      };
      this.tableData.push(obj);
    });
    this.tableTotal = count;
    console.log("tableDate", this.tableData);
  },
  methods: {
    // 页面加载函数
    async searchOrder() {
      let searchDate = this.searchDate;
      let startTime = getdateFormatToday(searchDate[0]);
      let endTime = getdateFormatToday(searchDate[1]);
      return await getOrdersByDateAndPagination({
        startTime,
        endTime,
        pageStart: this.pageStart,
        pageSize: this.pageSize,
      });
    },
    // 点击搜索按钮函数
    async submitSearch() {
      let { orders, users, orderFoods, count } = (await this.searchOrder())
        .data;
      this.tableData = [];
      orders.forEach((order) => {
        const user = users.find((item) => item.user_id === order.user_id);
        const obj = {
          id: order.order_id,
          create_time: dateFormat(order.create_time),
          address: order.address,
          type: this.transformOrderType(order.order_type),
          name: user.username,
          phone: user.phone,
          status: this.transformOrderStatus(order.status),
          details: orderFoods.filter(
            (item) => item.order_id === order.order_id
          ),
          total: order.price,
        };
        this.tableData.push(obj);
      });
      this.tableTotal = count;
    },
    // 定采类型转换函数
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
    // 状态转换函数
    transformOrderStatus(value) {
      switch (value) {
        case 0:
          return "未处理";
        case 1:
          return "已处理";
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.pageStart = val;
    },
  },
};
</script>
<style lang="less" scoped>
.orderSearch {
  .date-search {
    width: 90%;
    margin: 30px auto 0;

    .el-button {
      margin-left: 20px;
    }
  }

  .order-container {
    width: 90%;
    max-width: 1500px;
    margin: 30px auto 0;
  }

  .cell {
    cursor: default;
  }

  .address {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .operation .cell {
    display: flex;
    justify-content: space-around;
  }

  .el-pagination {
    margin-top: 60px;
    text-align: center;
  }
}
</style>