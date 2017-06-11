<template lang="html">
    <div class="">
        <Row>
            <Table :columns="columns1" :data="data1" :row-class-name="changeRowClass" @on-selection-change="selectionChange">
            </Table>
        </Row>
        <Row type="flex" justify="end" style="margin-top: 20px;">
            <Page
                :total="total"
                :page-size="query.pageSize"
                :current="query.pageNum"
                @on-change="handlePageChange">
            </Page>
        </Row>
    </div>
</template>

<script>
export default {
    props: {
        visible: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            total: 0,
            query: {
                pageSize: 10,
                pageNum: 1
            },
            columns1: [{
                type: 'selection',
                width: 60,
                align: 'center'
            }, {
                title: '姓名',
                key: 'name',
                render: (h, params) => {
                    let indent = '0px';
                    if (params.row.parentId) {
                        indent = '20px';
                    }
                    let icon = '';
                    if (!params.row.parentId) {
                        if (!params.row.open) {
                            icon = 'ivu-icon ivu-icon-plus margin-icon';
                        } else {
                            icon = 'ivu-icon ivu-icon-minus margin-icon';
                        }
                    }
                    return (
                        <div style={{paddingLeft: indent}}>
                            <i class={icon} onClick={this.toggleChild.bind(this, params.row)}></i>
                            { params.row.name }
                        </div>
                    )
                }
            }, {
                title: '年龄',
                key: 'age'
            }],
            data1: [{
                id: 1,
                name: '哈哈哈',
                age: 23,
                open: false
            }, {
                id: 2,
                name: 'lu哈哈',
                age: 34,
                parentId: 1,
                show: false
            }, {
                id: 3,
                name: 'eed恩',
                age: 30,
                parentId: 1,
                show: false
            }],
            selectedItems: []
        };
    },
    created() {

    },
    methods: {
        selectionChange(selection) {
            this.selectedItems = selection;
            console.log(this.selectedItems);
        },
        toggleChild(row) {
            if (row.parentId) {
                return;
            }
            this.data1.forEach((item) => {
                if (item.parentId === row.id) {
                    item.show = !item.show;
                }
                if (item.id === row.id) {
                    item.open = !item.open;
                }
                if (this.selectedItems.findIndex(_ => _.id === item.id) > -1) {
                    item._checked = true;
                } else {
                    item._checked = false;
                }
            });
        },
        changeRowClass(row, index) {
            if (!row.show && row.parentId) {
                return 'hide-row';
            } else if (row.show) {
                return 'vis-row';
            }
        },
        handlePageChange(curPage) {
            console.log(curPage);
        }
    }
}
</script>

<style lang="scss">
    .vis-row {
        td {
            background-color: #eee;
        }
    }
    .hide-row {
        display: none;
    }
    .margin-icon {
        margin-right: 5px;
    }
</style>
