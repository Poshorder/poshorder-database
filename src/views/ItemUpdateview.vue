<template>
    <div class="product-container">
      <div class="product-image">
        <img :src="item.url" :alt="item.name" />
      </div>
      <div class="product-details select">
        <input type="text" placeholder="Item name" :value="item.name">
        <input type="number" placeholder="Item price" inputmode="numeric" :value="item.price">
        <select>
            <option :value="item.category">
                {{item.category}}
            </option>
        </select>
        <span>ID: {{item.id}} </span>
        <div class="select-q select">
          <button>
            <PhMinus size="20" />
          </button>
          <span>{{item.qt}}</span>
          <button>
            <PhPlus size="20" />
          </button>
        </div>
      
      <textarea placeholder="Item descriptions" :value=item.descriptions>

      </textarea>
        <div class="action-btns">
          <button class="addto-cart">submit update</button>
          <button class="share-btn">delete</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { PhPlus, PhMinus } from '@phosphor-icons/vue'
  import { useRoute } from "vue-router"
  import { onMounted, ref } from "vue"
  import { getSingleItem } from "../composables/index"
  // import { ref} from "vue"
  export default {
    components: {
      PhPlus,
      PhMinus
    },
    props:['itemDetails'],
    setup(){
      const route = useRoute()
      const id = route.params.id 
      const item = ref('{}')
      onMounted(async () => {
       const result = await getSingleItem(id)
       item.value = result.data
      });
     
     return {
      item,
      id
     }
    }
  }
  </script>
  
  <style scoped>
  .product-container {
    margin: 10% auto 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: start;
    border-bottom: 1px solid rgba(183, 185, 190, 0.5);
    border-radius: 0.4em;
  }
  
  @media screen and (max-width: 900px) {
    .product-container {
      flex-direction: column;
      align-items: center;
    }
  }
  .product-image {
    width: min(30rem, 100%);
    height: 28rem;
    overflow: hidden;
    border-radius: 0.5em;
    padding: 0.5em;
  }
  
  .product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.5em;
  }
  
  .product-details {
    height: 28rem;
    display: flex;
    justify-content: start;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 1em;
  }
  
  @media screen and (max-width: 900px) {
    .product-details {
      width: 100%;
    }
  }
 
  .product-details .select-q button {
    outline: none;
    background-color: var(--color-background);
    border: 1px solid rgba(183, 185, 190, 0.5);
    padding: 0.4em;
    border-radius: 0.3em;
  }
  
  .product-details .select-q span {
    display: inline-block;
    font-size: 1em;
    padding: 1em;
    font-weight: 700;
  }
  
  input,select,textarea {
  
  width:100%;
  padding:1em;
  margin:0.4em 0;
  resize:none;
  }
  


  
  .product-details span {
    font-size: 0.6em;
    font-weight: 600;
  }
  
  .action-btns {
    margin-top: auto;
    display: flex;
    justify-content: left;
    align-items: center;
  
  }
  
  .action-btns button {
    outline: none;
    margin: 0.7em;
    text-transform: capitalize;
    padding: 1em;
    display: grid;
    place-content: center;
    border: 1px solid rgba(183, 185, 190, 0.5);
    border-radius: 0.3em;
    background-color: var(--color-background);
    box-shadow: 0 0 1.4em rgba(3, 3, 3, 0.1);
  }
  
  .addto-cart {
    background-color: var(--primary-color) !important;
    padding: 1em 4.7em !important;
    font-weight: 700;
  }
  .wishList-Btn {
    width: 3em;
    height: 3em;
  }
  </style>
  