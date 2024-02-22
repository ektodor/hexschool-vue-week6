<template>
    <h1>查無此網頁 404</h1>
    <button type="button" class="btn btn-danger" @click.prevent="goBack">回前一頁</button>
</template>

<script>
export default {
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
