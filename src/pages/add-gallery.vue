<script setup>
import { ref } from 'vue'
import axios from '@axios'
import { baseUrl } from '@/stores/userStore'
import { useToast } from 'vue-toast-notification'
import { useRouter } from 'vue-router'

const router = useRouter()
const toast = useToast()

const categories = ref([])
const newCategory = ref('')
const selectedCategory = ref('')
const images = ref([])
const isLoading = ref(false)

const fetchCategories = () => {
  axios.get(`${baseUrl}/articles/gallery-category/`)
    .then(res => {
      categories.value = res.data.map(cat => {
        return { title: cat.name, value: cat.id }
      })
    }).catch(err => {
      console.error('Error fetching categories:', err.response.data)
    })
}

const handleSubmit = () => {
  isLoading.value = true

  const formData = new FormData()

  if (newCategory.value) {
    formData.append('new_category', newCategory.value)
  } else if (selectedCategory.value) {
    formData.append('category', selectedCategory.value)
  } else {
    // Handle error or validation for category selection
    toast.error('Please select or enter a category')
    isLoading.value = false
    
    return
  }

  images.value.forEach(image => {
    formData.append('images', image)
  })

  axios.post(`${baseUrl}/articles/gallery/`, formData)
    .then(res => {
      toast.success('Upload successful')
      router.push({ path: 'apps/gallery' })
      console.log('Upload successful', res.data)
    })
    .catch(err => {
      toast.error(err.response.data.error)
      console.error('Error uploading images', err.response.data)
    })
    .finally(() => {
      isLoading.value = false
    })
}

const uploadImages = event => {
  images.value = Array.from(event.target.files)
  console.log('Images uploaded:', images.value)
}

onMounted(() => {
  fetchCategories()
})
</script>

<template>
  <VCard
    flat
    class="pa-4"
    title="Upload Images"
  >
    <VForm @submit.prevent="handleSubmit">
      <VRow>
        <VCol>
          <VTextField
            v-model="newCategory"
            label="Image Category (Optional if category exists)"
            placeholder="Input new category"
          />
        </VCol>

        <VCol>
          <VSelect
            v-model="selectedCategory"
            :items="categories"
            label="Select Category"
            item-value="value"
            item-text="title"
          />
        </VCol>

        <VCol cols="12">
          <VFileInput
            v-model="images"
            label="Images"
            accept="image/png, image/jpeg, image/bmp"
            multiple
            required
            @change="uploadImages"
          />
        </VCol>

        <VCol
          cols="12"
          class="d-flex gap-4"
        >
          <VBtn
            type="submit"
            :disabled="isLoading"
          >
            <span v-if="isLoading">Loading...</span>
            <span v-else>Submit</span>
          </VBtn>

          <VBtn
            type="reset"
            color="secondary"
            variant="tonal"
          >
            Reset
          </VBtn>
        </VCol>
      </VRow>
    </VForm>
  </VCard>
</template>
