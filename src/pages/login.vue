<script setup>
import { VForm } from "vuetify/components/VForm"
import { useAppAbility } from "@/plugins/casl/useAppAbility"
import axios from "@axios"
import { requiredValidator } from "@validators"

import { baseUrl } from "@/stores/userStore"
import { useRoute, useRouter } from "vue-router"
import { useToast } from "vue-toast-notification"

const isPasswordVisible = ref(false)

const router = useRouter()

const ability = useAppAbility()
const toast = useToast()

const errors = ref({
  username: undefined,
  password: undefined,
})

let refVForm = ref()
let username = ref()
let password = ref("")
let rememberMe = ref(false)
let isLoading = ref(false)

const login = () => {
  isLoading.value = true
  console.log(isLoading)
  axios
    .post(`${baseUrl}/forms/login/`, {
      username: username.value,
      password: password.value,
    })
    .then(r => {
      
      console.log(r.data)

      localStorage.setItem("userAbilities", JSON.stringify(r.data.token))
      let userAbilities = r.data.token
      ability.update(userAbilities)
      localStorage.setItem("userData", JSON.stringify(r.data.token))
      localStorage.setItem("accessToken", JSON.stringify(r.data.token))
      toast.success("Login Successful!")

      // Redirect to `to` query if exist or redirect to index route
      // router.replace(route.query.to ? String(route.query.to) : '/')
      router.push({ path: "dashboards/crm" })
    })
    .catch(e => {
      console.log(e.response.data)
      toast.error(e.response.data.error)
    })
    .finally(() => {
      isLoading.value = false
    })
}
</script>

<template>
  <div>
    <!-- Title and Logo -->


    <VRow
      no-gutters
      class="auth-wrapper"
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
              Welcome to ISE Admin!👋🏻
            </h5>
          </VCardText>
          
          <VCardText>
            <VForm
              ref="refVForm"
              @submit.prevent="login"
            >
              <VRow>
                <!-- username -->
                <VCol cols="12">
                  <VTextField
                    v-model="username"
                    label="username"
                    type="text"
                  />
                </VCol>

                <!-- password -->
                <VCol cols="12">
                  <VTextField
                    v-model="password"
                    label="Password"
                    :rules="[requiredValidator]"
                    :type="isPasswordVisible ? 'text' : 'password'"
                    :error-messages="errors.password"
                    :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                    @click:append-inner="isPasswordVisible = !isPasswordVisible"
                  />

                  <div class="d-flex align-center flex-wrap justify-space-between mt-1 mb-4">
                    <VCheckbox
                      v-model="rememberMe"
                      label="Remember me"
                    />
                    <RouterLink
                      class="text-primary ms-2 mb-1"
                      :to="{ name: 'forgot-password' }"
                    >
                      Forgot Password?
                    </RouterLink>
                  </div>

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
                    <span v-else>Login</span>
                  </VBtn>
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
