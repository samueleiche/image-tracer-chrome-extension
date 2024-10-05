<template>
	<ControlField :label="label">
		<input
			type="range"
			class="range-control"
			:min="props.min"
			:max="props.max"
			:value="computedValue"
			@input="onInput"
		/>
	</ControlField>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ControlField from './ControlField.vue'

const emit = defineEmits<{
	(e: 'update:modelValue', value: number): void
}>()

const props = defineProps<{
	label: string
	modelValue: number
	min: number
	max: number
}>()

const computedValue = computed(() => props.modelValue * 100)

function onInput(event: Event) {
	const target = event.target as HTMLInputElement

	emit('update:modelValue', Number(target.value) / 100)
}
</script>

<style scoped>
.range-control {
	width: 100%;
	margin: 0;
	padding: 0;
	border: 0;
}
</style>
