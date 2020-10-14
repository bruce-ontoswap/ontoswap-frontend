import messages from './locale'
import Title from '../../components/title/title.vue'
import SubTitle from '../../components/title/subTitle.vue'
import Space from '../../components/space/space.vue'
import MenuCard from '../../components/menuCard/menuCard.vue'

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
        },{
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
        },
      ]
    }
  },
  mounted() {
  },
  methods: {
    goMenuDetail({type}){
      this.$router.push(`/menu/${type}`)
    }
  }
}