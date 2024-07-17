<script setup>
import { baseUrl, formatDate } from '@/stores/userStore'
import axios from '@axios'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const articles = ref([])
const errorMessage = ref('')

const fetchArticles = async () => {
  try {
    const response = await axios.get(`${baseUrl}/articles/article/`)

    articles.value = response.data
    console.log(response.data)
  } catch (error) {
    console.error(error)
    errorMessage.value = 'Failed to fetch articles'
  }
}

const deleteArticle = async id => {
  try {
    await axios.delete(`${baseUrl}/articles/article/${id}/`)
    fetchArticles()
  } catch (error) {
    console.error(error)
    errorMessage.value = 'Failed to delete article'
  }
}

const editArticle = id => {
  router.push({ name: 'update-article', query: { article: id } })
}

onMounted(fetchArticles)
</script>

<template>
  <VCard style="padding: 20px">
    <div class="d-flex justify-space-between">
      <VCardTitle>Articles & Blogs</VCardTitle>
      <VBtn
        color="primary"
        @click="router.push({ name: 'add-article' })"
      >
        Add Article
      </VBtn>
    </div>
    <div
      v-if="errorMessage"
      class="error-message"
    >
      {{ errorMessage }}
    </div>
  </VCard>
  <br>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    <VRow>
      <VCol
        v-for="article in articles"
        :key="article.id"
        cols="12"
        sm="6"
        md="4"
      >
        <VCard class="fixed-width-card">
          <VImg
            :src="article.image"
            height="200"
          />
          
          <div class="d-flex justify-space-around">
            <small>{{ formatDate(article.created_at) }}</small>
            <small>{{ article.author }}</small>
          </div>

          <VCardTitle>{{ article.title }}</VCardTitle>
              
          
          <VCardText
            class="article-description"
            v-html="article.description"
          />
          <br>
          <div class="d-flex justify-center">
            <VCardActions>
              <VBtn
                color="primary"
                variant="outlined"
                @click="editArticle(article.uid)"
              >
                Edit
              </VBtn>
            </VCardActions>
            <VCardActions>
              <VBtn
                color="error"
                variant="outlined"
                @click="deleteArticle(article.uid)"
              >
                Delete
              </VBtn>
            </VCardActions>
          </div>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<style scoped>
.fixed-width-card {
  width: 300px; /* Set a fixed width for the card */
}

.article-description {
  max-height: 120px; 
  overflow-y: auto;
}

.error-message {
  color: red;
  font-weight: bold;
}
</style>
