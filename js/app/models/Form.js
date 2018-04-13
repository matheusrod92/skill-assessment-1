//FORM CONSTRUCTOR AND METHODS
class Form {
    
    constructor(name, email, ocupacao, currentDate) {

        this._name = name;
        this._email = email;
        this._ocupacao = ocupacao;
        this._currentdate = currentDate;
        Object.freeze(this);
    }

    get name() {
        
        return this._name;
    }
    
    get email() {
        
        return this._email;
    }

    get ocupacao() {
        return this._ocupacao;
    }

    get currentdate () {
        return this._currentdate;
    }
}