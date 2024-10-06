<template>
	<ControlField>
		<div class="ito-switch-field" @click="$emit('update:modelValue', !modelValue)">
			<div class="ito-switch-field-label">
				{{ label }}
			</div>
			<div class="ito-switch">
				<div :class="['ito-switch-button', { 'ito-switch-button--on': modelValue }]">
					<div class="ito-switch-knob" />
				</div>
			</div>
		</div>
	</ControlField>
</template>

<script setup lang="ts">
import ControlField from './ControlField.vue'

defineEmits<{
	(e: 'update:modelValue', value: boolean): void
}>()

defineProps<{
	label: string
	modelValue: boolean
}>()
</script>

<style scoped>
.ito-switch-field {
	display: flex;
	cursor: pointer;
}

.ito-switch-field-label {
	display: flex;
	align-items: center;
	font-size: 12px;
	color: #334155;
	user-select: none;
	flex-grow: 1;
}

.ito-switch {
	display: flex;
	align-items: center;
	flex-shrink: 0;
}

.ito-switch-button {
	position: relative;
	flex-shrink: 0;
	width: 40px;
	height: 20px;
	background-color: #cbd5e1;
	border: 1px solid #cbd5e1;
	border-radius: 999px;
}

.ito-switch-button--on {
	background-color: #06b6d4;
	border-color: #06b6d4;
}

.ito-switch-button--on .ito-switch-knob {
	left: calc(100% - 18px);
}

.ito-switch-knob {
	position: absolute;
	left: 0;
	height: 18px;
	width: 18px;
	border-radius: 999px;
	background-color: white;
	border: 1px solid white;
}
</style>
