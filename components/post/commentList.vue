<template>
  <div>
    <div class="cmt-list">
      <div class="cmt-item">
        <div class="cmt-info">
          <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" />
          flash
          <i>2020-02-16 9:26</i>
          <span>1</span>
        </div>
        <div class="cmt-content">
          <!---->
          <div class="cmt-new">
            <p class="cmt-message"></p>
            <el-row type="flex">
              <div class="cmt-pic">
                <img src="http://157.122.54.189:9095/uploads/fa42da6ffc5345229ac4f3c4b841af0b.jpg" />
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
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="1000"
      ></el-pagination>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1
    };
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {}
  },
  mounted() {}
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

      a {
        display: none;
      }
    }
  }
}
</style>