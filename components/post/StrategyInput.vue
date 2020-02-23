<template>
  <div class="StrategyInput">
    <div class="input">
      <input type="text" v-model="inputSearch" placeholder="请输入想去的地方，比如：'成都'" />
      <i class="el-icon-search" @click="sousuo"></i>
    </div>
    <div class="tuijian">
      <i>推荐：</i>
      <span v-for="(value,index) in recommendData" :key="index" @click="tuijian(value)">{{value}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //推荐数据
      recommendData: ["广州", "上海", "北京"],
      //输入框的值
      inputSearch: "",
      //搜索关键字
      keyword: ""
    };
  },
  mounted() {},
  //监听关键字当前关键字改变时，发送事件给父组件
  watch: {
    //路由
    $route() {
      // 将路由的关键字赋值给输入框
      const { city } = this.$route.query;
      //有关键字的情况下
      if (city) {
        //输入框的值
        this.inputSearch = city;
        //搜索的值
        this.keyword = city;
      }
    },
    keyword() {
      //发送事件给父组件
      //换了，不需要
      this.$emit("seek", this.keyword);
      // this.$router.replace({
      //   url: this.$route.path, //路由
      //   query: { city: this.keyword } //参数
      // });
    }
  },
  methods: {
    //添加推荐城市
    tuijian(value) {
      //赋值给输入框
      this.inputSearch = value;
      //赋值给关键字
      this.keyword = value;
    },
    //点击搜索
    sousuo() {
      //非空判断
      if (this.inputSearch.trim().length != 0) {
        //赋值给关键字
        this.keyword = this.inputSearch;
      } else {
        this.$message.error("请输入搜索关键字");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.StrategyInput {
  .input {
    box-sizing: border-box;
    width: 100%;
    height: 40px;
    border: 3px solid orange;
    display: flex;
    align-content: center;
    input {
      // width: 80%;
      height: 100%;
      padding: 0 20px;
      border: none;
      outline: none;
      flex: 1;
    }
    .el-icon-search {
      font-size: 24px;
      font-weight: 700;
      margin-right: 10px;
      color: orange;
      &::before {
        line-height: 34px;
      }
      &:hover {
        cursor: pointer;
      }
    }
  }
  .tuijian {
    color: #666;
    font-size: 12px;
    padding: 10px 0;
    span {
      margin-right: 5px;
      &:hover {
        color: orange;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
}
</style>