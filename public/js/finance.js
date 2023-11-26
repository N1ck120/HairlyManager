//cÓDIGO PARA SOMAR OS VALORES TOTAIS DA TABELA E ATRIBUIR AO H3, POR ALGUM MOTIVO NÃO ESTÁ FUNCIONANDO
function updateTotal() {
    var rows = document.querySelectorAll('.table tbody tr');
    var total = 0;
    for (var i = 0; i < rows.length; i++) {
        var rowTotal = parseFloat(rows[i].querySelector('td:nth-child(5)').innerText.replace('R$ ', ''));
        total += rowTotal;
    }
    document.getElementById('total').innerText = 'Total: R$ ' + total.toFixed(2);
}

// Função para adicionar uma linha(Funciona mas ainda tenho que ver a logica pra adicionar valores diferentes a cada entrada do BD)
function addRow() {
    var table = document.querySelector('.table tbody');
    var row = document.createElement('tr');
    var html = `
        <th scope="row">4</th>
        <td>Novo Serviço</td>
        <td>R$ 50</td>
        <td><button style="background: none; border: none;" class="increase">-</button>1<button style="background: none; border: none;" class="increase">+</button></td>
        <td>R$ 50</td>
    `;
    row.innerHTML = html;
    table.appendChild(row);
}

// Função para remover uma linha, funciona mas provavelmente não vamos usar
function removeRow(rowId) {
    var row = document.querySelector(`.table tbody tr:nth-child(${rowId})`);
    row.parentNode.removeChild(row);
}

//Código dos botões de + ao lado do valor da quantidade, também não está funcionando
var buttons = document.querySelectorAll('.increase');
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function(event) {
        var button = event.target;
        var cell = button.parentNode;
        var quantity = parseInt(cell.innerText, 10);
        quantity++;
        cell.innerText = quantity + ' ';
        cell.appendChild(button);
        updateTotal();
    });
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
  console.log(tinfo);
  return tinfo.payload;
}












// Função para fazer a requisição HTTP
function getData() {
    let id = (getTokenInfo()).id;
  
    fetch('/finance', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id}),
    })
    .then((response) => {
        if (response.ok) {
            return response.text();
        } else {
            throw response;
        }
    })
    .then((data) => {
        console.log("cliente: "+data);
    // Usuário cadastrado com sucesso
    
    })
    .catch((response) => {
    // Verifique o status da resposta
        if (response.status === 409) {
            // Email já cadastrado
            document.getElementById("errormsg").style.display = "block";
            document.getElementById("errormsgtxt").textContent= "Erro! Email já cadastrado!";
        } else {
            // Outro erro
            document.getElementById("errormsg").style.display = "block";
            document.getElementById("errormsgtxt").textContent= "Erro no servidor";
        }
    });
}