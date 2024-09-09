function gerarFaturaHTML(fatura, calc) {
  var formatarMoeda = require("./util.js") ;
  let faturaHTML = `<html>\n`;
  faturaHTML += `<p>Fatura ${fatura.cliente}</p>\n`;
  faturaHTML += `<ul>\n`;

  for (let apre of fatura.apresentacoes) {
    faturaHTML += `  <li>${calc.repo.getPeca(apre).nome}: ${formatarMoeda(calc.calcularTotalApresentacao(apre))} (${apre.audiencia} assentos)</li>\n`;
  }

  faturaHTML += `</ul>\n`;
  faturaHTML += `<p>Valor total: ${formatarMoeda(calc.calcularTotalFatura(fatura.apresentacoes))}</p>\n`;
  faturaHTML += `<p>Créditos acumulados: ${calc.calcularTotalCreditos(fatura.apresentacoes)}</p>\n`;
  faturaHTML += `</html>`;

  return faturaHTML;
}

const { readFileSync } = require('fs');

var Repositorio = require("./repositorio.js");
var ServicoCalculoFatura = require("./servico.js") ;
var gerarFaturaStr = require("./apresentacao.js");

// main
const faturas = JSON.parse(readFileSync('./faturas.json'));
const calc = new ServicoCalculoFatura(new Repositorio());
const faturaStr = gerarFaturaStr(faturas, calc);
const faturaHTML = gerarFaturaHTML(faturas, calc);
console.log(faturaStr);
console.log(faturaHTML);