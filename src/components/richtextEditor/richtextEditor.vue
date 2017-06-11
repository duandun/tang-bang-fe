<template lang="html">
    <div class="editor-container">
        <script id="editor" name="content" type="text/plain">
            {{ value }}
        </script>
        <input type="hidden" id="id" value="926906019" />
    </div>
</template>

<script>
import Editor from './ueditor.js';

export default {
    props: {
        value: {
            type: String
        }
    },

    data() {
        return {
            dialogVideosVisible: false,
            content: ''
        };
    },

    watch: {
        value(value) {
            if (value !== this.content) {
                Editor.setContent(value);
            }
        }
    },

    mounted() {
        Editor.init(this);

        // this.$root.$on('editoraddvideos', (event) => { this.dialogVideosVisible = true });
    },

    destroyed() {
        Editor.destroy();
    },

    methods: {
        // handleVideosSave(videos) {
        //     this.dialogVideosVisible = false;
        //     Editor.insertVideo(videos[0]);
        // },

        update(content) {
            this.content = content;
            this.$emit('input', content);
            // this.$parent.$emit('el.form.change', content);
        }
    },

    components: {
    }
}
</script>

<style lang="scss" scoped>
    .editor-container {
        line-height: initial;

        .el-dialog--small {
            width: 62%;
        }
    }

    .edui-editor-messageholder {
        display: none!important;
    }
</style>
