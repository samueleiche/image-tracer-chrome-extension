export function positionAttachedElementContainer() {
	const attachedElement = document.getElementById('ImageTracerOverlayContainer')
	const root = document.querySelector(':root') as HTMLElement

	if (!attachedElement) {
		return
	}

	const elementRect = attachedElement.getBoundingClientRect()
	const scrollTop = window.scrollY || document.documentElement.scrollTop
	const scrollLeft = window.scrollX || document.documentElement.scrollLeft

	root.style.setProperty('--image-tracer-overlay-attached-x', elementRect.top + scrollTop + 'px')
	root.style.setProperty('--image-tracer-overlay-attached-y', elementRect.left + scrollLeft + 'px')
}
