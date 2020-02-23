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
        <StrategyInput @seek="inputSeek" />
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
          :current-page="Math.floor(routeData.start/routeData.limit)+1"
          :page-sizes="[3, 5, 10, 15]"
          :page-size="routeData.limit"
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
      routeData: {
        //开始索
        start: 0,
        //获取文章数
        limit: 3
      },
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
    //判断当前路由是否有关键字
    this.routeBianhua();
    console.log(Math.floor(this.routeData.start / this.routeData.limit) + 1);
  },
  //复用当前组件
  beforeRouteUpdate(to, from, next) {
    //可能获取参数会慢，就获取不到
    next();
    //调用判断当前是否有参数
    this.routeBianhua();
  },
  computed: {
    //使用计算 获取文章列表
    essayList() {
      let canshu = this.routeData.city
        ? {
            _start: this.routeData.start,
            _limit: this.routeData.limit,
            city: this.routeData.city
          }
        : {
            _start: this.routeData.start,
            _limit: this.routeData.limit
          };
      //获取文章列表
      this.$axios({
        url: "/posts",
        params: canshu
      }).then(res => {
        // console.log(res);
        //赋值
        this.wenzhangList = res.data.data;
        //总条数
        this.sum = res.data.total;
      });
      // 更新路由
      this.routerOneself();
      return "";
    }
  },
  methods: {
    //封装判断当前路由
    routeBianhua() {
      //判断当前路由是否有关键字
      const { city } = this.$route.query;
      const { start } = this.$route.query;
      const { limit } = this.$route.query;
      // console.log(this.$route.query);

      //参数不是数字
      /**
       * 暂时不能再路由修改：开始，的参数；和不是数字的情况
       * //不能修改页显示数的参数，太快 获取不到
       */
      //有无参数
      if (!start) {
        //默认参数
        this.routerOneself();
      } else {
        //赋值给插件
        this.routeData.start = Number(start);
      }
      if (!limit) {
        //默认参数
        this.routerOneself();
      } else {
        //赋值给插件
        this.routeData.limit = Number(limit);
      }
      if (city) {
        //给路由设置城市参数
        this.routeData.city = city;
        this.routerOneself();
      }
    },
    //切换每页显示数的时候触发
    handleSizeChange(val) {
      //改变获取文章数
      this.routeData.limit = val;
    },
    //切换页码时触发
    handleCurrentChange(val) {
      //改变当前开始索引
      //开始 = 显示数*当前页-显示数
      this.routeData.start = this.routeData.limit * val - this.routeData.limit;
    },
    //跳转到当前页，给当前页设置参数
    routerOneself() {
      this.$router.replace({
        url: this.$route.path, //路由
        query: this.routeData //参数
      });
    },
    //输入框搜索事件
    inputSeek(data) {
      //城市
      this.routeData.city = data;
      //路由当前
      this.routerOneself();
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