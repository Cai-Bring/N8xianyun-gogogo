<template>
  <div class="post">
    <el-row type="flex" class="row-bg travel-strategy">
      <!-- 左边 -->
      <div class="left">
        <!-- 推荐城市组件 -->
        <RecommendCity />
      </div>
      <!-- 右边  -->
      <div class="strategy-list">
        <!-- 输入框组件 -->
        <StrategyInput />
        <div class="h4">
          <h4>推荐攻略</h4>
          <el-button type="primary" icon="el-icon-edit">写游记</el-button>
        </div>
        <!-- 循环文章列表 -->
        <ArticleList v-for="(value,index) in wenzhangList" :data="value" :key="index" />
        <!-- 分页插件 -->
        <!-- 当前页数= 开始/一页数+1 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="Math.floor(start/limit)+1"
          :page-sizes="[3, 5, 10, 15]"
          :page-size="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="sum"
        ></el-pagination>
      </div>
    </el-row>
    <!-- 调用一下计算属性 -->
    <span>{{essayList}}</span>
  </div>
</template>

<script>
//推荐城市
import RecommendCity from "@/components/post/RecommendCity.vue";
//输入框
import StrategyInput from "@/components/post/StrategyInput";
//文章列表组件
import ArticleList from "@/components/post/ArticleList";
export default {
  data() {
    return {
      //文章列表数据
      wenzhangList: [],
      //开始索引
      start: 0,
      //获取文章数
      limit: 3,
      //文章总数
      sum: 0
    };
  },
  components: {
    RecommendCity, //推荐城市
    StrategyInput, //输入框
    ArticleList //文章列表
  },
  mounted() {
    //判断当前路由是否有参数
  
  },
  computed: {
    //获取文章列表
    essayList() {
      //获取文章列表
      this.$axios({
        url: "/posts",
        params: {
          _start: this.start,
          _limit: this.limit
        }
      }).then(res => {
        console.log(res);
        //赋值
        this.wenzhangList = res.data.data;
        //总条数
        this.sum = res.data.total;
      });
      return ''
    }
  },
  methods: {
    //切换每页显示数的时候触发
    handleSizeChange(val) {
      //改变获取文章数
      this.limit = val;
    },
    //切换页码时触发
    handleCurrentChange(val) {
      //改变当前开始索引
      //开始 = 显示数*当前页-显示数
      this.start = this.limit * val - this.limit;
    }
  }
};
</script>

<style lang="less" scoped>
.post {
  padding: 20px 0;
}
.travel-strategy {
  margin: 0 auto;
  width: 1000px;
  display: flex;
  justify-content: space-between;
  .recommend-City {
    width: 260px;
  }
  .strategy-list {
    width: 700px;
    .h4 {
      height: 40px;
      align-items: center;
      position: relative;
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      h4 {
        display: inline-block;
        font-weight: 400;
        font-size: 18px;
        color: orange;
        &::after {
          display: block;
          content: "";
          width: 72px;
          height: 2px;
          background: orange;
          position: absolute;
          bottom: 0;
          left: 0;
        }
      }
    }
  }
}
</style>