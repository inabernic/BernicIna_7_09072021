import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store";
import utils from "@/utils";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/post/:postId",
    name: "PostDetailRoute",
    props: true,
    component: () =>
      import(/* webpackChunkName: "PostDetail" */ "../views/PostDetail.vue"),
    meta: {
      requiresAuth: true,
    },

    beforeEnter: async (to, from, next) => {
      if (!to.params.post) {
        to.params.post = await store.getPostById(to.params.postId);
      }
      if (to.params.post) {
        next();
      } else {
        next({ name: "notFound" });
      }
    },
  },
  {
    path: "/post/:postId/update",
    props: true,
    name: "updatePost",
    component: () =>
      import(/* webpackChunkName: "updatePost" */ "../views/UpdatePost.vue"),
    meta: {
      requiresAuth: true,
    },

    beforeEnter: async (to, from, next) => {
      if (!to.params.post) {
        to.params.post = await store.getPostById(to.params.postId);
      }
      if (to.params.post && utils.isConnectedUserOwnerOf(to.params.post)) {
        next();
      } else {
        next({ name: "Home" });
      }
    },
  },
  {
    path: "/user",
    name: "user",
    component: () => import(/* webpackChunkName: "User" */ "../views/User.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "Login" */ "../views/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "Register" */ "../views/Register.vue"),
  },
  {
    path: "/404",
    alias: "*",
    name: "notFound",
    component: () =>
      import(/* webpackChunkName: "NotFound" */ "../views/NotFound.vue"),
  },
  {
    path: "/new",
    name: "newPost",
    component: () =>
      import(
        /* webpackChunkName: "CreationPost" */ "../views/CreationPost.vue"
      ),
  },
];

const router = new VueRouter({
  mode: "history",
  linkExactActiveClass: "vue-activ-link-class",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      const position = {};
      if (to.hash) {
        position.selector = to.hash;
        if (to.hash === "#post") {
          position.offset = { y: 140 };
        }
        if (document.querySelector(to.hash)) {
          return position;
        }
        return false;
      }
    }
  },
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!localStorage.user) {
      next({
        name: "login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
