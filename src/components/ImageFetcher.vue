<template>
	<ControlField label="Paste file URL" :error="errorMessage">
		<input type="text" placeholder="Paste and Enter" class="input-control" @change="onChange" />
	</ControlField>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { loadFileUrl } from '../utils/file'
import ControlField from './ControlField.vue'

const emit = defineEmits<{
	(e: 'change', fileUrl: string): void
}>()

const errorMessage = ref('err')

async function onChange(event: Event) {
	const target = event.target as HTMLInputElement
	const inputValue = target.value

	errorMessage.value = ''

	try {
		const fileUrl = await loadFileUrl(inputValue)

		emit('change', fileUrl)
	} catch (err) {
		console.error('Failed to load file')

		errorMessage.value = 'Failed to fetch image'
	}
}
</script>

<style scoped>
.input-control {
	appearance: none;
	border: 1px solid #cbd5e1;
	background-color: white;
	padding: 4px 6px;
	font-size: 12px;
}

.input-control:focus {
	outline: none;
	box-shadow: inset 0 0 0 1px #0ea5e9;
	border-color: #0ea5e9;
}

.input-control::placeholder {
	color: #cbd5e1;
}
</style>
