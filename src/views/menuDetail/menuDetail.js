import messages from './locale'
import Title from '../../components/title/title.vue'
import SubTitle from '../../components/title/subTitle.vue'
import Space from '../../components/space/space.vue'
import MenuCard from '../../components/menuCard/menuCard.vue'
import Deposit from '../../components/deposit/deposit.vue'

import { mapState } from "vuex";
import { putApprove } from '../../funs/index'
import { pairs } from '../../config/constant'

export default {
  name: 'MenuDetail',
  i18n: { messages },
  components: {
    Title,
    SubTitle,
    Space,
    MenuCard,
    Deposit
  },
  data() {
    return {
      type: "",
      harvesting: false,
      approving: false,
      unstaking: false,
      rewardsLp: "0.0000",
      stakedLp: "0.0000",
      deposit: {
        dialogVisible: false,
        available: 0,
        onCancel: this.onCancel,
        onDeposit: this.onDeposit,
        depositing: false
      },
      allowanceAmount: 0,
    }
  },
  mounted() {
    this.type = this.$route.params.type;
    Vue.nextTick(() => {
      this.getPresonInfo();
    });
  },
  
  computed: {
    ...mapState({
      address: state => state.wallet.address,
    }),
    hash() {
      return pairs[this.type] && pairs[this.type].hash;
    },
    pid() {
      return pairs[this.type] && pairs[this.type].pid;
    },
    isUnlock() {
      return !!this.address;
    },
    isApprove() {
      return this.allowanceAmount - 2**32 <= 0;
    }
  },
  watch: {
    address(address, oldAddress) {
      if (!oldAddress && address) {
        this.getPresonInfo();
      }
    }
  },
  methods: {
    getPresonInfo(){
      
    },getPresonInfo() {
      if (!this.$store.state.wallet.address) return;
      getAvaliableLP(moods[this.type].hash).then(res => {
        this.deposit.available = getFullDisplayBalance(res);
      });
      getStakedLP(moods[this.type].id).then(res => {
        this.stakedLp = res.amount;
      });
      getRewardLP(moods[this.type].hash).then(res => {
        this.rewardsLp = getDisplayBalance(res);
      });
      const { netVersion, address } = this.$store.state.wallet
      const allowanceAmount = localStorage.getItem(`${this.type}-${address}-${netVersion}`)
      this.allowanceAmount = allowanceAmount || 0
      this.getAllowance(moods[this.type].hash, CHAPLIN_CONTRACT_HASH)
    },
    harvest() {
      this.harvesting = true;
      putHarvest(moods[this.type].id, (err, tx) => {
        if(!err) {
          this.transferBoxVisible = true;
          this.coinCode = 'FUNS';
          this.coinAmount = this.rewardsLp;
          this.tx = tx;
        }
      })
      .then(res => {
        this.harvesting = false;
        getRewardLP(moods[this.type].hash).then(res => {
          this.rewardsLp = getDisplayBalance(res);
        });
      });
    },
    approve() {
      this.approving = true;
      putApprove(moods[this.type].hash, (err, tx) => {
        if(!err) {
          this.transferBoxVisible = true;
          this.coinCode = '';
          this.coinAmount = '';
          this.tx = tx;
        }
      })
      .then(res => {
        this.approving = false;
        this.getAllowance(moods[this.type].hash, CHAPLIN_CONTRACT_HASH)
      });
    },
    unstake() {
      this.unstaking = true;
      putWithdrawAll(moods[this.type].id, (err, tx) => {
        if(!err) {
          this.transferBoxVisible = true;
          this.coinCode = this.type + ' FLP';
          this.coinAmount = this.stakedLp;
          this.tx = tx;
        }
      })
      .then(res => {
        this.unstaking = false;
        getStakedLP(moods[this.type].id).then(res => {
          this.stakedLp = res.amount;
        });
        getAvaliableLP(moods[this.type].hash).then(res => {
          this.deposit.available = getFullDisplayBalance(res);
        });
      });
    },
    stake() {
      this.deposit.dialogVisible = true;
    },
    onDeposit(amount) {
      const referrer = localStorage.getItem("referrer");
      this.deposit.depositing = true;
      putDeposit(moods[this.type].id, amount, referrer || defaultAddress, (err, tx) => {
        this.deposit.depositing = false;
        this.deposit.dialogVisible = false;

        if(!err) {
          setTimeout(() => {
            this.transferBoxVisible = true;
            this.tx = tx;
            this.coinCode = this.type + ' FLP';
            this.coinAmount = amount;
          }, 600)
        }
      })
      .then(res => {
          getStakedLP(moods[this.type].id).then(res => {
            this.stakedLp = res.amount;
          });
          getAvaliableLP(moods[this.type].hash).then(res => {
            this.deposit.available = getFullDisplayBalance(res);
          });
        }
      );
    },
    onCancel() {
      this.deposit.dialogVisible = false;
    },
    getAllowance(addressHash, spendHash) {
      getAllowance(addressHash, spendHash).then(res => {
        this.allowanceAmount = res;
        const { netVersion, address } = this.$store.state.wallet
        localStorage.setItem(`${this.type}-${address}-${netVersion}`, this.allowanceAmount)
      });
    },
    formatDisplay(num){
      return getDisplayLP(num)
    },
  }
}