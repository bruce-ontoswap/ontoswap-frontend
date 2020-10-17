<template>
  <div :class="$.menu">
    <Title :title="`🦄 ${type}`" />
    <Space height="45"/>
    <div :class="$.content">

      <div :class="$.title">
        <SubTitle :subTitle="`${$t('20')} ${type} SLP ${$t('30')} YFO`"/>
        <Space height="36"/>
        <p>{{$t('40')}}</p>
        <Space height="36"/>
        <p>{{`${type} SLP ${$t('50')}`}}</p>
      </div>

      <Space width="32"/>

      <div :class="$.card">
        <Space height="32"/>
        <span :class="$['card-img']">🍣</span>
        <Space height="26"/>
        <p :class="$['card-title']">0.00</p>
        <Space height="4"/>
        <p :class="$['card-sub-title']">YFO {{$t('60')}}</p>
        <Space height="22"/>
        <el-button
          @click="harvest"
          :loading="harvesting"
        >{{$t('70')}}</el-button>
      </div>

      <Space width="32"/>

      <div :class="$.card">
        <Space height="32"/>
        <span :class="$['card-img']">‍🍳</span>
        <Space height="26"/>
        <p :class="$['card-title']">0.00</p>
        <Space height="4"/>
        <p :class="$['card-sub-title']">{{type}} FLP {{$t('80')}}</p>
        <Space height="22"/>
        <div :class="$['btn-box']">
          <el-button
            v-show="isApprove"
            @click="approve"
            :loading="approving"
          >{{$t('90')}} {{type}} SLP</el-button>
          <el-button
            v-if="!isApprove"
            class="btn" 
            @click="unstake"
            :loading="unstaking"
          >{{$t('100')}}</el-button>
          <el-button
            v-if="!isApprove"
            class="btn" 
            @click="stake"
          >+</el-button>
          </div>
      </div>

    </div>
    <Deposit 
      :dialogVisible="deposit.dialogVisible"
      :available="deposit.available"
      :onCancel="deposit.onCancel"
      :onDeposit="deposit.onDeposit"
      :pending="deposit.pending"
      :type="type"
    />
  </div>
</template>
<style src="./menuDetail.scss" lang="scss" module="$"></style>
<script src="./menuDetail.js"></script>