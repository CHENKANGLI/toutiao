<template>
  <div class="hminput">
   <input
   :type="type"
   :placeholder="placeholder"
   :value="value"
   @input="handleinput"
   @blur="handleBlur"
   :class="{'success':statu,'error':!statu}">
  </div>
</template>

<script>
export default {
  data () {
    return {
      statu: true
    }
  },
  props: [
    'placeholder', 'value', 'type'
  ],
  methods: {
    // 监听用户输入
    handleinput (event) {
      let value = event.target.value
      if (this.rules && this.rules.test(value)) {
        this.statu = true
      } else {
        this.statu = false
      }
      this.$emit('input', value)
    },
    handleBlur () {
      let value = event.target.value
      if (this.rules && !this.rules.test(value)) {
        this.$toast.fail({
          message: this.msg || '输入不正确',
          duriation: 3000
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
    .hminput {
      width: 318/360*100vw;
      height: 60px;
      >input {
      outline: none;
      border: none;
      border-bottom:1px solid #000;
      width: 100%;
      height: 50px;
      font-size: 20px;
      line-height: 50px;
      }
    }
    .success {
      border-bottom-color: #0f0;
    }
    .error {
      border-bottom-color: #f00;
    }
</style>
