<template>
  <div class="recommend-City">
    <!-- 推荐列表 -->
    <div class="tuijianliebiao">
      <el-row type="flex" class="row-bg" justify="space-between" align="middle">
        <div class="theme_type">热门城市</div>
        <div class="jiantui"></div>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-between" align="middle">
        <div class="theme_type">热门城市</div>
        <div class="jiantui"></div>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-between" align="middle">
        <div class="theme_type">热门城市</div>
        <div class="jiantui"></div>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-between" align="middle">
        <div class="theme_type">热门城市</div>
        <div class="jiantui"></div>
      </el-row>
    </div>
    <!-- 右侧定位盒子 -->
    <div class="exhibition">
      <el-row type="flex" class="row-bg" justify="space-around" align="middle">
        <div class="xunhao">1</div>
        <div class="city">北京</div>
        <p>世界著名古城和现代国际城市</p>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-around" align="middle">
        <div class="xunhao">2</div>
        <div class="city">广州</div>
        <p>世界著名古城和现代国际城市</p>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-around" align="middle">
        <div class="xunhao">3</div>
        <div class="city">上海</div>
        <p>世界著名古城和现代国际城市</p>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-around" align="middle">
        <div class="xunhao">4</div>
        <div class="city">上海</div>
        <p>世界著名古城和现代国际城市</p>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-around" align="middle">
        <div class="xunhao">5</div>
        <div class="city">上海</div>
        <p>世界著名古城和现代国际城市</p>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.recommend-City {
  position: relative;
  .exhibition {
    position: absolute;
    border: 1px solid #ddd;
    width: 340px;
    background-color: #fff;
    top: 0px;
    right: -342px;
    /deep/.row-bg {
      height: 40.6px;
    }
    p {
      width: 70%;
      font-size:14px;
      color: #999;
    }
    .xunhao {
      text-align: center;
      font-style: oblique;
      flex: 0.5;
      color: orange;
      font-size: 22px;
    }
    .city {
      text-align: center;
      color: orange;
      font-size:14px;
    }
  }
}
.tuijianliebiao {
  border-top: 1px solid #ddd;
  border-left: 1px solid #ddd;
  /deep/.row-bg {
    z-index: 2;
    box-sizing: border-box;
    padding: 0 20px;
    // height: 40px;
    height: 41px;
    width: 260px;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    font-size: 14px;
    &:hover {
      border-right-color: #fff;
      color: orange;
      cursor: pointer;
    }
    &:hover .jiantui::after{
      border-color: orange;
    }
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
</style>