<template>
	<slot :openFilePicker="openFilePicker"></slot>
	<input type="file" accept="image/*" style="display: none" ref="fileInput" @change="onFileChange" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
	(e: 'update:modelValue', files: File[]): void
}>()

const fileInput = ref<HTMLInputElement | null>(null)

const onFileChange = (event: Event) => {
	const target = event.target as HTMLInputElement

	if (target.files) {
		emit('update:modelValue', Array.from(target.files))
	}
}

const openFilePicker = () => {
	fileInput.value?.click()
}
</script>
