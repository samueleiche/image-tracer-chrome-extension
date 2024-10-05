<template>
	<div :class="['tracer-container', { 'tracer-container--controls-visible': showControls }]">
		<div class="tracer-overlay" :style="{ opacity }">
			<TracerImage v-if="imageSrc" :src="imageSrc" :draggable="showControls" :scale="scale" />
		</div>

		<ControlsMenu>
			<ImagePicker @change="imageSrc = $event" />

			<ImageFetcher @change="imageSrc = $event" />

			<RangeFIeld :label="`Opacity ${opacity}`" :min="0" :max="100" v-model="opacity" />

			<RangeFIeld :label="`Scale ${scale}x`" :min="10" :max="800" v-model="scale" />
		</ControlsMenu>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ControlsMenu from './components/ControlsMenu.vue'
import TracerImage from './components/TracerImage.vue'
import ImagePicker from './components/ImagePicker.vue'
import ImageFetcher from './components/ImageFetcher.vue'
import RangeFIeld from './components/RangeField.vue'
import { useControls } from './composables/useControls'

const { opacity, scale, showControls } = useControls()

const imageSrc = ref<string | undefined>(undefined)
</script>

<style>
#ImageTracerMount {
	display: block !important;
}

#ImageTracerMount * {
	box-sizing: border-box;
}

:root {
	--tracer-theme: red;
	--tracer-theme-light: red;
}
</style>

<style scoped>
.tracer-container {
	pointer-events: none;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	font-family:
		system-ui,
		-apple-system,
		BlinkMacSystemFont,
		'Segoe UI',
		Roboto,
		'Helvetica Neue',
		Arial,
		'Noto Sans',
		sans-serif,
		'Apple Color Emoji',
		'Segoe UI Emoji',
		'Segoe UI Symbol',
		'Noto Color Emoji';
	z-index: 9999999999;
}

.tracer-overlay {
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
}

.tracer-container--controls-visible .tracer-overlay {
	pointer-events: auto;
}
</style>
