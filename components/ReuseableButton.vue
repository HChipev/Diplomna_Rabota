<template>
  <button type="button"><slot></slot></button>
</template>
<script setup></script>
<style lang="scss">
  .menu-button {
    color: $primery-color;
    background: none;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    > svg {
      min-height: 20px;
      min-width: 20px;
    }
  }
  .accent-button {
    min-height: 50px;
    color: $primery-color;
    border: 1px solid $primery-darker-color;
    border-radius: 1em;
    background: $primery-darker-color;
    font-size: 28px;
    transition: all 0.5s ease;
    &:hover {
      background: $primery-darker-color;
      background: linear-gradient(
        90deg,
        $primery-darker-color 5%,
        $accent-color 50%,
        $primery-darker-color 95%
      );
      box-shadow: -0.4em 0.5em 0.6em -0.3em black;
      transform: translateY(-0.25em) translateX(0.25em);
    }
  }

  .primery-button {
    min-height: 50px;
    color: $primery-color;
    border: 1px solid $accent-color;
    border-radius: 1em;
    background: $accent-color;
    font-size: 28px;
    transition: all 0.5s ease;
    &:hover {
      background: $primery-darker-color;
      border-color: $primery-darker-color;
      box-shadow: -0.4em 0.5em 0.6em -0.3em black;
      transform: translateY(-0.25em) translateX(0.25em);
    }
  }
  .disabled {
    min-height: 50px;
    color: $primery-color;
    border: 1px solid $accent-color;
    border-radius: 1em;
    background: $accent-color;
    font-size: 28px;
    transition: all 0.5s ease;
    &:hover {
      animation: shake 1500ms ease-in-out infinite;
    }
  }
  .dropdown-button {
    min-height: 30px;
    background: $primery-color;
    color: $black;
    border: 1px solid $primery-color;
    border-radius: $border-radius;
    transition: all 0.5s ease;

    &:hover {
      background-color: $accent-color;
      color: $primery-color;
      border-color: $accent-color;
      transform: translateY(0.25em);
    }
    &.active {
      &:hover {
        transform: translateY(-0.25em);
      }
    }
  }
  .primery-button-nav {
    color: $primery-color;
    background: $primery-darker-color;
    border: 1px solid $primery-darker-color;
    border-radius: $card-border-radius;
    transition: all 0.5s ease;
    &.not-active {
      border-color: $primery-gray-color;
      background: $primery-gray-color;
      &:hover {
        background: $accent-color;
        color: $primery-color;
        border-color: $accent-color;
        box-shadow: -0.3em 0.35em 0.7em -0.2em $black;
        transform: translateY(-0.1em) translateX(0.1em);
      }
    }
  }
  @keyframes shake {
    10% {
      transform: translateX(0);
    }
    20% {
      transform: translateX(-0.3em);
    }
    40% {
      transform: translateX(0.3em);
    }
    60% {
      transform: translateX(-0.3em);
    }
    80% {
      transform: translateX(0.3em);
    }
    90% {
      transform: translateX(0);
    }
  }
</style>
