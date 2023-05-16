<template>
    <img :class="{ 'scale-normal': $store.state.navBar.variant, 'scale-negative': !$store.state.navBar.variant, 'photo-inverted': $vuetify.theme.dark }" style="margin-right: 19px; cursor: pointer; width: 16px; height: 36;" src="@/assets/images/navbar-icon.svg" alt="open navbar icon" title="Open Navbar" @click="$store.dispatch('toggleVariant')"/>
</template>

<script>
export default {
    name: 'NavbarControl'
}
</script>

<style>
.scale-normal {
  transform: scaleX(1);
}

.scale-negative {
  transform: scaleX(-1);
}

.photo-inverted {
  filter: invert(100%);
}
</style>