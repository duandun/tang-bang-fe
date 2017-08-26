<template lang="html">
    <div class="">
        <footer class="main-footer">
            <strong>Copyright © 2017 Tang Bang</strong>
        </footer>
        <div class="ver-pos">
            {{version}}
        </div>
    </div>
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

<style lang="less">
.main-footer {
    position: absolute;
    left: 240px;
}
.ver-pos {
    position: absolute;
    right: 20px;
}
</style>
