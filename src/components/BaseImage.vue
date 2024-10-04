<template>
	<img
		ref="imgRef"
		:src="props.src"
		:style="computedTransform"
		draggable="false"
		class="tracer-image"
		v-on="eventsEnabled ? { mousedown, mousemove, mouseup } : {}"
	/>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

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
	draggable: boolean
	scale: number
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

const eventsEnabled = computed(() => props.src && props.draggable)

const computedTransform = computed(() => {
	if (!imgRef.value) {
		return null
	}

	const x = drag.value.currentX
	const y = drag.value.currentY

	return {
		transform: `translate3d(${x}px, ${y}px, 0) scale(${props.scale}, ${props.scale})`,
	}
})

const mousedown = (event: MouseEvent) => {
	drag.value.initialX = event.clientX - drag.value.offsetX
	drag.value.initialY = event.clientY - drag.value.offsetY
	isMousedown.value = true
}

const mousemove = (event: MouseEvent) => {
	if (!isMousedown.value) return
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
