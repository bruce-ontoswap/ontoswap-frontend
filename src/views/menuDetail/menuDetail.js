import Vue from "vue";
import messages from './locale'
import Title from '../../components/title/title.vue'
import SubTitle from '../../components/title/subTitle.vue'
import Space from '../../components/space/space.vue'
import MenuCard from '../../components/menuCard/menuCard.vue'
import Deposit from '../../components/deposit/deposit.vue'

import { mapState } from "vuex";
import { pairs, YFO_HASH } from '../../config/constant'
import { 
  putApprove,
  getAvaliableLP,
  getStakedLP,
  getRewardLP,
  getAllowance,
  putDeposit,
  putWithdrawAll
} from '../../funs/index'
import { getDisplayBalance, getDisplayLP, getFullDisplayBalance } from "../../utils/format";

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
        pending: false
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
    getPresonInfo() {
      if (!this.$store.state.wallet.address) return;
      getAvaliableLP(pairs[this.type].hash).then(res => {
        console.log('getAvaliableLP', res);
        this.deposit.available = getFullDisplayBalance(res);
      });
      getStakedLP(pairs[this.type].id).then(res => {
        console.log('getStakedLP', res);
        this.stakedLp = res.amount;
      });
      getRewardLP(pairs[this.type].id).then(res => {
        console.log('getRewardLP', res);
        this.rewardsLp = getDisplayBalance(res);
      });
      const { netVersion, address } = this.$store.state.wallet
      const allowanceAmount = localStorage.getItem(`${this.type}-${address}-${netVersion}`)
      this.allowanceAmount = allowanceAmount || 0
      this.getAllowance(pairs[this.type].hash, YFO_HASH)
    },
    harvest() {
      this.harvesting = true;
      putWithdrawAll(pairs[this.type].id, 0, (err, tx) => {
        if(!err) {
          this.transferBoxVisible = true;
          this.coinCode = this.type + ' FLP';
          this.coinAmount = this.stakedLp;
          this.tx = tx;
        }
      })
      .then(res => {
        this.harvesting = false;
        getRewardLP(pairs[this.type].id).then(res => {
          this.rewardsLp = getDisplayBalance(res);
        });
      });
    },
    approve() {
      this.approving = true;
      putApprove(pairs[this.type].hash, (err, tx) => {
        if(!err) {
          this.transferBoxVisible = true;
          this.coinCode = '';
          this.coinAmount = '';
          this.tx = tx;
        }
      })
      .then(res => {
        this.approving = false;
        this.getAllowance(pairs[this.type].hash, YFO_HASH)
      });
    },
    unstake() {
      this.unstaking = true;
      putWithdrawAll(pairs[this.type].id, this.stakedLp, (err, tx) => {
        if(!err) {
          this.transferBoxVisible = true;
          this.coinCode = this.type + ' FLP';
          this.coinAmount = this.stakedLp;
          this.tx = tx;
        }
      })
      .then(res => {
        this.unstaking = false;
        getStakedLP(pairs[this.type].id).then(res => {
          this.stakedLp = res.amount;
        });
        getAvaliableLP(pairs[this.type].hash).then(res => {
          this.deposit.available = getFullDisplayBalance(res);
        });
      });
    },
    stake() {
      this.deposit.dialogVisible = true;
    },
    onDeposit(amount) {
      this.deposit.pending = true;
      putDeposit(pairs[this.type].id, amount, (err, tx) => {
        this.deposit.pending = false;
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
          getStakedLP(pairs[this.type].id).then(res => {
            this.stakedLp = res.amount;
          });
          getAvaliableLP(pairs[this.type].hash).then(res => {
            this.deposit.available = getFullDisplayBalance(res);
          });
        }
      );
    },
    onCancel() {
      this.deposit.dialogVisible = false;
    },
    getAllowance(addressHash, spendHash) {
      console.log(1);
      getAllowance(addressHash, spendHash).then(res => {
        this.allowanceAmount = res;
        console.log(2, res);
        const { netVersion, address } = this.$store.state.wallet
        localStorage.setItem(`${this.type}-${address}-${netVersion}`, this.allowanceAmount)
      });
    },
    formatDisplay(num){
      return getDisplayLP(num)
    },
  }
}