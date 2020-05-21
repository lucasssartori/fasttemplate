import fs from 'fs';

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

    const sigla_ambientes = ['U', 'H', 'N', 'R'];
    const transmissions = [];

    function Parse(job_name) {
      fs.readFile(
        `Z:\\COPERNIC_PASTAS_INDICE\\01. Fontes Dimensions R1\\PRODUCAO_JCL\\${job_name}.txt`,
        'utf8',
        (err, data) => {
          try {
            const lines = data.split('\r\n');

            const transmission = {
              tech_in: 'N/A',
              tech_for: 'N/A',
              server_in: 'N/A',
              server_for: 'N/A',
              directory_in: 'N/A',
              directory_for: 'N/A',
              user_in: 'N/A',
              user_for: 'N/A',
              mask_archive_in: 'N/A',
              mask_archive_for: 'N/A',
              size_register_in: 'N/A',
              size_register_for: 'N/A',
              node_in: 'N/A',
              node_for: 'N/A',
              application_in: 'N/A',
              application_for: 'N/A',
              solution_agent_in: 'N/A',
              solution_agent_for: 'N/A',
              process_in: 'N/A',
              process_for: 'N/A',
            };

            let transmission_pelican = false;
            let transmission_conect = false;
            let separate = '';

            lines.forEach((line) => {
              let trim_line = line.replace(/\s{2,}/g, ' ');
              trim_line = trim_line.trim();

              if (trim_line.search('EXEC PELREQ') !== -1) {
                transmission.tech_in = 'PELICAN';
                transmission.tech_for = 'PELICAN';
                transmission_pelican = true;
              }

              if (trim_line.search('EXEC CONECT') !== -1) {
                transmission.tech_in = 'CONECT';
                transmission.tech_for = 'CONECT';
                transmission_conect = true;
              }

              if (transmission_pelican) {
                const [atribute, value] = trim_line.split('=');
                switch (atribute) {
                  case 'LOCAL':
                    transmission.server_in = value;
                    break;
                  case 'DEST':
                    transmission.server_for = value;
                    break;
                  case 'N':
                    transmission.application_in = value;
                    break;
                  case 'DSNORIG':
                    transmission.mask_archive_in = value;
                    break;
                  case 'MSG1':
                    transmission.mask_archive_for = value;
                    break;
                  case 'MSG2':
                    transmission.directory_for = value;
                    break;
                  case 'COMP':
                    transmission_pelican = false;
                    transmissions.push(transmission);
                    break;
                  default:
                }
              }

              if (transmission_conect) {
                const [atribute, value] = trim_line.split('=');
                switch (atribute) {
                  case 'SIGNON USERID':
                    separate = value.indexOf(',');
                    transmission.user_in = value.substr(1, separate);
                    break;
                  case 'SUBMIT PROC':
                    transmission.application_in = value.substr(
                      0,
                      value.length - 2
                    );
                    break;
                  case '&ORIGEM':
                    transmission.server_in = value.substr(0, value.length - 2);
                    break;
                  case '&DESTINO':
                    transmission.server_for = value.substr(0, value.length - 2);
                    break;
                  case '&ARQORIG':
                    transmission.mask_archive_in = value.substr(
                      0,
                      value.length - 2
                    );
                    break;
                  case '&ARQDEST':
                    transmission.mask_archive_for = value;
                    break;
                  case 'SIGNOFF':
                    transmission_conect = false;
                    transmissions.push(transmission);
                    console.log(transmissions);
                    console.log('aki 3');
                    break;
                  default:
                }
              }
            });
          } catch (erro) {
            console.log(err);
          }
        }
      );
    }

    if (name.substr(0, 1) === '#') {
      console.log('aki 1');
      sigla_ambientes.forEach((sigla) => Parse(name.replace('#', sigla)));
    } else {
      console.log('aki 2');
      Parse(name);
      console.log(transmissions);
    }

    return res.json(transmissions);
  }
}

export default new ParseTransmissionController();
