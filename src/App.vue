<template>
	<div id="ImageTracerContainer" :class="[isAttached ? 'attached-container' : 'fixed-container']">
		<TracerImage v-if="imageSrc" :src="imageSrc" />
	</div>

	<div class="fixed-container">
		<ControlsMenu>
			<ControlFieldGroup>
				<ImagePicker @change="imageSrc = $event" />
				<ImageFetcher @change="imageSrc = $event" />
				<input type="checkbox" :checked="isAttached" v-model="isAttached" />
			</ControlFieldGroup>

			<ControlFieldGroup>
				<RangeField :label="`Opacity ${opacity}`" :min="0" :max="100" v-model="opacity" />
				<RangeField :label="`Scale ${scale}x`" :min="1" :max="800" v-model="scale" />
				<RangeField :label="`Rotate ${rotation}deg`" :min="-36000" :max="36000" v-model="rotation" />
			</ControlFieldGroup>

			<ControlFieldGroup v-if="imageSrc">
				<TextButton label="Clear image" @click="clearImage" />
				<TextButton
					label="Reset image"
					title="Reset position, opacity, scale and rotation"
					@click="resetImage"
				/>
			</ControlFieldGroup>

			<template #footer>
				<div class="controls-helper">
					Tips: Position the image by dragging. Ctrl+Scroll to change zoom. Shift+Scroll to rotate.
				</div>
			</template>
		</ControlsMenu>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import ControlsMenu from './components/ControlsMenu.vue'
import ControlFieldGroup from './components/ControlFieldGroup.vue'
import TracerImage from './components/TracerImage.vue'
import ImagePicker from './components/ImagePicker.vue'
import ImageFetcher from './components/ImageFetcher.vue'
import RangeField from './components/RangeField.vue'
import TextButton from './components/TextButton.vue'
import { useControls } from './composables/useControls'
import { useElementDrag } from './composables/useElementDrag'
import { positionAttachedElementContainer } from './utils/dom'

const { opacity, scale, resetControls, rotation, isAttached } = useControls()
const { resetElementDrag } = useElementDrag()

const imageSrc = ref<string | undefined>(undefined)

function clearImage() {
	imageSrc.value = undefined
}

function resetImage() {
	resetControls()
	resetElementDrag()
}

watch(isAttached, () => {
	if (isAttached.value) {
		positionAttachedElementContainer()
	}
})
</script>

<style>
#ImageTracerMount {
	display: block !important;
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
}

#ImageTracerMount * {
	box-sizing: border-box;
}

:root {
	--image-tracer-attached-x: 0px;
	--image-tracer-attached-y: 0px;
}
</style>

<style scoped>
.fixed-container {
	pointer-events: none;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 9999999999;
}

.attached-container {
	position: absolute;
	top: var(--image-tracer-attached-x);
	left: var(--image-tracer-attached-y);
	width: 100%;
	height: 100%;
	z-index: 9999999999;
	pointer-events: none;
}

.controls-helper {
	font-size: 10px;
	color: #64748b;
}
</style>
