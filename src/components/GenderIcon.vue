<template>
	<v-tooltip right>
		<template v-slot:activator="{ on, attrs }">
			<v-icon :color="color"
			        v-bind="attrs"
			        v-on="on"
			>
				mdi-gender-{{ gender }}
			</v-icon>
		</template>
		<span>{{ tooltip }}</span>
	</v-tooltip>
</template>

<script>
export default {
	name: 'GenderIcon',
	props: {
		gender: {
			type: String,
			default: 'male'
		}
	},
	computed: {
		color() {
			return this.gender === 'male'
				? 'blue lighten-1'
				: 'pink lighten-2';
		},

		tooltip() {
			return this.gender === 'male'
				? 'Hombre'
				: 'Mujer';
		}
	}
};
</script>

<style scoped>

</style>
