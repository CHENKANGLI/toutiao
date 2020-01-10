<template>
  <div class="star">
    <hmheader title="我的收藏">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </hmheader>
      <articleblock v-for="item in starsList" :key="item.id" :post="item" @click="$router.push({path:`/articleDetail/${item.id}`})"></articleblock>
  </div>
</template>

<script>
import hmheader from '../components/hmheader'
import articleblock from '../components/articleblock'
import { getUserStars } from '../apis/user'
export default {
  data () {
    return {
      starsList: []
    }
  },
  components: {
    hmheader, articleblock
  },
  async mounted () {
    let res = await getUserStars()
    // console.log(res)
    this.starsList = res.data.data
  }
}
</script>

<style lang="less" scoped>
.hmheader {
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > div:nth-of-type(1),
  div:nth-of-type(3) {
    padding: 0 10px;
  }
  > div:nth-of-type(2) {
    font-weight: bold;
    text-align: center;
  }
}

</style>
