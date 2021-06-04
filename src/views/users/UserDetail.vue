<template>
	<div class="home">
		<vue-headful :title="pageTitle"/>

		<div v-if="user" class="pa-10">
			<div class="d-flex flex-column flex-lg-row flex-xl-row align-start justify-space-between">
				<div class="d-flex flex-column">
					<div class="d-flex align-center justify-space-between mb-5">
						<!-- Avatar -->
						<div class="d-flex align-end mr-10">
							<v-avatar
								color="primary"
								size="150"
							>
								<img :src="user.picture.large" :alt="user.name.first + ' ' + user.name.last">
							</v-avatar>
							<v-btn
								class="ml-n10"
								fab
								small
								color="white"
							>
								<GenderIcon :gender="user.gender"/>
							</v-btn>
						</div>

						<!-- Name and email -->
						<div class="d-flex flex-column mr-10">
							<div class="d-flex flex-column mr-10">
								<p class="text-overline ma-0">Nombre</p>
								<h1 class="text-h3 mt-n2">{{ userFullName }}</h1>
							</div>

							<div class="d-flex flex-column">
								<p class="text-overline ma-0">Email</p>
								<h2 class="text-h4 mt-n2">{{ user.email }}</h2>
							</div>
						</div>

						<!-- Favorite button -->
						<v-tooltip bottom>
							<template v-slot:activator="{ on, attrs }">
								<v-btn
									class="mx-2 ml-10"
									fab
									:dark="user.isFavorite"
									:outlined="!user.isFavorite"
									color="indigo"
									v-bind="attrs"
									v-on="on"
									@click="toggleFavorite()"
								>
									<v-icon dark>
										mdi-creation
									</v-icon>
								</v-btn>

							</template>
							<span>Marcar como favorito</span>
						</v-tooltip>
					</div>

					<div class="d-flex flex-column">
						<p class="text-overline ma-0">Dirección</p>
						<p class="text-h6 mt-n2">{{ userLocation }}</p>
					</div>

					<div class="d-flex flex-column">
						<p class="text-overline ma-0">Teléfono</p>
						<p class="text-h6 mt-n2">{{ user.cell }}</p>
					</div>
				</div>

				<!-- Location map -->
				<div v-if="user">
					<GmapMap
						v-if="user"
						:center="center"
						:options="infoOptions"
						:position="infoWindowPos"
						:opened="infoWinOpen"
						@closeclick="infoWinOpen=false"
					>
						<GmapMarker
							v-for="(m, i) in markers"
							:key="i"
							:position="m.position"
							:clickable="true"
							@click="toggleInfoWindow()"
						/>
					</GmapMap>
				</div>
			</div>
		</div>

		<div v-else class="pa-10">
			No se han encontrado los datos de este usuario
		</div>

		<v-snackbar
			v-if="user"
			v-model="snackbar"
		>
			¡Se ha {{ user.isFavorite ? 'marcado' : 'desmarcado' }} el usuario como favorito!
			<template v-slot:action="{ attrs }">
				<v-btn
					color="indigo"
					text
					v-bind="attrs"
					@click="snackbar = false"
				>
					OK
				</v-btn>
			</template>
		</v-snackbar>
	</div>
</template>

<script>
import GenderIcon from '@/components/GenderIcon';
export default {
	name: "UserDetail",
	components: { GenderIcon },
	data() {
		return {
			map: null,
			snackbar: false,
			user: null,
			infoWindowPos: null,
			infoWinOpen: false,
			currentMidx: null,
			infoOptions: {
				content: '',
				//offset info window so it visually sits nicely on top of our marker
				pixelOffset: {
					width: 0,
					height: -35
				}
			},
		};
	},

	computed: {
		pageTitle() {
			return this.user?.name
				? this.user.name.first + ' ' + this.user.name.last + ' | Visor de Usuarios'
				: 'Detalle de un usuario';
		},

		userLocation() {
			return this.user?.location.street.name + ' ' + this.user?.location.street.number + ', ' + this.user?.location.city;
		},

		center() {
			return {
				lat: parseFloat(this.user?.location.coordinates.latitude),
				lng: parseFloat(this.user?.location.coordinates.longitude)
			};
		},

		markers() {
			return [
				{
					position: {
						lat: parseFloat(this.user?.location.coordinates.latitude),
						lng: parseFloat(this.user?.location.coordinates.longitude)
					},
					infoText: this.userLocation
				}
			];
		},

		isFavorite() {
			return this.user?.isFavorite;
		},

		userFullName() {
			return this.user?.name.title + ' ' + this.user?.name.first + ' ' + this.user?.name.last;
		}
	},

	created() {
		const users = localStorage.getItem('users');
		if (users) {
			[this.user] = JSON.parse(users)
				.filter(user => user.login.username === this.$route.params.id);

			this.checkInFavorites();

			this.loading = false;
		} else {
			//TODO
		}
	},

	methods: {
		checkInFavorites() {
			let favorites = [];
			const rawFavorites = localStorage.getItem('favorites');
			if(rawFavorites) {
				favorites = JSON.parse(rawFavorites);
				let [user] = favorites.filter(user => user.login.username === this.$route.params.id);
				if(user) {
					this.user = user;
					this.user.isFavorite = true;
				}
			}
		},

		toggleInfoWindow(marker, index) {
			this.infoWindowPos = marker.position;
			this.infoOptions.content = marker.infoText;

			//check if its the same marker that was selected, if yes, then toggle it
			if (this.currentMidx == index) {
				this.infoWinOpen = !this.infoWinOpen;
			} else {
				//if it is different marker set info window to open and reset current marker index
				this.infoWinOpen = true;
				this.currentMidx = index;
			}
		},

		toggleFavorite() {
			if(this.user.hasOwnProperty('isFavorite')) {
				this.user.isFavorite = !this.user.isFavorite;
			} else {
				this.user.isFavorite = true;
			}
			this.snackbar = true;

			//TODO delete this when there is backend
			let favorites = [];
			const rawFavorites = localStorage.getItem('favorites');
			if(rawFavorites || rawFavorites.length) {
				favorites = JSON.parse(rawFavorites);
				favorites = favorites.filter(user => user.email !== this.user.email);
			}

			if(this.user.isFavorite) {
				favorites.push(this.user);
			}
			localStorage.setItem('favorites', JSON.stringify(favorites));
			//TODO send info to backend
		}
	}
};
</script>

<style lang="scss" scoped>

</style>
