<template>
  <div class="jumbotron custom-bg-dark">
    <h1 class="display-4">MEVN Stack Task Manager</h1>
    <p
      class="lead"
    >This is a simple task manager application, built with mongoDB, ExpressJS, VueJS, and NodeJS technologies.</p>
    <hr class="my-4" />
    <p>Click below to begin managing tasks for users</p>
    <router-link to="/tasks" class="btn btn-success btn-lg" role="button">View Tasks</router-link>
  </div>
</template>