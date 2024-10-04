<template>
	<div>
		<input class="tracer-fetcher" type="text" @change="onChange" />
		<small class="tracer-error">{{ message }}</small>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
	(e: 'update:modelValue', value: string[]): void
	(e: 'error'): void
}>()

const message = ref<string>('')

const onChange = (event: Event) => {
	const target = event.target as HTMLInputElement
	const img = new Image()
	message.value = ''

	img.onload = () => {
		emit('update:modelValue', [img.src])
	}

	img.onerror = () => {
		emit('error')
		message.value = 'Failed to fetch image'
	}

	img.src = target.value
}
</script>
