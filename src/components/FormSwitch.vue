<template>
  <div class="input-container">
    <label>{{ name }}</label>
    <div>
      <label class="switch">
        <input
          type="checkbox"
          :checked="props.modelValue"
          @input="emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
        />
        <span class="slider round"></span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: Boolean,
  name: String
})
const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
.input-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 0.5rem;
}

label {
  color: white;
  flex: 1;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 2rem;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #58585b;
  transition: 200ms;
}

.slider:before {
  position: absolute;
  content: '';
  height: calc(2rem * 0.7);
  width: calc(2rem * 0.7);
  left: calc(2rem * 0.2);
  bottom: calc(2rem * 0.15);
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #4772f9;
}

input:focus + .slider {
  box-shadow: 0 0 1px #4772f9;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
