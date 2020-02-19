<template>
  <div>
    <div class="cmt-list">
      <div class="cmt-item" v-for="(item,index) in commentsList" :key="index">
        <div class="cmt-info">
          <img :src="`http://127.0.0.1:1337${item.account.defaultAvatar}`" />
          {{item.account.nickname}}
          <i>{{item.created_at | dateFormat}}</i>
          <span>1</span>
        </div>
        <div class="cmt-content">
          <div class="cmt-new">
            <p class="cmt-message" v-html="item.content"></p>
            <el-row type="flex">
              <div class="cmt-pic" v-for="(pic,index) in item.pics" :key="index">
                <img :src="`http://127.0.0.1:1337${pic.url}`" />
              </div>
            </el-row>
            <div class="cmt-ctrl">
              <a href="javascript:;">回复</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-row type="flex" justify="center" style="margin-top:10px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[3, 4, 5, 6]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="commentsTotal"
      ></el-pagination>
    </el-row>
  </div>
</template>

<script>
import { dateFormat } from "@/assets/filters.js";

export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      commentsTotal: 0,
      commentsList: []
    };
  },
  filters: {
    dateFormat
  },
  methods: {
    // 显示条数改变时触发
    handleSizeChange(val) {
      // console.log(val);
      this.pageSize = val;
    },
    // 页码改变时触发
    handleCurrentChange(val) {
      // console.log(val);
      this.currentPage = val;
    }
  },
  mounted() {
    this.$axios({
      url: "/posts/comments",
      params: {
        post: this.$route.query.id,
        _start: this.currentPage - 1,
        _limit: this.pageSize
      }
    }).then(res => {
      console.log(res);
      this.commentsTotal = res.data.total;
      this.commentsList = res.data.data;
    });
  }
};
</script>

<style lang="less" scoped>
.cmt-list {
  border: 1px solid #ddd;
}

.cmt-item {
  border-bottom: 1px dashed #ddd;
  padding: 20px 20px 5px;

  .cmt-info {
    margin-bottom: 10px;
    font-size: 12px;
    color: #666;

    img {
      width: 16px;
      height: 16px;
      border-radius: 50%;
    }

    i {
      color: #999;
    }

    span {
      float: right;
    }
  }

  .cmt-content {
    padding: 0 0 0 30px;

    .cmt-message {
      margin-top: 10px;
    }

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

    .cmt-ctrl {
      height: 20px;
      line-height: 20px;
      font-size: 12px;
      color: #1e50a2;
      text-align: right;
    }
  }
}
</style>