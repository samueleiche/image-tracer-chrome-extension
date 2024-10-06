<template>
	<div class="ito-text-button" @click="emit('click')">{{ label }}</div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
	(e: 'click'): void
}>()

defineProps<{
	label: string
}>()
</script>

<style scoped>
.ito-text-button {
	padding: 6px;
	font-size: 12px;
	font-weight: 700;
	text-align: center;
	cursor: pointer;
	color: #b91c1c;
	user-select: none;
	flex-grow: 1;
}

.ito-text-button:hover {
	color: #991b1b;
}
</style>
