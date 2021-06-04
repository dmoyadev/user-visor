<template>
	<div>
		<vue-headful :title="pageTitle"/>

		<div>
			<v-avatar
				color="primary"
				size="150"
			>
				<img :src="user.picture.large" :alt="user.name.first + ' ' + user.name.last">
			</v-avatar>

			<GmapMap
				v-if="user"
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
</template>

<script>
export default {
	name: "UserDetail",

	data() {
		return {
			user: null,
			center: {
				lat: this.user?.location.coordinates.latitude,
				lng: this.user?.location.coordinates.longitude
			},
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
			markers: [
				{
					position: {
						lat: this.user?.location.coordinates.latitude,
						lng: this.user?.location.coordinates.longitude
					},
					infoText: this.userLocation
				}
			]
		};
	},

	computed: {
		pageTitle() {
			return this.user?.name
				? this.user.name.first + ' ' + this.user.name.last + ' | Visor de Usuarios'
				: 'Detalle de un usuario';
		},

		userLocation() {
			return this.user.location.street + ', ' + this.user.location.city;
		}
	},

	created() {
		const users = localStorage.getItem('users');
		if (users) {
			[this.user] = JSON.parse(users)
				.filter(user => user.login.username === this.$route.params.id);
			this.loading = false;
		} else {
			//TODO
		}
	},

	methods: {
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
		}
	}
};
</script>

<style lang="scss" scoped>

</style>
