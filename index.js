const root = document.createElement('div')
root.setAttribute('id', 'ImageTracerMount')
document.body.appendChild(root)

const BaseMenu = {
    data() {
        return {
            isOpen: false,
        }
    },
    methods: {
        toggle() {
            this.isOpen = !this.isOpen
            this.$emit('toggle', this.isOpen)
        },
    },
    template: `
        <div class="tracer-menu">
            <button class="tracer-menu-btn" @click="toggle">☰</button>
            <transition name="scale-in" mode="out-in">
                <div v-show="isOpen" class="tracer-menu-content">
                    <slot></slot>
                </div>
            </transition>
        </div>
    `
}
const BaseImage = {
    props: {
        src: String,
        draggable: Boolean,
        scale: Number,
    },
    data() {
        return {
            el: null,
            isMousedown: false,
            drag: {
                initialX: 0,
                initialY: 0,
                currentX: 0,
                currentY: 0,
                offsetX: 0,
                offsetY: 0,
            },
        }
    },
    computed: {
        eventsEnabled() {
            return this.src && this.draggable
        },
        computedTransform() {
            if (!this.el) return null
            const x = this.drag.currentX
            const y = this.drag.currentY
            return {
                transform: `translate3d(${x}px, ${y}px, 0) scale(${this.scale}, ${this.scale})`
            }
        },
    },
    mounted() {
        this.el = this.$el
    },
    methods: {
        mousedown({ clientX, clientY }) {
            this.drag.initialX = clientX - this.drag.offsetX
            this.drag.initialY = clientY - this.drag.offsetY
            this.isMousedown = true
        },
        mousemove({ clientX, clientY }) {
            if (!this.isMousedown) return
            this.drag.currentX = clientX - this.drag.initialX
            this.drag.currentY = clientY - this.drag.initialY
            this.drag.offsetX = this.drag.currentX
            this.drag.offsetY = this.drag.currentY
        },
        mouseup({ clientX, clientY }) {
            this.drag.initialX = clientX
            this.drag.initialY = clientY
            this.isMousedown = false
        },
    },
    template: `
        <img
            :src="src"
            :style="computedTransform"
            draggable="false"
            class="tracer-image"
            v-on="eventsEnabled ? { mousedown, mousemove, mouseup } : null"
        />
    `
}
const ImagePicker = {
    functional: true,
    props: {
        value: {
            type: Array,
            default: () => []
        },
    },
    render(h, { data, listeners, scopedSlots }) {
        const input = h('input', {
            domProps: {
                value: ''
            },
            attrs: {
                ...data.attrs,
                type: 'file',
                accept: 'image/*'
            },
            style: {
                display: 'none'
            },
            on: {
                change: event => listeners.input([...event.target.files])
            }
        })

        const openFilePicker = () => input.elm.click()

        const slot = scopedSlots.default({ openFilePicker })

        return h('div', [slot, input])
    }
}
const ImageFetcher = {
    props: {
        value: {
            type: Array,
            default: () => []
        },
    },
    data() {
        return {
            message: '',
        }
    },
    methods: {
        onChange($event) {
            const img = new Image()
            this.message = ''

            img.onload = () => {
                this.$emit('input', [img.src])
            }

            img.onerror = (e) => {
                this.$emit('error')
                this.message = 'Failed to fetch image'
            }

            img.src = $event.target.value
        },
    },
    template: `
        <div>
            <input class="tracer-fetcher" type="text" @change="onChange" />
            <small class="tracer-error">{{ message }}</small>
        </div>
    `
}
const RangeInput = {
    props: {
        value: Number,
        min: Number,
        max: Number,
    },
    computed: {
        computedValue() {
            return this.value * 100
        },
    },
    methods: {
        onInput($event) {
            this.$emit('input', $event.target.value / 100)
        },
    },
    template: `
        <input
            class="tracer-range"
            type="range"
            :min="min"
            :max="max"
            :value="computedValue"
            @input="onInput"
        />
    `
}

const Extension = Vue.extend({
    components: {
        BaseMenu,
        BaseImage,
        ImagePicker,
        ImageFetcher,
        RangeInput,
    },
    data() {
        return {
            files: [],
            source: null,
            opacity: 0.5,
            scale: 1,
            isEditmode: false,
        }
    },
    watch: {
        files() {
            if (!this.files.length) return

            const file = this.files[0]

            // from FileFetcher
            if (typeof file === 'string') {
                this.source = file
                return
            }

            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            const reader = new FileReader()

            reader.onload = (evt) => {
                const img = new Image()

                img.onload = () => {
                    canvas.height = img.naturalHeight
                    canvas.width = img.naturalWidth
                    ctx.drawImage(img, 0, 0)
                    this.source = canvas.toDataURL('image/jpeg')
                }

                img.src = evt.target.result
            }

            reader.readAsDataURL(file)
        }
    },
    methods: {
        onToggle(isOpen) {
            this.isEditmode = isOpen
        },
    },
    template: `
        <div :class="['tracer-container', { editable: isEditmode }]">
            <div class="tracer-overlay" :style="{ opacity }">
                <base-image
                    :src="source"
                    :draggable="isEditmode"
                    :scale="scale"
                />
            </div>
            <base-menu @toggle="onToggle">
                <p>Choose Image</p>
                <image-picker v-model="files">
                    <template v-slot="{ openFilePicker }">
                        <button type="button" @click="openFilePicker">Browse</button>
                    </template>
                </image-picker>

                <p>Enter image URL</p>
                <image-fetcher v-model="files" />

                <p>Image opacity {{ opacity }}</p>
                <range-input :min="0" :max="100" v-model="opacity" />

                <p>Image scale {{ scale }}x</p>
                <range-input :min="10" :max="800" v-model="scale" />
            </base-menu>
        </div>
    `
})

new Extension().$mount(root)
