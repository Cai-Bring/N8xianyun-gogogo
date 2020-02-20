<template>
  <div id="hotel">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>酒店</el-breadcrumb-item>
      <el-breadcrumb-item>{{city}}酒店预定</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usermaplocation: {},
      city: ''
    };
  },
  mounted() {
    // IP定位代码
    window.onLoad = () => {
      var map = new AMap.Map("container");
      this.maplocation()
    };
    this.init()
  },
  methods: {
    maplocation() {
      if (Object.keys(this.$route.query).length === 0) {
        AMap.plugin("AMap.CitySearch", () => {
        var citySearch = new AMap.CitySearch();
        citySearch.getLocalCity((status, result) => {
          if (status === "complete" && result.info === "OK") {
            // 查询成功，result即为当前所在城市信息
            this.$router.push({name:'hotel', query:{city: result.city}})
          }
        });
      });
      }
    },
    init () {
      var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=9623915ac82517f2e7ba4b95ef9ed725&callback=onLoad";
      var jsapi = document.createElement("script");
      jsapi.charset = "utf-8";
      jsapi.src = url;
      document.head.appendChild(jsapi);
    }
  },
  watch: {
    '$route.query' () {
      this.city = this.$route.query.city
    }
  }
};
</script>

<style lang="less" scoped>
#hotel {
  width: 1000px;
  margin: 20px auto;
}
</style>