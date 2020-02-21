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
        <div class="numberOfPeople">
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
        <el-button type="primary">查看价格</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usermaplocation: {},
      city: '',
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
      numberOfPeopleChange: false
    };
  },
  mounted() {
    // IP定位代码
    let nuxt = document.querySelector('#__nuxt')
    nuxt.onclick = (e) => {
      let numberOfPeopleChange = document.querySelector('.numberOfPeopleChange')
      if (e.target === numberOfPeopleChange || e.target.offsetParent === numberOfPeopleChange) return
      this.numberOfPeopleChange = false
    }
    console.log(nuxt)
    this.city = this.$route.query.city
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
    },
    querySearchAsync(queryString, cb) {
      console.log(123)
      cb([])
    },
    handleSelect(item) {
      console.log(item);
    },
    numberOfPeopleFocus () {
      console.log(123);
      
    },
    numberOfPeopleChangeOkFun () {
      this.numberOfPeopleChange = false
      this.numberOfPeopleChangeOk=this.numberOfPeople+this.numberOfPeople2
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
  .inputs{
    margin-top: 10px;
    .numberOfPeople{
      display: inline-flex;
      position: relative;
      width: 200px;
      height: 40px;
      border: 1px solid #DCDFE6;
      border-radius: 4px;
      line-height: 37px;
      padding-left: 10px;
      box-sizing: border-box;
      color: #DCDFE6;
      font-size: 14px;
      .numberOfPeopleChange{
        position: absolute;
        top: 50px;
        left: 0;
        background-color: #fff;
        z-index: 10;
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
}
</style>