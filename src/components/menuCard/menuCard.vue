<i18n>
{
  "en": {
    "10": "Select"
  },
  "zh": {
    "10": "选择"
  }
}
</i18n>
<template>
<div :class="$style['card']">
  <Space height="24"/>
  <span :class="$style['img']">🍣</span>
  <Space height="10"/>
  <p :class="$style['title']">{{content.title}}</p>
  <Space height="4"/>
  <p :class="$style['sub-title']" v-html="content.subTitle"></p>
  <Space height="19"/>
  <p :class="$style['btn']" @click="content.onTab(content)">{{$t('10')}}</p>
  <Space height="15"/>
  <p :class="$style['gap']"></p>
  <Space height="6"/>
  <div :class="$style['apy']">
    <span>APY</span>
    <span>{{content.apy}} %</span>
  </div>
</div>
</template>

<script>
import Space from '../../components/space/space.vue'
export default {
  name: 'MenuCard',
  components: {
    Space
  },
  props: {
    content: Object,
  },
};
</script>

<style lang="scss" module>
.card{
  width: 328px;
  height: 310px;
  background: #000000;
  border-radius: 24px;
  padding: 25px 24px;
  text-align: center;
  margin-bottom: 32px;
  .img{
    font-size: 65px;
  }
  .title{
    font-family: Inter-Regular, Inter;
  }
  .sub-title{
    font-family: Inter-Regular, Inter;
    color: #4A4A4A;
    line-height: 23px;
  }
  .btn{
    width: 283px;
    height: 44px;
    background: #99CCFF;
    border-radius: 4px;
    color: #4A4A4A;
    line-height: 44px;
    cursor: pointer;
    :hover{
      background: #5eaeff;
    }
  }
  .gap{
    border-bottom: 1px solid #1D1D1D;
  }
  .apy{
    display: flex;
    justify-content: space-between;
    :nth-child(1){
      font-family: Inter-Regular, Inter;
      color: #4A4A4A;
    }
    :nth-child(2){
      font-family: OriyaMN;
      color: #99CCFF;
    }
  }
}
</style>