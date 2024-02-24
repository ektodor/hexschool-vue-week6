<template>
      <div class="container">
        <div class="row justify-content-center">
          <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
          <div class="col-8">
            <form id="form" class="form-signin">
              <div class="form-floating mb-3">
                <input
                  type="email"
                  class="form-control"
                  id="username"
                  placeholder="name@example.com"
                  required
                  autofocus
                  v-model="username"
                />
                <label for="username">Email address</label>
              </div>
              <div class="form-floating">
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="Password"
                  required
                  v-model="password"
                />
                <label for="password">Password</label>
              </div>
              <button
                class="btn btn-lg btn-primary w-100 mt-3"
                type="button"
                @click="login"
              >
                登入
              </button>
            </form>
          </div>
        </div>
        <p class="mt-5 mb-3 text-muted">&copy; 2021~∞ - 六角學院</p>
      </div>
</template>

<script>
const { VITE_APP_URL } = import.meta.env
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      this.$http
        .post(`${VITE_APP_URL}/admin/signin`, {
          username: this.username,
          password: this.password
        })
        .then((res) => {
          const { token, expired } = res.data
          document.cookie = `token=${token};expired=${new Date(expired)}`
          this.$router.push('/admin/products')
        })
        .catch((err) => {
          console.error(err)
          alert('登入失敗')
        })
    }
  }
}
</script>
