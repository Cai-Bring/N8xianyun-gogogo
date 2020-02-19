<template>
  <el-row type="flex" justify="space-between" class="container">
    <div class="main">
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/post' }">旅游攻略</el-breadcrumb-item>
        <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- 攻略标题 -->
      <h1>{{detailData.title}}</h1>
      <!-- 攻略信息 -->
      <div class="post-info">
        <span>发表于：{{detailData.created_at | dateFormat}}</span>
        <span>阅读：{{detailData.watch}}</span>
      </div>
      <!-- 攻略内容 -->
      <div class="post-content" v-html="detailData.content">
        <!-- <p>大家对塞班岛总存在着这样的误解，知道它是美属地盘，就理所当然地觉得这里的花费一定很高，花费高有高的玩法，那如果只有6000块的预算呢？要怎么玩？关于旅行这件事，我们要让钱花得更有道理，收下这份攻略，带你6000块花式玩转塞班。</p>
        <p>
          <span style="background-color: rgb(252, 242, 220);">
            <img
              src="https://n3-q.mafengwo.net/s10/M00/E8/E4/wKgBZ1octoCABhgLAAafahORRLs91.jpeg?imageView2%2F2%2Fw%2F1360%2Fq%2F90"
            />
          </span>
          <span style="color: rgb(153, 153, 153);">图：塞班岛。 by第5季旅游</span>
        </p>
        <h2>一、怎样用6000块玩转塞班？</h2>
        <p>大多数出境游客人不做预算或最终花费远远超出预算，对预算的合理分配对控制我们旅行的花费就很重要了，如何只花6000块玩转塞班岛，对预算超支say&nbsp;no？下面从5个方面来为您一一解读：机票+酒店、岛上交通、玩乐项目、吃以及购买纪念品。</p>
        <p>
          <br />
        </p>
        <h3>1.怎样订机票+酒店性价比最高？</h3>
        <p>
          机票和酒店的花销往往会占据我们旅行大半的花销，假设机票酒店为塞班行预算的一半，剩下的吃行玩购为预算的另一半，如果能在机票酒店这部分省下钱，也就意味着在塞班岛用来吃行玩购的钱就增加了
          <img
            src="https://images.mafengwo.net/images/i/face/brands_v3/6@2x.png"
          />
        </p>
        <p>
          <br />
        </p>
        <p>
          <span style="background-color: rgb(252, 242, 220);">
            <img
              src="https://p1-q.mafengwo.net/s10/M00/E9/33/wKgBZ1octwiAAKAoAAJ9ixcJc9M71.jpeg?imageView2%2F2%2Fw%2F1360%2Fq%2F90"
            />
          </span>
        </p>
        <p>
          <br />
        </p>
        <p>怎样去塞班？可以转机也可以直飞，转机大多会从韩国转，提前蹲守能买到韩国飞塞班的特价机票，2000以下就能入手，加上国内飞韩国的机票来回塞班得5000+，还没算上在塞班的住宿费用，转机还有中途等待的时间，光花在路途上的时间就比直飞要多上一倍甚至更多，转乘奔波劳累，非联程票还要担心行李托运问题，所以建议大家有直飞还是尽量选择直飞。</p>
        <p>在酒店上，旅途中我们呆在酒店的时间远比在外游玩的时间少，酒店干净整洁基本就能满足我们休息的需求，塞班不是个享受酒店的地方而且还真不能跟国内星级酒店等位比较，所以不建议大家花过多的钱在塞班的酒店体验上。</p>
        <p>怎样在机票酒店上获得最高性价比的体验？&nbsp;直飞塞班的航班一般和酒店一起打包成机票+酒店套餐，价格要比单定机票、酒店要更加便捷实惠，往往3千多就能把机票和酒店一键搞定。</p>-->
      </div>

      <!-- 评论和分享 -->
      <div class="post-ctrl">
        <el-row type="flex" justify="center">
          <div class="ctrl-item">
            <i class="el-icon-edit"></i>
            <p>评论()</p>
          </div>
          <div class="ctrl-item">
            <i class="el-icon-share"></i>
            <p>分享</p>
          </div>
        </el-row>
      </div>

      <!-- 评论 -->
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
            action="suibian"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>

          <div>
            <el-button type="primary" size="mini">评论</el-button>
          </div>
        </el-row>

        <commentList></commentList>
      </div>
    </div>

    <!-- 相关攻略 -->
    <recommendList class="aside"></recommendList>
  </el-row>
</template>

<script>
import { dateFormat } from "@/assets/filters.js";
import commentList from "@/components/post/commentList.vue";
import recommendList from "@/components/post/recommendList.vue";

export default {
  data() {
    return {
      textarea: "",
      detailData: {}
    };
  },
  components: {
    commentList,
    recommendList
  },
  methods: {
    handlePictureCardPreview(file) {},
    handleRemove(file, fileList) {}
  },
  mounted() {
    this.$axios({
      url: "/posts",
      params: this.$route.query
    }).then(res => {
      console.log(res);
      this.detailData = { ...res.data.data[0] };
      console.log(this.detailData);
    });
  },
  filters: {
    dateFormat
  }
};
</script>

<style lang="less">
.container {
  width: 1000px;
  margin: 0 auto;
  padding-top: 20px;

  .main {
    width: 700px;
    margin-right: 20px;

    h1 {
      padding: 20px 0;
      border-bottom: 1px solid #ddd;
    }

    .post-info {
      color: #999;
      padding: 20px;
      text-align: right;

      span {
        margin-left: 20px;
      }
    }

    .post-content {
      line-height: 1.5;
      & * {
        max-width: 700px !important;
      }

      img {
        margin: 10px 0;
      }
    }

    .post-ctrl {
      padding: 50px 0 30px;

      .ctrl-item {
        margin: 0 20px;
        font-size: 20px;
        text-align: center;
        cursor: pointer;

        i {
          display: block;
          font-size: 28px;
          color: orange;
        }

        p {
          margin-top: 5px;
          font-size: 14px;
          color: #999;
        }
      }
    }

    .cmt-wrapper {
      margin-bottom: 20px;

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
    }
  }

  .aside {
    width: 280px;
  }
}
</style>