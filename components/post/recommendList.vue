<template>
  <div>
    <h4 class="aside-title">相关攻略</h4>
    <div class="recommend-list">
      <a href="/post/detail?id=4" class="recommend-item">
        <el-row class="post-imgText" type="flex">
          <!---->
          <div class="post-text">
            <div>123</div>
            <p>2020-02-19 10:49 阅读</p>
          </div>
        </el-row>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.aside-title {
  font-weight: 400;
  font-size: 18px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
}

.recommend-item {
  display: block;
  padding: 20px 0;
  border-bottom: 1px solid #ddd;

  .post-imgText {
    height: 80px;

    .post-text {
      flex: 1;
      position: relative;

      div {
        position: relative;
        line-height: 1.4em;
        height: 2.8em;
        overflow: hidden;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
      }

      p {
        position: absolute;
        bottom: 0;
        left: 0;
        font-size: 12px;
        color: #999;
      }
    }
  }
}
</style>