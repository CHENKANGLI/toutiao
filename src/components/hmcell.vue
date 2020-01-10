<template>
  <div class="cell" @click="handleclick">
      <div class="left">{{title}}</div>
      <div class="right">{{type==='password'?'******':description}}<span class="iconfont iconjiantou1"></span></div>
  </div>
</template>

<script>
export default {
  props: [
    'title', 'description', 'type'
  ],
  methods: {
    handleclick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="less" scoped>
  .cell {
      display: flex;
      justify-content: space-between;
      padding:20px 10px;
      border-bottom: 1px solid #ccc;
      >.right{
          font-size: 13px;
          color: #888;
      }

  }
</style>
