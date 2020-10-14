<template>
<p :class="$style['sub-title']" :style="{'width': `${width}px`}">{{subTitle}}</p>
</template>

<style lang="scss" module>
  .sub-title{
    font-size: 16px;
    font-family: Inter-Regular_Light, Inter;
    font-weight: normal;
    color: #FFFFFF;
    line-height: 24px;
  }
</style>

<script>
export default {
  name: 'SubTitle',
  props: {
    subTitle: String,
    width: String
  }
};
</script>