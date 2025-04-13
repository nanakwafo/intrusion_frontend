<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useAuthStore } from "./stores/auth";

const authStore = useAuthStore();
</script>

<template>
  

 
  <div class="min-h-screen flex flex-col">
    <!-- Header (optional) -->
    <header>
    <nav>
      <RouterLink :to="{ name: 'home' }" class="nav-link">Home</RouterLink>

      <div v-if="authStore.user" class="flex items-center space-x-6">
        <p class="text-sm text-slate-300">
          Welcome back {{ authStore.user.name }}
        </p>
        <RouterLink :to="{ name: 'create' }" class="nav-link">
          New Post
        </RouterLink>
        <form @submit.prevent="authStore.logout">
          <button class="nav-link">Logout</button>
        </form>
      </div>

      <div v-else class="space-x-6">
        <RouterLink :to="{ name: 'register' }" class="nav-link">
          Register
        </RouterLink>
        <RouterLink :to="{ name: 'login' }" class="nav-link">
          Login
        </RouterLink>
      </div>
    </nav>
  </header>


   <RouterView />
   

    <!-- Footer (always at bottom) -->
    <footer class="bg-gray-900 text-gray-300 py-6">
      <div class="max-w-7xl mx-auto px-4 text-center text-sm">
        &copy; {{ new Date().getFullYear() }} PostVerse. All rights reserved.
      </div>
    </footer>
  </div>
</template>
