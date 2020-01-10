<template>
  <div class="comments">
    <hmheader title="精彩评论">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </hmheader>
    <div class="list">
      <div class="item" v-for="comment in commentList" :key="comment.id">
        <div class="head">
          <img :src="comment.user.head_img" alt />
          <div>
            <p>{{comment.user.nickname}}</p>
            <span>2小时前</span>
          </div>
          <span @click="sendComment(comment)">回复</span>
        </div>
        <commentItem v-if="comment.parent" :parent="comment.parent" @replyComment="sendComment"></commentItem>
        <div class="text">{{comment.content}}</div>
      </div>
    </div>
    <commentFooter :post="article" @refresh="refresh" :obj="replyObj" @reset="replyObj=null"></commentFooter>
  </div>
</template>

<script>
import hmheader from '../components/hmheader'
import commentFooter from '../components/commentFooter'
import commentItem from '../components/commentItem'
import { getCommentList } from '../apis/user'
import { getArticleById } from '../apis/article'
export default {
  data () {
    return {
      article: {},
      commentList: [],
      replyObj: null
    }
  },
  components: {
    hmheader,
    commentFooter,
    commentItem
  },
  async mounted () {
    this.init()
    let res = await getArticleById(this.$route.params.id)
    this.article = res.data.data
  },
  methods: {
    async init () {
      let res = await getCommentList(this.$route.params.id, {
        pageSize: 50,
        pageIndex: 1
      })
      // console.log(res)
      this.commentList =
        res.data.data.length > 0 ? res.data.data : this.commentList
      this.commentList = this.commentList.map(value => {
        value.user.head_img = 'http://127.0.0.1:3000' + value.user.head_img
        return value
      })
    },
    refresh () {
      this.init()
      window.scrollTo(0, 0)
    },
    sendComment (comment) {
      console.log(comment)
      this.replyObj = comment
    }
  }
}
</script>

<style lang="less" scoped>
.comments {
  padding-bottom: 50px;
  .list {
    border-top: 5px solid #ddd;
    padding: 0 15px;
    .item {
      padding: 10px 0;
      border-bottom: 1px solid #ccc;
      .head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        > img {
          width: 50/360 * 100vw;
          height: 50/360 * 100vw;
          display: block;
          border-radius: 50%;
        }
        > div {
          flex: 1;
          display: flex;
          flex-direction: column;
          margin-left: 10px;
          > span {
            font-size: 12px;
            color: #999;
            line-height: 25px;
          }
        }
        > span {
          color: #999;
          font-size: 13px;
        }
      }
      .text {
        font-size: 14px;
        color: #333;
        padding: 20px 0 10px 0;
      }
    }
  }
}
</style>
