class Paging {
    getTotalPage(totalPage, perPage) {
      return (totalPage % perPage !== 0) ? parseInt(totalPage / perPage) + 1 : parseInt(totalPage / perPage);
    }
}
export default new Paging();
