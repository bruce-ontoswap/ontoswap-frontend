<template>
<div :class="$style['card']">
  <p :class="$style['title']">{{content.title}}</p>
  <p :class="$style['number']">
    <CountUp :endVal="content.number" :lock="content.lock" />
  </p>
  <div :class="$style['sub-card']">
    <p :class="$style['sub-title']">{{content.subTitle}}</p>
    <p :class="$style['sub-number']">
      <CountUp :endVal="content.subNumber" :lock="content.lock" /> YFO</p>
  </div>
</div>
</template>

<style lang="scss" module>
.card{
  width: 441px;
  height: 180px;
  background: #000000;
  border-radius: 24px;
  padding: 25px 24px;
  .title{
    font-family: Inter-Regular_Light, Inter;
    color: #4A4A4A;
  }
  .number{
    font-size: 44px;
    font-family: OriyaMN;
    color: #99CCFF;
    line-height: 72px;
    border-bottom: 1px solid #1D1D1D;
  }
  .sub-card{
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
    .sub-title{
      font-family: Inter-Regular_Light, Inter;
      color: #4A4A4A;
    }
    .sub-number{
      font-family: OriyaMN;
      color: #99CCFF;
    }
  }
}
</style>

<script>
import CountUp from '../countup/countUp'
export default {
  name: 'BalanceCard',
  props: {
    content: Object,
  },
  components: {
    CountUp
  },
};
</script>