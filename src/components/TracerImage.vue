<template>
	<div class="ito-tracer-image-wrapper">
		<img
			:src="props.src"
			:style="computedTransform"
			draggable="false"
			class="ito-tracer-image"
			v-on="eventHandlers"
		/>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { StyleValue } from 'vue'
import { useControls } from '../composables/useControls'
import { useElementDrag } from '../composables/useElementDrag'

const { showControls, scale, opacity, rotation } = useControls()
const { elementDrag, dragEvents } = useElementDrag()

const props = defineProps<{
	src: string
}>()

const eventHandlers = computed(() => {
	if (props.src && showControls.value) {
		return {
			wheel: onWheelEvent,
			...dragEvents,
		}
	}

	return {}
})

function onWheelEvent(event: WheelEvent) {
	if (event.ctrlKey) {
		const zoomFactor = 0.01 * event.deltaY
		let newScale = scale.value

		newScale -= zoomFactor

		scale.value = parseFloat(Math.min(Math.max(newScale, 0.01), 8).toFixed(2))
	}

	if (event.shiftKey) {
		const rotationFactor = event.deltaY > 0 ? 3 : -3
		let newRotation = rotation.value + rotationFactor

		rotation.value = Math.min(Math.max(newRotation, -360), 360)
	}

	if (event.shiftKey || event.ctrlKey) {
		event.preventDefault()
	}
}

const computedTransform = computed<StyleValue>(() => {
	return {
		opacity: opacity.value,
		cursor: showControls.value ? 'grab' : undefined,
		pointerEvents: showControls.value ? 'auto' : undefined,
		transform: `
			translate3d(${elementDrag.currentX}px, ${elementDrag.currentY}px, 0) 
			scale(${scale.value}, ${scale.value}) 
			rotate(${rotation.value}deg)
		`,
	}
})
</script>

<style scoped>
.ito-tracer-image {
	position: relative;
	transform-origin: center center;
	user-select: none;
}

.ito-tracer-image-wrapper {
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
}
</style>
