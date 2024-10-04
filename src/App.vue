<template>
	<div :class="['tracer-container', { editable: isEditmode }]">
		<div class="tracer-overlay" :style="{ opacity }">
			<BaseImage v-if="source" :src="source" :draggable="isEditmode" :scale="scale" />
		</div>
		<BaseMenu @toggle="onToggle">
			<p>Choose Image</p>
			<ImagePicker v-model="files">
				<template v-slot="{ openFilePicker }">
					<button type="button" @click="openFilePicker">Browse</button>
				</template>
			</ImagePicker>

			<p>Enter image URL</p>
			<ImageFetcher v-model="files" />

			<p>Image opacity {{ opacity }}</p>
			<RangeInput :min="0" :max="100" v-model="opacity" />

			<p>Image scale {{ scale }}x</p>
			<RangeInput :min="10" :max="800" v-model="scale" />
		</BaseMenu>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseMenu from './components/BaseMenu.vue'
import BaseImage from './components/BaseImage.vue'
import ImagePicker from './components/ImagePicker.vue'
import ImageFetcher from './components/ImageFetcher.vue'
import RangeInput from './components/RangeInput.vue'

const files = ref<(File | string)[]>([])
const source = ref<string | null>(null)
const opacity = ref(0.5)
const scale = ref(1)
const isEditmode = ref(false)

watch(files, (newFiles) => {
	if (!newFiles.length) return

	const file = newFiles[0]

	// from ImageFetcher (URL input)
	if (typeof file === 'string') {
		source.value = file
		return
	}

	const canvas = document.createElement('canvas')
	const ctx = canvas.getContext('2d')
	const reader = new FileReader()

	reader.onload = (evt) => {
		const img = new Image()

		img.onload = () => {
			canvas.height = img.naturalHeight
			canvas.width = img.naturalWidth
			ctx?.drawImage(img, 0, 0)
			source.value = canvas.toDataURL('image/jpeg')
		}

		if (evt.target?.result) {
			img.src = evt.target.result as string
		}
	}

	reader.readAsDataURL(file)
})

const onToggle = (isOpen: boolean) => {
	isEditmode.value = isOpen
}
</script>

<style>
#ImageTracerMount {
	display: block !important;
}

:root {
	--tracer-theme: #5c34fa;
	--tracer-theme-light: #8364fd;
}

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
	z-index: 99999999;
}

.tracer-overlay {
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
}
.editable .tracer-overlay {
	pointer-events: auto;
}
.editable .tracer-image {
	cursor: grab;
}

.tracer-menu {
	pointer-events: auto;
	position: absolute;
	bottom: 70px;
	right: 70px;
	display: flex;
	flex-direction: column;
}
.tracer-menu-btn {
	display: inline-block;
	height: 55px;
	width: 55px;
	border: 0;
	margin: 0;
	padding: 0;
	line-height: 1.15;
	font-size: 24px;
	border-radius: 999px;
	appearance: none;
	cursor: pointer;
	background-color: var(--tracer-theme);
	color: white;
	transition: background-color 0.1s;
	box-shadow:
		0 10px 15px -3px rgba(0, 0, 0, 0.1),
		0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
.tracer-menu-btn:focus {
	outline: none;
}
.editable .tracer-menu-btn,
.tracer-menu-btn:hover {
	background-color: var(--tracer-theme-light);
}
.tracer-menu-content {
	position: absolute;
	bottom: 100%;
	width: 240px;
	right: 0;
	transform-origin: bottom right;
	padding: 16px 16px 24px;
	background-color: white;
	box-shadow:
		0 4px 6px -1px rgba(0, 0, 0, 0.1),
		0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.tracer-menu-content p {
	font-size: 14px;
	margin-bottom: 6px;
}
.tracer-menu-content input {
	width: 100%;
}

.scale-in-enter-active,
.scale-in-leave-active {
	transition:
		transform 0.2s,
		opacity 0.1s;
}
.scale-in-enter,
.scale-in-leave-to {
	opacity: 0;
	transform: scale(0.6, 0.6);
}

.tracer-image {
	position: relative;
	transform-origin: center center;
	user-select: none;
}

.tracer-error {
	margin: 0;
	font-size: 12px;
	color: #cc0000;
}
</style>

<style scoped></style>
