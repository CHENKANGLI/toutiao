<template>
  <div class="edit">
    <hmheader title="编辑个人信息">
        <span class="iconfont iconjiantou2" slot="left" @click="$router.back()"></span>
    </hmheader>
    <div class="userimg">
        <img :src="currentUser.head_img" alt="头像">
        <!-- 文件上传组件 -->
        <van-uploader :after-read="afterRead"/>
    </div>
    <hmcell title="昵称" :description="currentUser.nickname" @click="nickshow=!nickshow"></hmcell>
        <van-dialog v-model="nickshow" title="修改昵称" show-cancel-button @confirm="updateNickname">
            <van-field ref='nick' :value="currentUser.nickname" placeholder="请输入昵称"  required label="昵称"/>
        </van-dialog>
    <hmcell title="密码" :description="currentUser.password" type="password" @click="pwdshow=!pwdshow"></hmcell>
        <van-dialog v-model="pwdshow" title="修改密码" show-cancel-button @confirm="updatePassword" :before-close="beforeClose">
            <van-field ref='originpwd' placeholder="请输入原密码"  required label="原密码"/>
            <van-field ref='newpwd' placeholder="请输入新密码"  required label="新密码"/>
        </van-dialog>
    <hmcell title="性别" :description="currentUser.gender===0?'女':'男'" @click="gendershow=!gendershow"></hmcell>
        <van-dialog v-model="gendershow" title="修改性别" show-cancel-button @confirm="updateGender">
            <van-picker :columns="['女','男']" :default-index="currentUser.gender" @change="onChange"/>
        </van-dialog>
  </div>
</template>

<script>
import hmheader from '../components/hmheader'
import hmcell from '../components/hmcell'
import { getUserById, updateUserById } from '../apis/user'
import { uploadFile } from '../apis/upload'
export default {
  data () {
    return {
      currentUser: {},
      // 修改昵称对话框是否可见
      nickshow: false,
      pwdshow: false,
      gendershow: false,
      gender: ''
    }
  },
  components: {
    hmheader, hmcell
  },
  async mounted () {
    let res = await getUserById(this.$route.params.id)
    // console.log(res)
    if (res.data.message === '获取成功') {
      this.currentUser = res.data.data
      if (this.currentUser.head_img) {
        this.currentUser.head_img = 'http://127.0.0.1:3000' + this.currentUser.head_img
      } else {
        this.currentUser.head_img = 'http://127.0.0.1:3000/uploads/image/default.png'
      }
    }
  },
  methods: {
    // 当用户选择完文件之后触发
    // file.file:当前文件对象
    async afterRead (file) {
      let formdata = new FormData()
      formdata.append('file', file.file)
      let res = await uploadFile(formdata)
      console.log(res)
      if (res.data.message === '文件上传成功') {
        this.currentUser.head_img = 'http://127.0.0.1:3000' + res.data.data.url
        let res2 = await updateUserById(this.currentUser.id, { head_img: res.data.data.url })
        if (res2.data.message === '修改成功') {
          this.$toast.success('修改成功')
        } else {
          this.$toast.fail('修改失败')
        }
      } else {
        this.$toast.file('文件上传失败')
      }
    },
    // 修改昵称
    async updateNickname () {
      console.log(this.$refs.nick)
      let name = this.$refs.nick.$refs.input.value
      let res = await updateUserById(this.currentUser.id, {
        nickname: name
      })
      console.log(res)
      if (res.data.message === '修改成功') {
        this.currentUser.nickname = name
        this.$toast.success('修改成功')
      } else {
        this.$toast.fail('修改失败')
      }
    },
    // 修改密码
    async updatePassword () {
      let oldpwd = this.$refs.originpwd.$refs.input.value
      if (oldpwd === this.currentUser.password) {
        let password = this.$refs.newpwd.$refs.input.value
        if (!/^\S{3,16}$/.test(password)) {
          this.$toast.fail('请输入3-16为密码')
          return
        }
        let res = await updateUserById(this.currentUser.id, { password })
        console.log(res)
        if (res.data.message === '修改成功') {
          this.currentUser.password = password
          this.$toast.success('修改成功')
        } else {
          this.$toast.fail('修改失败')
        }
      } else {
        this.$toast.fail('原密码输入不正确')
      }
    },
    beforeClose (action, done) {
      if (action === 'confirm') {
        // console.log(action)
        let oldpwd = this.$refs.originpwd.$refs.input.value
        if (oldpwd !== this.currentUser.password) {
          this.$toast.fail('原密码输入不正确')
          this.$refs.originpwd.$refs.input.select()
          this.$refs.originpwd.$refs.input.focus()
          done(false)
        } else if (!/^\S{3,16}$/.test(this.$refs.newpwd.$refs.input.value)) {
          this.$toast.fail('请输入3-16为密码')
          done(false)
        } else {
          done()// 必须加上done()来关闭弹窗
        }
      } else {
        done()
      }
    },
    async updateGender () {
      let res = await updateUserById(this.currentUser.id, { gender: this.gender })
      console.log(res)
      if (res.data.message === '修改成功') {
        this.currentUser.gender = this.gender
        this.$toast.success('修改成功')
      } else {
        this.$toast.fail('修改失败')
      }
    },
    onChange (picker, value, index) {
      this.$toast(`当前值：${value}, 当前索引：${index}`)
      this.gender = index
    }
  }
}
</script>

<style lang="less" scoped>
   .userimg {
       width: 100%;
       height: 120px;
       background-color: pink;
       position: relative;
       >img {
          width: 100px;
          height: 100px;
          border-radius: 50px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%)
       }
       /deep/.van-uploader_upload{
         width: 90/360*100vw;
         height: 90/360*100vw;
       }
       /deep/.van-uploader{
         position: absolute;
         left: 50%;
         top:50%;
         transform: translate(-50%,-50%);
         opacity: 0;
       }
   }
</style>
