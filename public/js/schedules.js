function updateTotal() {
    var rows = document.querySelectorAll('.table tbody tr');
    var total = 0;
    for (var i = 0; i < rows.length; i++) {
        var rowTotal = parseFloat(rows[i].querySelector('td:nth-child(5)').innerText.replace('R$ ', ''));
        total += rowTotal;
    }
    document.getElementById('total').innerText = 'Custo total: R$ ' + total.toFixed(2);
    console.log(total);
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
  
function jwtDecode(t) {
  let token = {};
  token.raw = t;
  token.header = JSON.parse(window.atob(t.split('.')[0]));
  token.payload = JSON.parse(window.atob(t.split('.')[1]));
  return token;
}
  
function getTokenInfo(){
  let tinfo = jwtDecode(getCookie("token"));
  return tinfo.payload;
}

function getData() {
    let id = (getTokenInfo()).id;
  
    fetch('/schedules', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id}),
    })
    .then((response) => {
        if (response.ok) {
            return response.json(); // Modifique aqui
        } else {
            throw response;
        }
    })
    .then((data) => {
        console.log("cliente: "+data);
        console.log("tipo de dados: "+typeof data);

        data = JSON.parse(data);
        //console.log(data);

        var tbody = document.querySelector('.table tbody');
        data.forEach(function(item) {
            var row = document.createElement('tr');
            row.innerHTML = `
                <th scope="row">${item.id_schedules}</th>
                <td>${item.sc_name}</td>
                <td>${item.sc_schedule}</td>
                <td>${item.sc_service}</td>
                <td>R$${item.sc_price}</td>
                <td>${item.dataform}</td>
            `;
            tbody.appendChild(row);
        });
    })
    .catch(error => console.error('Error:', error));
}


function cadsch(){
    let id = (getTokenInfo()).id;
    let name = document.getElementById('name').value;
    let hora = document.getElementById('shedule').value;
    let service = document.getElementById('service').value;
    let price = document.getElementById('price').value;
    let day = document.getElementById('day').value;
    let month = document.getElementById('month').value;
    let year = document.getElementById('year').value;
    let schedule = hora + "00";
    let date = year+"-"+month+"-"+day;
    console.log(date);

    fetch('/schedulescad', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, schedule, service, price, date, id}),
      })
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw response;
        }
      })
      .then((data) => {
        window.location.reload(true);        
      })
      .catch((response) => {
        // Verifique o status da resposta
     
      });  
}