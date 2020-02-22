<template>
  <div id="select" @mouseenter="OpenOrClose = true" @mouseleave="OpenOrClose = false">
      <span class="selectLeft">{{selectLeftLook()}}</span>
      <span class="selectRight">
          <span class="el-icon-arrow-down"></span>
      </span>
      <div class="selectList" v-show="OpenOrClose">
          <div class="selectListRoll">
              <div v-for="(v,i) in num" :key="i" @click="changekeyChenge(v.name,v.id)"
          :style="changeKey.indexOf(v.name) !== -1 ? 'color:#38f': ''" class="selectListRollOne">
              <span class="el-icon-circle-check"></span>&nbsp;
              <span>{{v.name}}</span>
          </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    props: ['num','eventName'],
    data () {
        return {
            changeKey: [],
            changeKey2: [],
            OpenOrClose: false
        }
    },
    methods: {
        selectEnter () {
        },
        changekeyChenge (key,index) {
            if (this.changeKey.indexOf(key) !== -1) {
                this.changeKey.splice(this.changeKey.indexOf(key),1)
                this.changeKey2.forEach((v,i) => {
                    if (v === index) {
                        this.changeKey2.splice(i,1)
                    }
                })
            } else {
                this.changeKey.push(key)
                this.changeKey2.push(index)
            }
            this.$emit(this.eventName,this.changeKey2,this.eventName)
        },
        selectLeftLook () {
            if (this.changeKey.length === 0) {
                return '不限'
            } else if (this.changeKey.length === 1) {
                return this.changeKey[0]
            } else {
                return `选择${this.changeKey.length}项`
            }
        }
    }
}
</script>

<style lang="less" scoped>
#select{
    position: relative;
    width: 100%;
    height: 100%;
    line-height: 38px;
    padding: 0 8px;
    box-sizing: border-box;
    .selectLeft{
        float: left;
    }
    .selectRight{
        float: right;
    }
    .selectList{
        position: absolute;
        top: 38px;
        left: 0;
        background-color: #fff;
        height: 228px;
        overflow: hidden;
        width: 100%;
        border-radius: 4px;
        padding: 15px 10px 0;
        box-sizing: border-box;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        z-index: 3000;
        .selectListRoll{
            height: 228px;
            overflow: scroll;
            width: 152px;
            .selectListRollOne{
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
    }
}
</style>