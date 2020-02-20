<template>
  <div class="hotel">
    酒店页面
  </div>
</template>

<script>
export default {
  data () {
    return {
      usermaplocation: {}
    }
  },
  mounted () {
    // IP定位代码
    window.onLoad  = function(){
      var map = new AMap.Map('container')
      AMap.plugin('AMap.CitySearch', function () {
        var citySearch = new AMap.CitySearch()
        citySearch.getLocalCity(function (status, result) {
          if (status === 'complete' && result.info === 'OK') {
            // 查询成功，result即为当前所在城市信息
            console.log(result);
          }
        })
      })
    }
    var url = 'https://webapi.amap.com/maps?v=1.4.15&key=9623915ac82517f2e7ba4b95ef9ed725&callback=onLoad';
    var jsapi = document.createElement('script');
    jsapi.charset = 'utf-8';
    jsapi.src = url;
    document.head.appendChild(jsapi);
  },
  methods: {
    maplocation () {
      
    }
  }
}
</script>

<style>

</style>