<template>
  <div class="container">
    <h2>recently added</h2>
    <div class="wrapper">
     <p v-if="!newArrivals.length" style="width:100%;text-align:center" >No Item here...</p>
     <div v-else class="card" v-for="product in newArrivals " :key="product.id">
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
          <p>category: {{ product.category || 'Category not selected !'}}</p>
          <p>
            {{ product.descriptions }}
          </p>
        </div>
        <div class="action-btns">
          <button :title="product.isNew ? 'Remove from new arrivals' : ''" @click="removeFromNew(product.id)">
            <PhClock size="25"/>
          </button>
          <button title="Update item details">
            <RouterLink :to="{name: 'update',params:{ id: product.id}}">
            <PhArrowsClockwise size="25" />
            </RouterLink>
          </button>
          <button @click="deleteItem(product.id)" title="Delete this item from the db and the Cloud">
            <PhTrash size="25" />
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <h2>all products</h2>
    <div class="wrapper">
      <div class="card" v-for="product in products" :key="product.id">
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
          <p>category: {{ product.category }}</p>
          <p>
            {{ product.descriptions }}
          </p>
        </div>
        <div class="action-btns">
          <button :title="product.isNew ? 'Remove from new arrivals' : 'Add to new arrivals'" @click="removeFromNew(product.id)">
            <PhClock size="25"/>
          </button>
          <button title="Update item details">
            <PhArrowsClockwise size="25" />
          </button>
          <button @click="deleteItem(product.id)" title="Delete this item from the db and the Cloud">
            <PhTrash size="25" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProductsCol, requestDeleteTodb, requestToRemoveFromNew } from "../composables/index"
import { PhTrash, PhArrowsClockwise,PhClock } from '@phosphor-icons/vue'
import { onMounted, ref } from 'vue'
export default {
  components: {
    PhTrash,
    PhArrowsClockwise,
    PhClock
  },
  setup() {
    const products = ref([]);
    const newArrivals = ref([])
    const mssgRef = ref('')
   const deleteItem = async (id) => {
     await requestDeleteTodb(id)
   }

   const removeFromNew = async (id) => {
    await requestToRemoveFromNew(id)

   }


    onMounted(async () => {
      const data = await getProductsCol()
      products.value = data
      const newArrivalsFiltered = data.filter(d => d.isNew)
     // console.log(newArrivalsFiltered)
      newArrivals.value = newArrivalsFiltered
    })

    return {
      products,
      newArrivals ,
      mssgRef,
      deleteItem,
      removeFromNew
    }
  }
}
</script>

<style scoped>
.action-feedback {

  text-align: left;
  padding: 1em;
  color: rgb(202, 34, 34);
}

</style>
