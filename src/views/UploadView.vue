<template>
 <form @submit.prevent="submitData">
  <input type="file" name="" id="item-file" @change="getFile" required>
  <div class="item-img">
    <label for="item-file" style="cursor:pointer;" title="Click to upload">
      <img :src="filePreview || 'src/assets/icons/cam-icon.jpeg'" alt="">
    </label>
  </div>

<div class="right-side">
  <label for="item-name">
    <h2>item name</h2>
    <input type="text" placeholder="Enter item name" id="item-name" v-model="itemName" required>
  </label>
  <label for="item-price">
    <h2>item price</h2>
    <input type="number" placeholder="Enter item price" id="item-price" inputmode="numeric" v-model="itemPrice" required>
  </label>
  <label for="item-qt">
    <h2>item qt</h2>
    <input type="number" placeholder="Enter item qt" id="item-qt" inputmode="numeric" v-model="itemQt" required>
  </label>
  <label for="item-category">
  <h2>Item Category</h2>
  <select @change="selectCategory" ref="categorySelect">
    <option value="electronic">Electronic</option>
    <option value="clothe">Cloth</option>
    <option value="sneaker">Sneaker</option>
  </select>
</label>

  <label for="item-color">
    <h2>item color</h2>
    <input type="text" placeholder="Enter item color" id="item-color" v-model="itemColor" required>
  </label>
  <label for="item-descriptions">
    <h2>item descriptions</h2>
   <textarea name="" id="item-descriptions" placeholder="Enter descriptions" v-model="itemDescriptions" required></textarea>
  </label>
  <span class="feedback">{{ progressRef || 'Waiting...'}}</span>
  <button type="submit" :disabled="isUploading">submit item</button>
</div>

 </form>
</template>

<script>
import { onMounted, ref } from "vue";
import { saveItemToCloud } from "../composables/index"
export default {

  setup() {
    const filePreview = ref('');
    const fileURL = ref('');
    const itemName = ref('');
    const itemPrice = ref('');
    const itemQt = ref('');
    const itemColor = ref('');
    const itemCategory = ref('');
    const itemDescriptions = ref('');
    const categorySelect = ref(null);
    const isUploading = ref(false);
    const progressRef = ref('');

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

    const selectCategory = (e) => {
      itemCategory.value =  e.target.value
    }

    const submitData = async () => {
      const data = {
        file: fileURL.value,
        name: itemName.value,
        price: itemPrice.value,
        qt: itemQt.value,
        color: itemColor.value,
        category: itemCategory.value,
        descriptions: itemDescriptions.value
      };

      try {
        isUploading.value = true;
        await saveItemToCloud(data, (progress) => {
          progressRef.value = `Upload is ${progress}% done`;
          if (progress === 100) {
            progressRef.value = 'Item uploaded to cloud storage!';
          }
        });
      } catch (error) {
        console.log(error);
        alert('Failed to upload item.');
      } finally {
        isUploading.value = false;
      }
   
    };
    onMounted(() => {
      // Manually trigger the initial change event
      selectCategory({ target: categorySelect.value });
    });


    return {
      getFile,
      submitData,
      selectCategory,
      categorySelect,
      filePreview,
      fileURL,
      itemName,
      itemPrice,
      itemQt,
      itemColor,
      itemDescriptions,
      progressRef,
      isUploading
    };
  }

}


</script>

<style scoped>
input[type='file'] {

  position: absolute;
  top: 0;
  z-index: -1;
  opacity: 0;
}

form {

  width: 100%;
  margin: 5% auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.feedback {

  text-align: center;
  display: block;
  padding: 1em;
}

.feedback::first-letter {
  text-transform: capitalize;
}

.item-img {

  width: min(100%,25rem);
  height: 30rem;
  cursor: pointer;
}

.right-side {

  height: 100%;
  width: min(100%,30rem);
  padding: 1em;
}

.right-side label {

  display: block;
  width: 100%;
  text-transform: capitalize;
}

label input, textarea, select {
  outline: none;
  border: 1px solid rgba(183,185,190,0.5);
  padding: 1em 3em;
  border-radius: 0.5em;
  width: 100%;
  font-weight: 700;
  text-transform: capitalize;
}

textarea {

  height: 8rem;
  resize: none;
}

.right-side button[type='submit'] {

  width: 100%;
  padding: 1.3em 0;
  text-transform: capitalize;
  font-weight: 700;
  background-color: #262626;
  color: #F1F1F1;
  border-radius: 0.3em;
}

</style>
