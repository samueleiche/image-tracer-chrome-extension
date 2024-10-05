<template>
	<img
		ref="imgRef"
		:src="props.src"
		:style="computedTransform"
		draggable="false"
		:class="['tracer-image', { 'tracer-image--draggable': showControls }]"
		v-on="eventHandlers"
	/>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useControls } from '../composables/useControls'

const { showControls, scale, rotation } = useControls()

interface DragState {
	initialX: number
	initialY: number
	currentX: number
	currentY: number
	offsetX: number
	offsetY: number
}

const props = defineProps<{
	src: string
}>()

const imgRef = ref<HTMLElement | null>(null)

const isMousedown = ref(false)
const drag = ref<DragState>({
	initialX: 0,
	initialY: 0,
	currentX: 0,
	currentY: 0,
	offsetX: 0,
	offsetY: 0,
})

const eventHandlers = computed(() => {
	if (props.src && showControls.value) {
		return {
			wheel,
			mousedown,
			mousemove,
			mouseup,
		}
	}

	return {}
})

const wheel = (event: WheelEvent) => {
	if (event.shiftKey) {
		const rotationFactor = event.deltaY > 0 ? 5 : -5
		rotation.value += rotationFactor
	} else {
		const zoomFactor = 0.01 * event.deltaY
		let newScale = scale.value

		newScale -= zoomFactor

		if (newScale < 0.01) {
			newScale = 0.01
		} else if (newScale > 8) {
			newScale = 8
		}

		scale.value = parseFloat(newScale.toFixed(2))
	}

	event.preventDefault()
}

const computedTransform = computed(() => {
	if (!imgRef.value) {
		return undefined
	}

	const x = drag.value.currentX
	const y = drag.value.currentY

	return {
		transform: `translate3d(${x}px, ${y}px, 0) scale(${scale.value}, ${scale.value}) rotate(${rotation.value}deg)`,
	}
})

const mousedown = (event: MouseEvent) => {
	drag.value.initialX = event.clientX - drag.value.offsetX
	drag.value.initialY = event.clientY - drag.value.offsetY
	isMousedown.value = true
}

const mousemove = (event: MouseEvent) => {
	if (!isMousedown.value) {
		return
	}

	drag.value.currentX = event.clientX - drag.value.initialX
	drag.value.currentY = event.clientY - drag.value.initialY
	drag.value.offsetX = drag.value.currentX
	drag.value.offsetY = drag.value.currentY
}

const mouseup = (event: MouseEvent) => {
	drag.value.initialX = event.clientX
	drag.value.initialY = event.clientY
	isMousedown.value = false
}
</script>

<style scoped>
.tracer-image {
	position: relative;
	transform-origin: center center;
	user-select: none;
}

.tracer-image--draggable {
	cursor: grab;
}
</style>
