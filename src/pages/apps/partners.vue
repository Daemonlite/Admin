<script setup>
import { baseUrl } from "@/stores/userStore"
import axios from '@axios'
import { ref } from "vue"
import { useRouter } from "vue-router"
import { VDataTableServer } from 'vuetify/labs/VDataTable'

const searchQuery = ref('')
const selectedSite = ref()

const router = useRouter()

// const selectedPlan = ref()
// const selectedStatus = ref()
// const totalPage = ref(1)
const totalUsers = ref(0)
const users = ref([])

const options = ref({
  page: 1,
  itemsPerPage: 10,
  sortBy: [],
  groupBy: [],
  search: undefined,
})

// Headers
const headers = [
  {
    title: 'First Name',
    key: 'first_name',
  },
  {
    title: 'Last Name',
    key: 'last_name',
  },
  {
    title: 'Company Name',
    key: 'company',
  },
  {
    title: 'Job Title',
    key: 'job_title',
  },
  {
    title: 'Email',
    key: 'email',

  },

  {
    title: 'Phone',
    key: 'phone',
  },


  {
    title: 'ACTION',
    key: 'actions',
    sortable: false,
  },
]


const fetchContacts = () => {
  axios
    .get(`${baseUrl}/ams_forms/partners/`)
    .then(response => {
      users.value = response.data
      totalUsers.value = response.data.length
      console.log(response.data)
    })
    .catch(error => {
      console.log(error)
    })
  
}

const deleteUser = uid => {
  axios
    .delete(`${baseUrl}/ams_forms/partners/${uid}`)
    .then(response => {
      fetchContacts()
    })
    .catch(error => {
      console.log(error)
    })
}

watchEffect(fetchContacts)

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
</script>

<template>
  <section>
    <VCard>
      <VCardText class="d-flex flex-wrap gap-4">
        <!-- 👉 Export button -->
    
        <VCardTitle>
          AMS Partnership Form Submissions
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
                <VListItem :to="{ name: 'partner-detail', query: { partner : item.raw.uid,mail:item.raw.email } }">
                  <template #prepend>
                    <VIcon icon="mdi-eye-outline" />
                  </template>
                  <VListItemTitle>View</VListItemTitle>
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

<style lang="scss">
.app-user-search-filter {
  inline-size: 24.0625rem;
}

.text-capitalize {
  text-transform: capitalize;
}

.user-list-name:not(:hover) {
  color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity));
}
</style>
