<template>
  <div class="personal">
      资金不足!!! 暂未开放
  </div>
</template>

<script>
export default {
mounted(){
    this.$message.error('个人中心 暂未开放')
}
}
</script>

<style lang="less" scoped>
.personal{
    color: orange;
    line-height: 150px;
    text-align: center;
    height: 150px;
    width: 500px;
    margin: 0 auto;
}

</style>