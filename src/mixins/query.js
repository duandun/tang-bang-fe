import _ from 'lodash';
import { storage } from '@/utils';

export default {
  created() {
    if (this.cacheQuery) {
      this._original = {};
      this._original.query = _.cloneDeep(this.$data.query);
      this._original.queryAssist = _.cloneDeep(this.$data.queryAssist);
      this.mergeQuery(this.$route.name);
    }
  },

  methods: {
    mergeQuery(type) {
      let data = storage.session.get(`${type}-query`);

      if (!data) {
        return;
      }

      Object.assign(this.query, data.query);
      if (this.queryAssist) {
        Object.assign(this.queryAssist, data.queryAssist);
      }
    }
  }
};
