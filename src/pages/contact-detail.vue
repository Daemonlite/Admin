<script setup>
import { baseUrl, contactEndpoints } from "@/stores/userStore"
import axios from "@axios"
import { ref } from "vue"
import { useRouter } from "vue-router"
import { replyForm } from '@/stores/mailStore'

const router = useRouter()
const showForm = ref(false)
const isLoading = ref(false)
const contact = router.currentRoute.value.query.contact
const site = router.currentRoute.value.query.site
const userMail = router.currentRoute.value.query.mail

console.log(site)

const contacts = ref({})
const message = ref('')
const subject = ref('')


const fetchContacts = () => {
  const endpointC = site

  let endpoint

  if (endpointC === 'auditvisionai') {
    endpoint = contactEndpoints.auditvisionai
  } else if(endpointC === 'isevolutionsconsult'){
    endpoint = contactEndpoints.isevolutionsconsult
  }

  console.log(endpoint)


  axios
    .get(`${baseUrl}${endpoint}/${contact}`)
    .then(response => {
      contacts.value = response.data
      console.log(response.data)
    })
    .catch(error => {
      console.log(error)
    })
}

const replyContact = () => {
  console.log('replying')
  replyForm(userMail, subject.value, message.value)
  showForm.value = false
}

watchEffect(fetchContacts)
</script>

<template>
  <div>
    <VCol>
      <!-- 👉 Nav -->
      <VCard>
        <VCardTitle>{{ contacts.name }}</VCardTitle>
        <VCardText>{{ contacts.email }}</VCardText>
        <VCardText>
          {{ contacts.message }}
        </VCardText>
        <div class="d-flex justify-end">
          <VCardText>{{ contacts.created_at }}</VCardText>
          <VBtn
            color="error"
            style="margin: 10px"
            @click="router.push({name:'apps-contact'})"
          >
            Close
          </VBtn>
          <VBtn
            color="primary"
            style="margin: 10px"
            @click="showForm = !showForm"
          >
            Reply
          </VBtn>
        </div>
      </VCard>
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
