<template>
  <div :class="$['unlock-wallet']">
    <el-button
      :class="$['btn']"
      @click="unlockWallet"
    >{{loginText}}</el-button>

    <el-dialog width="400px" :title="$t('30')" :visible.sync="dialogVisible">
      <div :class="$['my-wallet']">
        <p>🍣</p>
        <p>{{funsBalance}}</p>
        <p>{{$t('40')}}</p>
      </div>
      <el-button
        @click="goEtherscan"
      >{{$t('50')}}</el-button>
      <el-button
        @click="signOut"
      >{{$t('60')}}</el-button>
      <el-button
        @click="cancel"
      >{{$t('70')}}</el-button>
    </el-dialog>
  </div>
</template>
<style src="./unLockWallet.scss" lang="scss" module="$"></style>
<script src="./unLockWallet.js"></script>


