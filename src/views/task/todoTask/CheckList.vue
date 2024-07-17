<script setup>
import ChecklistDetails from "@/views/task/todoTask/CheckListDetails.vue";
// import { useChecklistStore } from "@/views/task/useCheckList";
import { VDataTable } from "vuetify/labs/VDataTable";
// const checklistStore = useChecklistStore()
import { avatarText } from '@/@core/utils/formatters';

const checklists = [
    {
        "task": "Task 1",
        "status": "In Progress",
        "is_done": false,
        "assignees": ["Bob Williams", "Eva Davis"],
        "assigned_by": "Manager B",
        "group_name": "Work",
        "due_date": "12-04-2024",
        "project": { "id": 2, "name": "Project B" },
        "comments": [
            {
                user: { id: 3, name: "Bob Williams" },
                text: "Checking in on the progress.",
                parent_comment: null,
            },
            {
                user: { id: 4, name: "Eva Davis" },
                text: "Encountered an issue. Need assistance.",
                parent_comment: null,
            },
            {
                user: { id: 3, name: "Bob Williams" },
                text: "I'll take a look and help you out.",
                parent_comment: 4, // Reply to the second comment
            },
        ],
    },
    {
        "task": "Task 2",
        "status": "Completed",
        "is_done": true,
        "assignees": ["Alice Johnson", "John Doe"],
        "assigned_by": "Manager C",
        "group_name": "Personal",
        "due_date": "12-04-2024",
        "project": { "id": 1, "name": "Project A" },
        "comments": [
            {
                user: { id: 1, name: "John Doe" },
                text: "Task completed successfully.",
                parent_comment: null,
            },
        ],
    },
    {
        "task": "Task 3",
        "status": "To Do",
        "is_done": false,
        "assignees": ["Jane Smith", "Bob Williams"],
        "assigned_by": "Manager A",
        "group_name": "Work",
        "due_date": "12-04-2024",
        "project": { "id": 3, "name": "Project C" },
        "comments": [
            {
                user: { id: 2, name: "Jane Smith" },
                text: "Start planning for the task.",
                parent_comment: null,
            },
        ],
    },
    {
        "task": "Task 4",
        "status": "In Progress",
        "is_done": false,
        "assignees": ["Alice Smith", "John Doe"],
        "assigned_by": "Manager B",
        "group_name": "Work",
        "due_date": "12-04-2024",
        "project": { "id": 2, "name": "Project B" },
        "comments": [
            {
                user: { id: 4, name: "Alice Smith" },
                text: "Working on the coding part.",
                parent_comment: null,
            },
        ],
    },
    {
        "task": "Task 5",
        "status": "To Do",
        "is_done": false,
        "assignees": ["Eva Davis", "Jane Smith"],
        "assigned_by": "Manager A",
        "group_name": "Personal",
        "due_date": "12-04-2024",
        "project": { "id": 1, "name": "Project A" },
        "comments": [
            {
                user: { id: 3, name: "Eva Davis" },
                text: "Need more information before starting.",
                parent_comment: null,
            },
        ],
    },
]


const headers = [
    {
        title: 'TASK',
        key: 'task',
    },
    {
        title: 'DUE DATE',
        key: 'due_date',
    },
    {
        title: 'STATUS',
        key: 'status',
    },
    {
        title: 'ACTIONS',
        key: 'actions',
    },
]

const groupBy = [{ key: 'group_name' }]
const selectedChecklist = ref({})

const rowClick = (item, row) => {
    console.log(row.item)
    checklists.Checklist = row.item

    console.log(checklist)
}

const resolveStatusVariant = status => {
    if (status === 'To Do')
        return { color: 'primary' }
    else if (status === 'Completed')
        return { color: 'success' }
    else if (status === 'In Progress ')
        return { color: 'warning' }
    else
        return { color: 'info' }
}
</script>

<template>
    <section>
        <VRow no-gutters>
            <VCol cols="12" md="8">
                <VRow>
                    <VCol cols="12" md="12">
                        <VDataTable :headers="headers" :items="checklists" :items-per-page="10" :group-by="groupBy"
                            @click:row="rowClick">
                            <template #group.header="group">
                                <td colspan="3">
                                    {{ group.key }}
                                </td>
                            </template>

                            <!-- full name -->
                            <template #item.full_name="{ item }">
                                <div class="d-flex align-center">
                                    <VAvatar size="32" :color="item.raw.avatar ? '' : 'primary'"
                                        :class="item.raw.avatar ? '' : 'v-avatar-light-bg primary--text'"
                                        :variant="!item.raw.avatar ? 'tonal' : undefined">
                                        <VImg v-if="item.raw.avatar" :src="item.raw.avatar" />
                                        <span v-else>{{ avatarText(item.raw.full_name) }}</span>
                                    </VAvatar>
                                    <div class="d-flex flex-column ms-3">
                                        <span class="d-block font-weight-medium text-high-emphasis text-truncate">{{
                                            item.raw.full_name }}</span>
                                        <small>{{ item.raw.post }}</small>
                                    </div>
                                </div>
                            </template>

                            <template #item.status="{ item }">
                                <VChip :color="resolveStatusVariant(item.raw.status).color" size="small"
                                    class="font-weight-medium">
                                    {{ item.raw.status }}
                                </VChip>
                            </template>

                            <template #item.actions="{ item }">
                                <div class="d-flex gap-1">
                                    <IconBtn @click="editItem(item.raw)">
                                        <VIcon icon="mdi-pencil-outline" color="success" />
                                    </IconBtn>
                                    <IconBtn @click="deleteItem(item.raw)">
                                        <VIcon icon="mdi-delete-outline" color="error" />
                                    </IconBtn>
                                </div>
                            </template>
                        </VDataTable>
                    </VCol>
                </VRow>
            </VCol>



            <VCol cols="12" md="4" lg="4">
                <ChecklistDetails />
            </VCol>
        </VRow>
    </section>
</template>

<style scoped>
.selectedRow {
    background-color: red;
    font-weight: bold;
}
</style>
