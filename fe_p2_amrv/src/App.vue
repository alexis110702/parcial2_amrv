<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { useAuthStore } from "@/stores/index";

const authStore = useAuthStore();
</script>

<template>
  <header>

    <div class="top-header">

      <img
        src="@/assets/logo.svg"
        alt="Logo USFX"
        class="logo"
      />
      <h2>🎓 Postgrado USFX</h2>

    </div>

    <nav>
      <RouterLink to="/">Inicio</RouterLink>

      <RouterLink to="/niveles-academicos">
        Niveles Académicos
      </RouterLink>

      <RouterLink to="/programas">
        Programas
      </RouterLink> 
    </nav>

  </header>

  <RouterView />
</template>

<style scoped>

.top-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.logo {
  width: 150px;
  height: 150px;
}

header h2 {
  color: white;
  font-size: 3rem;
  font-weight: bold;
  margin: 0;
}


nav {
  width: 100%;
  font-size: 1rem;
  text-align: center;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  text-decoration: none;
  transition: background 0.2s;
}

nav a:first-of-type {
  border: 0;
}

nav a.router-link-exact-active {
  color: #90caf9;
}

nav a:hover {
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 4px;
}

.text-danger {
  color: #ff8a80 !important;
}

</style>