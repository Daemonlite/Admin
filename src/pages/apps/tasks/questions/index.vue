<script setup>
import FormQuestion from '@/views/apps/tasks/questions/FormQuestion.vue';
import { useUserListStore } from '@/views/apps/user/useUserListStore';
import CheckList from '@/views/task/todoTask/CheckList.vue';



const userListStore = useUserListStore()
const route = useRoute()
const userData = ref()
const userTab = ref(null)

const tabs = [
  {
    icon: 'mdi-account-outline',
    title: 'Questions',
  },
  {
    icon: 'mdi-lock-outline',
    title: 'Responses',
  },
]

userListStore.fetchUser(Number(route.params.id)).then(response => {
  userData.value = response.data
})
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VTabs v-model="userTab" class="v-tabs-pill">
        <VTab v-for="tab in tabs" :key="tab.icon">
          <VIcon start :icon="tab.icon" />
          <span>{{ tab.title }}</span>
        </VTab>
      </VTabs>

      <VWindow v-model="userTab" class="mt-6 disable-tab-transition" :touch="false">
        <VWindowItem>
          <FormQuestion />
        </VWindowItem>

        <VWindowItem>
          <CheckList />
        </VWindowItem>
      </VWindow>
    </VCol>
  </VRow>
</template>
