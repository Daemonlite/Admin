<script setup>
import { baseUrl } from "@/stores/userStore"
import axios from '@axios'
import { ref } from 'vue'
import { useRouter } from "vue-router"
import { useToast } from "vue-toast-notification"

const router = useRouter()
const toast = useToast()

const isLoading = ref(false)

const password = ref('')
const confirmPassword = ref('')

const submit = () => {
  isLoading.value = true
  axios.post(`${baseUrl}/forms/reset-password/`, {
    email: localStorage.getItem('email'),
    password: password.value,
    confirm_password: confirmPassword.value,
  }).then(res => {
    console.log(res.data)
    toast.success(res.data.message)
    router.push({ name: 'login' })
  }).catch(err => {
    console.log(err)
    toast.error(err.response.data.error)
  }).finally(() => {
    isLoading.value = false
  })

}
</script>

<template>
  <div>
    <!-- Title and Logo -->

    <VRow
      class="auth-wrapper"
      no-gutters
    >
      <VCol
        lg="8"
        class="d-none d-lg-flex align-center justify-center position-relative"
      >
        <VImg
          max-width="50rem"
          height="300px"
          src="https://isevolutionsconsult.com/_nuxt/is%20evolution.7bb96d1f.png"
          class="auth-illustration"
          style=""
        />
      </VCol>

      <VCol
        cols="12"
        lg="4"
        class="auth-card-v2 d-flex align-center justify-center"
      >
        <VCard
          flat
          :max-width="500"
          class="mt-12 mt-sm-0 pa-4"
        >
          <VCardText>
            <h5 class="text-h5 mb-1">
              Reset Password? 🔒
            </h5>
          </VCardText>

          <VCardText>
            <VForm @submit.prevent="submit">
              <VRow>
                <!-- email -->
                <VCol cols="12">
                  <VTextField
                    v-model="password"
                    label="password"
                    type="password"
                  />
                </VCol>
                <VCol cols="12">
                  <VTextField
                    v-model="confirmPassword"
                    label="password confirmation"
                    type="password"
                  />
                </VCol>

                <VCol cols="12">
                  <VBtn
                    block
                    type="submit"
                  >
                    <span v-if="isLoading">
                      <VProgressCircular
                        model-value="20"
                        color="primary"
                        indeterminate
                      />
                    </span>
                    <span v-else>Reset Password</span>
                  </VBtn>
                </VCol>

                <!-- back to login -->
                <VCol
                  cols="12"
                  class="text-center"
                >
                  <RouterLink
                    class="text-primary ms-2"
                    :to="{ name: 'login' }"
                  >
                    <VIcon
                      class="flip-in-rtl"
                      icon="mdi-chevron-left"
                    />
                    <span>Back to login</span>
                  </RouterLink>
                </VCol>
              </VRow>
            </VForm>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
  action: read
  subject: Auth
  redirectIfLoggedIn: true
</route>

