<script setup>
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { onMounted, reactive } from "vue";

const { errors , waitForOtpMessage, loginTimeout } = storeToRefs(useAuthStore());
const { authenticate } = useAuthStore();

const formData = reactive({
  email: "",
  password: "",
});

onMounted(() => (errors.value = {}));
</script>

<template>
  <main>
    <section class="bg-gradient-to-b from-blue-50 to-white py-20 px-6 text-center">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl sm:text-6xl font-extrabold text-gray-900 leading-tight">
        Secure. Smart. <span class="text-blue-600">Posts Platform</span>
      </h1>
      <p class="mt-6 text-lg text-gray-600">
        Write. Share. Connect.
Publish your thoughts, stories, and updates with the world.
Simple, fast, and beautifully crafted
      </p>
      <div class="mt-8 flex justify-center gap-4 flex-wrap">
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
      </div>
    </div>
  </section>
    <h1 class="title">Login to your account</h1>

    <form @submit.prevent="authenticate('login', formData)" class="w-1/2 mx-auto space-y-6">
      <div>
        <input type="text" placeholder="Email" v-model="formData.email" />
        <p v-if="errors.email" class="error">{{ errors.email[0] }}</p>
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          v-model="formData.password"
        />
        <p v-if="errors.password" class="error">{{ errors.password[0] }}</p>
      </div>
       
      <button class="primary-btn">Login</button>
    </form>

    <p v-if="waitForOtpMessage" class="success">{{waitForOtpMessage}} </p>
    <p v-if="loginTimeout" class="success">{{loginTimeout}} </p>
  </main>
</template>
