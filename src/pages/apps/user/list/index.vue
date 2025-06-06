<script setup>
import { paginationMeta } from '@/@fake-db/utils'
import AddNewUserDrawer from '@/views/apps/user/list/AddNewUserDrawer.vue'
import { useUserListStore } from '@/views/apps/user/useUserListStore'
import { avatarText } from '@core/utils/formatters'
import { VDataTableServer } from 'vuetify/labs/VDataTable'

const userListStore = useUserListStore()
const searchQuery = ref('')
const selectedRole = ref()
const selectedPlan = ref()
const selectedStatus = ref()
const totalPage = ref(1)
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
    title: 'USER',
    key: 'user',
  },
  {
    title: 'EMAIL',
    key: 'email',
  },
  {
    title: 'ROLE',
    key: 'role',
  },
  {
    title: 'PLAN',
    key: 'plan',
  },
  {
    title: 'STATUS',
    key: 'status',
  },
  {
    title: 'ACTION',
    key: 'actions',
    sortable: false,
  },
]

// 👉 Fetching users
const fetchUsers = () => {
  userListStore.fetchUsers({
    q: searchQuery.value,
    status: selectedStatus.value,
    plan: selectedPlan.value,
    role: selectedRole.value,
    options: options.value,
  }).then(response => {
    users.value = response.data.users
    totalPage.value = response.data.totalPage
    totalUsers.value = response.data.totalUsers
    options.value.page = response.data.page
  }).catch(error => {
    console.error(error)
  })
}

watchEffect(fetchUsers)

// 👉 search filters
const roles = [
  {
    title: 'Admin',
    value: 'admin',
  },
  {
    title: 'Author',
    value: 'author',
  },
  {
    title: 'Manager',
    value: 'manager',
  },
  {
    title: 'Management',
    value: 'management',
  },
  {
    title: 'Audit Lead',
    value: 'audi_lead',
  },
  {
    title: 'Business',
    value: 'business',
  },
  {
    title: 'Senior Manager',
    value: 'senior_manager',
  },
  {
    title: 'Cheif Executive Officer',
    value: 'chief_audit_executive',
  },
]

const plans = [
  {
    title: 'Basic',
    value: 'basic',
  },
  {
    title: 'Company',
    value: 'company',
  },
  {
    title: 'Enterprise',
    value: 'enterprise',
  },
  {
    title: 'Team',
    value: 'team',
  },
]

const status = [
  {
    title: 'Pending',
    value: 'pending',
  },
  {
    title: 'Active',
    value: 'active',
  },
  {
    title: 'Inactive',
    value: 'inactive',
  },
]

const resolveUserRoleVariant = role => {
  const roleLowerCase = role.toLowerCase()
  if (roleLowerCase === 'subscriber')
    return {
      color: 'primary',
      icon: 'mdi-account-outline',
    }
  if (roleLowerCase === 'author')
    return {
      color: 'warning',
      icon: 'mdi-cog-outline',
    }
  if (roleLowerCase === 'maintainer')
    return {
      color: 'success',
      icon: 'mdi-chart-donut',
    }
  if (roleLowerCase === 'editor')
    return {
      color: 'info',
      icon: 'mdi-pencil-outline',
    }
  if (roleLowerCase === 'admin')
    return {
      color: 'error',
      icon: 'mdi-laptop',
    }

  return {
    color: 'primary',
    icon: 'mdi-account-outline',
  }
}

const resolveUserStatusVariant = stat => {
  const statLowerCase = stat.toLowerCase()
  if (statLowerCase === 'pending')
    return 'warning'
  if (statLowerCase === 'active')
    return 'success'
  if (statLowerCase === 'inactive')
    return 'secondary'

  return 'primary'
}

const isAddNewUserDrawerVisible = ref(false)

const addNewUser = userData => {
  userListStore.addUser(userData)

  // refetch User
  fetchUsers()
}

const deleteUser = id => {
  userListStore.deleteUser(id)

  // refetch User
  fetchUsers()
}
</script>

<template>
  <section>
    <VCard title="Filters" class="mb-6">
      <VCardText>
        <VRow>
          <!-- 👉 Select Role -->
          <VCol cols="12" sm="4">
            <VSelect v-model="selectedRole" label="Select Role" :items="roles" clearable clear-icon="mdi-close" />
          </VCol>

          <!-- 👉 Select Plan -->
          <VCol cols="12" sm="4">
            <VSelect v-model="selectedPlan" label="Select Plan" :items="plans" clearable clear-icon="mdi-close" />
          </VCol>

          <!-- 👉 Select Status -->
          <VCol cols="12" sm="4">
            <VSelect v-model="selectedStatus" label="Select Status" :items="status" clearable clear-icon="mdi-close" />
          </VCol>
        </VRow>
      </VCardText>
    </VCard>

    <VCard>
      <VCardText class="d-flex flex-wrap gap-4">
        <!-- 👉 Export button -->
        <VBtn variant="outlined" color="secondary" prepend-icon="mdi-tray-arrow-up">
          Export
        </VBtn>

        <VSpacer />

        <div class="app-user-search-filter d-flex align-center gap-6">
          <!-- 👉 Search  -->
          <VTextField v-model="searchQuery" placeholder="Search User" density="compact" />

          <!-- 👉 Add user button -->
          <VBtn @click="isAddNewUserDrawerVisible = true">
            Add User
          </VBtn>
        </div>
      </VCardText>

      <!-- SECTION data table -->
      <VDataTableServer v-model:items-per-page="options.itemsPerPage" v-model:page="options.page" :items="users"
        :items-length="totalUsers" :headers="headers" show-select class="rounded-0" @update:options="options = $event">
        <!-- User -->
        <template #item.user="{ item }">
          <div class="d-flex">
            <VAvatar size="34" :variant="!item.raw.avatar ? 'tonal' : undefined"
              :color="!item.raw.avatar ? resolveUserRoleVariant(item.raw.role).color : undefined" class="me-3">
              <VImg v-if="item.raw.avatar" :src="item.raw.avatar" />
              <span v-else>{{ avatarText(item.raw.fullName) }}</span>
            </VAvatar>

            <div class="d-flex flex-column">
              <h6 class="text-sm">
                <RouterLink :to="{ name: 'apps-user-view-id', params: { id: item.raw.id } }"
                  class="font-weight-medium user-list-name">
                  {{ item.raw.fullName }}
                </RouterLink>
              </h6>

              <span class="text-xs text-medium-emphasis">@{{ item.raw.username }}</span>
            </div>
          </div>
        </template>

        <!-- Email -->
        <template #item.email="{ item }">
          <span class="text-sm">
            {{ item.raw.email }}
          </span>
        </template>

        <!-- Role -->
        <template #item.role="{ item }">
          <div class="d-flex gap-2">
            <VIcon :icon="resolveUserRoleVariant(item.raw.role).icon"
              :color="resolveUserRoleVariant(item.raw.role).color" />
            <span class="text-capitalize">{{ item.raw.role }}</span>
          </div>
        </template>

        <!-- Plan -->
        <template #item.plan="{ item }">
          <span class="text-capitalize text-high-emphasis">{{ item.raw.currentPlan }}</span>
        </template>

        <!-- Status -->
        <template #item.status="{ item }">
          <VChip :color="resolveUserStatusVariant(item.raw.status)" density="comfortable" class="text-capitalize">
            {{ item.raw.status }}
          </VChip>
        </template>

        <!-- Actions -->
        <template #item.actions="{ item }">
          <VBtn icon variant="text" size="small" color="medium-emphasis">
            <VIcon size="24" icon="mdi-dots-vertical" />

            <VMenu activator="parent">
              <VList>
                <VListItem :to="{ name: 'apps-user-view-id', params: { id: item.raw.id } }">
                  <template #prepend>
                    <VIcon icon="mdi-eye-outline" />
                  </template>
                  <VListItemTitle>View</VListItemTitle>
                </VListItem>

                <VListItem link>
                  <template #prepend>
                    <VIcon icon="mdi-pencil-outline" />
                  </template>
                  <VListItemTitle>Edit</VListItemTitle>
                </VListItem>

                <VListItem @click="deleteUser(item.raw.id)">
                  <template #prepend>
                    <VIcon icon="mdi-delete-outline" />
                  </template>
                  <VListItemTitle>Delete</VListItemTitle>
                </VListItem>
              </VList>
            </VMenu>
          </VBtn>
        </template>

        <!-- Pagination -->
        <template #bottom>
          <VDivider />

          <div class="d-flex justify-end gap-x-6 pa-2 flex-wrap">
            <div class="d-flex align-center gap-x-2 text-sm">
              Rows Per Page:
              <VSelect v-model="options.itemsPerPage" class="per-page-select text-high-emphasis" variant="plain"
                density="compact" :items="[10, 20, 25, 50, 100]" />
            </div>

            <span class="d-flex align-center text-sm me-2 text-high-emphasis">{{ paginationMeta(options, totalUsers)
            }}</span>

            <div class="d-flex gap-x-2 align-center me-2">
              <VBtn icon="mdi-chevron-left" class="flip-in-rtl" variant="text" density="comfortable" color="default"
                :disabled="options.page <= 1" @click="options.page <= 1 ? options.page = 1 : options.page--" />

              <VBtn icon="mdi-chevron-right" class="flip-in-rtl" density="comfortable" variant="text" color="default"
                :disabled="options.page >= Math.ceil(totalUsers / options.itemsPerPage)"
                @click="options.page >= Math.ceil(totalUsers / options.itemsPerPage) ? options.page = Math.ceil(totalUsers / options.itemsPerPage) : options.page++" />
            </div>
          </div>
        </template>
      </VDataTableServer>
      <!-- SECTION -->
    </VCard>

    <!-- 👉 Add New User -->
    <AddNewUserDrawer v-model:isDrawerOpen="isAddNewUserDrawerVisible" @user-data="addNewUser" />
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
