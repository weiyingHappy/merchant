<template>
  <div class="auth_page">
    <div class="authpanel">
      {{msg}}
    </div>
  </div>
</template>

<script>
import api from '@/common/api'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      msg: '登录校验中...'
    }
  },
  created () {
    const openid = localStorage.openid
    if (!openid) {
      this.msg = ':( 请在微信中打开'
    } else {
      axios.get(`${api.loginByWechat}/${openid}`).then((data) => {
        if (data.code === 200) {
          localStorage.user = data.results.token
          this.updateRole(data.results.role.code)
          this.$router.push({
            name: 'OrderManage',
            query: {
              state: 1
            }
          })
        } else {
          this.$router.push({
            name: 'Login'
          })
        }
      })
    }
  },
  methods: {
    ...mapActions(['updateRole'])
  }
}
</script>

<style lang="scss" scoped>
.auth_page {
  height: 100%;
  background-color: #efefef;
  display: flex;
  justify-content: center;
  align-items: center;
  .authpanel {
    background: #fff;
    width: 200px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #555;
    font-size: 14px;
    border-radius: 4px;
    border: solid 1px #ddd;
    box-shadow: 0px 1px 6px 0px #dedede;
  }
}
</style>
