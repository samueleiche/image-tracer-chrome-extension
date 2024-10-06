<template>
	<ControlField :label="label">
		<input
			type="range"
			class="ito-range-control"
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
.ito-range-control {
	width: 100%;
	margin: 0;
	padding: 0;
	border: 0;
}

.ito-range-control {
	font-size: 1.5rem;
	width: 100%;
}

.ito-range-control {
	color: #0ea5e9;
	--thumb-height: 0.8em;
	--track-height: 0.125em;
	--track-color: #cbd5e1;
	--brightness-hover: 120%;
	--brightness-down: 80%;
	--clip-edges: 0.125em;
}

.ito-range-control {
	position: relative;
	background: #fff0;
	overflow: hidden;
}

.ito-range-control:active {
	cursor: grabbing;
}

.ito-range-control,
.ito-range-control::-webkit-slider-runnable-track,
.ito-range-control::-webkit-slider-thumb {
	-webkit-appearance: none;
	transition: all ease 100ms;
	height: var(--thumb-height);
}

.ito-range-control::-webkit-slider-runnable-track,
.ito-range-control::-webkit-slider-thumb {
	position: relative;
}

.ito-range-control::-webkit-slider-thumb {
	--thumb-radius: calc((var(--thumb-height) * 0.5) - 1px);
	--clip-top: calc((var(--thumb-height) - var(--track-height)) * 0.5 - 0.5px);
	--clip-bottom: calc(var(--thumb-height) - var(--clip-top));
	--clip-further: calc(100% + 1px);
	--box-fill: calc(-100vmax - var(--thumb-width, var(--thumb-height))) 0 0 100vmax currentColor;

	width: var(--thumb-width, var(--thumb-height));
	background: linear-gradient(currentColor 0 0) scroll no-repeat left center / 50% calc(var(--track-height) + 1px);
	background-color: currentColor;
	box-shadow: var(--box-fill);
	border-radius: var(--thumb-width, var(--thumb-height));

	filter: brightness(100%);
	clip-path: polygon(
		100% -1px,
		var(--clip-edges) -1px,
		0 var(--clip-top),
		-100vmax var(--clip-top),
		-100vmax var(--clip-bottom),
		0 var(--clip-bottom),
		var(--clip-edges) 100%,
		var(--clip-further) var(--clip-further)
	);
}

.ito-range-control:hover::-webkit-slider-thumb {
	filter: brightness(var(--brightness-hover));
	cursor: grab;
}

.ito-range-control:active::-webkit-slider-thumb {
	filter: brightness(var(--brightness-down));
	cursor: grabbing;
}

.ito-range-control::-webkit-slider-runnable-track {
	background: linear-gradient(var(--track-color) 0 0) scroll no-repeat center / 100% calc(var(--track-height) + 1px);
}
</style>
