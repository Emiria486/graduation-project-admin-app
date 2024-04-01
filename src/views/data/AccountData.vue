<template>
  <div class="accountData">
    <div class="first-row">
      <el-card class="box-card data">
        <div slot="header" class="data-title">
          <span>收入支出</span>
          <el-tag type="primary" effect="dark" size="medium">2024-03</el-tag>
        </div>
        <div class="data-item">
          <span class="data-number">36万</span>
          <span class="data-description">实际收入</span>
        </div>
        <div class="data-item">
          <span class="data-number">5万</span>
          <span class="data-description">后勤支出</span>
        </div>
        <div class="data-item">
          <span class="data-number">1000</span>
          <span class="data-description">优惠券发放</span>
        </div>
      </el-card>
      <el-tabs class="tools" type="border-card">
        <el-tab-pane>
          <span slot="label">
            <i class="el-icon-time"></i>
            历史流水
          </span>
          <div class="date">
            <el-date-picker
              v-model="date"
              type="month"
              format="yyyy-MM"
              value-format="yyyy-MM"
              placeholder="请输入需要查询的月份"
            >
            </el-date-picker>
            <div class="date-button">
              <el-button
                type="success"
                class="previous"
                size="medium"
                @click="lastMonth"
                >上个月</el-button
              >
              <el-button type="primary" class="search" size="medium"
                >查询</el-button
              >
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">
            <i class="el-icon-document-add"></i>
            修改支出项
          </span>
          <div class="addExpend">
            <div class="input-box">
              <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
                <el-form-item prop="expend">
                  <el-input
                    v-model="ruleForm.expend"
                    placeholder="请输入支出金额（元）"
                    prefix-icon="el-icon-coin"
                  ></el-input>
                </el-form-item>
              </el-form>
              <el-select v-model="expendType" placeholder="支出类型">
                <el-option
                  v-for="item in expendPie"
                  :key="item.name"
                  :value="item.name"
                >
                </el-option>
              </el-select>
            </div>
            <div class="button-expend">
              <el-button
                type="primary"
                size="medium"
                class="increase"
                @click="increase"
                >添加</el-button
              >
              <el-button
                type="warning"
                size="medium"
                class="reduce"
                @click="reduce"
                >减少</el-button
              >
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="second-row">
      <el-card class="lines">
        <EchartLines ref="lines"></EchartLines>
      </el-card>
      <el-card class="pie">
        <EchartPie
          ref="pie"
          title="支出金额详情"
          subtext="2024-3"
          :show-tool-box="true"
          :data="expendPie"
        ></EchartPie>
      </el-card>
    </div>
  </div>
</template>
  
  <script>
import EchartLines from "@/components/echarts/EchartLines";
import EchartPie from "@/components/echarts/EchartPie";
export default {
  name: "AccountData",
  components: {
    EchartLines,
    EchartPie,
  },
  data() {
    let regExp = /^\d+(\.\d+)?$/;
    let validateExpend = (rule, value, callback) => {
      if (value === "") return callback(new Error("请输入金额数值"));
      else if (!regExp.test(value)) return callback(new Error("金额为数字值"));
      else return callback();
    };
    return {
      date: "",
      expendValue: 0,
      expendType: "",
      expendPie: [
        { value: 5000, name: "员工工资" },
        { value: 3000, name: "食材购买" },
        { value: 3600, name: "设备维修" },
      ],
      ruleForm: {
        expend: "",
      },
      rules: { expend: [{ validator: validateExpend, trigger: "blur" }] },
    };
  },
  methods: {
    lastMonth() {
      this.$refs["lines"].repaint();
      this.$refs["pie"].repaint();
    },
    increase() {
      this.expendPie[this.expendType] =
        this.expendPie[this.expendType] + this.expendValue;
    },
    reduce() {
      this.expendPie[this.expendType] =
        this.expendPie[this.expendType] - this.expendValue;
    },
  },
};
</script>
  
  <style lang="less" scoped>
@btnW: 100px;
@import url("../../assets/less/mixins");
.accountData {
  .first-row {
    margin: 30px auto 0;
    width: 90%;
    display: flex;
    justify-content: space-between;
  }
  .second-row {
    width: 90%;
    margin: 30px auto 80px;

    .lines,
    .pie {
      height: 450px;
      .el-card__body {
        height: 100%;
        .flex-center;
      }
    }

    .pie {
      margin-top: 20px;
    }
  }
  .data {
    width: 45%;
    min-width: 400px;
    max-width: 700px;

    .data-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 24px;
      font-family: myFont2;
    }
  }
  .date-item {
    .flex-center(column);
    flex: 1;
    height: 120px;
    .date-number {
      color: #409eff;
      font-family: myFont3;
      font-size: 32px;
    }
    .data-description {
      margin-top: 15px;
      font-family: myFont3;
      font-size: 16px;
    }
  }
  .el-tabs {
    position: relative;
    width: 50%;
    min-width: 400px;
    max-width: 800px;
    &__item {
      height: 52px;
      span {
        line-height: 52px;
        font-family: myFont3;
        font-size: 16px;
        i {
          padding-right: 5px;
        }
      }
    }
  }
  .date {
    .flex-center(columns);
    margin-top: 15px;
    .el-input,
    &-button {
      width: 50%;
      min-width: 300px;
      max-width: 500px;
    }
    &-button {
      margin-top: 20px;

      .previous {
        width: @btnW;
      }
      .search {
        width: @btnW;
        margin-left: 20px;
      }
    }
  }
  .addExpend {
    .flex-center(column);
    margin-top: 15px;
    .input-box {
      display: flex;
      .el-form {
        width: 50%;
        min-width: 250px;
        max-width: 500px;
        &-item {
          margin-bottom: 0;
        }
      }
    }
    .el-select {
      width: 110px;
      margin-left: 20px;
    }
    .el-button {
      width: @btnW;
      margin-top: 20px;
    }
    .button-expend {
      margin-left: -160px;
    }
    .reduce {
      margin-left: 20px;
    }
  }
  .echartLines,
  .echartPie {
    width: 900px;
    height: 400px;
  }
}
@media screen and(min-width: 1600px) {
  .accountData {
    .second-row {
      .lines,
      .pie {
        height: 550px;
      }
    }
  }
  .echartLines,
  .echartPie {
    width: 1200px;
    height: 500px;
  }
}
</style>