import messages from './locale'
import Title from '../../components/title/title.vue'
import SubTitle from '../../components/title/subTitle.vue'
import Space from '../../components/space/space.vue'
import MenuCard from '../../components/menuCard/menuCard.vue'
import { pairs } from '../../config/constant'

export default {
  name: 'Menu',
  i18n: { messages },
  components: {
    Title,
    SubTitle,
    Space,
    MenuCard
  },
  data() {
    return {
      items: [],
    }
  },
  mounted() {
    this.formatItems()
  },
  methods: {
    goMenuDetail({type}){
      this.$router.push(`/menu/${type}`)
    },
    formatItems() {
      const tmp = [
        {
          type: 'OSWAP-USDT',
          subTitle: `Deposit OSWAP-USDT SLP<br />Earn SUSHI`,
        },
        {
          type: 'YFO-USDT',
          subTitle: `Deposit YFO-USDT SLP<br />Earn SUSHI`,
        },
        {
          type: 'DAI-USDT',
          subTitle: `Deposit DAI-USDT SLP<br />Earn SUSHI`,
        }
      ];

      this.items = tmp.map((item, index) => ({
        ...item, 
        ...pairs[item.type], 
        title: this.$t('30'),
        apy: '200.00',
        onTab: this.goMenuDetail
      }));
    },
    
  }
}