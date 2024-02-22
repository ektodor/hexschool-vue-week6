<template>
<nav aria-label="Page navigation">
    <ul class="pagination">
        <li :class="`page-item ${pagination.has_pre ? '' : 'disabled'}`">
        <a
            class="page-link"
            href="#"
            @click.prevent="getProducts(pagination.current_page - 1)"
            >Previous</a
        >
        </li>
        <li
        :class="`page-item ${pagination.current_page !== index ? '':'active'}`"
        v-for="index in pagination.total_pages" :key="index"
        >
        <a
            @click.prevent="getProducts(index)"
            class="page-link"
            href="#"
            v-if="pagination.current_page !== index"
            >{{index}}</a
        >
        <span class="page-link" href="#" v-else>{{index}}</span>
        </li>
        <li :class="`page-item ${pagination.has_next ? '' : 'disabled'}`">
        <a
            class="page-link"
            href="#"
            @click.prevent="getProducts(pagination.current_page + 1)"
            >Next</a
        >
        </li>
    </ul>
</nav>
</template>

<script>
export default {
  props: ['pagination'],
  methods: {
    getProducts (page = 1) {
      console.log(this.pagination)
      this.$emit('get-products', page)
    }
  }
}
</script>
