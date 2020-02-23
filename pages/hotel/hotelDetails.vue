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
      <!-- 地图 -->
      <el-col>
        <div id="container"></div>
      </el-col>
      <!-- 地图侧边栏 -->
      <el-col style="margin-left:20px">
        <!-- 地图TAB栏 -->
        <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true">
          <el-tab-pane label="风景" name="first">
            <!-- 地图搜索栏 -->
            <div id="panel" v-if="activeName==='first'"></div>
          </el-tab-pane>
          <el-tab-pane label="交通" name="second">
            <div id="panel" v-if="activeName==='second'"></div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>

    <!-- 酒店相信服务部分 -->
    <div class="hotelmsg">
      <!-- 基本信息 -->
      <el-row class="haveborder">
        <el-col :span="4" class="haveborderson">基本信息</el-col>
        <el-col :span="20" class="haveborderson">
          <el-row type="flex" class="sons">
            <el-col :span="24">入住时间: 14:00之后</el-col>
            <el-col :span="24">离店时间: 12:00之前</el-col>
            <el-col :span="24">{{myhotel.creation_time}}/{{myhotel.renovat_time}}</el-col>
            <el-col :span="24">酒店规模:{{myhotel.roomCount}}间客房</el-col>
          </el-row>
        </el-col>
      </el-row>
      <!-- 主要设施 -->
      <el-row class="haveborder">
        <el-col :span="4" class="haveborderson">主要设施</el-col>
        <el-col :span="20" class="haveborderson">
          <el-row type="flex" class="sons">
            <span
              v-for="(item,index) in myhotel.hotelassets"
              :key="index"
              class="assitem"
            >{{item.name}}</span>
          </el-row>
        </el-col>
      </el-row>
      <!-- 停车服务 -->
      <el-row class="haveborder">
        <el-col :span="4" class="haveborderson">停车服务</el-col>
        <el-col :span="20" class="haveborderson">
          <el-row type="flex" class="sons">
            <span v-if="myhotel.parking===null">-</span>
            <span v-if="myhotel.parking!==null">{{myhotel.parking}}</span>
          </el-row>
        </el-col>
      </el-row>
      <!-- 品牌信息 -->
      <el-row class="haveborder">
        <el-col :span="4" class="haveborderson">品牌信息</el-col>
        <el-col :span="20" class="haveborderson">
          <el-row type="flex" class="sons">
            <span v-if="hotelbrand===null">-</span>
            <span v-if="hotelbrand!==null">{{hotelbrand.name}}</span>
          </el-row>
        </el-col>
      </el-row>
    </div>

    <!-- 底部评论部分 -->
    <div class="remarks">
      <h2>{{myhotel.all_remarks}}条真实用户评论</h2>
      <el-row type="flex" align="middle">
        <!-- 好评数 -->
        <el-col :span="4" class="allremarks">
          <el-row>总评数：{{myhotel.all_remarks}}</el-row>
          <el-row>好评数：{{myhotel.good_remarks}}</el-row>
          <el-row>差评数：{{myhotel.bad_remarks}}</el-row>
        </el-col>
        <!-- 推荐 -->
        <el-col :span="5" class="mystars">
          <el-rate
            v-model="value"
            disabled
            text-color="#ff9900"
            show-score
            score-template="{value}"
          ></el-rate>
          <div class="stamp" v-if="value>=4">推荐</div>
        </el-col>
        <!-- 环境 -->
        <el-col :span="3">
          <div class="ratebox">
            <el-progress
              :width="70"
              color="#f90"
              type="circle"
              :show-text="false"
              v-if="environment"
              :percentage="environment"
            ></el-progress>
            <div class="ratetext">
              <p>环境</p>
              {{environment/10}}
            </div>
          </div>
        </el-col>
        <!-- 产品 -->
        <el-col :span="3">
          <div class="ratebox">
            <el-progress
              :width="70"
              color="#f90"
              type="circle"
              :show-text="false"
              v-if="product"
              :percentage="product"
            ></el-progress>
            <div class="ratetext">
              <p>产品</p>
              {{product/10}}
            </div>
          </div>
        </el-col>
        <!-- 服务 -->
        <el-col :span="3">
          <div class="ratebox">
            <el-progress
              :width="70"
              color="#f90"
              type="circle"
              :show-text="false"
              v-if="service"
              :percentage="service"
            ></el-progress>
            <div class="ratetext">
              <p>服务</p>
              {{service/10}}
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 用户评论部分 -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      myhotel: {}, // 酒店数据
      value: 0, // 酒店评分星星
      map: "", // 地图
      activeName: "first", // 地图侧边栏的TAB切换,默认为first,第一个
      hotelbrand: null, // 酒店品牌信息
      environment: "", //环境评分
      product: "", // 产品评分
      service: "" //服务评分
    };
  },
  mounted() {
    // console.log(this.$route.query);
    // 页面一加载就发送axios请求得到该酒店数据
    this.$axios({
      url: "/hotels?id=" + this.$route.query.id
    }).then(res => {
      this.myhotel = res.data.data[0];
      this.value = res.data.data[0].stars; //酒店评分星星
      this.hotelbrand = this.myhotel.hotelbrand; //酒店品牌信息
      // 修改评分信息
      this.environment = this.myhotel.scores.environment * 10;
      this.product = this.myhotel.scores.product * 10;
      this.service = this.myhotel.scores.service * 10;
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
        // 调用地图搜索方法
        this.searchmap("风景");
      };
    });
  },
  methods: {
    // 点击地图TAB栏切换触发的事件
    handleClick(tab, event) {
      // console.log(tab);
      // console.log(event);
      // 初始化地图
      this.map = new AMap.Map("container", {
        resizeEnable: true, //是否监控地图容器尺寸变化
        zoom: 11, //初始化地图层级
        center: [
          this.myhotel.location.longitude,
          this.myhotel.location.latitude
        ]
      });
      // 调用地图搜索方法
      this.searchmap(tab.label);
    },
    // 封装一个地图搜索的方法
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
          // 可以通过地图搜索功能修改返回的数据
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
  .hotelmsg {
    margin-top: 20px;
    .haveborder {
      border-bottom: 1px solid #eee;
      .haveborderson {
        padding: 20px 10px;
        font-size: 14px;
        .sons {
          color: #666;
          padding-left: 5px;
          padding-right: 5px;
        }
        .assitem {
          border: 1px solid #eee;
          padding: 4px 10px;
          margin-right: 10px;
          border-radius: 4px;
          background-color: #eee;
          color: #666;
        }
      }
    }
  }
  .remarks {
    margin-top: 20px;
    h2 {
      margin-bottom: 15px;
      font-size: 16px;
    }
    .allremarks {
      color: #666;
    }
    .mystars {
      position: relative;
      .stamp {
        color: #fa3;
        font-size: x-large;
        position: absolute;
        left: 20px;
        top: -28px;
        border: 2px solid #fa3;
        text-align: center;
        line-height: 70px;
        width: 70px;
        height: 70px;
        border-radius: 50%;
        opacity: 0.25;
        transform: rotate(-30deg);
      }
    }
    .ratebox {
      position: relative;
      width: 70px;
      height: 70px;
      .ratetext {
        position: absolute;
        top: 50%;
        left: 50%;
        text-align: center;
        transform: translate(-50%, -50%);
        color: #f90;
      }
    }
  }
}
</style>