<template>
  <div class="ArticleList">
    <!-- 三图 +-->
    <div class="list" v-if="data.images.length>=3">
      <h4>
        <nuxt-link :to="`/post/detail?id=${data.id}`">{{data.title}}</nuxt-link>
      </h4>
      <p>
        <nuxt-link :to="`/post/detail?id=${data.id}`" v-html="data.summary"></nuxt-link>
      </p>
      <el-row class="images row-bg" type="flex" justify="space-between">
        <!-- 不循环了喂 -->
        <nuxt-link :to="`/post/detail?id=${data.id}`">
          <img :src="data.images[0]" alt />
        </nuxt-link>
        <nuxt-link :to="`/post/detail?id=${data.id}`">
          <img :src="data.images[1]" alt />
        </nuxt-link>
        <nuxt-link :to="`/post/detail?id=${data.id}`">
          <img :src="data.images[2]" alt />
        </nuxt-link>
      </el-row>
      <div class="dibu">
        <!-- 个人 -->
        <div class="personage">
          <span style="padding-right:5px">
            <i class="el-icon-location-outline"></i>
            {{data.cityName}}
          </span>
          <nuxt-link to="/user/personal" style="padding-right:5px">
            <span>by</span>
            <img :src="$axios.defaults.baseURL+data.account.defaultAvatar" alt />
            <em>{{data.account.nickname}}</em>
          </nuxt-link>
          <i class="el-icon-view"></i>
          <span>{{data.watch}}</span>
        </div>
        <!-- 点赞 -->
        <div class="praise">
          <span>{{data.like}}</span>
          赞
        </div>
      </div>
    </div>
    <!-- 一图 +-->
    <div class="around" v-else-if="data.images.length>=1">
      <div class="img">
        <nuxt-link :to="`/post/detail?id=${data.id}`">
          <img :src="data.images[0]" alt />
        </nuxt-link>
      </div>

      <div class="font_text">
        <h4>
          <nuxt-link :to="`/post/detail?id=${data.id}`">{{data.title}}</nuxt-link>
        </h4>
        <p>
          <nuxt-link :to="`/post/detail?id=${data.id}`" v-html="data.summary"></nuxt-link>
        </p>
        <div class="dibu">
          <!-- 个人 -->
          <div class="personage">
            <span style="padding-right:5px">
              <i class="el-icon-location-outline"></i>
              {{data.cityName}}
            </span>
            <nuxt-link to="/user/personal" style="padding-right:5px">
              <span>by</span>
              <img :src="$axios.defaults.baseURL+data.account.defaultAvatar" alt />
              <em>{{data.account.nickname}}</em>
            </nuxt-link>
            <i class="el-icon-view"></i>
            <span>{{data.watch}}</span>
          </div>
          <!-- 点赞 -->
          <div class="praise">
            <span>{{data.like}}</span>
            赞
          </div>
        </div>
      </div>
    </div>
    <!-- 没图 -->
    <div class="meitu list" v-else>
      <h4>
        <nuxt-link :to="`/post/detail?id=${data.id}`">{{data.title}}</nuxt-link>
      </h4>
      <p>
        <nuxt-link :to="`/post/detail?id=${data.id}`" v-html="data.summary"></nuxt-link>
      </p>
      <div class="dibu">
        <!-- 个人 -->
        <div class="personage">
          <span style="padding-right:5px">
            <i class="el-icon-location-outline"></i>
            {{data.cityName}}
          </span>
          <nuxt-link to="/user/personal" style="padding-right:5px">
            <span>by</span>
            <img :src="$axios.defaults.baseURL+data.account.defaultAvatar" alt />
            <em>{{data.account.nickname}}</em>
          </nuxt-link>
          <i class="el-icon-view"></i>
          <span>{{data.watch}}</span>
        </div>
        <!-- 点赞 -->
        <div class="praise">
          <span>{{data.like}}</span>
          赞
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
//提取公共样式
.dibu {
  display: flex;
  justify-content: space-between;
  .personage {
    font-size: 12px;
    color: #999;
    img {
      width: 16px;
      height: 16px;
      border-radius: 50px;
      vertical-align: middle;
    }
    em {
      color: orange;
    }
  }
  .praise {
    color: orange;
  }
}
.list {
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  h4 {
    margin-bottom: 15px;
    font-weight: 400;
    font-size: 18px;
    /*1. 先强制一行内显示文本*/
    white-space: nowrap;
    //（默认 normal 自动换行）
    /*2. 超出的部分隐藏*/
    overflow: hidden;
    /*3. 文字用省略号替代超出的部分*/
    text-overflow: ellipsis;
    a:hover {
      color: orange;
    }
  }
  p {
    height: 63px;
    font-size: 14px;
    line-height: 1.5;
    color: #666;
    margin-bottom: 15px;
    /*2. 超出的部分隐藏*/
    overflow: hidden;
    /* 弹性伸缩盒子模型显示 */
    display: -webkit-box;
    /* 限制在一个块元素显示的文本的行数 */
    -webkit-line-clamp: 3;
    /* 设置或检索伸缩盒对象的子元素的排列方式 */
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  }
  .images {
    height: 150px;
    margin: 15px 0;
    a {
      width: 220px;
      display: block;
      height: 100%;
      //   width: 100%;
      img {
        height: 100%;
        width: 100%;
      }
    }
  }
}
.around {
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  .img {
    a {
      display: block;
      width: 220px;
      height: 150px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .font_text {
    // flex: 1;
    width: 470px;
    h4 {
      width: 100%;
      margin-bottom: 15px;
      font-weight: 400;
      font-size: 18px;
      /*1. 先强制一行内显示文本*/
      white-space: nowrap; //（ 默认 normal 自动换行）
      /*2. 超出的部分隐藏*/
      overflow: hidden;
      /*3. 文字用省略号替代超出的部分*/
      text-overflow: ellipsis;
      a {
        height: inherit;
        width: inherit;
      }
      a:hover {
        color: orange;
      }
    }
    p {
      height: 63px;
      width: 100%;
      font-size: 14px;
      line-height: 1.5;
      color: #666;
      margin-bottom: 15px;
      /*2. 超出的部分隐藏*/
      overflow: hidden;
      /* 弹性伸缩盒子模型显示 */
      display: -webkit-box;
      /* 限制在一个块元素显示的文本的行数 */
      -webkit-line-clamp: 3;
      /* 设置或检索伸缩盒对象的子元素的排列方式 */
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
    }
  }
}
</style>