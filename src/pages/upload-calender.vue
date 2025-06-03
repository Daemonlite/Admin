<script setup>
import { baseUrl } from '@/stores/userStore'
import axios from '@axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'

const toast = useToast()
const isLoading = ref(false)
const router = useRouter()
const file = ref(null)

console.log(file.value)

const uploadFile = event => {
  console.log("uploading...")
  console.log(event.target.files)
  file.value = event.target.files[0]
}

const submitFile = () => {
  isLoading.value = true
  if (file.value) {
    const formData = new FormData()

    formData.append('calender', file.value)
    axios.post(`${baseUrl}/forms/training-calender/`, formData).then(res => {
      console.log(res.data)
      toast.success('File uploaded successfully')
      router.push({ name: 'apps-trainings' })
    }).catch(err => {
      console.log(err)
      toast.error('Failed to upload file')
    }).finally(() => {
      isLoading.value = false
    })
  }else{
    toast.error('Please select file')
    isLoading.value = false
  }
}
</script>

<template>
  <section>
    <VCard
      title="Upload Training Calendar"
      subtitle="Kindly ensure that file name is TrainingCalender.pdf"
    >
      <VForm @submit.prevent="submitFile">
        <VFileInput
          v-model="file"
          label="Upload File"
          class="mb-14 mt-2"
          @change="uploadFile"
        />

        <VBtn
          color="primary"
          type="submit"
          class="mx-auto d-block mb-4"
          :disabled="isLoading"
        >
          <span v-if="!isLoading">Submit Calendar</span>
          <span v-else>Loading...</span>
        </VBtn>
      </VForm>
    </VCard>
  </section>
</template>
