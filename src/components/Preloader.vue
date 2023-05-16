<template>
  <div id="loader">
    <div class="loader">
      <svg viewBox="0 0 80 80">
        <circle id="test" cx="40" cy="40" r="32"></circle>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "PreLoader",
};
</script>

<style scoped>
#loader {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ecf1f6;
  z-index: 111;
}

.loader {
  width: 44px;
  height: 44px;
  position: relative;
  z-index: 11111 !important;
}
.loader:before {
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 50%;
  position: absolute;
  display: block;
  background: #1a1f3a;
  top: 37px;
  left: 19px;
  transform: translate(-18px, -18px);
  animation: dotRect 3s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
}
.loader svg {
  display: block;
  width: 100%;
  height: 100%;
}
.loader svg rect,
.loader svg polygon,
.loader svg circle {
  fill: none;
  stroke: #46c0e7;
  stroke-width: 10px;
  stroke-linejoin: round;
  stroke-linecap: round;
}
.loader svg circle {
  stroke-dasharray: 150 50 150 50;
  stroke-dashoffset: 75;
  animation: pathCircle 3s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
}

@keyframes dotRect {
  25% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(18px, -18px);
  }
  75% {
    transform: translate(0, -36px);
  }
  100% {
    transform: translate(-18px, -18px);
  }
}
@keyframes pathCircle {
  25% {
    stroke-dashoffset: 125;
  }
  50% {
    stroke-dashoffset: 175;
  }
  75% {
    stroke-dashoffset: 225;
  }
  100% {
    stroke-dashoffset: 275;
  }
}
.loader {
  display: inline-block;
  margin: 0 16px;
}
</style>