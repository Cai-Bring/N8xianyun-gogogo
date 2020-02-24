<template>
  <div class="cmt-wrapper">
    <h4 class="cmt-title">评论</h4>
    <!-- 文本域 -->
    <div class="cmt-input">
      <el-input
        autocomplete="off"
        type="textarea"
        :rows="2"
        placeholder="请开始你的表演"
        v-model="textarea"
        resize="none"
      ></el-input>
    </div>
    <!-- 图片上传 -->
    <el-row type="flex" class="cmt-input-ctrls" justify="space-between">
      <el-upload
        :action="`${$axios.defaults.baseURL}/upload`"
        name="files"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleUpload"
        ref="filesList"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>

      <div>
        <el-button type="primary" size="mini" @click="handleComment">评论</el-button>
      </div>
    </el-row>

    <commentList :emitNum="emitNum"></commentList>
  </div>
</template>

<script>
import commentList from "@/components/post/commentList.vue";

export default {
  data() {
    return {
      textarea: "",
      pictureList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      emitNum: 0
    };
  },
  components: {
    commentList
  },
  methods: {
    // 文件上传成功时的钩子
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
    // 评论
    handleComment() {
      // 判断是否登录
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
            post: this.$route.query.id
          }
        }).then(res => {
          // console.log(res);
          this.$message({
            message: "恭喜你，口吐芬芳成功",
            type: "success"
          });
          this.textarea = "";
          this.pictureList = [];
          this.$refs.filesList.clearFiles();
          this.emitNum++;
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
  }
};
</script>

<style lang="less" scoped>
.cmt-title {
  font-weight: 400;
  font-size: 18px;
  margin-bottom: 20px;
}

.cmt-input {
  margin-bottom: 10px;
}

.cmt-input-ctrls {
  margin-bottom: 30px;

  /deep/.el-upload--picture-card {
    width: 100px;
    height: 100px;
    line-height: 100px;
  }
}
</style>