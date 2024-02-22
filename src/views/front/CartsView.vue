<template>
    <div class="container">
              <div class="text-end">
            <button
              @click='deleteAllProducts'
              class="btn btn-outline-danger"
              type="button"
            >
              清空購物車
            </button>
          </div>
          <table class="table align-middle">
            <thead>
              <tr>
                <th></th>
                <th>品名</th>
                <th style="width: 150px">數量/單位</th>
                <th>單價</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="cart.carts">
                <tr v-for="(item) in cart.carts" :key="item.id">
                  <td>
                    <button
                      @click="deleteProduct(item.id)"
                      type="button"
                      class="btn btn-outline-danger btn-sm"
                    >
                      <i
                        class="fas fa-spinner fa-pulse"
                        v-if="isCartLoading"
                      ></i>
                      x
                    </button>
                  </td>
                  <td>
                    {{ item.product.title }}
                    <div class="text-success">已套用優惠券</div>
                  </td>
                  <td>
                    <div class="input-group input-group-sm">
                      <div class="input-group mb-3">
                        <input
                          v-model.number="item.qty"
                          min="1"
                          type="number"
                          class="form-control"
                          @blur="updateCartQuantity(item.id, item.qty)"
                        />
                        <span class="input-group-text" id="basic-addon2"
                          >{{ item.product.unit }}</span
                        >
                      </div>
                    </div>
                  </td>
                  <td class="text-end">
                    <small class="text-danger text-decoration-line-through"
                      >原價：{{ item.total }}</small
                    >

                    <br />
                    <small class="text-success">折扣價：</small>
                    {{ item.final_total }}
                  </td>
                </tr>
              </template>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="text-end">總計</td>
                <td class="text-end">{{ cart.total }}</td>
              </tr>
              <tr>
                <td colspan="3" class="text-end text-success">折扣價</td>
                <td class="text-end text-success">{{ cart.final_total }}</td>
              </tr>
            </tfoot>
          </table>
        <div class="my-5 row justify-content-center">
          <v-form
            ref="form"
            class="col-md-6"
            v-slot="{ errors }"
            @submit="checkoutProducts"
          >
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <v-field
                id="email"
                name="email"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': errors['email'] }"
                rules="email|required"
                placeholder="請輸入 Email"
                v-model="user.email"
              ></v-field>
              <error-message
                name="email"
                class="invalid-feedback"
              ></error-message>
            </div>

            <div class="mb-3">
              <label for="name" class="form-label">收件人姓名</label>
              <v-field
                id="name"
                name="姓名"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors['姓名'] }"
                placeholder="請輸入姓名"
                rules="required"
                v-model="user.name"
              ></v-field>
              <error-message
                name="姓名"
                class="invalid-feedback"
              ></error-message>
            </div>

            <div class="mb-3">
              <label for="tel" class="form-label">收件人電話</label>
              <v-field
                id="tel"
                name="電話"
                type="tel"
                class="form-control"
                :class="{ 'is-invalid': errors['電話'] }"
                placeholder="請輸入電話"
                :rules="isPhone"
                v-model="user.tel"
              ></v-field>
              <error-message
                name="電話"
                class="invalid-feedback"
              ></error-message>
            </div>

            <div class="mb-3">
              <label for="address" class="form-label">收件人地址</label>
              <v-field
                id="address"
                name="地址"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors['地址'] }"
                placeholder="請輸入地址"
                rules="required"
                v-model="user.address"
              ></v-field>
              <error-message
                name="地址"
                class="invalid-feedback"
              ></error-message>
            </div>

            <div class="mb-3">
              <label for="message" class="form-label">留言</label>
              <textarea
                id="message"
                class="form-control"
                cols="30"
                rows="10"
                v-model="message"
              ></textarea>
            </div>
            <div class="text-end">
              <button v-if="cart.carts.length > 0" type="submit" class="btn btn-danger">送出訂單</button>
              <button v-else type="submit" class="btn btn-danger disabled">送出訂單</button>
            </div>
          </v-form>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      apiUrl: import.meta.env.VITE_APP_API_URL,
      apiPath: import.meta.env.VITE_APP_API_NAME,
      cart: {},
      user: {
        name: '',
        email: '',
        tel: '',
        address: ''
      },
      message: '',
      isCartLoading: false,
      isDetailLoading: false
    }
  },
  methods: {
  // 購物車列表
    getCartProducts () {
      // console.log("購物車列表");
      this.$http
        .get(`${this.apiUrl}/api/${this.apiPath}/cart`)
        .then((res) => {
          this.cart = JSON.parse(JSON.stringify(res.data.data))
          this.isDetailLoading = false
          this.isCartLoading = false
        })
        .catch((err) => {
          this.errorMessage(err, '取得購物車列表失敗')
        })
    },
    // 刪除購物車項目 單一
    deleteProduct (id) {
      this.isCartLoading = true
      // console.log("刪除購物車項目 單一", id);
      this.$http
        .delete(`${this.apiUrl}/api/${this.apiPath}/cart/${id}`)
        .then((res) => {
          this.getCartProducts()
          alert('購物車更新成功')
        })
        .catch((err) => {
          this.errorMessage(err, '刪除購物車項目失敗 (單一)')
        })
    },
    // 刪除購物車項目 全部
    deleteAllProducts () {
      // console.log("刪除購物車項目 全部");
      this.$http
        .delete(`${this.apiUrl}/api/${this.apiPath}/carts`)
        .then((res) => {
          this.getCartProducts()
          alert('購物車更新成功')
        })
        .catch((err) => {
          this.errorMessage(err, '刪除購物車項目失敗 (全部)')
        })
    },
    // 購物車產品數量
    updateCartQuantity (id, qty) {
      this.isCartLoading = true
      // console.log("購物車產品數量", id, qty);
      this.$http
        .put(`${this.apiUrl}/api/${this.apiPath}/cart/${id}`, {
          data: {
            product_id: id,
            qty
          }
        })
        .then((res) => {
          this.getCartProducts()
          alert('購物車更新成功')
        })
        .catch((err) => {
          this.errorMessage(err, '更改產品數量失敗')
        })
    },
    // 結帳
    checkoutProducts () {
      this.$http
        .post(`${this.apiUrl}/api/${this.apiPath}/order`, {
          data: {
            user: this.user,
            message: this.message
          }
        })
        .then((res) => {
          this.user = { name: '', email: '', tel: '', address: '' }
          this.message = ''
          this.getCartProducts()
          alert('商品已完成結帳')
        })
        .then((err) => {
          this.errorMessage(err, '結帳失敗')
        })
    },
    // 錯誤資訊
    errorMessage (err, meg) {
      console.error(err.message)
      alert(meg)
    },
    //  電話認證
    isPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '需要正確的電話號碼'
    }
  },
  mounted () {
    this.getCartProducts()
  }
}
</script>
