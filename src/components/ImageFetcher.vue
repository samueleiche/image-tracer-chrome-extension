<template>
	<ControlField label="Paste image address" :error="errorMessage">
		<input
			type="text"
			placeholder="Press enter to submit"
			class="input-control"
			@input="onInput"
			@change="onChange"
			@paste="onPaste"
		/>
	</ControlField>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { loadFileUrl } from '../utils/file'
import ControlField from './ControlField.vue'

const emit = defineEmits<{
	(e: 'change', fileUrl: string): void
}>()

const errorMessage = ref('')

function onInput() {
	errorMessage.value = ''
}

function onPaste() {
	errorMessage.value = ''
}

async function onChange(event: Event) {
	const target = event.target as HTMLInputElement
	const inputValue = target.value

	if (!inputValue) {
		return
	}

	try {
		const fileUrl = await loadFileUrl(inputValue)
		emit('change', fileUrl)
		target.value = ''
	} catch (err) {
		console.error('Failed to load file')

		errorMessage.value = 'Failed to fetch image'
	}
}
</script>

<style scoped>
.input-control {
	appearance: none;
	padding: 4px 8px;
	margin: 0;
	font-size: 12px;
	border-radius: 8px;
	border: 1px solid #cbd5e1;
	background-color: white;
	width: 100%;
}

.input-control:focus {
	outline: none;
	box-shadow: inset 0 0 0 1px #06b6d4;
	border-color: #06b6d4;
}

.input-control::placeholder {
	color: #64748b;
}

.input-control,
.input-control::placeholder {
	font-size: 12px;
	font-family: inherit;
}
</style>
