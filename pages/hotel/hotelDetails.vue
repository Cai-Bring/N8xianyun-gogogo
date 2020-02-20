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
      value: 0
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
    });
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
    /deep/.chearprice {
      color: #f90;
    }
    /deep/.el-icon-arrow-right {
      color: #f90;
    }
  }
}
</style>