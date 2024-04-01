<!--
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-22 22:35:27
 * @LastEditTime: 2024-04-01 14:30:44
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \admin-app\src\views\food\PutFood.vue
 * @Description: 对菜品，菜单的修改（已通过api测试）
-->
<template>
  <div class="putFood">
    <el-card id="headerCard" :body-style="{ display: 'block' }">
      <div slot="header" class="clearfix">
        <span>现有菜单</span>
      </div>
      <div class="table-tools">
        <label for="date-put" class="label">上架时间：</label>
        <el-select v-model="date" placeholder="请选择">
          <el-option
            v-for="item in weekOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <label for="foodNum" class="label">数量：</label>
        <el-input id="foodNum" v-model="foodNum"></el-input>
        <el-button type="primary" size="medium" @click="foodPutOn"
          >上架</el-button
        >
      </div>
      <el-table
        stripe
        class="food-original-table"
        ref="foodTable"
        :data="tableData"
        @select="handleSelection"
        @select-all="handleSelection"
      >
        <el-table-column
          type="selection"
          prop="prop"
          label="label"
        ></el-table-column>
        <el-table-column label="菜名" prop="food_name"></el-table-column>
        <el-table-column label="菜品图片">
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.image"
              :fit="contain"
            >
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="在售">
          <template slot-scope="scope">
            {{ scope.row.status ? "在售" : "不在售" }}
          </template>
        </el-table-column>
        <el-table-column label="价格（元）" prop="price"></el-table-column>
        <el-table-column>
          <template slot="header">
            <el-input
              v-model="searchValue"
              prefix-icon="el-icon-search"
              placeholder="菜名"
            ></el-input>
          </template>
          <template slot-scope="scope">
            <el-button
              suffix-icon="el-icon-search"
              size="mini"
              type="warning"
              @click="handleEditInfo(scope.row)"
              >修改</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card class="food-put">
      <div slot="header" class="clearfix">
        <span>上架菜单</span>
      </div>
      <el-table
        stripe
        class="food-put-table"
        :data="foodPut"
        :default-sort="{ prop: 'date', order: 'descending' }"
        @select="handleSelection"
        @select-all="handleSelection"
      >
        <el-table-column
          label="上架日期"
          prop="date"
          sortable
        ></el-table-column>
        <el-table-column label="菜名" prop="food_name"></el-table-column>
        <el-table-column label="是否在售">
          <template slot-scope="scope">
            {{ scope.row.status ? "在售" : "不在售" }}
          </template>
        </el-table-column>
        <el-table-column label="价格（元）" prop="price"></el-table-column>
        <el-table-column label="数量" prop="number"></el-table-column>
        <el-table-column align="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="warning"
              @click="handleEditNum(scope.row)"
              >修改数量</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handlePutOff(scope.row)"
              >下架</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 修改菜单 -->
    <el-dialog
      width="40%"
      :title="dialogModifyInfo.name"
      :visible.sync="dialogModifyInfo.visible"
    >
      <el-form :model="form" class="food-modify">
        <el-form-item label="菜名：" label-width="70px">
          <el-input v-model="form.food_name"></el-input>
        </el-form-item>
        <el-form-item label="价格：" label-width="70px">
          <el-input v-model="form.price" placeholder="单位：元"></el-input>
        </el-form-item>
        <el-form-item label="菜品描述：" label-width="90px">
          <el-input
            v-model="form.description"
            placeholder="输入修改后的菜品描述"
            type="textarea"
            :rows="3"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否在售：" label-width="90px">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option
              v-for="status in FoodStatus"
              :key="status"
              :label="status ? '在售' : '不在售'"
              :value="status"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogModifyInfo.visible = false">取 消</el-button>
        <el-button type="primary" @click="foodInfoModify">修 改</el-button>
      </div>
    </el-dialog>
    <!-- 删除 -->
    <el-dialog :visible.sync="dialogDelete.visible" width="30%">
      <div class="digalog-title" slot="title">
        <i class="el-icon-warning"></i>
        <span>警告</span>
      </div>
      <span>
        确定删除&nbsp;
        <strong>{{ dialogDelete.name }}</strong>
        &nbsp;吗？
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDelete.visible = false">取 消</el-button>
        <el-button type="primary" @click="foodDelete">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 下架 -->
    <el-dialog :visible.sync="dialogPutOff.visible" width="30%">
      <div class="digalog-title" slot="title">
        <i class="el-icon-warning"></i>
        <span>警告</span>
      </div>
      <span>
        确定下架&nbsp;
        <strong>{{ dialogPutOff.date }}</strong
        >&nbsp;的<strong> {{ dialogPutOff.name }}</strong>
        &nbsp;吗？
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogPutOff.visible = false">取 消</el-button>
        <el-button type="primary" @click="foodPutOff">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改供应数量 -->
    <el-dialog
      width="40%"
      :visible.sync="dialogModifyNum.visible"
      @close="handleDialogClose('modifyForm')"
    >
      <div class="digalog-title" slot="title">
        <span>{{ dialogModifyNum.date }}</span>
        &nbsp;的&nbsp;
        <span>"{{ dialogModifyNum.name }}"</span>
      </div>
      <el-form
        class="food-modify"
        :model="modifyForm"
        :rules="modifyRules"
        ref="modifyForm"
      >
        <el-form-item label="修改数量：" label-width="100px" prop="modifyNum">
          <el-input
            v-model="modifyForm.modifyNum"
            placeholder="菜品数量"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogModifyNum.visible = false">取 消</el-button>
        <el-button type="primary" @click="foodModifyNum">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getWeekday } from "@/utils/format";
import { getFood, updateFoodInfo, deleteFood } from "@/service/food";
import {
  getFoodMenu,
  addFoodMenu,
  updateFoodMenuNum,
  deleteFoodMenu,
} from "@/service/food_menu";
export default {
  name: "PutFood",
  data() {
    let validateNum = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入要修改的数量"));
      } else if (!/^\d+$/.test(value)) {
        callback(new Error("数量应为数字值"));
      } else {
        callback();
      }
    };
    return {
      weekOptions: [
        { value: "周一", label: "周一" },
        { value: "周二", label: "周二" },
        { value: "周三", label: "周三" },
        { value: "周四", label: "周四" },
        { value: "周五", label: "周五" },
        { value: "周六", label: "周六" },
        { value: "周日", label: "周日" },
      ],
      date: "",
      foodNum: 0,
      searchValue: "",
      multipleSelection: [],
      FoodStatus: [0, 1],
      dialogDelete: { visible: false, name: "", food_id: 1 },
      dialogModifyInfo: { visible: false, name: "", food_id: 1 },
      dialogModifyNum: { visible: false, name: "", food_menu_id: 1 },
      dialogPutOff: { visible: false, name: "", food_menu_id: 1 },
      form: {
        food_name: "",
        status: 0,
        price: 0,
        description: "",
      },
      modifyForm: {
        modifyNum: 0,
      },
      modifyRules: {
        modifyNum: [{ validator: validateNum, trigger: "blur" }],
      },
      foodOriginal: [],
      foodPut: [],
    };
  },
  computed: {
    // 过滤现有菜单列表数据
    tableData() {
      if (this.searchValue !== "") {
        console.log("searchValue", this.searchValue);
        return this.foodOriginal.filter((food) => {
          return Object.keys(food).some((key) => {
            return (
              String(food[key]).toLowerCase().indexOf(this.searchValue) > -1
            );
          });
        });
      } else {
        return this.foodOriginal;
      }
    },
  },
  watch: {
    tableData() {
      this.$nextTick(() => {
        this.multipleSelection.forEach((item) => {
          this.$refs.foodTable.toggleRowSelection(item);
        });
      });
    },
  },
  async created() {
    this.foodOriginal = (await getFood()).data;
    this.foodPut = (await getFoodMenu({ date: getWeekday(new Date()) })).data;
    console.log("foodOriginal", this.foodOriginal);
    console.log("foodPut", this.foodPut);
  },
  methods: {
    handleDialogClose(formName) {
      this.$refs[formName].resetFields();
    },
    handleDelete(row) {
      this.dialogDelete.visible = true;
      this.dialogDelete.food_id = row.food_id;
      this.dialogDelete.name = row.food_name;
    },
    handlePutOff(row) {
      this.dialogPutOff.visible = true;
      this.dialogPutOff.name = row.food_name;
      this.dialogPutOff.date = row.date;
      this.dialogPutOff.food_menu_id = row.food_menu_id;
    },
    // 更改上架菜品供应数量（api测试成功）
    handleEditNum(row) {
      this.dialogModifyNum.visible = true;
      this.dialogModifyNum.name = row.food_name;
      this.dialogModifyNum.date = row.date;
      this.dialogModifyNum.food_menu_id = row.food_menu_id;
      this.modifyForm.modifyNum = row.number;
    },
    handleEditInfo(row) {
      this.dialogModifyInfo.visible = true;
      this.dialogModifyInfo.food_id = row.food_id;
      this.dialogModifyInfo.name = row.food_name;
      this.form.status = row.status;
      this.form.price = row.price;
      this.form.food_name = row.food_name;
      this.form.description = row.description;
    },
    handleSelection(val) {
      this.multipleSelection = val;
    },
    // 删除指定菜品的（已通过api测试）
    async foodDelete() {
      const res = await deleteFood({
        food_id: this.dialogDelete.food_id,
        isdelete: 1,
      });
      if (res.status) {
        // 浏览器本地删除
        this.foodOriginal = this.foodOriginal.filter(
          (item) => item.food_name !== this.dialogDelete.name
        );
        // 显示成功信息
        this.$myMsg.notify({
          content: "菜品已删除",
          type: "success",
        });
        // 关闭弹出层
        this.dialogDelete.visible = false;
      }
    },
    // 从菜单中下架指定菜品（已api测试通过）
    async foodPutOff() {
      const res = await deleteFoodMenu({
        food_menu_id: this.dialogPutOff.food_menu_id,
      });
      if (res.status) {
        this.foodPut = this.foodPut.filter(
          (item) => item.food_menu_id !== this.dialogPutOff.food_menu_id
        );
        this.$myMsg.notify({
          content: "菜单已下架",
          type: "success",
        });
        this.dialogPutOff.visible = false;
      }
    },
    // 上架菜品到菜单(已api测试通过)
    async foodPutOn() {
      let date = this.date;
      if (!this.multipleSelection.length) {
        this.$myMsg.notify({
          content: "还未添加菜单！",
          type: "error",
        });
      } else if (!this.foodNum || !date) {
        this.$myMsg.notify({
          content: "请填写必要信息！",
          type: "error",
        });
      } else {
        let number = this.foodNum * 1;
        //返回food_id数组，用以提交
        const foods_id = [];
        this.multipleSelection.forEach((item) => {
          foods_id.push(item.food_id);
        });
        console.log("addFoodMenu", date, number, foods_id);
        const res = await addFoodMenu({
          date,
          number,
          foods_id,
        });
        //数据回显
        if (res.status) {
          this.foodPut = (await getFoodMenu({ date: this.date })).data;
          // 清除表单域
          this.foodNum = "";
          this.date = "";
          this.$refs["foodTable"].clearSelection();
          this.multipleSelection = [];
          //显示成功信息
          this.$myMsg.notify({
            content: "上架成功",
            type: "success",
          });
        }
      }
    },
    // 调整单个菜品信息
    async foodInfoModify() {
      // 发起请求
      const res = await updateFoodInfo({
        food_id: this.dialogModifyInfo.food_id,
        food_name: this.form.food_name,
        status: this.form.status,
        price: this.form.price,
        image: this.foodOriginal.find(
          (food) => food.food_id === this.dialogModifyInfo.food_id
        ).image,
        description: this.form.description,
        isdelete: this.foodOriginal.find(
          (food) => food.food_id === this.dialogModifyInfo.food_id
        ).isdelete,
      });
      if (res.status) {
        //前端处理回显，可省去http请求
        this.foodOriginal.forEach((item) => {
          if (item.food_id === this.dialogModifyInfo.food_id) {
            item.food_name = this.form.food_name;
            item.status = this.form.status;
            item.price = this.form.price;
            item.description = this.form.description;
          }
        });
        this.$myMsg.notify({
          content: "菜单修改成功!",
          type: "success",
        });
        // 关闭弹出层
        this.dialogModifyInfo.visible = false;
      }
    },
    async foodModifyNum() {
      const res = await updateFoodMenuNum({
        number: this.modifyForm.modifyNum,
        food_menu_id: this.dialogModifyNum.food_menu_id,
      });
      //   本地浏览器处理回显
      if (res.status) {
        let number = this.modifyForm.modifyNum;
        this.foodPut.find(
          (food) => food.food_menu_id === this.dialogModifyNum.food_menu_id
        ).number = number;
        this.dialogModifyNum.visible = false;
        this.$myMsg.notify({
          content: "修改成功",
          type: "success",
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
@import url("../../assets/less/mixins");
@elMarginTop: 30px;
@elWidth: 90%;
.putFood {
  ::before {
    height: 0px;
  }
  display: block;
  #headerCard {
    display: block !important;
  }
  .food-modify {
    padding: 0 40px;
  }
  .digalog-title > i {
    font-size: 18px;
    margin-right: 5px;
    color: #f56c6c;
  }
  .food-original,
  .food-put {
    width: @elWidth;
    margin: @elMarginTop auto 0;
    min-height: 400px;
    overflow-y: auto;
    display: block;
  }
  .table-tools {
    font-family: myFont3;
    margin: 0 auto;
    .label {
      font-size: 14px;
      color: #999;
    }
    .el-button {
      width: 100px;
    }
    & > .el-input {
      width: 200px;
      margin-right: 20px;
    }
  }
  .food-put {
    margin-bottom: 80px;
  }
  .food-put-table,
  .food-original-table {
    max-height: 400px;
    overflow-y: auto;
    display: block;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
.el-picker-panel__footer .el-button:first-child,
.el-date-picker__time-header {
  display: none;
}
</style>