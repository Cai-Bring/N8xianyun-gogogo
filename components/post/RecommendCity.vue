<template>
  <div class="recommend-City">
    <!-- 推荐列表 -->
    <div class="tuijianliebiao" @mouseleave="yichu">
      <div v-for="(value,index) in citylist" :key="index">
        <div @mouseover="yiru(index)">
          <el-row
            type="flex"
            class="row-bg wodiu"
            justify="space-between"
            align="middle"
            :class="{liekai : index ==suoyin}"
          >
            <div class="theme_type">{{value.type}}</div>
            <div class="jiantui"></div>
          </el-row>
        </div>
        <div v-for="(value,index) in citylist" :key="index">
          <!-- 右侧定位盒子 -->
          <div class="exhibition" v-if="suoyin ==index">
            <el-row
              type="flex"
              class="row-bg"
              justify="space-around"
              align="middle"
              v-for="(item,index) in value.children"
              :key="index"
            >
              <div class="xunhao">{{index+1}}</div>
              <div class="city">
                <nuxt-link :to="`/post?city=${item.city}`">{{item.city}}</nuxt-link>
              </div>
              <p>
                <nuxt-link :to="`/post?city=${item.city}`">{{item.desc}}</nuxt-link>
              </p>
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐城市 -->
    <h4>推荐城市</h4>
    <div class="img">
      <img
        width="100%"
        src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1314891355,4083120438&fm=11&gp=0.jpg"
        alt
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      citylist: [],
      suoyin: null
    };
  },
  mounted() {
    //获取城市菜单列表
    this.$axios({
      url: "/posts/cities"
    }).then(res => {
      this.citylist = res.data.data;
    });
  },
  methods: {
    //鼠标移入推荐主题
    yiru(index) {
      this.suoyin = index;
    },
    //鼠标移出推荐区
    yichu() {
      this.suoyin = null;
    }
  }
};
</script>

<style lang="less" scoped>
.xianshi {
  display: block !important;
  z-index: 2;
}
.recommend-City {
  position: relative;
  h4 {
    font-weight: 400;
    border-bottom: 1px solid #ddd;
    padding: 20px 0 10px;
    margin-bottom: 10px;
  }
  .exhibition {
    // display: none;
    z-index: 4;
    position: absolute;
    border: 1px solid #ddd;
    width: 340px;
    background-color: #fff;
    top: 0px;
    right: -342px;
    /deep/.row-bg {
      height: 40.6px;
      a {
        &:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      }
    }
    p {
      width: 70%;
      flex: 1; //
      font-size: 14px;
      color: #999;
      padding-left: 15px; //
    }
    .xunhao {
      text-align: center;
      font-style: oblique;
      width: 50px;
      color: orange;
      font-size: 22px;
    }
    .city {
      // text-align: center;
      color: orange;
      font-size: 14px;
      // flex:1//
    }
  }
}
.tuijianliebiao {
  border-top: 1px solid #ddd;
  border-left: 1px solid #ddd;
  /deep/.wodiu {
    z-index: 5;
    box-sizing: border-box;
    padding: 0 20px;
    // height: 40px;
    height: 41px;
    width: 260px;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    font-size: 14px;
    // &:hover {
    //   border-right-color: #fff;
    //   color: orange;
    //   cursor: pointer;
    // }
    // &:hover .jiantui::after {
    //   border-color: orange;
    // }
  }
  .jiantui {
    //   position: relative;
    &::after {
      display: block;
      content: "";
      width: 10px;
      height: 10px;
      border-right: 1px solid #999;
      border-top: 1px solid #999;
      transform: rotate(45deg);
      position: absolute;
      right: 20px;
      top: 15px;
    }
  }
}
.liekai {
  & {
    border-right-color: #fff !important;
    color: orange;
    cursor: pointer;
  }
  & .jiantui::after {
    border-color: orange;
  }
}
// 终极强迫症
</style>