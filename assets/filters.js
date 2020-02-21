// 引入Vue
import Vue from 'vue'
// 暴露
export const dateFormat = Vue.filter('dateFormat', (date) => {
  let year = new Date(date).getFullYear()
  let mouth = new Date(date).getMonth() + 1
  let day = new Date(date).getDate()
  let hours = new Date(date).getHours()
  let minutes = new Date(date).getMinutes()
  if (minutes < 10) {
    minutes = '0' + minutes
  }
  return `${year}年${mouth}月${day}日 ${hours}:${minutes}`
})
