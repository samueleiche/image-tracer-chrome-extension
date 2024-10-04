<template>
	<div class="tracer-menu">
		<button class="tracer-menu-btn" @click="toggle">☰</button>
		<transition name="scale-in" mode="out-in">
			<div v-show="isOpen" class="tracer-menu-content">
				<slot></slot>
			</div>
		</transition>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
	(e: 'toggle', value: boolean): void
}>()

const isOpen = ref(false)

const toggle = () => {
	isOpen.value = !isOpen.value
	emit('toggle', isOpen.value)
}
</script>
