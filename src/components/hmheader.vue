<template>
  <div class="hmheader">
      <div>
          <slot name="left"></slot>
      </div>
      <div>{{title}}</div>
      <div>
          <slot name="right"></slot>
      </div>
  </div>
</template>

<script>
export default {
  props: ['title']
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
       >div:nth-of-type(1),div:nth-of-type(3){
           padding:0 10px;
       };
       >div:nth-of-type(2){
           font-weight: bold;
           text-align: center;
       }
   }
</style>
