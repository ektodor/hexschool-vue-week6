<template>
<!-- 產品Modal -->
<div
  ref="detailModal"
  class="modal fade"
  id="staticBackdrop"
  data-bs-backdrop="static"
  data-bs-keyboard="false"
  tabindex="-1"
  aria-labelledby="staticBackdropLabel"
  aria-hidden="true"
  >
  <div class="modal-dialog modal-dialog-scrollable modal-lg">
    <div class="modal-content">
      <div class="modal-header bg-danger text-white">
        <h5 class="modal-title" id="staticBackdropLabel">
          {{tempProduct.title}}
        </h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          @click="closeModal()"
        ></button>
      </div>
      <div class="modal-body">
        <div class="container-fluid">
          <div class="row mb-3">
            <div class="col">
              <span class="badge rounded-pill bg-primary"
                >{{tempProduct.category}}</span
              >
            </div>
          </div>
          <div
            class="row mb-3"
            v-if="tempProduct.imagesUrl?.length > 0"
          >
            <div
              id="carouselExampleControls"
              class="carousel slide"
              data-bs-ride="carousel"
            >
              <div class="carousel-inner">
                <div
                  :class="`carousel-item ${index === 1 ? 'active':''}`"
                  v-for="(item, index) in tempProduct.imagesUrl"
                  :key="item"
                >
                  <img :src="item" class="d-block w-100" alt="..." />
                </div>
              </div>
              <button
                class="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
              >
                <span
                  class="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button
                class="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
              >
                <span
                  class="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col">
              <span class="badge bg-warning text-dark">商品描述</span>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col">{{tempProduct.content}}</div>
          </div>
          <div class="row mb-2">
            <div class="col">
              <span class="badge bg-warning text-dark">商品資料</span>
            </div>
          </div>
          <div class="row">
            <div class="col">{{tempProduct.description}}</div>
          </div>
        </div>
      </div>
      <div class="modal-footer d-flex justify-content-end">
        <div class="input-group mb-3 w-50">
          <input
            type="number"
            class="form-control"
            placeholder="數量"
            aria-label="數量"
            aria-describedby="button-addon2"
            v-model="tempQty"
          />
          <button
            class="btn btn-outline-danger"
            type="button"
            id="button-addon2"
            @click="addProduct(tempProduct.id,tempQty)"
          >
            加入購物車
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- 產品Modal -->
</template>

<script>
import { Modal } from 'bootstrap'

export default {
  data () {
    return {
      tempQty: 1,
      openDetailModal: null
    }
  },
  props: ['tempProduct', 'openState'],
  watch: {
    openState () {
      this.openState ? this.openDetailModal.show() : this.openDetailModal.hide()
    }
  },
  methods: {
    addProduct (id, tempQty) {
      this.$emit('add-product', id, tempQty)
    },
    closeModal () {
      this.$emit('close-modal', false)
    }
  },
  mounted () {
    this.openDetailModal = new Modal(this.$refs.detailModal)
  }
}
</script>

<style scoped>
</style>
