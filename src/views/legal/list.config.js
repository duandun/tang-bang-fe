
export const getTableColumns = (context) => {
    let columns = [{
        type: 'index',
        width: 60,
        align: 'center'
    }, {
        title: '流程编号',
        key: 'processNum',
        width: 180
    }, {
        title: '流程名称',
        key: 'processName'
    }, {
        title: '对应部门',
        key: 'deptName'
    }, {
        title: '流程级别',
        key: 'level',
        align: 'center',
        width: 100
    }, {
        title: '包含子流程',
        key: 'isSubProcess',
        align: 'center',
        width: 100
    }, {
        title: '包含风险',
        key: 'hasRisk',
        align: 'center',
        width: 100
    }, {
        title: '操作',
        key: 'action',
        width: 180,
        align: 'center',
        render: (h, params) => {
            return (
                <div>
                    <i-button type="text" onClick={context.jumpToDetail.bind(context, params.row, params.row.processLevel)}>查看详情</i-button>
                    <i-button type="text" onClick={context.jumpToEdit.bind(context, params.row, params.row.processLevel)}>编辑</i-button>
                </div>
            )
        }
    }];
    return columns;
};
