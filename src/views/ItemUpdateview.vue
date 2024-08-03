<template>
    <form class="product-container" @submit.prevent="submitUpdate">
      <input type="file" id="fileInput" @change="getFile">
      <label class="product-image" for="fileInput" style="cursor:pointer;">
        <img :src="item.url" :alt="item.name" title="Change item image!"/>
      </label>
      <div class="product-details select">
        <input type="text" placeholder="Item name" 
        v-model="itemName" >
        <input type="number" placeholder="Item price" inputmode="numeric" v-model="itemPrice">
        <input type="text" v-model=itemColor>
        <select>
            <option :value="itemCategory">
                {{itemCategory}}
            </option>
            <option value="outfit">outfit</option>
        </select>
        <span>ID: {{item.id}} </span>

        <div class="select-q select">
          <button @click="increQt" type="button">
            <PhPlus size="20" />
          </button>
          <span>{{itemQt}}</span>
          <button @click="decreQt" type="button">
            <PhMinus size="20" />
          </button>
        </div>
      
      <textarea placeholder="Item descriptions"
      v-model="itemDescriptions"
      >

      </textarea>
        <div class="action-btns">
          <button class="addto-cart" type="submit">submit update</button>
          <button class="share-btn" type="button">delete</button>
        </div>
      </div>
    </form>
  </template>
  
  <script>
  import { PhPlus, PhMinus } from '@phosphor-icons/vue'
  import { useRoute } from "vue-router"
  import { onMounted, ref } from "vue"
  import { getSingleItem , updateItem} from "../composables/index"
 
  export default {
    components: {
      PhPlus,
      PhMinus
    },
    props:['itemDetails'],
    setup(){
      const route = useRoute()
      const itemId = route.params.id 
      const item = ref('{}');
    //  const dataLoaded = ref(false);
      const fileURL = ref('');
      const filePreview = ref('');
      const itemName = ref('');
      const itemPrice = ref('');
      const itemColor = ref('')
      const itemCategory = ref('');
      const itemQt = ref('');
      const itemDescriptions = ref('');

    

      const increQt = () => {
        itemQt.value += 1
      }

      const decreQt = () => {
        itemQt.value <= 0 ? "" : itemQt.value -=1
      }

      const getFile = (e) => {
      const file = e.target.files[0];
      if (file && file.type.startsWith('image/')) {
        fileURL.value = file;
        const previewURL = URL.createObjectURL(file);
        filePreview.value = previewURL;
      } else {
        alert('Invalid file type');
      }
    };
      const submitUpdate = async() => {
        const data = {
        id: itemId,
        file: fileURL.value,
        name: itemName.value,
        price: itemPrice.value,
        qt: itemQt.value,
        color: itemColor.value,
        category: itemCategory.value,
        descriptions: itemDescriptions.value
      };
      const result = await updateItem(data);
      }
     
      onMounted(async () => {
       const result = await getSingleItem(itemId);
     //  dataLoaded.value = true
       item.value = result.data || {}
       itemName.value = item.value.name
       itemPrice.value = item.value.price
       itemColor.value = item.value.color
       itemCategory.value = item.value.category
       itemQt.value = item.value.qt
       itemDescriptions.value = item.value.descriptions
      });

     return {
      item,
      itemId,
      fileURL,
      filePreview,
      itemName,
      itemPrice,
      itemColor,
      itemCategory,
      itemQt,
      itemDescriptions,
      submitUpdate,
      getFile,
      increQt,
      decreQt
     }
    }
  }
  </script>
  
  <style scoped>

    #fileInput {
      position: absolute;
      top: 0;
      z-index: -1;
      visibility: hidden;
      opacity: 0;
    }
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
  