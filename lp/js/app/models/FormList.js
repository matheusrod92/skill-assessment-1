//FIREBASE INFO
let firebaseOn = false;
var config = {
    apiKey: "AIzaSyC9kHRqa_vFseX0_J8_GYQSi92-5OoSMrg",
    authDomain: "assigment-3-45055.firebaseapp.com",
    databaseURL: "https://assigment-3-45055.firebaseio.com",
    projectId: "assigment-3-45055",
    storageBucket: "",
    messagingSenderId: "518545836753"
};

class FormList {

    constructor() {

        this._form = [];
    }

    //FORM MAKER
    add(form) {

        //FIREBASE START
        if (firebaseOn == false) {
            firebase.initializeApp(config);
        };
        var database = firebase.database();
        var ref = database.ref('leads');
        firebaseOn = true;

        ref.push(form, error => {
            if (!error){
                window.location.replace("obrigado.html");
                }
            });

        this._form.push(form);
    }

}