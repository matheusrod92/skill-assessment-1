class TableCtrl {

  constructor (){

    let $ = document.querySelector.bind(document);

    this._data       = {};
    this._filterData = {};
    this.paginated   = [];

    this.page = 1;
    this.per_page = 10;
    this.showPages = 2;

    this._table = $("#results");
    this._pagDiv = $("#pagination");
    this._links  = document.querySelectorAll("a.export");

    this._view    = new TableView(this._table);
    this._pagView = new Pagination(this._pagDiv);
    this._export  = new Export();

    this._totalRows   = $('#total-rows');
    this._updatedTime = $('#updated-time');

    this._filters = {
      name    : $('#inputName'),
      email   : $('#inputEmail')
    }

    this._filters.name.addEventListener('keyup',e =>  {
      this.page = 1;
      this._update()
    });
    this._filters.email.addEventListener('keyup', e => {
      this.page = 1;
      this._update()
    });

    this._pagDiv.addEventListener('click', e => {

      if(typeof e.target.dataset.page === 'undefined')
        return false;

      this.page = parseInt(e.target.dataset.page);
      this._update();

    });

    this._db = new Database('https://gamaassignment2.firebaseio.com/', 'leads', {
      onAppend: data => {
        this.append(data.key, data.val());
        this.page = 1;
        this._update();
        this._setUpdatedTime();
      },
      onChange: ref => {
        this._data[ref.key] = ref.val();
        this.page = 1;
        this._update();
        this._setUpdatedTime();
      },
      onRemove: ref => {
        if(typeof this._data[ref.key] !== 'undefined'){
          delete this._data[ref.key];
          this.page = 1;
        }
        this._update();
        this._setUpdatedTime();
      }
    });

  }

  append (key, data){
      this._data[key] = data;
  }

  _filter (){
    console.log(this.page)
    if(this.name == "" && this.email == ""){
      return this._filterData = this._data;
    }
    this._filterData = Object.entries(this._data).reduce((obj, entry)=>{
      let key  = entry[0], item = entry[1];
      if(
        (item._name.toLowerCase().indexOf(this.name.toLowerCase()) > -1 || this.name == "") &&
        (item._email.toLowerCase().indexOf(this.email.toLowerCase()) > -1 || this.email == "")) {
        obj[key] = item
      };
      return obj;
    }, {});
  }

  _setupPagination (){

    let lastPg  = this.page*this.per_page,
        firstPg = lastPg - this.per_page;

    let maxPage = Math.min(this.page+this.per_page, Math.ceil(this.filter.length / this.per_page)),
        minPage = Math.min(1, Math.abs(this.page)),
        showPages = Math.ceil(this.showPages/2);

    minPage = Math.max(minPage, this.page - showPages, 1);
    maxPage = Math.min(this.page + showPages, maxPage);
    maxPage = Math.max(maxPage, this.showPages + 1);

    this.paginated = this.filter.slice(firstPg, lastPg);

    this._pagView.update(this.page, minPage, maxPage);

  }

  _setupLink (format, link){
    link.href = this._data.length < 1 ? 'javascript:void(0);' : this._export.toCSV(format, this._filterData);
    this._data.length < 1 ? link.removeAttribute('download') : link.download = this._export.formats['name'][format];
  }

  _setUpdatedTime (){
    let hoy = new Date();
    this._updatedTime.innerHTML = `Atualizado em ${hoy.getDate() < 10? '0': ''}${hoy.getDate()}/${hoy.getMonth() <= 10? '0': ''}${hoy.getMonth() + 1} às ${hoy.getHours()}:${hoy.getMinutes()}`
  }

  _setTotalRows (){
    this._totalRows.innerHTML = `
      ${Object.keys(this._filterData).length} registro(s) filtrado(s) <br>
      Total: ${Object.keys(this._data).length} registro(s)
    `;
  }

  _update (){
    this._filter();
    this._setupPagination();
    this._view.update(this.paginated);
    this._setupLink(0, this._links[0]);
    this._setupLink(1, this._links[1]);
    this._setupLink(2, this._links[2]);
    this._setTotalRows();
  }

  get filter (){
    return Object.values(this._filterData);
  }

  get name (){
    return this._filters.name.value;
  }

  get email (){
    return this._filters.email.value;
  }
}
