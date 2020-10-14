import messages from './locale'
import Title from '../../components/title/title.vue'
import SubTitle from '../../components/title/subTitle.vue'
import Space from '../../components/space/space.vue'
import MenuCard from '../../components/menuCard/menuCard.vue'
import Deposit from '../../components/deposit/deposit.vue'

import { putApprove } from '../../funs/index'

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
      menus: [
        {
          title: this.$t('30'),
          type: 'UNI-ETH',
          subTitle: `${this.$t('40')} UNI-ETH ${this.$t('50')}`,
          apy: '0.00',
          onTab: this.goMenuDetail
        },
        {
          title: this.$t('30'),
          type: 'UNI-ETH',
          subTitle: `${this.$t('40')} UNI-ETH ${this.$t('50')}`,
          apy: '0.00',
          onTab: this.goMenuDetail
        },
      ]
    }
  },
  mounted() {
  },
  methods: {
    goMenuDetail({type}){
      this.$router.push(`/menu/${type}`)
    },
    putApprove(){
      putApprove('0x25c86769D5f41f65CD394497b4B9ac96fD7d1D9b').then(res => {

      })
    }
  }
}