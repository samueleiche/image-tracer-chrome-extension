<template>
	<div class="ito-control-field">
		<div v-if="label" class="ito-control-field-label">
			{{ label }}
		</div>

		<slot />

		<div v-if="error" class="ito-control-field-error">
			{{ error }}
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps<{
	label?: string
	error?: string
}>()
</script>

<style scoped>
.ito-control-field {
	width: 100%;
	padding: 4px 8px;
}

.ito-control-field-label {
	font-size: 12px;
	margin-bottom: 4px;
	color: #334155;
	user-select: none;
}

.ito-control-field-error {
	font-size: 12px;
	margin-top: 4px;
	color: #cc0000;
}
</style>
