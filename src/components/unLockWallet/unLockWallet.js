import messages from './local'

export default {
  i18n: { messages },
  data() {
    return {
      dialogVisible: false,
      metamaskDialogVisible: false,
      funsBalance: "0.0000"
    };
  },
  methods: {
    async unlockWallet() {
      if (typeof window.ethereum !== "undefined") {
        if (!this.$store.state.wallet.address) {
          this.dialogVisible = true;
        } else {
          await connect();
          await init();
        }
      }
    },
    goEtherscan(){

    },
    signOut() {
      const wallet = {
        name: "",
        address: "",
      };
      this.$store.commit("update:wallet", wallet);
      this.dialogVisible = false;
    },
    cancel() {
      this.dialogVisible = false;
    },
    onRefesh() {
      location.reload();
    },
  },
  computed: {
    address() {
      return this.$store.state.wallet.address;
    },
    loginText() {
      return this.$store.state.wallet.address
        ? this.$t("20")
        : this.$t("10");
    }
  },
  watch: {
    address(address) {
      if(address) {
        // getFunsAvailableBalance().then(res => {
        //   this.funsBalance = getDisplayBalance(res);
        // });
      }
    },
    dialogVisible(state) {
      if(state) {
        // getFunsAvailableBalance().then(res => {
        //   this.funsBalance = getDisplayBalance(res);
        // })
      }
    }
  }
};