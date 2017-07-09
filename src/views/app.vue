<template>
  <div id="app-container">
    <e-layout>
      <div slot='logo'><a href="/">唐邦</a></div>
      <e-menu slot='menu' :menus='config.menu.list' :openNames='config.menu.openNames' :activeName='config.menu.activeName' :onSelect='onMenuSelect'>
      </e-menu>
      <div slot="header-right">
          <headers></headers>
      </div>
      <div slot='copyright'><footers></footers></div>
      <transition name="fade" mode="out-in" appear>
        <router-view></router-view>
      </transition>
    </e-layout>
  </div>
</template>

<script>
import { ELayout, EMenu } from 'eview'
import * as config from '../config'
import Footers from '../components/_global/footer/index.vue';
import Sidebars from '../components/_global/sidebar/index.vue';
import Headers from '../components/_global/header/index.vue';
import { BaseMixins } from '@/mixins';
import * as api from '@/api';

export default {
  name: 'app',
  components: {
    EMenu,
    ELayout,
    Footers,
    Sidebars,
    Headers
  },
  data() {
    return {
      config
    }
  },
  computed: {
  },
  mixins: [
    BaseMixins
  ],
  created() {
    api.contract.testLogin().then((results) => {
      console.log(results);
    });
  },
  watch: {
    '$route': function(to, from) {
      this.config.menu.activeName = to.path;
      console.log(`%c enter view: ${to.name}`, 'color: #3399ff');
    }
  },
  methods: {
    onMenuSelect: function(path) {
      this.$router.push(path)
    }
  }
}
</script>

<style>
#app-container {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height:100%;
  min-width: 1200px;
}
</style>
