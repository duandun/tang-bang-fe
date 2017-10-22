import { FormHelper, Wrapper, storage } from '@/utils';
import { TEXT } from '@/constant';
import { QueryMixins, PaginationMixins } from '@/mixins';
import cloneDeep from 'lodash/cloneDeep';

export default {
  data() {
    return {
      firstQuery: true,
      loading: false,
            // 列表数据
      tableList: [],
      total: 0,
            // 是否缓存搜索条件
      cacheQuery: true,
            // 搜索辅助字段
      queryAssist: {},
            // 搜索条件
      query: {}
    };
  },

  created() {
        // query可能需要在nextTick中获取
    this.$nextTick(() => {
      if (!this.loading) {
        this.prepare().then(() => {
          this.fetchByPage();
        }).catch(() => {

        });
      }
    });
  },

  mixins: [
    QueryMixins,
    PaginationMixins
  ],

  mounted() {
  },

  methods: {
        /**
         * fetch api
         * @return {Promise}
         */
    fetchApi: function() {
      return Promise.resolve(null);
    },

    formatData(results) {
      return results;
    },

    prepare() {
      return Promise.resolve(null);
    },

        // internal api
    fetchByPage: Wrapper.wrapFetch(function(page = this.query.pageStart, ...rest) {
      if (this.firstQuery) {
        this.firstQuery = false;
      }
      this.query.pageStart = page;
      let query = FormHelper.handleQueryFields(this.query);

      // 通常cacheQuery时，是独立list页，因此应该返回顶部
      window.scrollTo(0, 0);

      if (this.cacheQuery) {
        storage.session.set(`${this.$route.name}-query`, {
          query,
          queryAssist: this.queryAssist || {}
        });
      }
      return this.fetchApi(query, ...rest).then((results) => {
        this.tableList = this.formatData(results.data || []);
        this.total = results.recordsTotal || 0;
      })
      .catch(e => {
        console.log(e);
        this.$Message.error(TEXT.LOAD_ERROR);
      });
    }),

    search() {
      this.fetchByPage(1);
    },

    resetQuery() {
      this.query = cloneDeep(this._original.query);
      this.queryAssist = cloneDeep(this._original.queryAssist);
    },

    clearQuery() {
      this.resetQuery();
      this.search();
      return false;
    },

        /**
         * delete api
         * @return {Promise}
         */
    deleteApi: function() {},

        // 删除行
    deleteRow(row, txt = `是否删除本条内容: \n${row.name}?`) {
      this.$Modal.confirm({
        title: '提示',
        content: txt,
        onOk() {
          this.deleteApi(row.id)
            .then((resp) => {
              if (!resp) {
                return Promise.reject(resp);
              }

              let newPage = this.query.pageStart;

                // 删掉此页最后一条，返回上一页
              if (this.tableList.length === 1 && this.query.pageStart > 1) {
                newPage = newPage - 1;
              }

              this.fetchByPage(newPage);
              this.$Notice.success({
                title: TEXT.NOTIFY_TITLE,
                desc: TEXT.DELETE_SUCCESS
              });
            })
            .catch((resp) => {
              this.$Notice.error({
                title: TEXT.NOTIFY_TITLE,
                desc: TEXT.DELETE_FAIL
              });
            });
        }
      });
    }
  }
};
