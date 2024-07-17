import axios from '@axios';
import { defineStore } from 'pinia';

export const useTodoListStore = defineStore('todoList', {

state: () => ({

  todoList: [],
}),

  actions: {
    //  Fetch Todo data
    async fetchTodoList() {
      try {
        const response = await axios.get('/apps/tasks/todoList');
        this.todoList = response.data;
      } catch (error) {
        console.log('error fetch todos:', error);
      }
    },

    //  Delete Todo
    async deleteTodoListById(todoId) {
      try {
        const response = await axios.delete('/apps/tasks/todoList/${Id}');
        this.todoList = response.data;
      } catch (error) {
        console.log('error fetch todos:', error);
      }
    },
    // fetch single Todo
  },

      // Edit Todo
      async editTodo(todoId, updatedTodo) {
        try {
          const response = await axios.put(`/apps/tasks/todoList/${todoId}`, updatedTodo);
          const updatedIndex = this.todoList.findIndex((todo) => todo.id === todoId);
          this.todoList[updatedIndex] = response.data;
        } catch (error) {
          console.error('Error updating todo:', error);
        }
      },

          // Search Todo
    async searchTodo(query) {
      try {
        const response = await axios.get(`/apps/tasks/todoList?search=${query}`);
        this.todoList = response.data;
      } catch (error) {
        console.error('Error searching todos:', error);
      }
    },

        // Filter Todo by Status
        filterTodoByStatus(status) {
          if (status === 'all') {
            // If status is 'all', reset the filter
            this.filterStatus = null;
          } else {
            // Filter todos based on the selected status
            this.filterStatus = status;
            this.todoList = this.todoList.filter((todo) => todo.status === status);
          }
        },
})
