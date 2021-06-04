<template>
	<main>
		<div class="d-flex justify-space-between mb-10">
			<!-- Refresh data button -->
			<div v-if="reload" class="d-flex flex-column">
				<span class="subtitle-2">Consultar 100 usuarios distintos:</span>
				<v-btn
					color="primary"
					class="mt-3"
					@click="$emit('reload')"
				>
					Recargar
				</v-btn>
			</div>

			<!-- Age filter -->
			<div class="d-flex flex-column">
				<span class="subtitle-2">Filtra por edad:</span>
				<div class="d-flex">
					<v-text-field
						v-model="filterAge[0]"
						class="mr-2"
						label="Mín."
						hide-details
						type="number"
					/>
					<v-text-field
						v-model="filterAge[1]"
						label="Max."
						hide-details
						type="number"
					/>
				</div>
			</div>

			<!-- Gender filter -->
			<div class="d-flex flex-column">
				<span class="subtitle-2">Filtra por género:</span>
				<div class="d-flex">
					<v-checkbox
						v-model="filterGender"
						class="mr-5"
						value="male"
						hide-details
					>
						<template v-slot:label>
							<GenderIcon gender="male"/>
						</template>
					</v-checkbox>
					<v-checkbox
						v-model="filterGender"
						value="female"
						single-line
						hide-details
					>
						<template v-slot:label>
							<GenderIcon gender="female"/>
						</template>
					</v-checkbox>
				</div>
			</div>

			<!-- Nationality filter -->
			<div class="d-flex flex-column">
				<span class="subtitle-2">Filtra por nacionalidad:</span>
				<v-select
					v-model="filterNationality"
					:items="countriesArray"
					item-text="name.es"
					item-value="alpha2"
					single-line
					hide-details
					clearable
				>
					<template v-slot:item="{ active, item, attrs, on }">
						<v-list-item v-bind="attrs" v-on="on">
							<v-list-item-content>
								<v-list-item-title>
									<country-flag :country="item.alpha2"/>
									<span class="ml-1">{{ item.name.es }}</span>
								</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</template>
				</v-select>
			</div>

			<!-- Free text filter -->
			<div class="d-flex flex-column">
				<span class="subtitle-2">Busca por nombre, apellidos o email:</span>
				<v-text-field
					v-model="search"
					append-icon="mdi-magnify"
					single-line
					hide-details
				/>
			</div>
		</div>

		<!-- Table -->
		<v-card>
			<v-data-table
				:loading="loading"
				loading-text="Cargando datos..."
				:headers="headers"
				:items="filteredUsers"
				item-key="email"
				:search="search"
				:footer-props="{
					'items-per-page-all-text': 'Todos',
					'items-per-page-text': 'Mostrar',
				}"
				@click:row="goToProfile"
			>
				<template v-slot:item.name.first="{ item }">
					<v-avatar size="35" class="mr-3">
						<img :src="item.picture.medium" :alt="item.name.first + ' ' + item.name.last">
					</v-avatar>
					<span class="font-weight-bold mr-1">{{ item.name.first }}</span>
					<span class="font-weight-medium grey--text text--darken-2 mr-1">{{ item.name.last }}</span>
				</template>

				<template v-slot:item.gender="{ item }">
					<GenderIcon :gender="item.gender"/>
				</template>

				<template v-slot:item.nat="{ item }">
					<country-flag :country="item.nat.toLowerCase()"/>
					<span class="ml-1">{{ countries[item.nat.toLowerCase()].name.es }}</span>
				</template>

				<template v-slot:item.dob.date="{ item }">
					<span class="mr-1">{{ item.dob.date | dateParse('YYYY-MM-DDTHH:mm:ss.SSS') | dateFormat('DD/MM/YYYY') }}</span>
					<span class="font-weight-light grey--text text--darken-2">({{ item.dob.age }} años)</span>
				</template>

				<template v-slot:item.registered.date="{ item }">
					<span class="mr-1">{{ item.registered.date | dateParse('YYYY-MM-DDTHH:mm:ss.SSS') | dateFormat('DD/MM/YYYY') }}</span>
				</template>

				<template v-slot:footer.page-text="items"> {{ items.pageStart }} - {{ items.pageStop }} de {{
					items.itemsLength }}
				</template>
			</v-data-table>
		</v-card>
	</main>
</template>

<script>
import GenderIcon from '@/components/GenderIcon';

export default {
	name: 'TableWithFilters',
	components: { GenderIcon },

	props: {
		reload: Boolean,
		countries: {},
		countriesArray: {},
		headers: {},
		loading: {},
		search: {},
		users: []
	},

	data() {
		return {
			filterNationality: null,
			filterGender: [],
			filterAge: [0, 120],
		};
	},

	computed: {
		filteredUsers() {
			if(Array.isArray(this.users)) {
				return this.users.filter((user) => {
					const byNationality = this.filterNationality ? user.nat.toLowerCase() === this.filterNationality.toLowerCase() : true;
					const byGender = this.filterGender.length ? this.filterGender.includes(user.gender) : true;
					const byAge = user.dob.age >= this.filterAge[0] && user.dob.age <= this.filterAge[1];
					return byNationality && byGender && byAge;
				});
			} else {
				return [];
			}
		}
	},

	methods: {
		goToProfile(user) {
			this.$router.push('/user/' + user.login.username);
		}
	}
};
</script>

<style>
.normal-flag {
	margin: -15px !important;
}
</style>
