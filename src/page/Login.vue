<template>
  <div class="login_page" style="">
    <div class="login_panel">
      <Card>
        <el-form label-width="60px">
          <form-item label="手机号">
            <el-input v-model="phone" placeholder="请输入手机号"></el-input>
          </form-item>
          <form-item label="密码">
            <el-input v-model="password" type="password" placeholder="请输入密码"></el-input>
          </form-item>
          <form-item>
            <el-button type="primary" @click="login">登录</el-button>
          </form-item>
        </el-form>
      </Card>
    </div>
  </div>
</template>

<script>
import { Card, Form, Input, FormItem, Button } from 'element-ui'
import api from '@/common/api'
import { mapActions } from 'vuex'

export default {
  name: 'LoginPage',
  components: {
    Card,
    FormItem,
    'el-form': Form,
    'el-input': Input,
    'el-button': Button
  },
  data () {
    return {
      phone: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['updateRole']),
    login () {
      axios.post(api.bindWechat, {
        phone: this.phone,
        pwd: this.password,
        wxid: localStorage.openid
      }).then((response) => {
        console.log(response)
        if (response.code === 200) {
          localStorage.user = response.results.token
          this.updateRole(response.results.role.code)
          this.$router.push({
            name: 'OrderManage',
            query: {
              state: 1
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login_page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: url("http://7xo285.com1.z0.glb.clouddn.com/FicB2ZmUNoieZhKoiJJPblTtczvK") no-repeat;
  background-size: cover;
  background-position: center;
  .login_panel {
    width: 80%;
  }
}
</style>
