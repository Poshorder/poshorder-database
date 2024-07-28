<template>
  <div class="container">
    <h2>recently added</h2>
    <div class="wrapper">
      <div class="card" v-for="product in newArrivals" :key="product.id">
        <div class="img">
          <img :src="product.url" :alt="product.name" />
        </div>
        <div class="details">
          <h2>
            {{ product.name }}
          </h2>
          <p>$ {{ product.price }}</p>
          <p>qt: {{ product.qt }}</p>
          <p>color: {{ product.color }}</p>
          <p>
            {{ product.descriptions }}
          </p>
        </div>
        <div class="action-btns">
          <button @click="deleteItem">
            <PhTrash size="25" />
          </button>
          <button>
            <PhArrowsClockwise size="25" />
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <h2>all products</h2>
    <div class="wrapper">
      <div class="card" v-for="product in newArrivals" :key="product.id">
        <div class="img">
          <img :src="product.img" :alt="product.name" />
        </div>
        <div class="details">
          <h2>
            {{ product.name }}
          </h2>
          <p>$ {{ product.price }}</p>
          <p>qt: {{ product.qt }}</p>
          <p>color: {{ product.color }}</p>
          <p>
            {{ product.descriptions }}
          </p>
        </div>
        <div class="action-btns">
          <button @click="deleteItem">
            <PhTrash size="25" />
          </button>
          <button>
            <PhArrowsClockwise size="25" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArrivalsCol } from "../composables/index"
import { PhTrash, PhArrowsClockwise } from '@phosphor-icons/vue'
import { onMounted, ref } from 'vue'
export default {
  components: {
    PhTrash,
    PhArrowsClockwise
  },
  setup() {
    const newArrivals = ref([])

   // getArrivalsCol()

    onMounted(async () => {
      const data = await getArrivalsCol()
      newArrivals.value = data
    })

    return {
      newArrivals
    }
  }
}
</script>

<style scoped></style>
