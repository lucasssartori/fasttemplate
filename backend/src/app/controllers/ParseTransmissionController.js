import fs from 'fs';

export default class ParseTransmissionController {
  constructor(name, system) {
    this.name = name;
    this.system = system;
    this.transmissions = [];
  }

  parseTransmission() {
    const sigla_ambientes = ['U', 'H', 'N', 'R', 'Q'];

    if (
      (this.name.substr(0, 1) === '#' || this.name.substr(0, 1) === 'S') &&
      this.system.substr(0, 3) === 'STC'
    ) {
      const sigla_job = this.name.substr(0, 1);
      sigla_ambientes.forEach((sigla) =>
        /*
        Array.prototype.push.apply(
          this.transmissions,
          this.parse(this.name.replace(sigla_job, sigla))
        ) */
        console.log(this.parse(this.name.replace(sigla_job, sigla)))
      );
    } else {
      Array.prototype.push.apply(this.transmissions, this.parse(this.name));
    }

    for (let i = 0; i < this.transmissions.length; i += 1) {
      for (let y = this.transmissions.length - 1; y > i; y -= 1) {
        if (
          this.transmissions[i].user_in === this.transmissions[y].user_in &&
          this.transmissions[i].tech_in === this.transmissions[y].tech_in &&
          this.transmissions[i].tech_for === this.transmissions[y].tech_for &&
          this.transmissions[i].server_for ===
            this.transmissions[y].server_for &&
          this.transmissions[i].application_in ===
            this.transmissions[y].application_in &&
          this.transmissions[i].mask_archive_in ===
            this.transmissions[y].mask_archive_in &&
          this.transmissions[i].mask_archive_for ===
            this.transmissions[y].mask_archive_for &&
          this.transmissions[i].directory_for ===
            this.transmissions[y].directory_for
        ) {
          this.transmissions[i].server_in = this.transmissions[
            i
          ].server_in.concat(' - ', this.transmissions[y].server_in);

          this.transmissions.splice(y, 1);
        }
      }
    }

    return this.transmissions;
  }

  parse(job_name) {
    const aux_transmissions = [];

    let transmission_pelican = false;
    let transmission_conect = false;
    let separate = '';
    let user_in = '';
    let tech_in = '';
    let tech_for = '';
    let server_in = '';
    let server_for = '';
    let application_in = '';
    let mask_archive_in = '';
    let mask_archive_for = '';
    let directory_for = '';

    fs.readFile(
      `Z:\\COPERNIC_PASTAS_INDICE\\01. Fontes Dimensions R1\\PRODUCAO_JCL\\${job_name}.txt`,
      'utf8',
      (error, data) => {
        if (error) {
          console.log(error);
        } else {

          return data;
          /*
          const lines = data.split('\r\n');

          lines.forEach((line) => {
            let trim_line = line.replace(/\s{2,}/g, ' ');
            trim_line = trim_line.trim();

            if (trim_line.search('EXEC PELREQ') !== -1) {
              tech_in = 'PELICAN';
              tech_for = 'PELICAN';
              transmission_pelican = true;
            }

            if (trim_line.search('EXEC CONECT') !== -1) {
              tech_in = 'CONECT';
              tech_for = 'CONECT';
              transmission_conect = true;
            }

            if (transmission_pelican) {
              const [atribute, value] = trim_line.split('=');
              switch (atribute) {
                case 'LOCAL':
                  server_in = value;
                  break;
                case 'DEST':
                  server_for = value;
                  break;
                case 'N':
                  application_in = value;
                  break;
                case 'DSNORIG':
                  mask_archive_in = value;
                  break;
                case 'MSG1':
                  mask_archive_for = value;
                  break;
                case 'MSG2':
                  directory_for = value;
                  break;
                case 'COMP':
                  transmission_pelican = false;
                  aux_transmissions.push({
                    user_in,
                    tech_in,
                    tech_for,
                    server_in,
                    server_for,
                    application_in,
                    mask_archive_in,
                    mask_archive_for,
                    directory_for,
                  });

                  user_in = '';
                  tech_in = '';
                  tech_for = '';
                  server_in = '';
                  server_for = '';
                  application_in = '';
                  mask_archive_in = '';
                  mask_archive_for = '';
                  directory_for = '';
                  break;
                default:
              }
            }

            if (transmission_conect) {
              const [atribute, value] = trim_line.split('=');
              switch (atribute) {
                case 'SIGNON USERID':
                  separate = value.indexOf(',');
                  user_in = value.substr(1, separate);
                  break;
                case 'SUBMIT PROC':
                  application_in = value.substr(0, value.length - 2);
                  break;
                case '&ORIGEM':
                  server_in = value.substr(0, value.length - 2);
                  break;
                case '&DESTINO':
                  server_for = value.substr(0, value.length - 2);
                  break;
                case '&ARQORIG':
                  mask_archive_in = value.substr(0, value.length - 2);
                  break;
                case '&DIRET':
                  directory_for = value.substr(0, value.length - 2);
                  break;
                case '&ARQDEST':
                  mask_archive_for = value;
                  break;
                case 'SIGNOFF':
                  transmission_conect = false;
                  aux_transmissions.push({
                    user_in,
                    tech_in,
                    tech_for,
                    server_in,
                    server_for,
                    application_in,
                    mask_archive_in,
                    mask_archive_for,
                    directory_for,
                  });

                  user_in = '';
                  tech_in = '';
                  tech_for = '';
                  server_in = '';
                  server_for = '';
                  application_in = '';
                  mask_archive_in = '';
                  mask_archive_for = '';
                  directory_for = '';

                  break;
                default:
              }
            }
          });
        }

        return aux_transmissions;
        */
      }
    );

  }
}
