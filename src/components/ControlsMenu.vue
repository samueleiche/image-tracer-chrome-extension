<template>
	<div class="controls-menu">
		<Transition name="menu-transition" mode="out-in">
			<div v-show="showControls" class="controls-menu-content">
				<slot />

				<div class="controls-menu-content-footer">
					<slot name="footer" />
				</div>
			</div>
		</Transition>

		<div
			:class="['controls-menu-activator', { 'controls-menu-activator--active': showControls }]"
			tabindex="0"
			@click="toggleShowControls"
		></div>
	</div>
</template>

<script setup lang="ts">
import { useControls } from '../composables/useControls'

const { showControls, toggleShowControls } = useControls()
</script>

<style scoped>
.controls-menu {
	display: flex;
	flex-direction: column;
	pointer-events: auto;
	position: absolute;
	bottom: 32px;
	right: 32px;
}

.controls-menu-activator {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 48px;
	width: 48px;
	border-radius: 24px;
	cursor: pointer;
	background-color: #0ea5e9;
	color: white;
	outline: rgba(255, 255, 255, 0.3) solid 4px;
	background-image: url('../assets/icon.png');
	background-size: 50%;
	background-repeat: no-repeat;
	background-position: center center;
	transition:
		background-color 150ms,
		outline 150ms;
}

.controls-menu-activator:hover {
	background-color: #0284c7;
}

.controls-menu-activator--active {
	background-color: white;
	outline: #cbd5e1 solid 4px;
}

.controls-menu-activator--active:hover {
	background-color: #cbd5e1;
}

.controls-menu-activator--active:focus {
	background-color: white;
}

.controls-menu-content {
	position: absolute;
	right: -16px;
	bottom: -16px;
	display: flex;
	flex-direction: column;
	gap: 16px;
	width: 248px;
	transform-origin: calc(100% - 40px) calc(100% - 40px);
	padding: 16px 16px 80px;
	border-radius: 24px;
	background-color: white;
	outline: rgba(255, 255, 255, 0.3) solid 4px;
}

.controls-menu-content-footer {
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	height: 56px;
	bottom: 12px;
	left: 16px;
	right: 80px;
}

.menu-transition-enter-active,
.menu-transition-leave-active {
	transition:
		transform 200ms,
		opacity 150ms,
		background-color 150ms;
}

.menu-transition-enter-from,
.menu-transition-leave-to {
	opacity: 0;
	transform: scale(0, 0);
	background-color: white;
}
</style>
