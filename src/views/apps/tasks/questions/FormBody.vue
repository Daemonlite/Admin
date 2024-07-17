<!-- eslint-disable vue/no-mutating-props -->
<script setup>
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  data: {
    type: Object,
    required: true,
    default: () => ({
      title: 'App Design',
      cost: 24,
      hours: 1,
      description: 'Designed UI kit & app pages.',
    }),
  },
})

const itemsOptions = [
  {
    title: 'App Design',
    cost: 24,
    hours: 1,
    description: 'Designed UI kit & app pages.',
  },
  {
    title: 'App Customization',
    cost: 26,
    hours: 1,
    description: 'Customization & Bug Fixes.',
  },
]

const emit = defineEmits([
  'removeItem',
])

</script>

<template>
  <!-- eslint-disable vue/no-mutating-props -->
  <div class="add-products-header mb-2 d-none d-md-flex ps-5 pe-16">
    <VRow class="font-weight-medium">
      <VCol cols="12" md="6">
        <h6 class="text-sm font-weight-medium">
          Item
        </h6>
      </VCol>
      <VCol cols="12" md="2">
        <h6 class="text-sm font-weight-medium">
          Cost
        </h6>
      </VCol>
      <VCol cols="12" md="2">
        <h6 class="text-sm font-weight-medium">
          Hours
        </h6>
      </VCol>
      <VCol cols="12" md="2">
        <h6 class="text-sm font-weight-medium">
          Price
        </h6>
      </VCol>
    </VRow>
  </div>

  <VCard flat border class="d-flex flex-sm-row flex-column-reverse">

    <!-- 👉 Item Actions -->
    <div class="d-flex flex-column item-actions pa-1" :class="$vuetify.display.smAndUp ? 'border-s' : 'border-b'">
      <IconBtn @click="removeItem">
        <VIcon :size="20" icon="mdi-close" />
      </IconBtn>
    </div>
  </VCard>
</template>
