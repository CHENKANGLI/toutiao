<template>
  <div class="search">
    <div class="header">
      <span class="iconfont iconjiantou2" @click="$router.back()"></span>
      <van-search
        v-model="userKey"
        placeholder="请输入搜索关键词"
        shape="round"
      >
      </van-search>
      <div @click="onSearch(userKey)">搜索</div>
    </div>
    <div class="historyList">
        <h2>历史记录</h2>
        <a href="javascript:;" v-for="(item,index) in historyList" :key="index" @click="onSearch(item)">{{item}}</a>
    </div>
    <div class="historyList">
        <h2>搜索结果</h2>
        <router-link :to="{path:`/articleDetail/${item.id}`}" v-for="item in searchList" :key="item.id" >{{item.title}}</router-link>
    </div>
  </div>
</template>

<script>
import { searchArticle } from '../apis/article'
export default {
  data () {
    return {
      userKey: '',
      historyList: [],
      searchList: []
    }
  },
  mounted () {
    this.historyList = this.getdata()
  },
  methods: {
    async onSearch (key) {
      this.searchList.length = 0
      let res = await searchArticle({ keyword: key })
      if (res.data.data.length > 0) {
        this.searchList = res.data.data
      }
      let arr = this.getdata()
      let index = arr.indexOf(key)
      if (index !== -1) {
        arr.splice(index, 1)
      }
      console.log(arr)
      arr.unshift(key)
      localStorage.setItem('haima_search_history', JSON.stringify(arr))
    },
    getdata () {
      return JSON.parse(localStorage.getItem('haima_search_history') || '[]')
    }
  }
}
</script>

<style lang="less" scoped>
.header{
    display: flex;
    height: 50px;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    border-bottom: 1px solid #ccc;
    .van-search{
      flex: 1;
      padding: 5px 12px;
    }
  }
  .historyList{
    padding:10px;
    border-bottom: 1px solid #ccc;
    h2{
      line-height: 40px;
      font-weight: bold;
    }
    > a {
      display: block;
      background-color: pink;
      line-height: 30px;
      color:#666;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }
</style>
