<template>
	<ControlField label="Upload image">
		<div class="ito-upload-button" @click="openFilePicker">Browse</div>
		<input ref="inputRef" type="file" accept="image/*" style="display: none" @change="onFileUpload" />
	</ControlField>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { loadFileAsUrl } from '../utils/file'
import ControlField from './ControlField.vue'

const emit = defineEmits<{
	(e: 'change', fileUrl: string): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)

async function onFileUpload(event: Event) {
	const target = event.target as HTMLInputElement
	const files = target.files || []
	const [file] = files

	try {
		const fileUrl = await loadFileAsUrl(file)
		emit('change', fileUrl)
		target.value = ''
	} catch (err) {
		console.error('Failed to load file')
	}
}

function openFilePicker() {
	inputRef.value?.click()
}
</script>

<style scoped>
.ito-upload-button {
	padding: 8px 12px;
	font-size: 12px;
	background-color: #06b6d4;
	border-radius: 8px;
	color: white;
	font-weight: 700;
	text-align: center;
	cursor: pointer;
}

.ito-upload-button:hover {
	background-color: #0284c7;
}
</style>
