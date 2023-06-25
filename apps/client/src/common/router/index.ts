import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import ViewHome from '../../views/home/ViewHome.vue';
import {
  ROUTE_CATEGORY_FORM_NAME,
  ROUTE_CATEGORY_FORM_PATH,
  ROUTE_CATEGORY_LIST_NAME,
  ROUTE_CATEGORY_LIST_PATH,
  ROUTE_HOME_NAME,
  ROUTE_HOME_PATH,
} from './router.constants';

type WithLabelAndName = { label?: string; name: string };
type Route = RouteRecordRaw & WithLabelAndName;
type RouteRaw = { path: string } & WithLabelAndName;

const routes: Route[] = [
  {
    path: ROUTE_HOME_PATH,
    name: ROUTE_HOME_NAME,
    label: 'Home',
    component: ViewHome,
  },
  {
    path: ROUTE_CATEGORY_FORM_PATH,
    name: ROUTE_CATEGORY_FORM_NAME,
    component: () => import(/* webpackChunkName: "category-form" */ '../../views/category/ViewCategoryForm.vue'),
  },
  {
    path: ROUTE_CATEGORY_LIST_PATH,
    name: ROUTE_CATEGORY_LIST_NAME,
    component: () => import(/* webpackChunkName: "category-list" */ '../../views/category/ViewCategoryList.vue'),
  },
];

const routesRaw: RouteRaw[] = routes.map(({ path, name, label }) => ({ path, name, label }));

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export { router, routesRaw };

export type { Route, RouteRaw };
