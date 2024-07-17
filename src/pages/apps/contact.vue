<script setup>
import { baseUrl, contactEndpoints } from "@/stores/userStore"
import axios from '@axios'
import { ref, watch } from "vue"
import { VDataTableServer } from 'vuetify/labs/VDataTable'

const searchQuery = ref('')
const selectedSite = ref('isevolutionsconsult')

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
    title: 'Name',
    key: 'name',
  },
  {
    title: 'EMAIL',
    key: 'email',
  },
  {
    title: 'Site',
    key: 'site',
  },
  {
    title: 'Created At',
    key: 'created_at',
  },
  {
    title: 'ACTION',
    key: 'actions',
    sortable: false,
  },
]


const fetchContacts = endpointC => {
  if (!selectedSite.value) return

  let endpoint

  if (endpointC === 'auditvisionai') {
    endpoint = contactEndpoints.auditvisionai
  } else if(endpointC === 'isevolutionsconsult'){
    endpoint = contactEndpoints.isevolutionsconsult
  }

  console.log(endpoint)

  console.log(`selected site: ${selectedSite.value}`)

  axios
    .get(`${baseUrl}${endpoint}`)
    .then(response => {
      users.value = response.data
      totalUsers.value = response.data.length
      console.log(response.data)
    })
    .catch(error => {
      console.log(error)
    })
}

const deleteUser = (uid, endpointC) => {
  if (!selectedSite.value) return

  let endpoint

  if (endpointC === 'auditvisionai') {
    endpoint = contactEndpoints.auditvisionai
  } else if(endpointC === 'isevolutionsconsult'){
    endpoint = contactEndpoints.isevolutionsconsult
  }

  axios
    .delete(`${baseUrl}${endpoint}/${uid}`)
    .then(response => {
      fetchContacts()
    })
    .catch(error => {
      console.log(error)
    })
}


onMounted(()=>{
  fetchContacts('isevolutionsconsult')
})
watch(selectedSite, fetchContacts)

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
        <VSelect
          v-model="selectedSite"
          label="Select Site"
          :items="roles"
          clear-icon="mdi-close"
          @change="fetchContacts(selectedSite)"
        />

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
                <VListItem :to="{ name: 'contact-detail', query: { contact: item.raw.uid, site: selectedSite,mail:item.raw.email } }">
                  <template #prepend>
                    <VIcon icon="mdi-eye-outline" />
                  </template>
                  <VListItemTitle>View</VListItemTitle>
                </VListItem>

                <VListItem @click="deleteUser(item.raw.uid,selectedSite)">
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
