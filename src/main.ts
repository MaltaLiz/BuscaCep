import cep, { CEP } from 'cep-promise';

const view = document.querySelector('#view');
const entradaUsuario = <HTMLInputElement> document.querySelector('#cep');
const formulario = document.querySelector('#form');

formulario?.addEventListener('submit', event => {
    event.preventDefault();
    entradaUsuario? makeRequest(entradaUsuario.value) : null;
});

async function makeRequest(cepProcurado: string | null) {
    cep(cepProcurado).then(cep => {
        view? view.innerHTML = templateTabela(cep) : null;
    }).catch(() => {
        view? view.innerHTML = templateErro() : null;
    });
}

function templateTabela(endereco: CEP){
    return `
    <table id='tabela'>
        <thead>
            <tr>
                <th>Logradouro/Nome</th>
                <th>Bairro</th>
                <th>Localidade/Estado</th>
                <th>CEP</th>
            </tr>
        </thead>
        <tbody>
            <td>${endereco.street}</td>
            <td>${endereco.neighborhood}</td>
            <td>${endereco.city}/${endereco.state}</td>
            <td>${endereco.cep}</td>
        </tbody>
        <tfoot></tfoot>
    </table>
    `
}

function templateErro(){
    return `
    <p id="erro">Não foi possível encontrar o CEP requerido, por favor verifique se é um CEP válido.</p>
    `
}

