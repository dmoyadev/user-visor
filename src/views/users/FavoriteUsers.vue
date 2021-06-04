<template>
	<div class="home pa-10 pt-9">
		<vue-headful title="Usuarios favoritos | Visor de Usuarios"/>

		<h1 class="mb-5 mt-n7">Usuarios favoritos</h1>

		<TableWithFilters
			:reload="false"
			:countries="countries"
			:countries-array="countriesArray"
			:headers="headers"
			:loading="loading"
			:search="search"
			:users="users"/>
	</div>
</template>

<script>
import countries from '@/data/countries';
import TableWithFilters from '@/components/TableWithFilters';

export default {
	name: "FavoriteUsers",

	components: { TableWithFilters },

	data() {
		return {
			countries: countries,
			countriesArray: Object.values(countries),
			filterNationality: null,
			filterGender: [],
			filterAge: [0, 120],
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
		const users = localStorage.getItem('favorites');
		if(users) {
			this.users = JSON.parse(users);
			this.loading = false;
		} else {
			this.users = [];
		}
	}
};
</script>

<style lang="scss" scoped>

</style>
