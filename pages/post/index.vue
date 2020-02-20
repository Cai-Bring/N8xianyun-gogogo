<template>
  <div class="post">
    <el-row type="flex" class="row-bg travel-strategy">
      <!-- 左边 -->
      <div class="left">
        <RecommendCity />
      </div>
      <!-- 右边  -->
      <div class="strategy-list"><!--嘎嘎嘎嘎嘎过过过过过过过过过过过过过过过过过过过过过过过过过过过过过过过过--></div>
    </el-row>
  </div>
</template>

<script>
//推荐城市
import RecommendCity from "@/components/post/RecommendCity.vue";
export default {
  components: {
    RecommendCity //推荐城市
  }
};
</script>

<style lang="less" scoped>
.post{
  padding:20px 0; 
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
  }
}
</style>