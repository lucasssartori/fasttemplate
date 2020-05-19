import fs from 'fs';

export default class ParseTransmissionController {
  constructor(nome_job) {
    this.nome_job = nome_job;
  }

  parseTransmission() {
    fs.readFile(
      `Z:\\COPERNIC_PASTAS_INDICE\\01. Fontes Dimensions R1\\PRODUCAO_JCL\\${this.nome_job}.txt`,
      'utf8',
      (err, data) => {
        try {
          console.log(data);
        } catch (erro) {
          console.log(err);
          console.log(erro);
        }
      }
    );
  }
}
