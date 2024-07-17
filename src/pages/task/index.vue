<script setup>
import Checklist from '@/views/task/todoTask/CheckList.vue';

const activeTab = ref('checklists')

const tabs = [
    {
        title: 'Checklists',
        tab: 'checklists',
    },
    {
        title: 'Todos',
        tab: 'todos',
    },
    {
        title: 'Questionnaires',
        tab: 'questionnaires',
    },

]


onMounted(() => console.log('hello world'))
</script>

<template>
    <section class="tw-min-h-screen bg-var-theme-background">
        <VRow>
            <VCol cols="12" md="6">
                <span class=" tw-font-bold text-h4 ">Tasks</span>
            </VCol>
        </VRow>
        <VTabs v-model="activeTab" class="tw-w-full border-b mb-2 mt-4">
            <VTab v-for="item in tabs" :key="item.icon" :value="item.tab"
                :to="{ name: 'tasks-tab', params: { tab: item.tab } }">
                {{ item.title }}
            </VTab>
        </VTabs>

        <VWindow v-model="activeTab" class="mt-4 disable-tab-transition" :touch="false">
            <VWindowItem value="checklists">
                <Checklist />
            </VWindowItem>
        </VWindow>
    </section>
</template>
