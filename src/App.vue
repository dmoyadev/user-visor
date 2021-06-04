<template>
	<v-app>
		<v-navigation-drawer app permanent class="pt-10">
			<v-list dense nav>
				<v-list-item to="/">
					<v-list-item-icon>
						<v-icon>mdi-view-list</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title>Listado</v-list-item-title>
					</v-list-item-content>
				</v-list-item>

				<v-list-item to="/favorites">
					<v-list-item-icon>
						<v-icon>mdi-creation</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title>Favoritos</v-list-item-title>
					</v-list-item-content>
				</v-list-item>

				<v-list-item to="/about">
					<v-list-item-icon>
						<v-icon>mdi-help</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title>Sobre mí</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-main>
			<v-container fluid>
				<router-view></router-view>
			</v-container>
		</v-main>

		<v-footer app>
			<!-- -->
		</v-footer>
	</v-app>
</template>

<script>

export default {
	name: 'App',

	data: () => ({
		//
	}),
};
</script>
