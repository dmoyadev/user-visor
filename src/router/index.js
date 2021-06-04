import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import NotFound from "../views/NotFound.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/user/:id",
		name: "UserDetail",
		component: () =>
			import(/* webpackChunkName: "users" */ "../views/users/UserDetail.vue"),
	},
	{
		path: "/favorites",
		name: "FavoriteUsers",
		component: () =>
			import(/* webpackChunkName: "users" */ "../views/users/FavoriteUsers.vue"),
	},
	{
		path: "/about",
		name: "About",
		component: () =>
			import(/* webpackChunkName: "about" */ "../views/About.vue"),
	},
	{
		path: '*',
		component: NotFound,
	}
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
