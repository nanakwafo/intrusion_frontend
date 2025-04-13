<script setup>
import { usePostsStore } from "@/stores/posts";
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";

const { getAllPosts } = usePostsStore();
const posts = ref([]);

onMounted(async () => (posts.value = await getAllPosts()));
</script>

<template>
  <main>
    <section class="bg-gradient-to-b from-blue-50 to-white py-20 px-6 text-center">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl sm:text-6xl font-extrabold text-gray-900 leading-tight">
        <span class="text-blue-600">Welcome to PostVerse!</span>
        <div>Secure. Smart. </div>
      </h1>
      <p class="mt-6 text-lg text-gray-600">
        Write. Share. Connect.
Publish your thoughts, stories, and updates with the world.
Simple, fast, and beautifully crafted
      </p>
      <!-- <div class="mt-8 flex justify-center gap-4 flex-wrap">
        <a
          href="/register"
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition duration-300"
        >
          Register
        </a>
        <a
          href="/login"
          class="bg-white border border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 font-semibold py-3 px-6 rounded-xl shadow-sm transition duration-300"
        >
          Login
        </a>
      </div> -->
    </div>
  </section>
    <h1 class="title">Latest Posts</h1>

    <div v-if="posts.length > 0">
      <div
        v-for="post in posts"
        :key="post.id"
        class="border-l-4 border-blue-500 pl-4 mb-12"
      >
        <h2 class="font-bold text-3xl">{{ post.title }}</h2>
        <p class="text-xs text-slate-600 mb-4">
          Posted by {{ post.user.name }}
        </p>
        <p>
          {{ post.body }}
          <RouterLink
            :to="{ name: 'show', params: { id: post.id } }"
            class="text-blue-500 font-bold underline"
            >Read more...</RouterLink
          >
        </p>
      </div>
    </div>
    <div v-else>
      <h2 class="title">There are no posts</h2>
    </div>
  </main>
</template>
