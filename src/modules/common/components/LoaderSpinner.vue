<template>
  <div class="flex justify-center mt-10">
    <span class="loader"></span>
  </div>
</template>

<style lang="css" scoped>
.loader {
  width: 48px;
  height: 48px;
  border: 5px solid #1e1e1e;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
