import { ref } from 'vue'

const showControls = ref(false)
const opacity = ref(0.7)
const scale = ref(1)
const rotation = ref(0)

function toggleShowControls() {
	showControls.value = !showControls.value
}

export function useControls() {
	return {
		opacity,
		scale,
		rotation,
		showControls,
		toggleShowControls,
	}
}
