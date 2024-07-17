<script setup>
import { baseUrl } from '@/stores/userStore'
import axios from '@axios'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'

const router = useRouter()
const toast = useToast()
const isLoading = ref(false)

const author = ref('')
const title = ref('')
const category = ref('')
const description = ref('')
const email = ref('')
const body = ref('')
const image = ref('')

const categories = ref([])
const id = router.currentRoute.value.query.article
console.log(id)

const fetchArticles = async () => {
  try {
    const response = await axios.get(`${baseUrl}/articles/article/${id}/`)

    author.value = response.data.author
    title.value = response.data.title
    category.value = response.data.category.id
    description.value = response.data.description
    email.value = response.data.email
    body.value = response.data.body
    console.log(body.value)
    console.log(response.data)
  } catch (error) {
    console.error(error)
    errorMessage.value = 'Failed to fetch articles'
  }
}

const getCategories = () => {
  axios.get(`${baseUrl}/articles/category/`).then(res => {
    console.log(res.data)
    categories.value = res.data.map(cat=>{
      return { title: cat.name, value: cat.id }
    })
  }).catch(err => {
    console.log(err)
  })
}

const uploadImage = event => {
  image.value = event.target.files[0]
}

const addArticle = () => {
  isLoading.value = true

  const formData = new FormData()

  formData.append('author', author.value)
  formData.append('title', title.value)
  formData.append('category', category.value)
  formData.append('description', description.value)
  formData.append('email', email.value)
  formData.append('body', body.value)
  
  if(image.value){
    console.log('image')
    formData.append('image', image.value)
  }
  axios.patch(`${baseUrl}/articles/article/${id}/`, formData).then(res => {
    console.log(res.data)
    toast.success('Article Added Successfully')
    router.push({ name: 'apps-articles' })
  }).catch(err => {
    console.log(err)
    toast.error(err.response.data.error)
  }).finally(() => {
    isLoading.value = false
  })
}


watchEffect(getCategories)
onMounted(fetchArticles)
</script>

<template>
  <section>
    <VCard
      flat
      class="pa-8"
    >
      <VForm @submit.prevent="addArticle">
        <VRow>
          <!-- 👉 First Name -->
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="author"
              label="Author"
              placeholder="Author"
              required
            />
          </VCol>

          <!-- 👉 Email -->
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="email"
              label="Author Email"
              placeholder="Email"
              required
            />
          </VCol>

          <!-- 👉 title -->
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="title"
              label="Article title"
              placeholder="Title"
              required
            />
          </VCol>

          <!-- 👉 category -->
          <VCol
            cols="12"
            md="6"
          >
            <VSelect
              v-model="category"
              :items="categories"
              label="Category"
              placeholder="Category"
              required
            />
          </VCol>

          <!-- 👉 description -->
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="description"
              v-html="description"
              label="description"
              placeholder="description"
              required
            />
          </VCol>

          <VCol
            cols="12"
            md="6"
          >
            <VFileInput
              v-model="image"
              label="Image"
              accept="image/png, image/jpeg, image/bmp"
              required
              @change="uploadImage"
            />
          </VCol>
        </VRow>
        <br>
        <div>
          <QuillEditor
            v-model:content="body"
            theme="snow"
            content-type="html"
            style="height: 25rem; border: 1px solid #ddd;"
            placeholder="Write something..."
          />
        </div>


        <VCol
          cols="12"
          class="d-flex gap-4"
        >
          <VBtn type="submit">
            <span v-if="isLoading">
              <VProgressCircular indeterminate />
            </span>
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
      </VForm>  
    </VCard>  
  </section>
</template>
