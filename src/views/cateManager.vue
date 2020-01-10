<template>
  <div class="cate">
   <hmheader title="频道管理">
       <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
   </hmheader>
   <div class="mycate">
       <p>点击删除频道</p>
       <span v-for="(item,index) in cateList" :key="item.id" @click="removeCate(index)">{{item.name}}</span>
   </div>
   <div class="mycate">
       <p>点击添加频道</p>
       <span v-for="(item,index) in unaddCateList" :key="item.id" @click="addCate(index)">{{item.name}}</span>
   </div>
  </div>
</template>

<script>
import hmheader from '../components/hmheader'
import { getCateList } from '../apis/cate'
export default {
  data () {
    return {
      cateList: [],
      unaddCateList: []
    }
  },
  components: {
    hmheader
  },
  async mounted () {
    if (localStorage.getItem('haima_cate_canadd')) {
      this.unaddCateList = JSON.parse(localStorage.getItem('haima_cate_canadd'))
    }
    if (localStorage.getItem('haima_cate')) {
      this.cateList = JSON.parse(localStorage.getItem('haima_cate'))
    } else {
      let res = await getCateList()
      console.log(res)
      this.cateList = res.data.data
      if (localStorage.getItem('haima_token')) {
        this.cateList = this.cateList.splice(2)
      } else {
        this.cateList = this.cateList.splice(1)
      }
    }
  },
  methods: {
    removeCate (index) {
      this.unaddCateList.push(this.cateList[index])
      this.cateList.splice(index, 1)
      localStorage.setItem('haima_cate', JSON.stringify(this.cateList))
      localStorage.setItem('haima_cate_canadd', JSON.stringify(this.unaddCateList))
    },
    addCate (index) {
      this.cateList.push(this.unaddCateList[index])
      this.unaddCateList.splice(index, 1)
      localStorage.setItem('haima_cate', JSON.stringify(this.cateList))
      localStorage.setItem('haima_cate_canadd', JSON.stringify(this.unaddCateList))
    }
  }
}
</script>

<style lang="less" scoped>
.mycate {
  padding: 15px;
  clear: both;
  > p {
    font-size: 16px;
    color: #888;
    line-height: 30px;
  }
  > span {
    float: left;
    padding: 10px 20px;
    border: 1px solid #ccc;
    margin-left: 12px;
    margin-top: 10px;
    font-size: 14px;
  }
}
</style>
