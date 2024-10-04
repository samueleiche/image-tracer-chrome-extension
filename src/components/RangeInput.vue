<template>
	<input
		class="tracer-range"
		type="range"
		:min="props.min"
		:max="props.max"
		:value="computedValue"
		@input="onInput"
	/>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
	modelValue: number
	min: number
	max: number
}>()

const emit = defineEmits<{
	(e: 'update:modelValue', value: number): void
}>()

const computedValue = computed(() => props.modelValue * 100)

const onInput = (event: Event) => {
	const target = event.target as HTMLInputElement
	emit('update:modelValue', Number(target.value) / 100)
}
</script>
