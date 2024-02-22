<template>
    <router-link to="/">回到首頁</router-link> |
    <router-link to="/admin/products">商品資訊</router-link> |
    <router-link to="/admin/orderRecord">訂單紀錄</router-link> |
    <button type="button" class="btn btn-link" @click.prevent="logout">登出</button>|
    <RouterView />
</template>

<script>
export default {
  data () {
    return {
      apiUrl: import.meta.env.VITE_APP_API_URL,
      apiPath: import.meta.env.VITE_APP_API_NAME
    }
  },
  methods: {
    logout () {
      this.$http
        .post(`${this.apiUrl}/logout`, {})
        .then(() => {
          document.cookie = 'token=; expires=; path=/'
          this.$router.push('/login')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
