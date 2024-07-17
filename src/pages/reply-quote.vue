<script setup>
import { baseUrl } from "@/stores/userStore"
import axios from "@axios"
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useToast } from "vue-toast-notification"

const router = useRouter()
const isLoading = ref(false)
const contact = router.currentRoute.value.query.demo
const userMail = router.currentRoute.value.query.mail
const message = ref('')
const subject = ref('')
const contacts = ref({})
const toast = useToast()

const fetchContacts = () => {
  axios
    .get(`${baseUrl}/forms/contact/${contact}`)
    .then(response => {
      contacts.value = response.data
      console.log(response.data)
    })
    .catch(error => {
      console.log(error)
    })
}

const replyContact = () => {
  isLoading.value = true
  axios.post(`${baseUrl}/forms/reply-forms/`, {
    email: userMail,
    subject: subject.value,
    message: message.value,
  }).then(res=>{
    toast.success('Reply sent successfully')
    console.log(res.data)
    router.push({ name: 'apps-quotes' })
  }).catch(err=>{
    console.log(err.data)
    toast.error(err.response.data.error)
  }).finally(()=>{
    isLoading.value = false
  })
}


watchEffect(fetchContacts)
</script>

<template>
  <div>
    <VCol>
      <!-- 👉 Nav -->
      <VCard>
        <VCol>
          <Vcard>
            <VCardTitle>Reply</VCardTitle>
            <VCol cols="12">
              <VTextField
                v-model="subject"
                label="Subject"
              />
            </VCol>
            <VCardText>
              <div>
                <QuillEditor
                  v-model:content="message"
                  theme="snow"
                  content-type="html"
                  style="height: 20rem; border: 1px solid #ddd;"
                  placeholder="Write something..."
                />
              </div>
            </VCardText>
            <div class="d-flex justify-center gap-4 ">
              <VBtn
                color="primary"
                @click="replyContact"
              >
                <span v-if="!isLoading">Reply</span>
                <span v-else>Loading...</span>
              </VBtn>
              <VBtn
                color="error"
                @click="router.push({name: 'apps-quotes'})"
              >
                Close
              </VBtn>
            </div>
          </vcard>
        </VCol>
      </vcard>
    </vcol>
  </div>
</template>
