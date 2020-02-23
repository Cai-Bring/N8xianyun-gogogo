<template>
  <div>
    <div class="cmt-list">
      <div class="cmt-item" v-for="(item,index) in commentsList" :key="index">
        <!-- 回复的回复 -->
        <commentParent :parent="item.parent" v-if="item.parent" @sendComment="replyComment"></commentParent>
        
        <div class="cmt-info">
          <img :src="`${$axios.defaults.baseURL}${item.account.defaultAvatar}`" />
          {{item.account.nickname}}
          <i>{{item.created_at | dateFormat}}</i>
          <span>{{item.level}}</span>
        </div>
        <div class="cmt-content">
          <!-- 回复内容 -->
          <div class="cmt-new">
            <p class="cmt-message" v-html="item.content"></p>
            <el-row type="flex">
              <div class="cmt-pic" v-for="(pic,index) in item.pics" :key="index">
                <img :src="`${$axios.defaults.baseURL}${pic.url}`" />
              </div>
            </el-row>
            <div class="cmt-ctrl">
              <a href="javascript:;" @click="dialogVisible2 = true,parentId = item.id">回复</a>

              <el-dialog :visible.sync="dialogVisible2" width="40%">
                <el-input
                  autocomplete="off"
                  type="textarea"
                  :rows="2"
                  placeholder="输入您要回复的内容"
                  v-model="textarea"
                  resize="none"
                  style="margin-bottom:10px;"
                ></el-input>
                <el-row type="flex" class="cmt-input-ctrls" justify="space-between">
                  <el-upload
                    :action="`${$axios.defaults.baseURL}/upload`"
                    name="files"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :on-success="handleUpload"
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible1">
                    <img width="100%" :src="dialogImageUrl" alt />
                  </el-dialog>
                </el-row>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible2 = false">取 消</el-button>
                  <el-button type="primary" @click="handleComment(parentId)">回 复</el-button>
                </span>
              </el-dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <el-row type="flex" justify="center" style="margin-top:10px" v-if="commentsTotal!=0">
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
import commentParent from "@/components/post/commentParent.vue";

export default {
  props: ["emitNum"],
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      commentsTotal: 0,
      commentsList: [],
      textarea: "",
      pictureList: [],
      dialogImageUrl: "",
      dialogVisible1: false,
      dialogVisible2: false,
      parentId: null
    };
  },
  components: {
    commentParent
  },
  filters: {
    dateFormat
  },
  watch: {
    emitNum() {
      this.getCommentsData();
    }
  },
  methods: {
    // 调用接口获取数据
    getCommentsData() {
      this.$axios({
        url: "/posts/comments",
        params: {
          post: this.$route.query.id,
          _start: (this.currentPage - 1) * this.pageSize,
          _limit: this.pageSize
        }
      }).then(res => {
        // console.log(res);
        this.commentsTotal = res.data.total;
        this.commentsList = res.data.data;
      });
    },
    // 显示条数改变时触发
    handleSizeChange(val) {
      // console.log(val);
      this.pageSize = val;
      this.getCommentsData();
    },
    // 页码改变时触发
    handleCurrentChange(val) {
      // console.log(val);
      this.currentPage = val;
      this.getCommentsData();
    },
    // 照片上传成功的回调
    handleUpload(response, file, fileList) {
      //   console.log(response);
      //   console.log(file);
      //   console.log(fileList);
      this.pictureList = fileList.map(val => {
        return { ...val.response[0] };
      });
    },
    // 点击文件列表中已上传的文件时的钩子
    handlePictureCardPreview(file) {
      // console.log(file);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      // console.log(file, fileList);
      this.pictureList = fileList.map(val => {
        return { ...val.response[0] };
      });
    },
    replyComment(id) {
      // console.log(id);
      this.dialogVisible2 = true;
      this.parentId = id;
      console.log(this.parentId);
    },
    // 回复评论
    handleComment(id) {
      if (this.$store.state.user.userInfo.token) {
        this.$axios({
          url: "/comments",
          method: "POST",
          headers: {
            Authorization: "Bearer " + this.$store.state.user.userInfo.token,
            "Content-Type": "application/json"
          },
          data: {
            content: this.textarea,
            pics: this.pictureList,
            follow: id,
            post: this.$route.query.id
          }
        }).then(res => {
          // console.log(res);
          this.$message({
            message: "恭喜你，口吐芬芳成功",
            type: "success"
          });
          this.textarea = "";
          this.parentId = null;
          this.dialogVisible2 = false;
          this.getCommentsData();
        });
      } else {
        this.$confirm("未登录无法评论，是否跳转登录", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$router.push("/user/login");
        });
      }
    }
  },
  mounted() {
    this.getCommentsData();
  }
};
</script>

<style lang="less" scoped>
.cmt-list {
  border: 1px solid #ddd;
}

.cmt-item {
  border-bottom: 1px dashed #ddd;
  padding: 10px 10px 5px 5px;

  .cmt-info {
    margin-bottom: 5px;
    font-size: 12px;
    color: #666;

    img {
      width: 30px;
      height: 30px;
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
/deep/.el-upload--picture-card {
  width: 75px;
  height: 75px;
  line-height: 75px;
}
</style>