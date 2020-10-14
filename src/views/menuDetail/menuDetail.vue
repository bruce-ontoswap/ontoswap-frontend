<template>
  <div :class="$.menu">
    <Title :title="$t('10')" />
    <Space height="45"/>
    <div :class="$.content">

      <div :class="$.title">
        <SubTitle :subTitle="$t('20')"/>
        <Space height="36"/>
        <p>{{$t('30')}}</p>
        <Space height="36"/>
        <p>{{$t('40')}}</p>
      </div>

      <Space width="32"/>

      <div :class="$.card">
        <Space height="32"/>
        <span :class="$['card-img']">🍣</span>
        <Space height="26"/>
        <p :class="$['card-title']">0.00</p>
        <Space height="4"/>
        <p :class="$['card-sub-title']">SUSHI Earned</p>
        <Space height="22"/>
        <el-button
        >Havest</el-button>
      </div>

      <Space width="32"/>

      <div :class="$.card">
        <Space height="32"/>
        <span :class="$['card-img']">‍🍳</span>
        <Space height="26"/>
        <p :class="$['card-title']">0.00</p>
        <Space height="4"/>
        <p :class="$['card-sub-title']">SUSHI Earned</p>
        <Space height="22"/>
        <el-button
          @click="approve"
        >Approve UNI-ETH SLP</el-button>
      </div>

    </div>
    <Deposit :dialogVisible="false"/>
  </div>
</template>
<style src="./menuDetail.scss" lang="scss" module="$"></style>
<script src="./menuDetail.js"></script>