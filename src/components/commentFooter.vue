<template>
  <div class="commentFooter">
    <div class="addcomment" v-show="!isFocus">
      <input type="text" placeholder="写跟帖" @focus="handlerFocus" />
      <span class="comment" @click="$router.push({path:`/comment/${post.id}`})">
        <i class="iconfont iconpinglun-"></i>
        <em>{{post.comment_length}}</em>
      </span>
      <i class="iconfont iconshoucang" :class="{active:post.has_star}" @click="starThisArticle"></i>
      <i class="iconfont iconfenxiang"></i>
    </div>
    <div class="inputcomment" v-show="isFocus">
      <textarea ref="commtext" rows="5"></textarea>
      <div>
        <span id="send" @click="sendComment">发送</span>
        <span id="cancel" @click="cancelReply">取消</span>
      </div>
    </div>
  </div>
</template>

<script>
import { starArticle, replyComment } from '../apis/article'
export default {
  data () {
    return {
      isFocus: false
    }
  },
  props: ['post', 'obj'],
  watch: {
    obj () {
      if (this.obj) {
        console.log(this.obj)
        this.isFocus = true
      }
    }
  },
  methods: {
    //   获取焦点时触发
    handlerFocus () {
      this.isFocus = !this.isFocus
      setTimeout(() => {
        this.$refs.commtext.focus()
      }, 100)
    },
    async starThisArticle () {
      let res = await starArticle(this.post.id)
      this.post.has_star = !this.post.has_star
      this.$toast.success(res.data.message)
    },
    cancelReply () {
      this.isFocus = false
      this.$emit('reset')
    },
    async sendComment () {
      let data = {
        content: this.$refs.commtext.value
      }
      if (this.obj) {
        data.parent_id = this.obj.id
      }
      let res = await replyComment(this.post.id, data)
      // console.log(res)
      if (res.data.message === '评论发布成功') {
        this.isFocus = false
        this.$refs.commtext.value = ''
        this.$emit('refresh')
      }
    }
  }
}
</script>

<style lang='less' scoped>
.inputcomment {
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  background-color: #fff;
  align-items: flex-end;
  textarea {
    flex: 3;
    background-color: #eee;
    border: none;
    border-radius: 10px;
    padding: 10px;
  }
  div {
    padding: 20px;
  }
  span {
    display: block;
    flex: 1;
    height: 24px;
    line-height: 24px;
    padding: 0 10px;
    background-color: #f00;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    font-size: 13px;
    &:nth-of-type(1) {
      margin-bottom: 20px;
    }
    // &:nth-of-type(2) {
    //   margin-top: 10px;
    // }
  }
}

.commentFooter {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
}

.addcomment {
  background-color: #fff;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  > input {
    flex: 4;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    border: none;
    background-color: #eee;
    padding-left: 20px;
    font-size: 14px;
  }
  i {
    font-size: 20px;
  }
  > span {
    flex: 1;
    position: relative;
    > em {
      position: absolute;
      right: -5px;
      top: -10px;
      font-size: 10px;
      background-color: #f00;
      color: #fff;
      border-radius: 5px;
      padding: 3px 5px;
    }
  }
  > i {
    flex: 1;
  }
}
.active {
    color: #f00;
}
</style>
