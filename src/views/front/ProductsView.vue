<template>
  <ModalComponent @close-modal="()=>openState = false" :tempProduct="tempProduct" @add-product="addProduct" :openState="openState" />
  <div class="container">
    <div class="mt-4">
          <table class="table align-middle">
            <thead>
              <tr>
                <th>圖片</th>
                <th>商品名稱</th>
                <th>價格</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in products" :key="item.id">
                <td style="width: 200px">
                  <div
                    :style="`height: 250px;
                      background-size: cover;
                      background-position: center;
                      background-image: url(${item.imageUrl});`
                    "
                  ></div>
                </td>
                <td>{{ item.title }}</td>
                <td>
                  <div class="h5">{{ item.price }} 元</div>
                  <del class="h6">原價 {{item.origin_price }} 元</del>
                  <div class="h5">現在只要 {{ item.price }} 元</div>
                </td>
                <td>
                  <div class="btn-group btn-group-sm">
                    <button
                      @click="openModal(item)"
                      type="button"
                      class="btn btn-outline-secondary"
                    >
                      <i
                        class="fas fa-spinner fa-pulse"
                        v-if="isDetailLoading"
                      ></i>
                      查看更多
                    </button>
                    <button
                      @click="addProduct(item.id, 1)"
                      type="button"
                      class="btn btn-outline-danger"
                    >
                      <i
                        class="fas fa-spinner fa-pulse"
                        v-if="isDetailLoading"
                      ></i>
                      加到購物車
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- pagination -->
          <PaginationComponent
            :pagination="pagination"
            @getProducts="getProducts"
          />
          <!-- pagination -->
    </div>
  </div>
</template>

<script>
import PaginationComponent from '@/components/PaginationComponent.vue'
import ModalComponent from '../../components/ModalComponent.vue'

// let openDetailModal
export default {
  data () {
    return {
      apiUrl: import.meta.env.VITE_APP_API_URL,
      apiPath: import.meta.env.VITE_APP_API_NAME,
      products: [],
      pagination: {},
      tempProduct: {},
      isDetailLoading: false,
      openState: false
    }
  },
  methods: {
    // 開啟 Modal
    openModal (item) {
      this.openState = true
      this.tempProduct = JSON.parse(JSON.stringify(item))
    },
    // 所有產品的列表
    getProducts (page = 1) {
      const loader = this.$loading.show()
      this.$http
        .get(`${this.apiUrl}/api/${this.apiPath}/products?page=${page}`)
        .then((res) => {
          this.products = res.data.products
          this.pagination = res.data.pagination
          loader.hide()
        })
        .catch((err) => {
          this.errorMessage(err, '取得商品資料失敗')
        })
    },
    // 單一產品細節 好像沒用到?! 因為 getProducts 以取得內容
    getSingleProduct (id) {
      this.isDetailLoading = true
      this.$http
        .get(`${this.apiUrl}/api/${this.apiPath}/product/${id}`)
        .then((res) => {
          this.tempProduct = res.data.product
          this.isDetailLoading = false
        })
        .catch((err) => {
          this.errorMessage(err, '商品細節取得失敗')
        })
    },
    // 加入購物車
    addProduct (id, qty = 1) {
      this.isDetailLoading = true
      this.$http
        .post(`${this.apiUrl}/api/${this.apiPath}/cart`, {
          data: {
            product_id: id,
            qty
          }
        })
        .then((res) => {
          this.openState = false
          alert('購物車更新成功')
        })
        .catch((err) => {
          this.errorMessage(err, '加入購物車失敗')
        })
    },
    // 錯誤資訊
    errorMessage (err, meg) {
      console.error(err.message)
      alert(meg)
    }
  },
  components: {
    ModalComponent,
    PaginationComponent
  },
  mounted () {
    this.getProducts()
  }
}
</script>

<style scoped>
</style>
