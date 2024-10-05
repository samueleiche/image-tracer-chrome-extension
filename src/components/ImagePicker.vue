<template>
	<ControlField label="Upload image">
		<button type="button" @click="openFilePicker">Browse</button>
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
	} catch (err) {
		console.error('Failed to load file')
	}
}

function openFilePicker() {
	inputRef.value?.click()
}
</script>
