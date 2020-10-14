<template>
  <div id="app">
    <div :class="$['app-header']">
      <Header />
    </div>
    <div :class="$['app-body']">
      <router-view  />
    </div>
    <div :class="$['app-footer']">
      <Footer />
    </div>
  </div>
</template>
<style lang="scss" module="$">
  :global(#app) {
    position: relative;
    min-height: 100vh;
    max-width: 1440px;
    margin: 0 auto;
  }
  .app-header {
    position: absolute;
    top: 0;
    z-index: 99;
    width: 100%;
    height: $height-header;
  }
  .app-body {
    padding-top: $height-header + $height-between-header-and-container;
  }
  .app-footer {
    position: absolute;
    bottom: 0;
    z-index: 99;
    width: 100%;
    height: $height-footer;
  }
</style>
<script>
  import Header from '@/components/header/header.vue'
  import Footer from '@/components/footer/footer.vue'

  export default {
    name: 'App',
    components: { Header, Footer }
  }
</script>