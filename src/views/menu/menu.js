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
      menus: [
        {
          title: this.$t('30'),
          type: 'UNI-ETH',
          subTitle: `Deposit UNI-ETH SLP<br />Earn SUSHI`,
          apy: '0.00',
          onTab: this.goMenuDetail
        },
        {
          title: this.$t('30'),
          type: 'UNI-ETH',
          subTitle: `Deposit UNI-ETH SLP<br />Earn SUSHI`,
          apy: '0.00',
          onTab: this.goMenuDetail
        },
        {
          title: this.$t('30'),
          type: 'UNI-ETH',
          subTitle: `Deposit UNI-ETH SLP<br />Earn SUSHI`,
          apy: '0.00',
          onTab: this.goMenuDetail
        }
      ]
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
          title: "FUNS Surprise!",
          type: "pid_0",
        },
        {
          title: "USDT-ETH",
          type: "pid_1",
        },
        {
          title: "USDC-USDT",
          type: "pid_2",
        }
      ];

      this.items = tmp.map((item, index) => ({
        ...item, 
        ...pairs[item.type], 
        title: this.$t('30'),
        subTitle: `Deposit UNI-ETH SLP<br />Earn SUSHI`,
        apy: '0.00',
        onTab: this.goMenuDetail
      }));
    },
    
  }
}