<template>
  <header class="header">
    <el-row type="flex" justify="space-between" class="main">
      <!-- logo -->
      <div class="logo">
        <nuxt-link to="/">
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
        </nuxt-link>
      </div>

      <!-- 菜单栏 -->
      <el-row type="flex" class="navs">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
        <!-- 天气功能 -->
        <div class="weather">
          <el-popover placement="top-start" width="310" trigger="hover">
            <div class="moreWeather" v-if="moreWeaters.length !== 0">
              <div class="moreWeather_date" style="border-bottom: 1px solid #ccc;padding: 10px 0 10px 15px;font-size: 12px;">
                <span>{{moreWeaters.reportTime.slice(0,10)}}</span>
                <span style="color: #0079f4;margin-left: 10px">{{`未来${moreWeaters.forecasts.length}天天气`}}</span>
              </div>
              <div class="moreWeather_msg" style="padding: 5px;font-size: 12px;">
                <div v-for="(v, i) in moreWeaters.forecasts" class="dailyForecast" :key="i" :style="`display: inline-block;width:150px;
                padding: 10px 10px;box-sizing: border-box;text-align: center;box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
                ${i === 0 ? 'font-weight: 700' : ''}`">
                  <div class="moreWeather_msg_date">{{dateToDay(i,v.week)}}</div>
                  <div class="moreWeather_msg_cond_txt" style="padding: 10px 0;">
                    <span>{{v.dayWeather}}</span>
                  </div>
                  <div class="moreWeather_msg_tmp">{{`${v.dayTemp}~${v.nightTemp}`}}&#176;C</div>
                  <div class="moreWeather_msg_wind_sc">{{v.dayWindDir+v.dayWindPower+'级'}}</div>
                </div>
              </div>
            </div>
            <el-button slot="reference">
              <div class="okWeater" v-if="cityWeather.length !== 0">
                <span>{{cityWeather.city}}:</span>
                <span style="color:#f90">{{cityWeather.weather}}</span>
                <span style="color:#38f">{{cityWeather.temperature}}&#176;C</span>
              </div>
              <div class="noWeater" v-if="cityWeather.length === 0">
                <span style="color:#38f">天气</span>
              </div>
            </el-button>
          </el-popover>
        </div>
      </el-row>

      <!-- 登录/用户信息 -->
      <el-row type="flex" align="middle">
        <!-- 如果用户存在则展示用户信息，用户数据来自store -->
        <el-dropdown v-if="$store.state.user.userInfo.token">
          <el-row type="flex" align="middle" class="el-dropdown-link">
            <nuxt-link to="#">
              <img :src="$axios.defaults.baseURL + $store.state.user.userInfo.user.defaultAvatar" />
              {{$store.state.user.userInfo.user.nickname}}
            </nuxt-link>
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </el-row>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <nuxt-link to="/user/personal">个人中心</nuxt-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="handleLogout">退出</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- 不存在用户信息展示登录注册链接 -->
        <nuxt-link to="/user/login" class="account-link" v-else>登录 / 注册</nuxt-link>
      </el-row>
    </el-row>
  </header>
</template>
<script>
export default {
  data() {
    return {
      cityWeather: [],
      weathrErr: [],
      moreWeaters:[]
    };
  },
  methods: {
    // 用户退出
    handleLogout() {
      this.$store.commit("user/setUserInfo", {
        token: "",
        user: {} // 一定要使用对象
      });
    },

    init(url) {
      var jsapi = document.createElement("script");
      jsapi.charset = "utf-8";
      jsapi.src = url;
      document.head.appendChild(jsapi);
    },
    maplocation() {
      AMap.plugin("AMap.CitySearch", () => {
        var citySearch = new AMap.CitySearch();
        citySearch.getLocalCity((status, result) => {
          if (status === "complete" && result.info === "OK") {
            // 查询成功，result即为当前所在城市信息
            this.maoWeater(result.city);
          }
        });
      });
    },
    maoWeater(city) {
      AMap.plugin("AMap.Weather", () => {
        //创建天气查询实例
        var weather = new AMap.Weather();

        //执行实时天气信息查询
        weather.getLive(city, (err, data) => {
          if (err) {
            console.log(err);
            this.weathrErr = err;
          } else {
            this.moreWeater(city)
            console.log(data);
            
            this.cityWeather = data;
          }
        });
      });
    },
    moreWeater(city){
      //加载天气查询插件
      AMap.plugin('AMap.Weather', () => {
          //创建天气查询实例
          var weather = new AMap.Weather();

          //执行实时天气信息查询
          weather.getForecast(city, (err, data) =>{
              if (err) {
                console.log(err);
              } else {
                console.log(data);
                this.moreWeaters = data
              }
          });
      });
    },
    dateToDay (key,week) {
      let keys = ['今天', '明天', '后天', '大后天']
      let weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      return `${keys[key]}(${weeks[week]})`
    }
  },
  mounted() {
    window.onLoad = () => {
      this.maplocation();
    };
    // 获取地图
    this.init(
      "https://webapi.amap.com/maps?v=1.4.15&key=9623915ac82517f2e7ba4b95ef9ed725&callback=onLoad"
    );
    this.$root.$on("cityWeater", data => {
      this.cityWeather = data;
    });
    this.$root.$on("moreWeater", data => {
      this.moreWeaters = data;
    });
  }
};
</script>
<style scoped lang="less">
.header {
  height: 60px;
  line-height: 60px;
  background: #fff;
  border-bottom: 1px #ddd solid;
  box-shadow: 0 3px 0 #f5f5f5;
  box-sizing: border-box;

  .main {
    width: 1000px;
    margin: 0 auto;
  }

  .logo {
    width: 156px;
    padding-top: 8px;
    

    img {
      display: block;
      width: 100%;
    }
  }

  .navs {
    margin: 0 20px;
    flex: 1;

    a {
      display: block;
      padding: 0 20px;
      height: 60px;
      box-sizing: border-box;

      &:hover,
      &:focus,
      &:active {
        border-bottom: 5px #409eff solid;
        color: #409eff;
      }
    }

    /deep/ .nuxt-link-exact-active {
      background: #409eff;
      color: #fff !important;
    }
    /deep/ .nuxt-link-active:not(:first-child) {
      background: #409eff;
      color: #fff !important;
    }
    .weather {
      position: absolute;
      top: 0;
      right: 28px;
      .el-button {
        border: 0;
        color: #606266;
        padding: 21px 20px;
        &:hover {
          background-color: #fff;
        }
        .okWeater {
          & > span {
            margin: 0 3px;
          }
        }
      }
    }
  }

  .message {
    height: 36px;
    line-height: 1;
    cursor: pointer;
    .el-icon-bell {
      margin-right: 2px;
      font-size: 18px;
    }
  }

  .el-dropdown-link {
    margin-left: 20px;

    &:hover {
      img {
        border-color: #409eff;
      }
    }

    a {
      display: block;
    }

    img {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      border: 2px #fff solid;
      border-radius: 50px;
    }
  }

  .account-link {
    font-size: 14px;
    margin-left: 10px;
    color: #666;

    &:hover {
      color: #409eff;
      text-decoration: underline;
    }
  }
}
</style>