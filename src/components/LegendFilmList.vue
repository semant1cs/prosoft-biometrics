<template>
  <div class="legend">
    <span>id</span>
    <span class="legend-name">name</span>
    <span>language</span>
    <span>popularity</span>
    <span>release date</span>
    <span>runtime</span>
    <span>budget</span>
    <span>revenue</span>
    <span>status</span>
    <span>rating</span>
  </div>
</template>

<style>
.legend {
  display: grid;
  grid-template-columns: 1.5fr 1.5fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
  padding: 24px 20px;
  max-height: 150px;
  min-width: 100%;
  border-radius: 16px;
  transition-timing-function: ease-out;
  transition-duration: 0.15s;
  transition-property: background-color;
  border: black 1px solid;

  &-name{
    margin-right: 40px;
  }
}
</style>