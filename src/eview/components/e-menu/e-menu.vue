<template>
  <div class='e-menu' :class="{'collapse-e-menu': menuCollapse}">
    <Menu :active-name="_activeName" theme="dark" width="auto" :open-names="openNames" @on-select='onSelect'>
      <Submenu v-for='menu in menus' :name='menu.name' :key='menu.name' v-if="menu.children && !menuCollapse">
        <template slot="title">
          <Icon :type="menu.icon"></Icon>
          <span class='e-menu-text'>{{menu.text}}</span>
        </template>
        <Menu-item v-for='item in menu.children' :name='item.name' :key='menu.name'>
          <span class='e-menu-text'>{{item.text}}</span>
        </Menu-item>
      </Submenu>
      <Menu-item v-else :name="menu.name">
          <Icon :type="menu.icon"></Icon>
          <span class='e-menu-text'>{{menu.text}}</span>
          <ul v-if="menu.children && menuCollapse" class="collapse-menu">
            <li v-for="item in menu.children" @click.stop="onClickItem(item, menu.children)" :class="['ivu-menu-item',
                  {'ivu-menu-item-selected': item.selected, 'ivu-menu-item-active': item.selected}]">
              <div>
                <span>{{item.text}}</span>
              </div>
            </li>
          </ul>
      </Menu-item>
    </Menu>
  </div>
</template>
<script>

export default {
  props: {
    menus: {
      type: Array,
      default: []
    },
    activeName: {
      type: String,
      default: ''
    },
    openNames: {
      type: Array,
      default: []
    },
    onSelect: {
      type: Function,
      default: function () {}
    }
  },
  computed: {
    _activeName: function () {
      return this.activeName
    },
    eLayout () {
      let parent = this.$parent
      while (parent && parent.$options.componentName !== 'eLayout') {
        parent = parent.$parent
      }
      return parent
    },
    menuCollapse () {
      return this.eLayout.$data.shrinked
    }
  },
  methods: {
    onClickItem (item, menu) {
      this.$router.push({
        path: item.name
      })
      menu.forEach(k => k.selected = false)
      item.selected = true
    }
  }
}
</script>
<style lang="less">
  .collapse-e-menu {
    width: 80px !important;
  }
  .collapse-menu {
    position: absolute;
    display: none;
    top: 0;
    left: 100%;
    background: #262a33;
    li {
      min-width: 150px;
    }
  }
  .ivu-menu-item {
    &:hover {
      .collapse-menu {
        display: block;
      }
    }
  }
</style>
