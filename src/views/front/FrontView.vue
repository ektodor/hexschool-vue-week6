<template>
    <router-link to="/">首頁</router-link> |
    <router-link to="/products">產品資訊</router-link> |
    <router-link to="/carts">購物車</router-link> |
    <router-link to="/login" v-if="!loginState">登入</router-link>
    <router-link to="/admin/products" v-else>後台頁面</router-link>
    <RouterView />
</template>
<script>
export default {
  data () {
    return {
      apiUrl: import.meta.env.VITE_APP_API_URL,
      loginState: false
    }
  },
  mounted () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')
    console.log(token)
    if (!token) {
      this.loginState = false
      return
    }
    this.$http.defaults.headers.common.Authorization = token
    this.$http
      .post(`${this.apiUrl}/api/user/check`, {})
      .then((res) => {
        this.loginState = true
      })
      .catch(() => {
        this.loginState = false
      })
  }
}
</script>
