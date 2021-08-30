<template>
  <div id="app" class="container">
    <!-- <TheNavigation /> -->
    <TheNavigationConnex v-show="!connected" />
    <TheNavigationDeconnex v-show="connected" />
    <transition name="fade" mode="out-in">
      <router-view :key="$route.fullPath"></router-view>
    </transition>
  </div>
</template>

<script>
//import TheNavigation from "@/components/TheNavigation"
import TheNavigationConnex from "@/components/TheNavigationConnex";
import TheNavigationDeconnex from "@/components/TheNavigationDeconnex";
export default {
  name: "App",
  components: {
    // TheNavigation,
    TheNavigationConnex,
    TheNavigationDeconnex,
  },

  data() {
    return {
      connected: false,
    };
  },

  updated() {
    if (localStorage.user) {
      this.connected = true;
    }
  },

  created() {
    if (localStorage.user) {
      this.connected = true;
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 1s, transform 1s;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}
.moveUp-enter-active {
  animation: fadeIn 1s ease-in;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

.moveUp-leave-active {
  animation: moveUp 0.3s ease-in;
}

@keyframes moveUp {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-400px);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.input {
  border: 1px solid green;
  padding: 10px;
  margin-bottom: 20px;
}
.btn {
  background-color: green;
  color: white;
  padding: 10px;
}

/* Navigation common styles */
.logo {
  height: 3rem;
  position: absolute;
  left: 0rem;
}
#nav {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: sticky;
  top: 0;
  background-color: white;
  border-bottom: 1px solid grey;
  z-index: 1;
}

#nav a {
  color: #2c3e50;
  text-decoration: none;
  font-weight: bold;
}

#nav a.vue-activ-link-class {
  color: #4272b9;
}

.nav-links {
  display: flex;
}

.links {
  padding-right: 20px;
  list-style: none;
}

.links:hover {
  text-decoration: underline;
}

.logout {
  background-color: rgb(224, 72, 72);
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  border-color: rgb(124, 18, 18);
}
</style>
