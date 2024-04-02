<template>
  <svg class="timer" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="timer-circle">
      <circle class="timer-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        :stroke-dasharray="circleDasharray"
        class="timer-remaining arc"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
</template>

<script setup lang="ts">
defineProps({
  circleDasharray: String,
  color: String
})
</script>

<style scoped>
.timer {
  width: 90vw;
  --color-primary: v-bind(color);
}

.timer-circle {
  fill: none;
  stroke: none;
}

.timer-elapsed {
  stroke-width: 3px;
  stroke: #353535;
}

.timer-remaining {
  stroke-width: 3px;
  stroke-linecap: round;
  transform: rotate(90deg);
  transform-origin: center;
  transition: 1s linear all,
              350ms ease-in-out color;
              
  fill-rule: nonzero;
  stroke: currentColor;
}

.timer-remaining.arc {
  color: var(--color-primary);
}

</style>