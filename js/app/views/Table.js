class TableView extends Views {

  constructor (element){
    super(element);
  }

  template (model){
    return `
      <table class="table table-striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Ocupação</th>
              <th>E-mail</th>
            </tr>
          </thead>

          <tbody>
            ${Object.entries(model).map(data => `
              <tr>
                <td>${data[1]._currentdate}</td>
                <td>${data[1]._name}</td>
                <td>${data[1]._ocupacao}</td>
                <td>${data[1]._email}</td>
              </tr>
            `).join('')}
          </tbody>
      </table>
    `
  }

}
