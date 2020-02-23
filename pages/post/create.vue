<template>
  <div class="create">
    <el-row type="flex" justify="space-between">
      <!-- 发布编辑栏部分 -->
      <div class="main">
        <h2>发表新攻略</h2>
        <p class="create-desc">分享你的个人游记，让更多人看到哦！</p>
        <!-- 表单验证 -->
        <el-form :model="form" ref="form">
          <!-- 标题 -->
          <el-form-item prop="title">
            <el-input v-model="form.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <!-- 编辑器 -->
          <el-form-item prop="content">
            <client-only>
              <vue-editor
                v-model="form.content"
                useCustomImageHandler
                @image-added="handleImageAdded"
              ></vue-editor>
            </client-only>
          </el-form-item>
          <!-- 选择城市 -->
          <el-form-item label="选择城市" class="mycity">
            <el-autocomplete
              :fetch-suggestions="querySearch"
              placeholder="请搜索游玩城市"
              @select="handleSelect"
              @blur="handleBlur"
              class="el-autocomplete cityinput"
              v-model="form.city"
            ></el-autocomplete>
          </el-form-item>
        </el-form>
        <!-- 点击提交 -->
        <el-button type="primary" @click="createlist">发布</el-button>
        <el-button type="info" @click="draft">存为草稿</el-button>
      </div>
      <!-- 草稿 -->
      <div class="asice">
        <div class="draft">
          <h4>草稿箱（{{$store.state.post.mydrafthistory.length}}）</h4>
          <div class="draftlist">
            <div
              class="draftitem"
              v-for="(item,index) in $store.state.post.mydrafthistory"
              :key="index"
            >
              <div class="listtitle" @click="ismydraft(item)">
                {{item.title}}
                <i class="el-icon-edit"></i>
              </div>
              <p>{{item.date}}</p>
            </div>
          </div>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
// 时间转换的工具
import moment from "moment";
export default {
  data() {
    return {
      form: {
        title: "",
        content: "",
        city: ""
      },
      citylist: []
    };
  },
  methods: {
    // 点击上传图片
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData();
      formData.append("files", file);
      this.$axios({
        url: "/upload",
        method: "POST",
        data: formData
      })
        .then(result => {
          //   console.log(result);
          let url = this.$axios.defaults.baseURL + result.data[0].url; // Get url from response
          //   console.log(url);
          Editor.insertEmbed(cursorLocation, "image", url);
          resetUploader();
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 封装
    getCityList(value) {
      return this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        // console.log(res);
        const { data } = res.data;
        const newData = data.map(v => {
          v.value = v.name.replace("市", "");
          return v;
        });
        return newData;
      });
    },
    // 城市获得焦点触发
    querySearch(value, cb) {
      if (!value) {
        cb([]);
        return;
      }
      this.getCityList(value).then(newData => {
        // console.log(newData);
        this.citylist = newData;
        cb(newData);
      });
    },
    // 输入框点击下拉的事件
    handleSelect(item) {
      this.form.city = item.value;
    },
    // 失焦触发的事件
    handleBlur() {
      if (this.citylist.length === 0) {
        return;
      } else if (this.form.city === "") {
        this.form.city = "";
        return;
      }
      this.form.city = this.citylist[0].value;
    },
    // 提交
    createlist() {
      //   console.log(this.form);
      if (!this.form.title) {
        this.$message.error("请输入标题");
        return;
      }
      if (!this.form.content) {
        this.$message.error("请输入内容");
        return;
      }
      if (!this.form.city) {
        this.$message.error("请输入城市");
        return;
      }
      this.$axios({
        url: "/posts",
        method: "POST",
        data: this.form,
        headers: {
          // 必须要做token前面加上`Bearer `字符串，后面有一个空格的
          Authorization: `Bearer ` + this.$store.state.user.userInfo.token
        }
      }).then(res => {
        // console.log(res);
        this.$message.success("发布成功，正在为您跳转到攻略主页");
        setTimeout(() => {
          this.$router.push({
            path: "/post/"
          });
        }, 1500);
      });
    },
    // 存为草稿
    draft() {
      if (!this.form.title) {
        this.$message.error("请输入标题");
        return;
      }
      let date = new Date();
      this.form.date = moment(date).format("YYYY-MM-DD");
      //   console.log(this.form.date);
      let myhistory = { ...this.form };
      this.$store.commit("post/setmydraf", myhistory);
      this.$message.success("已存为草稿");
      setTimeout(() => {
        this.form.title = "";
        this.form.content = "";
        this.form.city = "";
        this.form.date = "";
      }, 1500);
    },
    // 点击草稿
    ismydraft(item) {
      this.form.title = item.title;
      this.form.content = item.content;
      this.form.city = item.city;
    }
  }
};
</script>

<style scoped lang="less">
.create {
  width: 1000px;
  margin: 20px auto;
  padding: 20px 0;
  .main {
    width: 750px;
    h2 {
      font-weight: 400;
      font-size: 22px;
      margin-bottom: 10px;
    }
    .create-desc {
      font-size: 12px;
      color: #999;
      margin-bottom: 10px;
    }
    .el-form-item {
      margin-bottom: 22px;
    }
    /deep/.ql-editor {
      height: 400px;
    }
    .mycity {
      .cityinput {
        width: 200px;
      }
    }
  }
  .asice {
    width: 200px;
    .draft {
      border: 1px solid #ddd;
      padding: 10px;
      h4 {
        margin-bottom: 10px;
        font-weight: 400;
        color: #666;
      }
      .draftlist {
        .draftitem {
          font-size: 14px;
          margin-bottom: 8px;
          .listtitle {
            cursor: pointer;
            &:hover {
              color: sandybrown;
            }
          }
          p {
            font-size: 12px;
            color: #999;
          }
        }
      }
    }
  }
}
</style>