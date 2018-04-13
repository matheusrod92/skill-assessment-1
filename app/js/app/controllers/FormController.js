class FormController {

    constructor() {

        //FORM MAKER
        let $ = document.querySelector.bind(document);
        this._inputName = $('#name');
        this._inputEmail = $('#email');
        this._inputOcupacao = $('#ocupacao');
        this._currentDate = new Date().toLocaleString();
        this._formList = new FormList();
    }

    add(event) {

        //ADD FORM
        event.preventDefault();
        this._formList.add(this._createForm());
    }

    _createForm() {
        //CREATE FORM
        return new Form(
            this._inputName.value,
            this._inputEmail.value,
            this._inputOcupacao.value,
            this._currentDate
        );
    }
}
