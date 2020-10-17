<template>
  <div :class="$.footer">
    <div :class="$.contactus">
      {{$t('10')}}
      <a href="https://medium.com/@ontoswap"><img src="@/assets/image/medium.png" alt=""></a>
      <a href="https://twitter.com/OntoSwap"><img src="@/assets/image/twitter.png" alt=""></a>
      <a href="https://github.com/ontoswap"><img src="@/assets/image/github.png" alt=""></a>
      <a href="https://discord.com/channels/753822804473806956/753822804473806959"><img src="@/assets/image/discord.png" alt=""></a>
    </div>
    <img :class="$.decorate" src="@/assets/image/footer_decorate.png" alt="">
  </div>
</template>
<style src="./footer.scss" lang="scss" module="$"></style>
<script src="./footer.js"></script>