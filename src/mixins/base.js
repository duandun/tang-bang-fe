import moment from 'moment';
import _ from 'lodash';

export default {
    data() {
        return {
            casPosition: '',
            selPosition: 'top'
        }
    },
    created() {
        // 获取风险类别
    },
    methods: {
        dateFormat(date) {
            if (_.isDate(date)) {
                return moment(date).format('YYYY-MM-DD HH:mm:ss');
            }
            return date;
        },
        casVisibleChange(val) {
            // 控制 cascader 下拉框位置
            let bottom = this.$refs.cas.$el.getBoundingClientRect().bottom;
            let clientHeight = document.body.clientHeight;
            if (clientHeight - bottom < 250) {
                this.casPosition = 'cas-position';
            } else {
                this.casPosition = '';
            }
        },
        selVisibleChange(val) {
            // 控制 select 下拉框位置
        }
    }
}
