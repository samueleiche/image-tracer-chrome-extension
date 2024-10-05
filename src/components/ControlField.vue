<template>
	<div class="control-field">
		<div v-if="label" class="control-field-label">
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
	padding: 4px 8px;
}

.control-field-label {
	font-size: 12px;
	margin-bottom: 4px;
	color: #334155;
}

.control-field-error {
	font-size: 12px;
	margin-top: 4px;
	color: #cc0000;
}
</style>
