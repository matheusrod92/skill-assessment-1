class Export  {

  constructor (){
    this.formats = {
      header : [
        'email,nome,data_hora',
        'email,name'
      ],
      body : ['', '', ''],
      name : [
        'leads.csv',
        'emails.csv'
      ]
    };

  }
  toCSV (format, data){
    let CSVData = Object.entries(data).reduce((value, entry) =>
      `${value}\r\n${this._format(format, 'body', entry[1])}`,
      this._format(format, 'header', data)
    );
    return `data:text/csv;charset=UTF-8,${encodeURI(CSVData)}`;
  }

  _format(format, dataID, data){
    this.formats.body = [
      `${data._email},${data._name},${this._dateFormat(data._currentdate)}`,
      `${data._email},${data._name}`
    ];
  	return this.formats[dataID][format];
  }

  _dateFormat (dateString){

  	if (typeof dateString !== "string")
  		return dateString;

  	return dateString.replace(/(\d{2})\/(\d{2})\/(\d{4})(.*)/g, (str, d, m, Y, hour) => {
  		return `${Y}-${m}-${d}${hour}`;
  	});

  }

}
