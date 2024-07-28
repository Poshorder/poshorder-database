<template>
  <input type="search" name="" id="" placeholder="Search products by ID..." />
  <div class="container">
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
import { PhTrash, PhArrowsClockwise } from '@phosphor-icons/vue'
import { ref } from 'vue'
export default {
  components: {
    PhTrash,
    PhArrowsClockwise
  },
  setup() {
    const newArrivals = ref([
      {
        id: 1,
        img: 'https://images.unsplash.com/photo-1705096953495-8ea06879b986?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Jordan 1 Retro Low OG SP Travis Scott Olive',
        price: '400',
        qt: 6,
        color: 'olive',
        descriptions:
          ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, nesciunt?'
      },
      {
        id: 2,
        img: 'https://images.unsplash.com/photo-1699595749116-33a4a869503c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: "Nike Air Force 1 'Basketball Leather'",
        price: '300',
        qt: 2,
        color: 'white',
        descriptions:
          ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, nesciunt?'
      },
      {
        id: 3,
        img: 'https://images.unsplash.com/photo-1695686331766-16a2c3c2c382?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Jordan 1 Retro Low OG SP Travis Scott Olive',
        price: '370',
        qt: 8,
        color: 'white',
        descriptions:
          ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, nesciunt?'
      }
    ])

    return {
      newArrivals
    }
  }
}
</script>

<style scoped>
input {
  margin: 5% auto 0;
  display: block;
  width: min(100%, 40rem);
  height: 3rem;
  outline: none;
  background-color: #f1f1f1;
  z-index: 5;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  border: none;
  padding: 0.5em;
}
</style>
