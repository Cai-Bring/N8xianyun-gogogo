<template>
  <div>
    <h4 class="aside-title">相关攻略</h4>
    <div class="recommend-list" v-for="(item,index) in recommendData" :key="index">
      <a :href="`/post/detail?id=${item.id}`" class="recommend-item">
        <el-row class="post-imgText" type="flex" v-if="item.images.length==0">
          <div class="post-text">
            <div v-html="item.title"></div>
            <p>{{item.created_at | dateFormat}} 阅读{{item.watch}}</p>
          </div>
        </el-row>
        <!-- 带图片的 -->
        <el-row class="post-imgText" type="flex" v-if="item.images.length!=0">
          <div
            class="post-img"
            v-for="(pic,index) in item.images"
            :key="index"
          >
            <img :src="pic" />
          </div>
          <div class="post-text">
            <div v-html="item.title"></div>
            <p>{{item.created_at | dateFormat}} 阅读{{item.watch}}</p>
          </div>
        </el-row>
      </a>
    </div>
  </div>
</template>

<script>
import { dateFormat } from "@/assets/filters.js";

export default {
  data() {
    return {
      recommendData: []
    };
  },
  mounted() {
    this.$axios({
      url: "/posts/recommend",
      params: this.$route.query
    }).then(res => {
      //   console.log(res);
      this.recommendData = res.data.data;
      // console.log(this.recommendData);
    });
  },
  filters: {
    dateFormat
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

    .post-img {
      width: 100px;
      height: 80px;
      flex-shrink: 0;
      background: #ddd;
      overflow: hidden;
      margin-right: 10px;

      img {
        width: 100%;
        height: 100%;
        -o-object-fit: cover;
        object-fit: cover;
      }
    }

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