<template>
  <div class="ArticleList">
    <!-- 三图 -->
    <div class="list">
      <h4>
        <nuxt-link to="#">塞班贵？一定是你的打开方式不对！6000块玩转塞班</nuxt-link>
      </h4>
      <p>
        <nuxt-link to="#">
          大家对塞班岛总存在着这样的误解，知道它是美属地盘，就理所当然地觉得这里的花费一定很高，花费高有高的玩法，
          那如果只有6000块的预算呢？要怎么玩？关于旅行这件事，我们要让钱花得更有道理，收下这份攻略
          ，带你6000块花式玩转塞班。图：塞班岛。 by第5季旅游一、怎样用6000块玩转塞班？大多数出境游客人不做预算或最
        </nuxt-link>
      </p>
      <el-row class="images row-bg" type="flex" justify="space-between">
        <nuxt-link to="#">
          <img
            src="https://n3-q.mafengwo.net/s10/M00/E8/E4/wKgBZ1octoCABhgLAAafahORRLs91.jpeg?imageView2%2F2%2Fw%2F1360%2Fq%2F90"
            alt
          />
        </nuxt-link>
        <nuxt-link to="#">
          <img src="https://images.mafengwo.net/images/i/face/brands_v3/6@2x.png" alt />
        </nuxt-link>
        <nuxt-link to="#">
          <img
            src="https://p1-q.mafengwo.net/s10/M00/E9/33/wKgBZ1octwiAAKAoAAJ9ixcJc9M71.jpeg?imageView2%2F2%2Fw%2F1360%2Fq%2F90"
            alt
          />
        </nuxt-link>
      </el-row>
      <div class="dibu">
        <!-- 个人 -->
        <div class="personage">
          <span style="padding-right:5px">
            <i class="el-icon-location-outline"></i>
            北京市
          </span>
          <nuxt-link to="/user/personal" style="padding-right:5px">
            <span>by</span>
            <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" alt />
            <em>地球发动机</em>
          </nuxt-link>
          <i class="el-icon-view"></i>
          <span>13862</span>
        </div>
        <!-- 点赞 -->
        <div class="praise">
          <span>79</span>
          赞
        </div>
      </div>
    </div>
    <!-- 一图 -->
    <div class="around">
      <div class="img">
        <nuxt-link to="#">
          <img
            src="https://p3-q.mafengwo.net/s13/M00/41/C4/wKgEaVyaOs2AA9IKAAj8Lg2YzaU64.jpeg?imageMogr2%2Fthumbnail%2F1360x%2Fstrip%2Fquality%2F90"
            alt
          />
        </nuxt-link>
      </div>

      <div class="font_text">
        <h4>
          <nuxt-link to="#">远东行：用好奇心打量这座城 —— 最值得收藏的海参崴出行攻略</nuxt-link>
        </h4>
        <p>
          <nuxt-link to="#">
            想象一下一个距离 北京 只有2.5小时飞行距离的城市：身处 亚洲 却能感受到十足的欧陆风情——欧式建筑和街道，
            金发碧眼的路人，正宗的西餐外加只有国内一半售价的帝王蟹可以敞开吃——更难能可贵的是，这里对国人（实质）免签，
            有直飞航班，低廉的物价，且尚未有太多的游客涉足还保留着原汁原味的传统风情！
          </nuxt-link>
        </p>
        <div class="dibu">
          <!-- 个人 -->
          <div class="personage">
            <span style="padding-right:5px">
              <i class="el-icon-location-outline"></i>
              北京市
            </span>
            <nuxt-link to="/user/personal" style="padding-right:5px">
              <span>by</span>
              <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" alt />
              <em>地球发动机</em>
            </nuxt-link>
            <i class="el-icon-view"></i>
            <span>13862</span>
          </div>
          <!-- 点赞 -->
          <div class="praise">
            <span>79</span>
            赞
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
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