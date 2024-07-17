import axios from '@axios';
import { defineStore } from 'pinia';

export const useQuestionnaireStore = defineStore('questionnaire', {

state: () => ({

  questionnaire: ([]),
}),

  actions: {
    //  Fetch Questionnaire data
    async fetchQuestionnaire() {
      try {
        const response = await axios.get('questionnaire/');
        this.todoList = response.data;
      } catch (error) {
        console.log('error fetch data:', error);
      }
    },

    //  Delete Todo
    async deleteQuestionnaireById(id) {
      try {
        const response = await axios.delete('questionnaire/${Id}');
        this.questionnaire = response.data;
      } catch (error) {
        console.log('error fetch data:', error);
      }
    },
  },

})
