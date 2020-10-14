import messages from './locale'
import Title from '../../components/title/title.vue'
import SubTitle from '../../components/title/subTitle.vue'
import BalanceCard from '../../components/balanceCard/balanceCard.vue'
import Space from '../../components/space/space.vue'

export default {
  name: 'Home',
  i18n: { messages },
  components: {
    Title,
    SubTitle,
    BalanceCard,
    Space
  },
  data() {
    return {
      balanceContent: {
        title: this.$t('40'),
        subTitle: this.$t('50'),
        number: 1,
        subNumber: 1,
      },
      totalSupplyContent: {
        title: this.$t('60'),
        subTitle: this.$t('70'),
        number: 2,
        subNumber: 2,
      },
    }
  },
  mounted() {
    
  },
  methods: {
    
  }
}