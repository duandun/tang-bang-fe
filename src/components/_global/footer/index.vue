<template lang="html">
    <footer class="main-footer">
        Copyright © 2017 Tang Bang {{version}}
    </footer>
</template>

<script>
export default {
    data() {
        return {
            version: 'v0.0.1'
        };
    }
};
</script>

<style lang="scss">
.main-footer {
    position: absolute;
    right: 20px;
}
</style>
