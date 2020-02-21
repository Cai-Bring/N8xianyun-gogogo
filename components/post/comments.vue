<template>
  <div class="cmt-wrapper">
    <h4 class="cmt-title">评论</h4>
    <div class="cmt-input">
      <el-input
        autocomplete="off"
        type="textarea"
        :rows="2"
        placeholder="说点什么吧..."
        v-model="textarea"
        resize="none"
      ></el-input>
    </div>
    <el-row type="flex" class="cmt-input-ctrls" justify="space-between">
      <el-upload
        action="http://127.0.0.1:1337/upload"
        name="files"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleUpload"
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

    <commentList></commentList>
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
      dialogVisible: false
    };
  },
  components: {
    commentList
  },
  methods: {
    handleUpload(response, file, fileList) {
      //   console.log(response);
      //   console.log(file);
      //   console.log(fileList);
      this.pictureList = fileList.map(val => {
        return { ...val.response[0] };
      });
    },
    handlePictureCardPreview(file) {
      // console.log(file);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
      this.pictureList = fileList.map(val => {
        return { ...val.response[0] };
      });
    },
    handleComment() {
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
      });
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