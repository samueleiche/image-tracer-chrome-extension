<template>
	<div :class="['tracer-container', { 'tracer-container--controls-visible': showControls }]">
		<div class="tracer-overlay" :style="{ opacity }">
			<TracerImage v-if="imageSrc" :src="imageSrc" />
		</div>

		<ControlsMenu>
			<ControlFieldGroup>
				<ImagePicker @change="imageSrc = $event" />
				<ImageFetcher @change="imageSrc = $event" />
			</ControlFieldGroup>

			<ControlFieldGroup>
				<RangeField :label="`Opacity ${opacity}`" :min="0" :max="100" v-model="opacity" />
				<RangeField :label="`Scale ${scale}x`" :min="1" :max="800" v-model="scale" />
				<RangeField :label="`Rotate ${rotation}deg`" :min="-36000" :max="36000" v-model="rotation" />
			</ControlFieldGroup>

			<ControlFieldGroup v-if="imageSrc">
				<TextButton label="Clear image" @click="clearImage" />
				<TextButton label="Reset controls" title="Reset opacity, scale and rotation" @click="resetControls" />
			</ControlFieldGroup>

			<template #footer>
				<div class="controls-helper">
					Tips: scrolling on the image will zoom in and shift+scroll will rotate it when this menu is open.
				</div>
			</template>
		</ControlsMenu>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ControlsMenu from './components/ControlsMenu.vue'
import ControlFieldGroup from './components/ControlFieldGroup.vue'
import TracerImage from './components/TracerImage.vue'
import ImagePicker from './components/ImagePicker.vue'
import ImageFetcher from './components/ImageFetcher.vue'
import RangeField from './components/RangeField.vue'
import TextButton from './components/TextButton.vue'
import { useControls } from './composables/useControls'

const { opacity, scale, showControls, resetControls, rotation } = useControls()

const imageSrc = ref<string | undefined>(undefined)

function clearImage() {
	imageSrc.value = undefined
}
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

.controls-helper {
	font-size: 10px;
	color: #64748b;
}
</style>
