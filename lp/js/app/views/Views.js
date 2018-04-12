//VIEW MAKER
class Views {

    constructor(elemento) {
        this._elemento = elemento;
    }

    update(model) {
        this._elemento.innerHTML = this.template(model);
    }
}
