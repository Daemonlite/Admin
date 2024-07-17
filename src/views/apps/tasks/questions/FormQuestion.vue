<script setup>
import { useQuestionnaireStore } from '@/views/apps/tasks/useQuestionnaireStore';
const questionnaireStore = useQuestionnaireStore()

const questionnaire = ref([])
const question = ref([])


const props = defineProps({
  data: {
    type: null,
    required: true,
  },
})

questionnaireStore.fetchQuestionnaire().then(response => {
  questionnaire.value = response.data
}).catch(err => {
  console.log(err)
})

const removeQuestion = id => {

  props.data.question.splice(id, 1)
}

const addQuestion = (index) => {
  const newItem = { ...items.value[index] };
  props.value.splice(index + 1, 0, newItem);
};
</script>



<template>
  <div class="mb-4" v-if="questionnaire">
    <VCard flat border class="d-flex flex-sm-row flex-column-reverse">
      <!-- 👉 Left Form -->
      <div class="pa-5 flex-grow-1">
        <VRow>
          <VCol cols="12" md="2" sm="4">
            <VTextField type="number" label="Hours" density="compact" />
          </VCol>

          <VCol cols="12" md="2" sm="4">
            <p class="my-2">
              <span class="d-inline d-md-none">Price: </span>
            </p>
          </VCol>
        </VRow>
      </div>

      <!-- 👉 Item Select -->
      <div class="d-flex flex-column item-actions pa-1" :class="$vuetify.display.smAndUp ? 'border-s' : 'border-b'">
        <VSelect :items="['Multiple Question', 'Paragraph Question', 'Scale Question']" />
      </div>

      <div class="d-flex flex-column item-actions pa-1">
        <IconBtn @click="removeQuestion">
          <VIcon :size="20" icon="mdi-close" />
        </IconBtn>
      </div>
    </VCard>
  </div>

  <VBtn size="small" prepend-icon="mdi-plus" @click="addQuestion">
    Add Question
  </VBtn>



</template>
