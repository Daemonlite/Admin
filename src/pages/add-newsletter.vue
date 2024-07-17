<script setup>
import { baseUrl } from "@/stores/userStore"
import axios from '@axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from "vue-toast-notification"

const router = useRouter()
const toast = useToast()

const title = ref('')
const body = ref('')
const start_date = ref('')
const end_date = ref('')
const checkbox = ref(false)
const isLoading = ref(false)

function handleSubmit() {
  isLoading.value = true
  axios.post(`${baseUrl}/forms/newsletter/`, {
    title: title.value,
    body: body.value,

  }).then(res => {
    console.log(res.data)
    toast.success('NewsLetter Added')
    router.push({ name: 'apps-newsLetter' })
  }).catch(err => {
    console.log(err)
    toast.error(err.response.data.error)
  }).finally(() => {
    isLoading.value = false
  })
}
</script>

<template>
  <VCard
    flat
    class="pa-4"
    title="Add Newsletter"
  >
    <VForm @submit.prevent="handleSubmit">
      <VRow>
        <VCol cols="12">
          <VTextField
            v-model="title"
            label="NewsLetter Title"
            placeholder="Title"
          />
        </VCol>

        <VCardText>
          <div>
            <QuillEditor
              v-model:content="body"
              theme="snow"
              content-type="html"
              style="height: 20rem; border: 1px solid #ddd;"
              placeholder="Write something..."
            />
          </div>
        </VCardText>

        <VCol
          cols="12"
          class="d-flex gap-4"
        >
          <VBtn type="submit">
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
