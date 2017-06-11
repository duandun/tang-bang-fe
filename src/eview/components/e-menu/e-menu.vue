<template>
  <div class='e-menu'>
    <Menu :active-name="_activeName" theme="dark" width="auto" :open-names="openNames" @on-select='onSelect'>
      <Submenu v-for='menu in menus' :name='menu.name' :key='menu.name'>
        <template slot="title">
          <Icon type="social-codepen"></Icon>
          <span class='e-menu-text'>{{menu.text}}</span>
        </template>
        <Menu-item v-for='item in menu.children' :name='item.name' :key='menu.name'>
          <span class='e-menu-text'>{{item.text}}</span>
        </Menu-item>
      </Submenu>
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
    }
  }
}
</script>
