<template lang="html">
    <div class="my-info">
        <Dropdown trigger="click" @on-click="logout">
            <a href="javascript:void(0);">
                <Icon type="person"></Icon>
                <span class="m-desc">Hello</span>
            </a>
            <Dropdown-menu slot="list">
                <Dropdown-item name="userLogout">退出登录</Dropdown-item>
            </Dropdown-menu>
        </Dropdown>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    components: {
    },
    methods: {
        logout(name) {
            if (name === 'userLogout') {
                console.log('logout');
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .my-info {
        cursor: pointer;
        padding-left: 30px;
        padding-right: 27px;
        text-align: left;
        a {
            color: #fff;
        }
    }
    .m-desc {
        margin-left: 10px;
    }
</style>
