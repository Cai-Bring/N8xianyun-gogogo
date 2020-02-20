<template>
  <div class="cmt-floor">
    <div class="cmt-content">
      <!-- 递归 -->
      <commentParent :parent="parent.parent" v-if="parent.parent"></commentParent>

      <div class="cmt-info">
        {{parent.account.nickname}}
        <i>{{parent.created_at | dateFormat}}</i>
        <span>{{parent.level}}</span>
      </div>
      <p class="cmt-message" v-html="parent.content"></p>
      <el-row type="flex">
        <div class="cmt-pic" v-for="(pic,index) in parent.pics" :key="index">
          <img :src="`http://127.0.0.1:1337${pic.url}`" />
        </div>
      </el-row>
      <div class="cmt-ctrl">
        <a href="javascript:;">回复</a>
      </div>
    </div>
  </div>
</template>

<script>
import { dateFormat } from "@/assets/filters.js";

export default {
  name: "commentParent",
  props: ["parent"],
  filters: {
    dateFormat
  }
};
</script>

<style lang="less" scoped>
.cmt-floor {
  background: #f9f9f9;
  border: 1px solid #ddd;
  padding: 2px;
  margin-bottom: 10px;

  .cmt-content {
    padding: 5px;

    .cmt-pic {
      width: 80px;
      height: 80px;
      border-radius: 6px;
      overflow: hidden;
      margin-right: 5px;
      margin-top: 10px;
      padding: 5px;
      border: 1px dashed #ddd;

      img {
        display: block;
        width: 100%;
        height: 100%;
        -o-object-fit: cover;
        object-fit: cover;
        cursor: pointer;
      }
    }

    .cmt-info {
      font-size: 12px;
      color: #666;

      i {
        color: #999;
      }

      span {
        float: right;
      }
    }

    .cmt-message {
      margin-top: 10px;
    }

    .cmt-ctrl {
      height: 20px;
      line-height: 20px;
      font-size: 12px;
      color: #1e50a2;
      text-align: right;

      & * {
        display: none;
      }
    }
  }
}
</style>