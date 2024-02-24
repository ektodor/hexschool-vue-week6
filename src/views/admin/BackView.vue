<template>
    <router-link to="/">回到首頁</router-link> |
    <router-link to="/admin/products">商品資訊</router-link> |
    <router-link to="/admin/orderRecord">訂單紀錄</router-link> |
    <button type="button" class="btn btn-link" @click.prevent="logout">登出</button>|
    <RouterView />
</template>

<script>
const { VITE_APP_URL } = import.meta.env
export default {
  methods: {
    logout () {
      this.$http
        .post(`${VITE_APP_URL}/logout`, {})
        .then(() => {
          document.cookie = 'token=; expired=;'
          alert('登出成功')
          this.$router.push('/login')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
