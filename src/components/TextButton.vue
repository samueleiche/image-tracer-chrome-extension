<template>
	<div class="text-button" @click="emit('click')">{{ label }}</div>
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
.text-button {
	padding: 6px;
	font-size: 12px;
	font-weight: 700;
	text-align: center;
	cursor: pointer;
	color: #b91c1c;
	user-select: none;
}

.text-button:hover {
	color: #991b1b;
}
</style>
