import { reactive, ref } from 'vue'

interface ElementDrag {
	initialX: number
	initialY: number
	currentX: number
	currentY: number
	offsetX: number
	offsetY: number
}

const isPointerDown = ref(false)

const elementDrag = reactive<ElementDrag>({
	initialX: 0,
	initialY: 0,
	currentX: 0,
	currentY: 0,
	offsetX: 0,
	offsetY: 0,
})

function onMousedown(event: MouseEvent) {
	elementDrag.initialX = event.clientX - elementDrag.offsetX
	elementDrag.initialY = event.clientY - elementDrag.offsetY

	isPointerDown.value = true
}

function onMousemove(event: MouseEvent) {
	if (!isPointerDown.value) {
		return
	}

	elementDrag.currentX = event.clientX - elementDrag.initialX
	elementDrag.currentY = event.clientY - elementDrag.initialY
	elementDrag.offsetX = elementDrag.currentX
	elementDrag.offsetY = elementDrag.currentY
}

function onMouseup(event: MouseEvent) {
	elementDrag.initialX = event.clientX
	elementDrag.initialY = event.clientY

	isPointerDown.value = false
}

function resetElementDrag() {
	Object.assign(elementDrag, {
		initialX: 0,
		initialY: 0,
		currentX: 0,
		currentY: 0,
		offsetX: 0,
		offsetY: 0,
	})
}

export function useElementDrag() {
	return {
		elementDrag,
		resetElementDrag,
		dragEvents: {
			mousedown: onMousedown,
			mousemove: onMousemove,
			mouseup: onMouseup,
		},
	}
}
