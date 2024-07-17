<script setup>
import { baseUrl } from '@/stores/userStore'
import axios from '@axios'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const selectedCategory = ref('')
const categories = ref([])

const images = ref([])

const fetchCategories = () => {
  axios.get(`${baseUrl}/articles/gallery-category/`)
    .then(res => {
      categories.value = res.data.map(cat => {
        return { title: cat.name, value: cat.id }
      })
    }).catch(err => {
      console.log(err.response.data)
    })
}

const fetchImages = () => {
  axios.get(`${baseUrl}/articles/gallery`)
    .then(res => {
      images.value = res.data
    }).catch(err => {
      console.log(err.response.data)
    })
}

const filteredImages = computed(() => {
  if (!selectedCategory.value || selectedCategory.value === 'All') {
    return images.value
  }

  return images.value.filter(
    image => image.category === selectedCategory.value,
  )
})

onMounted(() => {
  fetchImages()
  fetchCategories()
})
</script>

<template>
  <VContainer>
    <VRow class="d-flex justify-center">
      <VCol cols="12">
        <VSelect 
          v-model="selectedCategory" 
          :items="categories"
          label="Select Category"
        />
      </VCol>

      <VBtn
        color="primary"
        @click="router.push({ name: 'add-gallery' })"
      >
        Add Images
      </VBtn>
    </VRow>

    <br>

    <VCarousel
      v-if="filteredImages.length > 0"
      cycle
      hide-delimiter-background
    >
      <VCarouselItem
        v-for="(image, index) in filteredImages"
        :key="index"
        :src="image.image"
        class="carousel-item"
      />
    </VCarousel>
    <p v-else>
      No images found for selected category.
    </p>
  </VContainer>
</template>

