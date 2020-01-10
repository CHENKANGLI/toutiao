<template>
  <div class="commentItem">
      <commentItem v-if="parent.parent" :parent="parent.parent" @replyComment="sendComment"></commentItem>
      <div class="top">
          <div class="left">
              <span>{{parent.user.nickname}}</span>&nbsp;&nbsp;&nbsp;
              <span>2小时前</span>
          </div>
          <span @click="sendComment(parent)">回复</span>
      </div>
      <div class="bottom">{{parent.content}}</div>
  </div>
</template>

<script>
export default {
  name: 'commentItem',
  props: ['parent'],
  methods: {
    sendComment (comment) {
      console.log(comment)
      this.$emit('replyComment', comment)
    }
  }
}
</script>

<style lang="less" scoped>
   .commentItem {
       border: 1px solid #ccc;
       padding:5px;
       .top {
           font-size: 12px;
           color: #aaa;
           display: flex;
           justify-content: space-between;
       }
       .bottom {
           font-size: 13px;
           line-height: 40px;
       }
   }
</style>
