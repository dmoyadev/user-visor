<template>
	<div class="home pa-10 pt-9">
		<vue-headful title="Visor de Usuarios"/>

		<h1 class="mb-5 mt-n7">Listado de usuarios</h1>

		<TableWithFilters
			:reload="true"
			:countries="countries"
			:countries-array="countriesArray"
			:headers="headers"
			:loading="loading"
			:search="search"
			:users="users"
			@reload="fetchUsers"/>
	</div>
</template>

<script>
import countries from '@/data/countries';
import TableWithFilters from '@/components/TableWithFilters';
import UsersAPI from '@/api/UsersAPI';

export default {
	name: "Home",

	components: { TableWithFilters },

	data() {
		return {
			countries: countries,
			countriesArray: Object.values(countries),
			loading: true,
			users: [],
			fetchError: '',
			search: null,
			headers: [
				{ text: 'Nombre y apellidos', value: 'name.first' },
				{ text: 'Género', value: 'gender', },
				{ text: 'Nacionalidad', value: 'nat' },
				{ text: 'Email', value: 'email' },
				{ text: 'Fecha de nacimiento', value: 'dob.date' },
				{ text: 'Fecha de registro', value: 'registered.date' },
			],
		};
	},

	created() {
		const users = localStorage.getItem('users');
		if(users) {
			this.users = JSON.parse(users);
			this.loading = false;
		} else {
			this.fetchUsers()
				.finally(() => {
					this.loading = false;
				});
		}
	},

	methods: {
		fetchUsers() {
			localStorage.removeItem('users');
			return new Promise((resolve, reject) => {
				UsersAPI.get()
					.then((response) => {
						if (response.data?.results?.length) {
							localStorage.setItem('users', JSON.stringify(response.data.results));
							this.users = response.data.results;
							resolve();
						} else {
							this.fetchError = 'No ha habido resultados';
							reject();
						}
					})
					.catch((error) => {
						this.fetchError = error?.data?.message || 'Ha habido un problema con el servidor, inténtalo más tarde.';
						reject();
					});
			});
		},
	}
};
</script>
