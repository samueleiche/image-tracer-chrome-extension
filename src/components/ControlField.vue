<template>
	<div class="control-field">
		<div class="control-field-label">
			{{ label }}
		</div>

		<slot />

		<div v-if="error" class="control-field-error">
			{{ error }}
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps<{
	label: string
	error?: string
}>()
</script>

<style scoped>
.control-field {
	width: 100%;
	border: 1px solid #cbd5e1;
	border-radius: 4px;
	padding: 6px 8px;
}

.control-field-label {
	font-size: 12px;
	margin-bottom: 2px;
	color: #334155;
}

.control-field-error {
	font-size: 12px;
	margin-top: 2px;
	color: #cc0000;
}
</style>
