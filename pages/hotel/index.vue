<template>
  <div id="hotel">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>酒店</el-breadcrumb-item>
      <el-breadcrumb-item>{{city}}酒店预定</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="inputs">
      <el-autocomplete
        v-model="searchCity"
        :fetch-suggestions="querySearchAsync"
        placeholder="切换城市"
        @select="handleSelect"
      ></el-autocomplete>
        <el-date-picker
          v-model="time"
          type="daterange"
          start-placeholder="入住日期"
          end-placeholder="离店日期"
          :default-time="['00:00:00', '23:59:59']"
          :picker-options="pickerOptions">
        </el-date-picker>
        <div class="numberOfPeople" :style="numberOfPeopleChange && 'border-color:#38f'">
          <div @click.stop="numberOfPeopleChange=!numberOfPeopleChange" style="width:100%">
            <span :style="numberOfPeopleChangeOk ? 'color:#606266' : ''">{{numberOfPeopleChangeOk ? numberOfPeopleChangeOk : '人数未定'}}</span>
            <span class="el-icon-user"></span>
          </div>
          <div class="numberOfPeopleChange" v-show="numberOfPeopleChange">
            <div class="numberOfPeopleChangeselect">
              <span>每间</span>
                <div>
                  <el-select v-model="numberOfPeople" placeholder="请选择活动区域" size="mini">
                <el-option v-for="(v,i) in 7" :key="i" :label="`${i+1}成人`" :value="`${i+1}成人`">
                  <span>{{i+1}}</span>
                </el-option>
              </el-select>
                </div>
              <div>
                <el-select v-model="numberOfPeople2" placeholder="请选择活动区域" size="mini">
                 <el-option v-for="(v,i) in 5" :key="i" :label="`${i}儿童`" :value="`${i}儿童`">
                  <span>{{i}}</span>
                </el-option>
              </el-select>
              </div>
            </div>
            <div class="numberOfPeopleChangebutton">
              <el-button type="primary" size="small" @click.stop="numberOfPeopleChangeOkFun">确认</el-button>
            </div>
          </div>
        </div>
        <el-button type="primary" @click="hotelPrice">查看价格</el-button>
    </div>
    <div class="evaluateAndMap">
      <div class="evaluate">
        <div class="clearfix">
          <span>区域:</span>
          <div class="evaluateAll">
            <div class="evaluateAllA" :style="evaluateAllAOen ? `height: 60px;` : ''" v-if="cityScenics.length !== 0">
              <a href="javascrip:;" v-for="(v,i) in cityScenics" :key="i">{{v.name}}</a>
            </div>
            <div @click="evaluateAllAOen=!evaluateAllAOen" style="width:98px">
              <span class="el-icon-d-arrow-right evaluateAllOpenDwon" :style="evaluateAllAOen ? '' : `transform: rotate(270deg)`"></span>
              <span class="evaluateAllOpen">等{{cityScenics.length}}个区域 </span>
            </div>
          </div>
        </div>
        <div class="averagePrice">
          <div style="display: inline-block;">
            <span>均价</span>
            <el-tooltip class="item" effect="dark" content="等级均价由平日价格计算得出，节假日价格会有上浮。" placement="right-start">
              <span class="el-icon-question"></span>
            </el-tooltip>:
            &nbsp;
          </div>
          <div class="crown">
            <el-tooltip class="item" effect="dark" content="等级评定是针对房价，设施和服务等各方面水平的综合评估。" placement="top">
              <span>
              <span class="iconfont icon-huangguan"></span>
              <span class="iconfont icon-huangguan"></span>
              <span class="iconfont icon-huangguan"></span>
              <b>¥332</b>
            </span>
            </el-tooltip>
            &nbsp;&nbsp;
            <el-tooltip class="item" effect="dark" content="等级评定是针对房价，设施和服务等各方面水平的综合评估。" placement="top">
              <span>
              <span class="iconfont icon-huangguan"></span>
              <span class="iconfont icon-huangguan"></span>
              <span class="iconfont icon-huangguan"></span>
              <span class="iconfont icon-huangguan"></span>
              <b>¥521</b>
            </span>
            </el-tooltip>
            &nbsp;&nbsp;
            <el-tooltip class="item" effect="dark" content="等级评定是针对房价，设施和服务等各方面水平的综合评估。" placement="top">
              <span>
              <span class="iconfont icon-huangguan"></span>
              <span class="iconfont icon-huangguan"></span>
              <span class="iconfont icon-huangguan"></span>
              <span class="iconfont icon-huangguan"></span>
              <span class="iconfont icon-huangguan"></span>
              <b>¥768</b>
            </span>
            </el-tooltip>
          </div>
        </div>
      </div>
      <div class="map">
        <div id="container"></div>
      </div>
      <span class="clearfix"></span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usermaplocation: {},
      city: '',
      cityID: '',
      cityScenics: [],
      searchCity: '',
      time: '',
      pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now()-86400000;
          }
      },
      numberOfPeople: '2成人',
      numberOfPeople2: '0儿童',
      numberOfPeopleChangeOk: '',
      numberOfPeopleChange: false,
      evaluateAllAOen: true,
      hotel: {
        location:[]
      }
    };
  },
  mounted() {
    // IP定位代码
    if (this.$route.query.city) {
      this.getCity(`/cities?name=${this.$route.query.city}`,(res) => {
        this.cityID = res.data.data[0].id
        this.cityScenics = res.data.data[0].scenics
        this.getHotel({city: this.cityID}, (res)=>{
          // 城市的数据
          this.hotel.hotels = res.data.data
          this.hotel.location = res.data.data.map(v => {
            return [v.location.longitude, v.location.latitude]
          })
          this.getMap()
        })
      })
    }
    let nuxt = document.querySelector('#__nuxt')
    nuxt.onclick = (e) => {
      let numberOfPeopleChange = document.querySelector('.numberOfPeopleChange')
      if (e.target === numberOfPeopleChange || e.target.offsetParent === numberOfPeopleChange) return
      this.numberOfPeopleChange = false
    }
    this.city = this.$route.query.city
    window.onLoad = () => {
      this.maplocation()
    };
    // 引入地图API
    this.init("https://webapi.amap.com/maps?v=1.4.15&key=9623915ac82517f2e7ba4b95ef9ed725&callback=onLoad")
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
            this.$alert(`定位当前城市: ${result.city}`, '提示', {
              confirmButtonText: '确定',
              type: 'success'
            });
          }
        });
      });
      }
    },
    init (url) {
      var jsapi = document.createElement("script");
      jsapi.charset = "utf-8";
      jsapi.src = url;
      document.head.appendChild(jsapi);
    },
    querySearchAsync(queryString, cb) {
      if (queryString.trim()) {
        this.getCity(`/cities?name=${queryString}`,(res)=>{
          // 城市的数据
          console.log(res.data.data)
          if(res.data.data.length !== 0) {
            let city = res.data.data.map(v=>{
              return {
                value:v.name.slice(0,v.name.length-1),
                allName: v.name
              }
            })
            cb(city)
          } else {
            cb([])
          }
        })
        return
      }
      cb([])
    },
    handleSelect(item) {
      this.$router.push({name:'hotel', query:{city: item.allName}})
      this.searchCity = ''
    },
    hotelPrice () {
      let params= {city: this.cityID}
      if (this.time) {
        params= {
          enterTime: `${this.time[0].getFullYear()}-${this.time[0].getMonth()+1}-${this.time[0].getDate()}`,
          leftTime: `${this.time[1].getFullYear()}-${this.time[1].getMonth()+1}-${this.time[1].getDate()}`,
          city: this.cityID
        } 
      }
      this.getHotel(params, (res)=>{
        // 城市的数据
        console.log(res.data.data)
      })
    },
    numberOfPeopleChangeOkFun () {
      this.numberOfPeopleChange = false
      this.numberOfPeopleChangeOk=this.numberOfPeople+this.numberOfPeople2
    },
    getCity (url,callback){
      // 获取城市的详细数据
      this.$axios({
          url
        }).then(res => {
          callback(res)
        })
    },
    getHotel (params,callback) {
      this.$axios({
          url: `/hotels`,
          params
        }).then(res => {
          callback(res)
        })
    },
    getMap (map) {
      map =  map ? map : new AMap.Map("container")
      var lnglats = this.hotel.location;
      var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});
      for (var i = 0, marker; i < lnglats.length; i++) {
          var marker = new AMap.Marker({
              position: lnglats[i],
              map: map,
              content: '' +
              '<div class="custom-content-marker" style="width: 25px;position: relative;height: 34px;">' +
              '   <img style="width: 100%;height: 100%;" src="//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png">' +
              `   <div class="close-btn" style="position: absolute;top: 0px;left: 0px;color: #fff;width: 100%;height: 100%;text-align: center;">${i+1}</div>`+
              '</div>'
          });
          marker.content = this.hotel.hotels[i].name;
          marker.on('mouseover', markerClick);
          marker.emit('mouseover', {target: marker});
          marker.on('mouseout', markerout);
          marker.emit('mouseout', {target: marker});
      }
    function markerClick(e) {
      infoWindow.setContent(e.target.content);
      infoWindow.open(map, e.target.getPosition());
    }
    function markerout(e) {
      infoWindow.close(map, e.target.getPosition())
    }
    map.setFitView();
    }
  },
  watch: {
    '$route.query' () {
      this.city = this.$route.query.city
      this.getCity(`/cities?name=${this.$route.query.city}`,(res) => {
        this.cityID = res.data.data[0].id
        this.cityScenics = res.data.data[0].scenics
        this.getHotel({city: this.cityID}, (res)=>{
          // 城市的数据
          this.hotel.hotels = res.data.data
          this.hotel.location = res.data.data.map(v => {
            return [v.location.longitude, v.location.latitude]
          })
          this.getMap()
        })
      })
    }
  }
};
</script>

<style lang="less" scoped>
#hotel {
  width: 1000px;
  margin: 20px auto;
  .inputs{
    margin-top: 10px;
    .numberOfPeople{
      display: inline-flex;
      position: relative;
      width: 200px;
      height: 39.5px;
      border: 1px solid #DCDFE6;
      border-radius: 4px;
      line-height: 39.5px;
      padding-left: 10px;
      box-sizing: border-box;
      color: #DCDFE6;
      font-size: 14px;
      .numberOfPeopleChange{
        position: absolute;
        top: 50px;
        left: 0;
        background-color: #fff;
        z-index: 300;
        border-radius: 4px;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        color: #606266;
        padding: 10px;
        .numberOfPeopleChangeselect{
          width: 300px;
          border-bottom: 1px solid #ebeef5;
          padding-bottom: 20px;
          margin-bottom: 20px;
          >span{
            margin-right: 50px;
          }
          >div{
            display:inline-block;
            width: 100px;
            color: #606266;
          }
        }
        .numberOfPeopleChangebutton{
          padding-left: 235px;
        }
      }
    }
    .el-icon-user{
      color: #DCDFE6;
      position: absolute;
      top: 10px;
      right: 11px;
      font-size: 20px;
    }
  }
  .evaluateAndMap{
    margin-top: 20px;
    width: 100%;
    .evaluate{
      color: #666;
      float: left;
      width: 650px;
      background-color: #fff;
      font-size: 14px;
      a{
        display: inline-block;
        font-size: 14px;
        margin-right: 20px;
        padding: 5px 0;
        &:hover{
          color: #38f;
          text-decoration: underline;
        }
      }
      .evaluateAll{
        float: right;
        width: 600px;
        .evaluateAllOpenDwon{
          color: #f90;
          transform: rotate(90deg)
        }
        .evaluateAllA{
          overflow: hidden;
        }
      }
      .evaluateAllOpen{
          cursor: pointer;
        }
        .averagePrice{
          margin-top: 20px;
          .crown{
            color: #f90;
            display: inline-block;
            b{
              color: #666;
            }
          }
        }
    }
    .map{
      float: right;
      width: 350px;
      height: 300px;
      #container {
        width:350px;
        height: 100%;
      }  
    }
    .clearfix::after{
        content: "";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
      }
  }
}

</style>