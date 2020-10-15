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
        number: 9999.82,
        subNumber: 502898899,
      },
      totalSupplyContent: {
        title: this.$t('60'),
        subTitle: this.$t('70'),
        number: 8965588966,
        subNumber: 578956523623,
      },
    }
  },
  mounted() {
    
  },
  methods: {
    
  }
}