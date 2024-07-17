<script setup>
const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
  todo: {
    type: Object,
    required: false,
  },
})

const emit = defineEmits([
  'update:isDialogVisible',

])




const description = ref()
const status = ref()
const createdAt = ref()
const updatedAt = ref()
const creator = ref()
const assignedTo = ref()



const onReset = () => {
  emit('update:isDialogVisible', false)
}
</script>

<template>
  <VDialog width="700" :model-value="props.isDialogVisible" persistent @update:model-value="onReset">
    <!-- Dialog Content -->
    <VCard title="Add Todo">
      <DialogCloseBtn variant="text" size="small" @click="onReset" />

      <VCardText class="mt-1 pt-0">
        <!-- Form -->
        <VForm>
          <VCard>
            <VCardText>
              <VRow>
                <!-- Description -->
                <VCol cols="12" md="12">
                  <VTextField v-model="description" label="Description" placeholder="Description" />
                </VCol>
              </VRow>
              <VRow>

                <!-- Created At -->
                <VCol cols="12" md="6">
                  <AppDateTimePicker v-model="createdAt" label="Created At" />
                </VCol>

                <!-- Creator -->
                <VCol cols="12" md="6">
                  <VTextField v-model="creator" label="Creator" placeholder="Creator" />
                </VCol>

                <!-- Assigned To -->
                <VCol cols="12" md="6">
                  <VTextField v-model="assignedTo" label="Assigned To" placeholder="Assigned To" />
                </VCol>

                <!-- Due Date -->
                <VCol cols="12" md="6">
                  <AppDateTimePicker v-model="dueDate" label="Due Date" />
                </VCol>

                <!-- Status -->
                <VCol cols="12" md="6">
                  <VSelect v-model="status" label="Status" placeholder="Status" />
                </VCol>

                <!-- Updated At -->
                <VCol cols="12" md="6">
                  <AppDateTimePicker v-model="updatedAt" label="Updated At" />
                </VCol>

                <VCol cols="12" class="d-flex gap-4">
                  <VBtn type="submit" variant="outlined" @click="openAddTodoDialog">
                    Add
                  </VBtn>
                </VCol>
              </VRow>
            </VCardText>
          </VCard>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style>
.flatpickr-calendar.open {
  z-index: 20000;
}
</style>
