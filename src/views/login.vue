<template>
  <div class="login">
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
              :value="user.username"
              @input="handleuserinput"
              :rules="/^(\d{5,6})$|^(1\d{10})$/"
              msg="用户名或手机号输入不正确"
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
              没有账号？
              <a href="#/register" class="">去注册</a>
          </p>
          <hmbutton @click="login">登录</hmbutton>
      </div>
  </div>
</template>

<script>
import hmbutton from '@/components/hmbutton'
import hminput from '@/components/hminput'
import { login } from '@/apis/user.js'
export default {
  data () {
    return {
      user: {
        username: '10086',
        password: '123'
      }
    }
  },
  components: {
    hminput, hmbutton
  },
  methods: {
    // async标记当前方法中有异步操作
    async login () {
      if (/^(\d{5,6})$|^(1\d{10})$/.test(this.user.username) && /^\S{3,16}$/.test(this.user.password)) {
        // await获取当前操作的返回结果，可以让后续的操作等待，只有执行完当前使用await标记的方法之后才会执行后续操作
        let res = await login(this.user)
        // console.log(res)
        if (res.data.message === '用户不存在') {
          this.$toast.fail(res.data.message)
        } else {
          localStorage.setItem('haima_token', res.data.data.token)
          localStorage.setItem('haima_userInfo', JSON.stringify(res.data.data.user))
          this.$router.push({ path: `/user/${res.data.data.user.id}` })
        }
      } else {
        this.$toast.fail('用户数据输入不合法')
      }
    },
    handleuserinput (data) {
      this.user.username = data
    }
  }
}
</script>

<style lang="less">
.container {
  padding: 20px;
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin: 20px 0 20px 0;

  a {
    color: #3385ff;
    text-decoration: none;
  }
}
</style>
