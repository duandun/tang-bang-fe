<template lang="html">
    <Tooltip :placement="position" :disabled="computeLength <= displayLength">
        <span :class="['ellip-span', spanSize]">{{ computedText }}</span>
        <div slot="content" class="multi-lines">
            {{ textContent }}
        </div>
    </Tooltip>
</template>

<script>
import { FormHelper } from '@/utils';

export default {
    props: {
        position: {
            type: String,
            default: 'top'
        },
        textContent: {
            type: String,
            default: ''
        },
        displayLength: {
            type: Number,
            default: 10
        },
        size: {
            type: String,
            default: 'normal'
        }
    },
    data() {
        return {
        }
    },
    computed: {
        computedText() {
            let text = this.textContent;
            const length = FormHelper.getTextLen(text);
            if (length > this.displayLength) {
                return text.substring(0, this.displayLength) + '...';
            }
            return text;
        },
        computeLength() {
            return FormHelper.getTextLen(this.textContent);
        },
        spanSize() {
            return `span-${this.size}`;
        }
    },
    created() {
    },
    methods: {
    }
}
</script>

<style lang="less">
    .ellip-span {
        width: 300px;
        margin-right: 20px;
        overflow: hidden;
    }
    .multi-lines {
        white-space: normal;
        word-break: break-all;
        word-wrap: break-word;
    }
    .span-big {
        font-size: 14px;
        font-weight: bold;
        color: #262a33;
    }
</style>
