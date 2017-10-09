export default {
  methods: {
    handleCurrentChange(curPage) {
      if (curPage === this.query.pageStart) {
        return;
      }

      clearTimeout(this.pageFetchTimer);

      this.pageFetchTimer = setTimeout(() => {
        this.fetchByPage(curPage);
      }, 50);
    },
    handlePageSizeChange(pageSize) {
      if (this['loading']) {
        return;
      }
      if (pageSize === this.query.pageSize) {
        return;
      }
      clearTimeout(this.pageFetchTimer);
      this.query.pageSize = pageSize;
      this.pageFetchTimer = setTimeout(() => {
        this.fetchByPage(1);
      }, 50);
    }
  }
};
