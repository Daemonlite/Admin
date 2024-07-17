<script setup>
import ChecklistDetails from "@/views/task/todoTask/CheckListDetails.vue";
import { useChecklistStore } from "@/views/task/useCheckListStore";
import { VDataTable } from "vuetify/labs/VDataTable";

const checklistStore = useChecklistStore()

const checklists = [
  {
    "title": "Task 1",
    "status": "In Progress",
    "is_done": false,
    "assignees": ["Bob Williams", "Eva Davis"],
    "assigned_by": "Manager B",
    "group_name": "Work",
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
    "title": "Task 2",
    "status": "Completed",
    "is_done": true,
    "assignees": ["Alice Johnson", "John Doe"],
    "assigned_by": "Manager C",
    "group_name": "Personal",
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
    "title": "Task 3",
    "status": "To Do",
    "is_done": false,
    "assignees": ["Jane Smith", "Bob Williams"],
    "assigned_by": "Manager A",
    "group_name": "Work",
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
    "title": "Task 4",
    "status": "In Progress",
    "is_done": false,
    "assignees": ["Alice Smith", "John Doe"],
    "assigned_by": "Manager B",
    "group_name": "Work",
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
    "title": "Task 5",
    "status": "To Do",
    "is_done": false,
    "assignees": ["Eva Davis", "Jane Smith"],
    "assigned_by": "Manager A",
    "group_name": "Personal",
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
    title: 'Title',
    key: 'title',
  },
  {
    title: 'Due Date',
    key: 'due_date',
  },
  {
    title: 'Assignees',
    key: 'assignees',
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
  checklistStore.setSelectedChecklist = row.item

  console.log(checklistStore.setSelectedChecklist)
}



const resolveStatusVariant = status => {
  if (status === 'Current')
    return { color: 'primary' }
  else if (status === 'Professional')
    return { color: 'success' }
  else if (status === 'Rejected')
    return { color: 'error' }
  else if (status === 'Resigned')
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
            <VDataTable :headers="headers" :items="checklists" :items-per-page="20" item-value="title" :group-by="groupBy"
              class="elevation-1 bordered" @click:row="rowClick">
              <template #group.header="group">
                <td colspan="3">
                  {{ group.key }}
                </td>
              </template>

              <template #item.assignees="{ item }">
                <td v-for="assignee in item.assignees">
                  <VAvatar :size="24" color="grey-lighten-4" text="...">
                    {{ assignee.charAt(0).toUpperCase() }}
                  </VAvatar>
                </td>
              </template>


              <template #item.status="{ item }">
                <VChip :color="resolveStatusVariant(item.status).color" size="small" class="font-weight-medium">
                  {{ item.status }}
                </VChip>
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
