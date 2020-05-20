import fs from 'fs';
import { NONAME } from 'dns';
import { IGNORE } from 'sequelize/types/lib/index-hints';

class ParseTransmissionController {
  /*
  constructor(nome_job, id_job) {
    this.nome_job = nome_job;
    this.id_job = id_job;
  }

  parseTransmission() {

  */

  async store(req, res) {
    const { name } = req.body;

    fs.readFile(
      `Z:\\COPERNIC_PASTAS_INDICE\\01. Fontes Dimensions R1\\PRODUCAO_JCL\\${name}.txt`,
      'utf8',
      (err, data) => {
        try {
          const lines = data.split('\r\n');

          const transmission = {
            tech_in: '',
            tech_for: '',
            server_in: '',
            server_for: '',
            directory_in: '',
            directory_for: '',
            user_in: '',
            user_for: '',
            mask_archive_in: '',
            mask_archive_for: '',
            size_register_in: '',
            size_register_for: '',
            node_in: '',
            node_for: '',
            application_in: '',
            application_for: '',
            solution_agent_in: '',
            solution_agent_for: '',
            process_in: '',
            process_for: '',
          };

          const transmission_pelican = false;

          for (let i = 0; i < lines.length; i++) {
            let trim_line = lines[i].replace(/\s{2,}/g, ' ');
            trim_line = trim_line.trim();

            if (trim_line.search('EXEC PELREQ') !== -1) {
              transmission.tech_in = 'PELICAN';
              transmission.tech_for = 'PELICAN';
              transmission_pelican = true;
            }
            if (transmission_pelican) {
              const words = lines[i].split('=');

              console.log(words[1]);

              switch (words[0]) {
                case 'DEST':
                  //                  transmission.server_for = words[1];
                  transmission.server_in = 'MG';
                  break;
                case 'N':
                  //                  transmission.application_in = words[1];
                  console.log('teste');
                  break;
                default:
                  console.log('nada');
              }
            }
          }
          console.log('sair');
          return res.json({
            transmission,
          });
        } catch (erro) {
          return res.json({
            err,
            erro,
          });
        }
      }
    );
  }
}

export default new ParseTransmissionController();
