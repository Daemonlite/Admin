<script setup>
import { baseUrl } from "@/stores/userStore"
import axios from '@axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from "vue-toast-notification"

const router = useRouter()
const toast = useToast()
const id = router.currentRoute.value.query.training

const courseName = ref('')
const organizationName = ref('')
const start_date = ref('')
const end_date = ref('')
const checkbox = ref(false)
const isLoading = ref(false)

axios.get(`${baseUrl}/forms/courses/${id}/`).then(res => {
  courseName.value = res.data.name
  organizationName.value = res.data.organization_name
  start_date.value = res.data.start_date
  end_date.value = res.data.end_date
}).catch(err => {
  console.log(err)
})

function handleSubmit() {
  isLoading.value = true
  axios.patch(`${baseUrl}/forms/courses/${id}/`, {
    name: courseName.value,
    organization_name: organizationName.value,
    start_date: start_date.value,
    end_date: end_date.value,
  }).then(res => {
    console.log(res.data)
    toast.success('Course updated')
    router.push({ name: 'apps-trainings' })
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
    title="Update Training"
  >
    <VForm @submit.prevent="handleSubmit">
      <VRow>
        <VCol cols="12">
          <VTextField
            v-model="courseName"
            label="Course Name"
            placeholder="Course Name"
          />
        </VCol>

        <VCol cols="12">
          <VTextField
            v-model="organizationName"
            label="Organization Name"
            type="text"
            placeholder="Organization Name"
          />
        </VCol>

        <VCol cols="12">
          <AppDateTimePicker
            v-model="start_date"
            label="Start Date"
          />
        </VCol>

        <VCol cols="12">
          <AppDateTimePicker
            v-model="end_date"
            label="End Date"
          />
        </VCol>

        <VCol
          cols="12"
          class="d-flex gap-4"
        >
          <VBtn type="submit">
            <span v-if="isLoading">Loading...</span>
            <span v-else>Update</span>
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


