import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import vuetify from './plugins/vuetify';

import VueHeadful from "vue-headful";
Vue.component('vue-headful', VueHeadful);

import VueFilterDateParse from '@vuejs-community/vue-filter-date-parse';
Vue.use(VueFilterDateParse);

import VueFilterDateFormat from 'vue-filter-date-format';
Vue.use(VueFilterDateFormat, {
	dayOfWeekNames: [
		'Lunes', 'Martes', 'Miércoles', 'Jueves',
		'Viernes', 'Sábado', 'Domingo'
	],
	dayOfWeekNamesShort: [
		'L', 'M', 'X', 'J', 'V', 'S', 'D'
	],
	monthNames: [
		'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
		'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
	],
	monthNamesShort: [
		'Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.',
		'Jul.', 'Ago.', 'Sep.', 'Oct.', 'Nov.', 'Dic.'
	]
});

import CountryFlag from 'vue-country-flag';
Vue.component('country-flag', CountryFlag);

import * as GmapVue from 'gmap-vue';

Vue.use(GmapVue, {
	load: {
		key: process.env.VUE_APP_GOOGLE_API_KEY,
		language: 'es'
	},
	installComponents: true
});

Vue.config.productionTip = false;

// eslint-disable-next-line vue/require-name-property
new Vue({
	router,
	vuetify,
	render: (h) => h(App),
}).$mount('#app');
