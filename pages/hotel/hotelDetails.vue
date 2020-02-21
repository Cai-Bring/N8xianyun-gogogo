<template>
  <div class="hoteldetalis">
    <!-- 面包屑导航部分 -->
    <!-- 此处的斜杆为面包屑的分隔符，不是跳转 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/hotel' }">{{myhotel.big_cate}}</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/hotel' }">{{myhotel.real_city}}{{myhotel.big_cate}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{myhotel.name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 酒店介绍部分 -->
    <div class="thishotel">
      <el-row class="hotelname" type="flex" align="middle">
        <h2>{{myhotel.name}}</h2>
        <div class="good" v-if="value>3">
          <i class="el-icon-star-on"></i>
          <i class="el-icon-star-on"></i>
          <i class="el-icon-star-on"></i>
          <i class="el-icon-star-on"></i>
          <i class="el-icon-star-on"></i>
        </div>
      </el-row>
      <p>{{myhotel.alias}}</p>
      <i class="el-icon-location"></i>
      <span>{{myhotel.address}}</span>
    </div>
    <!-- 酒店详情部分 -->
    <div class="abouthotel">
      <img :src="myhotel.photos" alt />
    </div>
    <!-- 酒店价格部分 -->
    <div class="hotelprice">
      <el-table :data="myhotel.products" style="width: 100%">
        <el-table-column prop="name" label="价格来源" width="420"></el-table-column>
        <el-table-column prop="bestType" label="低价房型" width="420"></el-table-column>
        <el-table-column label="最低价格/每晚" width="160">
          <template slot-scope="scope">
            <span class="chearprice">￥ {{scope.row.price}}</span>
            起
            <i class="el-icon-arrow-right"></i>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 地图部分 -->
    <el-row class="map" type="flex">
      <el-col>
        <div id="container"></div>
      </el-col>
      <el-col style="margin-left:20px">
        <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true">
          <el-tab-pane label="风景" name="first"></el-tab-pane>
          <el-tab-pane label="交通" name="second"></el-tab-pane>
        </el-tabs>
        <div id="panel"></div>
      </el-col>
    </el-row>
    <!-- 底部评论部分 -->
    <div class="remarks">
      <!-- <el-rate v-model="value" disabled text-color="#ff9900" score-template="{value}"></el-rate> -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      myhotel: {},
      value: 0,
      map: "",
      activeName: "first"
    };
  },
  mounted() {
    // console.log(this.$route.query);
    // 页面一加载就发送axios请求得到该酒店数据
    this.$axios({
      url: "/hotels?id=" + this.$route.query.id
    }).then(res => {
      this.myhotel = res.data.data[0];
      this.value = res.data.data[0].stars;
      console.log(this.myhotel);
      // 异步导入地图js （来自于官网）
      var url =
        "https://webapi.amap.com/maps?v=1.4.15&key=0e50af054087c7bec2bd57e4356a4bd3&callback=onLoad";
      var jsapi = document.createElement("script");
      jsapi.charset = "utf-8";
      jsapi.src = url;
      document.head.appendChild(jsapi);
      // 地图初始化
      window.onLoad = () => {
        this.map = new AMap.Map("container", {
          resizeEnable: true, //是否监控地图容器尺寸变化
          zoom: 11, //初始化地图层级
          center: [
            this.myhotel.location.longitude,
            this.myhotel.location.latitude
          ]
        });
        this.searchmap("风景");
      };
    });
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab);
      // console.log(event);
      this.map = new AMap.Map("container", {
        resizeEnable: true, //是否监控地图容器尺寸变化
        zoom: 11, //初始化地图层级
        center: [
          this.myhotel.location.longitude,
          this.myhotel.location.latitude
        ]
      });
      this.searchmap(tab.label);
    },
    searchmap(whereplace) {
      AMap.service(["AMap.PlaceSearch"], () => {
        //构造地点查询类
        var placeSearch = new AMap.PlaceSearch({
          pageSize: 10, // 单页显示结果条数
          pageIndex: 1, // 页码
          city: this.myhotel.real_city, // 兴趣点城市
          citylimit: true, //是否强制限制在设置的城市内搜索
          map: this.map, // 展现结果的地图实例
          panel: "panel", // 结果列表将在此容器中进行展示。
          autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });
        var cpoint = [
          this.myhotel.location.longitude,
          this.myhotel.location.latitude
        ]; //中心点坐标
        placeSearch.searchNearBy(whereplace, cpoint, 1000, function(
          status,
          result
        ) {
          // console.log(result);
        });
      });
    }
  }
};
</script>

<style lang="less" scoped>
.hoteldetalis {
  width: 1000px;
  margin: 20px auto;
  .thishotel {
    color: #666;
    font-size: 14px;
    margin: 20px 0;
    .good {
      color: #f90;
    }
    h2 {
      color: #000;
      margin-right: 5px;
      font-weight: 500;
      font-size: x-large;
    }
  }
  .abouthotel {
    img {
      width: 640px;
      height: 360px;
    }
  }
  .hotelprice {
    margin-bottom: 30px;
    /deep/.chearprice {
      color: #f90;
    }
    /deep/.el-icon-arrow-right {
      color: #f90;
    }
  }
  .map {
    #container {
      width: 650px;
      height: 360px;
    }
    #panel {
      width: 100%;
      height: 300px;
      overflow: auto;
    }
  }
}
</style>