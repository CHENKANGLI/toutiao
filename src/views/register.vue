<template>
  <div class="register">
      <div class="container">
        <div class="close">
          <span class="iconfont iconicon-test"></span>
        </div>
        <div class="logo">
          <span class="iconfont iconnew"></span>
        </div>
        <div class="inputs">
            <hminput
              placeholder="用户名/手机号"
              class="input" type='text'
              v-model="user.username"
              :rules="/^(\d{5,6})$|^(1\d{10})$/"
              msg="用户名或手机号输入不正确"
            ></hminput>
            <hminput
              placeholder="请输入昵称"
              class="input" type='text'
              :rules='/^\w+$/'
              msg='请输入昵称'
              v-model='user.nickname'
            ></hminput>
            <hminput
              placeholder="密码"
              class="input"
              type="password"
              v-model="user.password"
              :rules="/^\S{3,16}$/"
              msg="请输入3-16位的密码"
            ></hminput>
        </div>
        <p class="tips">
          有账号？
          <a href="#/login" class>去登录</a>
        </p>
        <hmbutton @click="register">注册</hmbutton>
      </div>
  </div>
</template>

<script>
import hminput from '../components/hminput'
import hmbutton from '../components/hmbutton'
import { register } from '../apis/user'
export default {
  data () {
    return {
      user: {
        username: '',
        password: '',
        nickname: ''
      }
    }
  },
  components: {
    hminput, hmbutton
  },
  methods: {
    async register () { // hmbutton点击时调用
      let res = await register(this.user)
      //   console.log(res)
      if (res.data.message === '注册成功') {
        this.$toast.success('注册成功')
        this.$router.push({ name: 'Login' })
      } else {
        this.$toast.fail('注册失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container{
    padding:20px;
  }

  .close{
    span{
      font-size: 27 / 360 * 100vw;
    }
  }

  .logo{
    display: flex;
    justify-content: center;

    span{
      display: block;
      font-size: 126 / 360 * 100vw;
      color: #d81e06;
    }
  }

  .inputs{
    input{
      margin-bottom: 20px;
    }
  }

  .tips{
    text-align: right;
    margin-bottom: 20px;

    a{
      color:#3385ff;
    }
  }
</style>
