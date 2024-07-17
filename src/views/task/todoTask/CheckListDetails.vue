<script setup>
// import { useChecklistStore } from "@/views/task/useCheckList";


// const checklistStore = useChecklistStore()
// const { checklist } = storeToRefs(checklistStore)


const resolveStatusVariant = stat => {
    if (stat === 'In Progress')
        return 'warning'
    if (stat === 'Completed')
        return 'success'
    if (stat === 'To Do')
        return 'secondary'

    return 'primary'
}

</script>

<template>
    <VCard flat border elevation="0" rounded="0">
        <VCardText>
            <VRow>
                <!-- SECTION User Details -->
                <VCol cols="12">
                    <VCard>
                        <VCardText class="text-center pt-15">
                            <p>Avatar</p>
                        </VCardText>

                        <!-- 👉 Details -->
                        <VCardText>
                            <h6 class="text-h6">
                                Details
                            </h6>

                            <VDivider class="my-4" />

                            <!-- 👉 User Details list -->
                            <VList class="card-list">
                                <VListItem>
                                    <VListItemTitle>
                                        <div class="d-flex my-4 gap-x-2">
                                            <p class="text-sm font-weight-medium">
                                                DUE DATE:
                                            </p>
                                            <p class="text-sm font-weight-medium">
                                                <VDatePicker v-model="value" :landscape="true" :reactive="true">
                                                </VDatePicker>
                                            </p>
                                        </div>
                                    </VListItemTitle>
                                </VListItem>

                                <VListItem>
                                    <VListItemTitle>
                                        <div class="d-flex my-4 gap-x-2">
                                            <p class="text-sm font-weight-medium">
                                                TASK:
                                            </p>
                                            <p class="text-sm font-weight-medium">Lorem ipsum dolor sit.</p>
                                        </div>
                                    </VListItemTitle>
                                </VListItem>

                                <VListItem>
                                    <VListItemTitle>
                                        <div class="d-flex my-4 gap-x-2">
                                            <p class="text-sm font-weight-medium">
                                                STATUS:
                                            </p>
                                            <p class="text-sm font-weight-medium">Open</p>
                                        </div>
                                    </VListItemTitle>
                                </VListItem>

                                <VListItem>
                                    <VListItemTitle>
                                        <div class="d-flex my-4 gap-x-2">
                                            <p class="text-sm font-weight-medium">
                                                ASSIGNED BY:
                                            </p>
                                            <p class="text-sm font-weight-medium">Lorem ipsum dolor sit.</p>
                                        </div>
                                    </VListItemTitle>
                                </VListItem>

                                <VListItem>
                                    <VListItemTitle>
                                        <div class="d-flex my-4 gap-x-2">
                                            <p class="text-sm font-weight-medium">
                                                GROUP NAME:
                                            </p>
                                            <p class="text-sm font-weight-medium">Lorem ipsum dolor sit.</p>
                                        </div>
                                    </VListItemTitle>
                                </VListItem>

                                <VListItem>
                                    <VListItemTitle>
                                        <div class="d-flex my-4 gap-x-2">
                                            <p class="text-sm font-weight-medium">
                                                PROJECT:
                                            </p>
                                            <p class="text-sm font-weight-medium">Lorem ipsum dolor sit.</p>
                                        </div>
                                    </VListItemTitle>
                                </VListItem>
                            </VList>
                        </VCardText>
                    </VCard>
                </VCol>
            </VRow>
        </VCardText>
    </VCard>
</template>

<style lang="scss" scoped>
.plan-upgrade-banner {
    .plan-details {
        border: 1px solid rgb(var(--v-theme-primary));
    }
}

.card-list {
    --v-card-list-gap: 0;
}
</style>
