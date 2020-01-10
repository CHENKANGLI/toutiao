<template>
  <div class="hmbutton" @click="push">
      <span :class="icon"></span>
     <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['icon'],
  methods: {
    push (event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style lang="less" scoped>
   .hmbutton {
       width: 318/360*100vw;
       height: 50px;
       border-radius: 25px;
       text-align: center;
       line-height: 50px;
       background-color: #f00;
       color: #fff;
       font-size: 20px;
   }
</style>
