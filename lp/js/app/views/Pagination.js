class Pagination extends Views {

  constructor (element){
    super(element);
  }

  update(page = 1, ini = 0, end = 10) {
      this._elemento.innerHTML = this.template(...arguments);
  }

  template (page = 1, ini, end){
    let tmp = '<ul class="pagination">';
    for(let i = ini; i<=end; i++)
      tmp += `<li class="page-item${page===i?' active':''}"><a href="javascript:void(0);" data-page="${i}" class="page-link">${i}</a></li>`
    return tmp += '</ul>';
  }

}
