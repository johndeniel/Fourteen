<script setup lang="ts">
import { ref } from 'vue'

const skillCategories = ref([
  {
    category: 'Programming Languages',
    description:
      'Leveraging modern languages to build robust and scalable applications.',
    skills: [
      {
        name: 'Java',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
      },
      {
        name: 'Python',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      },
      {
        name: 'Go',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
      },
      {
        name: 'PHP',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
      },
      {
        name: 'JavaScript',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      },
      {
        name: 'TypeScript',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      },
      {
        name: 'Rust',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg',
      },
      {
        name: 'C++',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
      },
      {
        name: 'C#',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
      },
    ],
  },
  {
    category: 'Frontend Development',
    description:
      'Crafting intuitive user interfaces and seamless experiences with leading-edge technologies.',
    skills: [
      {
        name: 'React',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      },
      {
        name: 'Vue.js',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
      },
      {
        name: 'Angular',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
      },
      {
        name: 'Next.js',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
      },
      {
        name: 'Svelte',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg',
      },
      {
        name: 'Laravel',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg',
      },
    ],
  },
  {
    category: 'Mobile App Development',
    description:
      'Building high-performance, cross-platform mobile applications for iOS and Android.',
    skills: [
      {
        name: 'Java',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
      },
      {
        name: 'Kotlin',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg',
      },
      {
        name: 'React Native',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      },
      {
        name: 'Flutter',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
      },
    ],
  },
  {
    category: 'Backend & API Development',
    description:
      'Developing secure, scalable server-side logic and robust APIs for modern applications.',
    skills: [
      {
        name: 'Node.js',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      },
      {
        name: 'Express.js',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
      },
      {
        name: 'Django',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
      },
      {
        name: 'FastAPI',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
      },
      {
        name: 'Spring Boot',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
      },
      {
        name: 'GraphQL',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',
      },
    ],
  },
  {
    category: 'Databases & Data Storage',
    description:
      'Managing and optimizing data persistence with various relational and NoSQL databases.',
    skills: [
      {
        name: 'MySQL',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
      },
      {
        name: 'PostgreSQL',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
      },
      {
        name: 'SQLite',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg',
      },
      {
        name: 'Firebase',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
      },
      {
        name: 'Supabase',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg',
      },
      {
        name: 'MongoDB',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      },
      {
        name: 'Redis',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
      },
    ],
  },
  {
    category: 'Architecture & System Design',
    description:
      'Applying proven design patterns and architectural principles for scalable systems.',
    skills: [
      {
        name: 'RESTful API',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      },
      {
        name: 'Clean Architecture',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
      },
      {
        name: 'MVC Pattern',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
      },
      {
        name: 'Microservices',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
      },
      {
        name: 'Domain-Driven Design',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      },
      {
        name: 'MVVM Pattern',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
      },
    ],
  },
  {
    category: 'Cloud Infrastructure & DevOps',
    description:
      'Automating deployment pipelines and managing cloud infrastructure efficiently.',
    skills: [
      {
        name: 'Docker',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
      },
      {
        name: 'GitHub Actions',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
      },
      {
        name: 'Vercel',
        icon: 'https://assets.vercel.com/image/upload/v1688842400/front/favicon/vercel/favicon.ico',
      },
    ],
  },
  {
    category: 'Development Tools',
    description:
      'Utilizing essential tools for streamlined and efficient development workflows.',
    skills: [
      {
        name: 'VS Code',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
      },
      {
        name: 'Git',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
      },
      {
        name: 'GitHub',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
      },
      {
        name: 'ChatGPT',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
      },
      {
        name: 'Postman',
        icon: 'https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg', // A good quality SVG icon for Postman
      },
    ],
  },
])
</script>

<template>

  <div class="space-y-16">

    <section v-for="(category, index) in skillCategories" :key="index">

      <header class="mb-6">

        <h2 class="text-2xl font-semibold text-gray-800 tracking-tight">
           {{ category.category }}
        </h2>

        <p class="mt-2 text-base text-gray-500 max-w-2xl">
           {{ category.description }}
        </p>

      </header>

      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
      >

        <div
          v-for="(skill, skillIndex) in category.skills"
          :key="skillIndex"
          class="group flex items-center gap-3 p-3 border border-gray-200 rounded-lg transition-all duration-200 ease-in-out cursor-default hover:bg-gray-50"
        >
           <img
            :src="
              skill.icon ||
              'https://via.placeholder.com/24/6B7280/FFFFFF?text=T'
            "
            :alt="skill.name + ' icon'"
            class="w-6 h-6 object-contain flex-shrink-0"
            loading="lazy"
            aria-hidden="true"
          /> <span
            class="text-sm font-medium text-gray-700 truncate group-hover:text-gray-900"
            > {{ skill.name }} </span
          >
        </div>

      </div>

    </section>

  </div>

</template>

<style scoped>
/* Scoped styles are used here, keeping the component self-contained. */
</style>

