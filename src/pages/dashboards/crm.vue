<script setup>
import { baseUrl } from "@/stores/userStore"
import axios from '@axios'
import { ref, watchEffect } from "vue"
import { useRouter } from "vue-router"
import { VDataTableServer } from 'vuetify/labs/VDataTable'

const searchQuery = ref('')
const selectedSite = ref()

const router = useRouter()

const totalUsers = ref(0)
const totalDemos = ref(0)
const users = ref([])
const demos = ref([])

const options = ref({
  page: 1,
  itemsPerPage: 10,
  sortBy: [],
  groupBy: [],
  search: undefined,
})

const options2 = ref({
  page: 1,
  itemsPerPage: 10,
  sortBy: [],
  groupBy: [],
  search: undefined,
})

// Headers
const headers = [
  {
    title: 'Name',
    key: 'name',
  },
  {
    title: 'Organization Name',
    key: 'organization_name',
  },
  {
    title: 'Start Date',
    key: 'start_date',
  },
  {
    title: 'End Date',
    key: 'end_date',
  },

  {
    title: 'Created At',
    key: 'created_at',
  },
]

const headers2 = [
  {
    title: 'Email',
    key: 'email',
  },
  {
    title: 'Phone',
    key: 'phone',
  },
  {
    title: 'Company Name',
    key: 'company_name',
  },
  {
    title: 'Created At',
    key: 'created_at',
  },
  {
    title: 'Country',
    key: 'country',
  },
]



const fetchContacts = () => {
  axios
    .get(`${baseUrl}/forms/courses/`)
    .then(response => {
      const currentDate = new Date()
      const currentMonth = currentDate.getMonth() // 0-based month index
      const currentYear = currentDate.getFullYear()


      const filteredData = response.data.filter(item => {
        const startDate = new Date(item.start_date)

        return startDate.getMonth() === currentMonth && startDate.getFullYear() === currentYear
      })

      users.value = filteredData
      totalUsers.value = filteredData.length
      console.log(filteredData)
    })
    .catch(error => {
      console.log(error)
    })
}

const fetchDemos = () => {
  axios
    .get(`${baseUrl}/ams_forms/demo/`)
    .then(response => {

      const currentDate = new Date()
      const currentMonth = currentDate.getMonth() // 0-based month index
      const currentYear = currentDate.getFullYear()

      const filteredData = response.data.filter(item => {
        const startDate = new Date(item.created_at)

        return startDate.getMonth() === currentMonth && startDate.getFullYear() === currentYear
      })

      demos.value = filteredData
      totalDemos.value = response.data.length
      console.log(response.data)
    })
    .catch(error => {
      console.log(error)
    })

}


const deleteUser = uid => {
  axios
    .delete(`${baseUrl}/forms/courses/${uid}`)
    .then(response => {
      fetchContacts()
    })
    .catch(error => {
      console.log(error)
    })
}

watchEffect(fetchContacts)
watchEffect(fetchDemos)

// 👉 search filters
const roles = [
  {
    title: 'AuditVisionAi',
    value: 'auditvisionai',
  },
  {
    title: 'IsEvolutionsConsult',
    value: 'isevolutionsconsult',
  },

]

const contact = ref(0)
const demo = ref(0)
const partner = ref(0)
const quotes = ref(0)


const fetchFormBreakDown = () => {
  axios.get(`${baseUrl}/forms/forms-breakdown/`)
    .then(res => {
      contact.value = res.data.contact,
      demo.value = res.data.demos,
      partner.value = res.data.partners,
      quotes.value = res.data.quotes
    })
    .catch(err=>console.log(err))
}

const statistics = [
  {
    title: 'Contact Form',
    stats: contact,
    icon: 'mdi-book-open',
    color: 'primary',
  },
  {
    title: 'Quote Form',
    stats: quotes,
    icon: 'mdi-book-outline',
    color: 'success',
  },
  {
    title: 'Ams Partnership Form',
    stats: partner,
    icon: 'mdi-account-group',
    color: 'warning',
  },
  {
    title: 'Ams Demo Requests',
    stats: demo,
    icon: 'mdi-video-outline',
    color: 'info',
  },
]

watchEffect(fetchFormBreakDown)
</script>

<template>
  <VCard title="Form Submissions">
    <VCardText>
      Total breakdown of form submissions on the <strong><a
        href="https://auditvisionai.com/"
        target="_blank"
        rel="noopener noreferrer"
      >AuditVisionAi</a></strong> and <strong><a
        href="https://isevolutionsconsult.com/"
        target="_blank"
        rel="noopener noreferrer"
      >ISEvolusionsconsult</a></strong> websites
    </VCardText>
    <VCardText>
      <VRow>
        <VCol
          v-for="item in statistics"
          :key="item.title"
          cols="6"
          md="3"
        >
          <div class="d-flex align-center">
            <VAvatar
              :color="item.color"
              rounded
              size="40"
              class="elevation-1 me-3"
            >
              <VIcon
                size="24"
                :icon="item.icon"
              />
            </VAvatar>

            <div class="d-flex flex-column">
              <span class="text-caption">
                {{ item.title }}
              </span>
              <span class="text-h6">{{ item.stats }}</span>
            </div>
          </div>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>

  <br>
  <section>
    <VCard>
      <VCardText class="d-flex flex-wrap gap-4">
        <!-- 👉 Export button -->

        <VCardTitle>
          Upcoming Trainings For This Month
        </VCardTitle>


        <VSpacer />
      </VCardText>

      <!-- SECTION data table -->
      <VDataTableServer
        v-model:items-per-page="options.itemsPerPage"
        v-model:page="options.page"
        :items="users"
        :items-length="totalUsers"
        :headers="headers"
        show-select
        class="rounded-0"
        @update:options="options = $event"
      >
        <!-- Actions -->
        <template #item.actions="{ item }">
          <VBtn
            icon
            variant="text"
            size="small"
            color="medium-emphasis"
          >
            <VIcon
              size="24"
              icon="mdi-dots-vertical"
            />

            <VMenu activator="parent">
              <VList>
                <VListItem :to="{ name: 'update-training', query: { training: item.raw.uid } }">
                  <template #prepend>
                    <VIcon icon="mdi-pencil-outline" />
                  </template>
                  <VListItemTitle>Edit</VListItemTitle>
                </VListItem>
                <VListItem @click="deleteUser(item.raw.uid)">
                  <template #prepend>
                    <VIcon icon="mdi-delete-outline" />
                  </template>
                  <VListItemTitle>Delete</VListItemTitle>
                </VListItem>
              </VList>
            </VMenu>
          </VBtn>
        </template>
      </VDataTableServer>
      <!-- SECTION -->
    </VCard>
  </section>
  <br>
  <section>
    <VCard>
      <VCardText class="d-flex flex-wrap gap-4">
        <!-- 👉 Export button -->

        <VCardTitle>
          AMS Demo Request For This Month
        </VCardTitle>


        <VSpacer />
      </VCardText>

      <!-- SECTION data table -->
      <VDataTableServer
        v-model:items-per-page="options.itemsPerPage"
        v-model:page="options2.page"
        :items="demos"
        :items-length="totalDemos"
        :headers="headers2"
        show-select
        class="rounded-0"
        @update:options="options = $event"
      >
        <!-- Actions -->
        <template #item.actions="{ item }">
          <VBtn
            icon
            variant="text"
            size="small"
            color="medium-emphasis"
          >
            <VIcon
              size="24"
              icon="mdi-dots-vertical"
            />

            <VMenu activator="parent">
              <VList>
                <VListItem :to="{ name: 'view-demo', query: { demo: item.raw.uid } }">
                  <template #prepend>
                    <VIcon icon="mdi-pencil-outline" />
                  </template>
                  <VListItemTitle>Reply</VListItemTitle>
                </VListItem>
                <VListItem @click="deleteUser(item.raw.uid)">
                  <template #prepend>
                    <VIcon icon="mdi-delete-outline" />
                  </template>
                  <VListItemTitle>Delete</VListItemTitle>
                </VListItem>
              </VList>
            </VMenu>
          </VBtn>
        </template>
      </VDataTableServer>
      <!-- SECTION -->
    </VCard>
  </section>
</template>
