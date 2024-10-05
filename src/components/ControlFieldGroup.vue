<template>
	<div class="control-field-group">
		<slot />
	</div>
</template>

<style scoped>
.control-field-group {
	display: grid;
	gap: 8px;
	width: 100%;
	padding: 12px 8px;
	border-radius: 16px;
	border: 1px solid #cbd5e1;
}
</style>
