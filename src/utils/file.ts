export function loadFileUrl(fileUrl: string): Promise<string> {
	return new Promise((resolve, reject) => {
		const img = new Image()

		img.onload = () => {
			resolve(img.src)
		}

		img.onerror = () => {
			reject()
		}

		img.src = fileUrl
	})
}

export function loadFileAsUrl(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const canvas = document.createElement('canvas')
		const ctx = canvas.getContext('2d')
		const reader = new FileReader()

		reader.onload = (evt) => {
			const img = new Image()

			img.onload = () => {
				canvas.height = img.naturalHeight
				canvas.width = img.naturalWidth
				ctx?.drawImage(img, 0, 0)

				resolve(canvas.toDataURL('image/jpeg'))
			}

			img.onerror = () => {
				reject()
			}

			if (evt.target?.result) {
				img.src = evt.target.result as string
			}
		}

		reader.readAsDataURL(file)
	})
}
