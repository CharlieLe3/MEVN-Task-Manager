<template>
  <div>
    <h1>Edit Task</h1>
    <form class="custom-form" v-on:submit.prevent="onSubmit">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          v-model="task.title"
          type="text"
          name="title"
          class="form-control"
          id="title"
          placeholder="Title"
        />
      </div>
      <div class="form-group">
        <label for="body">Body</label>
        <textarea
          v-model="task.body"
          class="form-control"
          name="body"
          id="body"
          cols="30"
          rows="10"
          placeholder="Body"
        ></textarea>
      </div>
      <div class="form-group">
        <label for="title">Due Date</label>
        <input
          v-model="task.dueDate"
          type="date"
          name="due-date"
          class="form-control"
          id="due-date"
          placeholder="Due Date"
        />
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-secondary">Save Changes</button>
      </div>
    </form>
  </div>
</template>

<script>
import * as taskService from "../../services/TaskService";
import moment from "moment";

export default {
  name: "tasks-edit",
  data: function() {
    return {
      task: {
        title: "",
        body: "",
        dueDate: ""
      }
    };
  },
  beforeRouteEnter(to, from, next) {
    taskService.getTaskById(to.params.id).then(response => {
      if (!response) {
        next("/tasks");
      } else {
        next(vm => {
          response.json().then(task => {
            const tempTask = task.task;
            tempTask.dueDate = moment(task.dueDate).format("YYYY-MM-DD");
            vm.task = tempTask;
          });
        });
      }
    });
  },
  methods: {
    onSubmit: async function() {
      const request = {
        task: this.task
      };
      await taskService.updateTask(request);
      this.$router.push({ name: "tasks-all" });
    }
  }
};
</script>