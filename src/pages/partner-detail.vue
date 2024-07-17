<script setup>
import { baseUrl } from "@/stores/userStore"
import axios from "@axios"
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useToast } from "vue-toast-notification"

const toast = useToast()
const router = useRouter()
const showForm = ref(false)
const partner = router.currentRoute.value.query.partner
const userMail = router.currentRoute.value.query.mail
const message = ref('')
const subject = ref('')
const contacts = ref({})

const fetchContacts = () => {
  axios
    .get(`${baseUrl}/ams_forms/partners/${partner}`)
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
    router.push({ name: 'apps-partners' })
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
        <VCardTitle>{{ contacts.first_name }} {{ contacts.last_name }}</VCardTitle>
        <VCardText>Company: {{ contacts.company }}</VCardText>
        <VCardText>Email: {{ contacts.email }}</VCardText>
        <VCardText>
          Website URL: <a
            :href="contacts.website"
            target="_blank"
            rel="noopener noreferrer"
          >{{ contacts.website }}</a>
        </VCardText>
        <VCardText>Job Title: {{ contacts.job_title }}</VCardText>
        <VCardText>
          {{ contacts.message }}
        </VCardText>
        <VCardText>
          <div class="d-flex justify-end">
            <VCardText>Submitted At: {{ contacts.created_at }}</VCardText>
            <VBtn
              color="error"
              style="margin: 10px"
              @click="router.push({name:'apps-partners'})"
            >
              Cancel
            </VBtn>
            <VBtn
              color="primary"
              style="margin: 10px"
              @click="showForm = !showForm"
            >
              Reply
            </VBtn>
          </div>
        </VCardText>
      </vcard>
    </VCol>
    <br>
    <br>
    <div>
      <VCol v-if="showForm">
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
                  Reply
                </VBtn>
                <VBtn
                  color="error"
                  @click="showForm = !showForm"
                >
                  Close
                </VBtn>
              </div>
            </vcard>
          </VCol>
        </vcard>
      </vcol>
    </div>
  </div>
</template>
