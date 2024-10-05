import { ref } from 'vue'

const showControls = ref(false)
const opacity = ref(0.7)
const scale = ref(1)

function toggleShowControls() {
	showControls.value = !showControls.value
}

export function useControls() {
	return {
		opacity,
		scale,
		showControls,
		toggleShowControls,
	}
}
