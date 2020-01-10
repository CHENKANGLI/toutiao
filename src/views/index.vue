<template>
  <div class="index">
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search" @click="$router.push({name:'Search'})">
        <van-icon name="search" />
        <span>搜索新闻</span>
      </div>
      <div class="user" @click="$router.push({path:`/user/${id}`})">
        <van-icon name="manager-o" />
      </div>
      <!-- <span @click="$router.push({name:'CateManager'})" style="font-size:30px">+</span> -->
    </div>
    <van-tabs v-model="active" sticky swipeable>
      <van-tab v-for="cate in cateList" :key="cate.id" :title="cate.name">
        <!-- 内容 -->
        <van-list
        v-model="cate.loading"
        :finished="cate.finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
        :offset="10">
        <van-pull-refresh v-model="cate.isLoading" @refresh="onRefresh">
          <articleblock v-for="item in cate.postList" :key="item.id" :post="item" @click="$router.push({path:`/articleDetail/${item.id}`})"></articleblock>
        </van-pull-refresh>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getCateList } from '../apis/cate'
import { getPostList } from '../apis/article'
import articleblock from '../components/articleblock'
export default {
  data () {
    return {
      id: '',
      active: localStorage.getItem('haima_token') ? 1 : 0,
      cateList: []
    }
  },
  components: {
    articleblock
  },
  async mounted () {
    document.querySelector('.van-sticky').onclick = (e) => {
      if (e.target.className === 'van-sticky') {
        this.$router.push({ name: 'CateManager' })
      }
      return false
    }
    this.id = JSON.parse(localStorage.getItem('haima_userInfo') || '{}').id
    if (localStorage.getItem('haima_cate')) {
      this.cateList = JSON.parse(localStorage.getItem('haima_cate'))
      this.cateList.unshift(...[{ id: 1, name: '关注', is_top: 1 }, { id: 999, name: '头条', is_top: 1 }])
    } else {
      let res = await getCateList()
      this.cateList = res.data.data
    }
    this.cateList = this.cateList.map(value => {
      return {
        ...value,
        postList: [],
        pageSize: 5,
        pageIndex: 1,
        loading: false,
        finished: false,
        isloading: false
      }
    })
    this.init()
  },
  methods: {
    async init () {
      let id = this.cateList[this.active].id
      let res = await getPostList({
        pageSize: this.cateList[this.active].pageSize,
        pageIndex: this.cateList[this.active].pageIndex,
        category: id
      })
      // console.log(res)
      if (this.cateList[this.active].loading) {
        this.cateList[this.active].loading = false
      }
      if (this.cateList[this.active].isLoading) {
        this.cateList[this.active].isLoading = false
      }
      if (res.data.data.length < this.cateList[this.active].pageSize) {
        this.cateList[this.active].finished = true
      }
      this.cateList[this.active].postList.push(...res.data.data)
    },
    onLoad () {
      this.cateList[this.active].pageIndex++
      setTimeout(() => {
        this.init()
      }, 2000)
    },
    onRefresh () {
      this.cateList[this.active].pageIndex = 1
      this.cateList[this.active].postList.length = 0
      setTimeout(() => {
        this.init()
      }, 2000)
      this.cateList[this.active].finished = false
    }
  },
  watch: {
    active () {
      if (this.cateList[this.active].postList.length === 0) {
        this.init()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 50px;
  background-color: #f00;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  .logo {
    span {
      font-size: 15vw;
      color: #fff;
      padding: 10px;
    }
  }
  .search {
    flex: 1;
    height: 40px;
    line-height: 40px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    text-align: center;
  }
  .user {
    font-size: 30px;
    padding: 10px;
  }
}
/deep/.van-sticky{
  padding-right: 50px;
  &::after{
    content: '+';
    position: absolute;
    width: 51px;
    height: 44px;
    background-color: #fff;
    top: 0;
    right: 0;
    text-align: center;
    line-height: 42px;
    font-size: 35px;
  }
}
</style>
