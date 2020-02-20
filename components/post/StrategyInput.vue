<template>
  <div class="StrategyInput">
    <div class="input">
      <input type="text" placeholder="请输入想去的地方，比如：'成都'" />
      <i class="el-icon-search"></i>
    </div>
    <div class="tuijian">
      <i>推荐：</i>
      <span v-for="(value,index) in recommendData" :key="index" @click="tuijian(value)">{{value}}</span>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            //推荐数据
            recommendData:['广州','上海','北京']
        }
    },
    methods:{
        tuijian(value){
            console.log(value);
            
        }
    }
};
</script>

<style lang="less" scoped>
.StrategyInput {
  .input {
    box-sizing: border-box;
    width: 100%;
    height: 40px;
    border: 3px solid orange;
    display: flex;
    align-content: center;
    input {
      // width: 80%;
      height: 100%;
      padding: 0 20px;
      border: none;
      outline: none;
      flex: 1;
    }
    .el-icon-search {
      font-size: 24px;
      font-weight: 700;
      margin-right: 10px;
      color: orange;
      &::before {
        line-height: 34px;
      }
    }
  }
  .tuijian{
      color: #666;
      font-size: 12px;
      padding: 10px 0;
      span{
          margin-right: 5px;
          &:hover{
              color: orange;
              text-decoration: underline;
              cursor: pointer;
          }
      }
  }
}
</style>