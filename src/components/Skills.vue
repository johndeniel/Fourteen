<template>
   <!-- Skills Grid -->
  <div class="space-y-16 md:space-y-20">

    <div v-for="(category, index) in skillsData" :key="index">
       <!-- Category Header -->
      <header class="mb-4 md:mb-6">

        <h2
          class="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 mb-0.5 md:mb-2"
        >
           {{ category.category }}
        </h2>

        <p
          class="text-gray-600 text-sm md:text-base lg:text-lg max-w-3xl leading-relaxed"
        >
           {{ category.description }}
        </p>

      </header>
       <!-- Skills Grid -->
      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4"
      >

        <div
          v-for="(skill, skillIndex) in category.skills"
          :key="skillIndex"
          class="flex items-center gap-2 md:gap-3 py-2 md:py-3 px-3 md:px-4 border border-gray-200 rounded-lg text-gray-700 text-xs md:text-sm font-medium transition-all duration-200 ease-in-out cursor-default select-none hover:border-gray-400 hover:bg-gray-50 hover:text-gray-900 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-1"
        >
           <img
            :src="
              skill.icon ||
              'https://via.placeholder.com/20/6B7280/FFFFFF?text=T'
            "
            :alt="skill.name + ' icon'"
            class="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 object-contain"
            loading="lazy"
          /> <span class="truncate leading-tight">{{ skill.name }}</span
          >
        </div>

      </div>

    </div>

  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue'

const skillsData = ref([
  {
    category: 'Frontend Development',
    description:
      'Modern web interfaces and user experiences with cutting-edge frameworks and technologies',
    skills: [
      {
        name: 'React',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      },
      {
        name: 'Next.js',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
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
        name: 'TypeScript',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      },
      {
        name: 'JavaScript',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      },
      {
        name: 'HTML5',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
      },
      {
        name: 'CSS3',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
      },
      {
        name: 'SASS/SCSS',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg',
      },
    ],
  },
  {
    category: 'Programming Languages',
    description:
      'Proficient in multiple programming languages across different paradigms and use cases',
    skills: [
      {
        name: 'JavaScript',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      },
      {
        name: 'TypeScript',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      },
      {
        name: 'Python',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      },
      {
        name: 'Java',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
      },
      {
        name: 'Go',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
      },
      {
        name: 'C++',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
      },
      {
        name: 'C#',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
      },
      {
        name: 'PHP',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
      },
      {
        name: 'Ruby',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg',
      },
    ],
  },
  {
    category: 'Backend Development',
    description:
      'Scalable server-side architecture, API design, and microservices implementation',
    skills: [
      {
        name: 'Node.js',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      },
      {
        name: 'Python',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
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
    category: 'Mobile Development',
    description:
      'Cross-platform and native mobile application development for iOS and Android',
    skills: [
      {
        name: 'React Native',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      },
      {
        name: 'Flutter',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
      },
      {
        name: 'Swift',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg',
      },
      {
        name: 'Kotlin',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg',
      },
      {
        name: 'Ionic',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ionic/ionic-original.svg',
      },
    ],
  },
  {
    category: 'Database & Storage',
    description:
      'Data persistence, management, and optimization across various database systems',
    skills: [
      {
        name: 'PostgreSQL',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
      },
      {
        name: 'MongoDB',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      },
      {
        name: 'Redis',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
      },
      {
        name: 'MySQL',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
      },
      {
        name: 'Supabase',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg',
      },
      {
        name: 'Firebase',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
      },
      {
        name: 'SQLite',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg',
      },
    ],
  },
  {
    category: 'Cloud & DevOps',
    description:
      'Infrastructure automation, containerization, and continuous deployment pipelines',
    skills: [
      {
        name: 'Docker',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
      },
      {
        name: 'Kubernetes',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
      },
      {
        name: 'GitHub Actions',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
      },
      {
        name: 'Terraform',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg',
      },
    ],
  },
  {
    category: 'Development Tools',
    description:
      'Essential development tools and productivity enhancers for efficient workflows',
    skills: [
      {
        name: 'Git',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
      },
      {
        name: 'VS Code',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
      },
      {
        name: 'Figma',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
      },
      {
        name: 'Webpack',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg',
      },
      {
        name: 'ESLint',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg',
      },
    ],
  },
])
</script>

<style scoped>
/* Scoped styles are not needed as Tailwind CSS classes handle the component's styling. */
</style>

