/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import fs from 'fs';
import { promisify } from 'util';
import SolutionAgent from './enums/EnumSolutionAgent';

export default class ParseTransmissionController {
  constructor(name, system) {
    this.name = name;
    this.system = system;
    this.transmissions = [];
  }

  async parseTransmission() {
    const access = promisify(fs.access);

    try {
      await access('Z:\\COPERNIC_PASTAS_INDICE');

      const sigla_ambientes = [
        { site_uf: 'MG', sigla_ambiente: 'U' },
        { site_uf: 'BA', sigla_ambiente: 'H' },
        { site_uf: 'PE', sigla_ambiente: 'N' },
        { site_uf: 'RJ', sigla_ambiente: 'R' },
        { site_uf: 'UN', sigla_ambiente: 'Q' },
        { site_uf: '31 Global', sigla_ambiente: 'T' },
        { site_uf: 'Pegasus', sigla_ambiente: 'J' },
      ];

      if (this.name.substr(0, 1) === '#' || this.name.substr(0, 1) === 'S') {
        const sigla_job = this.name.substr(0, 1);

        for (const sigla of sigla_ambientes) {
          const retorno = await this.parse(
            this.name.replace(sigla_job, sigla.sigla_ambiente),
            sigla.site_uf
          );
          Array.prototype.push.apply(this.transmissions, retorno);
        }
      } else {
        Array.prototype.push.apply(
          this.transmissions,
          await this.parse(this.name)
        );
      }

      for (let i = 0; i < this.transmissions.length; i += 1) {
        for (let y = this.transmissions.length - 1; y > i; y -= 1) {
          if (
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

            this.transmissions[i].node_in = this.transmissions[
              i
            ].node_in.concat(' - ', this.transmissions[y].node_in);

            this.transmissions[i].user_in = this.transmissions[
              i
            ].user_in.concat(' - ', this.transmissions[y].user_in);

            this.transmissions.splice(y, 1);
          }
        }
      }

      this.transmissions.forEach((item) => {
        item.server_in = `Mainframe ${item.server_in}`;
      });

      return this.transmissions;
    } catch (error) {
      return this.transmissions;
    }
  }

  async parse(job_name, site_uf = 'MG') {
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
    let node_in = '';
    let node_for = '';

    let mask_archive_in_proc = '';

    const solution_agent_in =
      this.system === 'SAC'
        ? SolutionAgent.OP_SACFIXA_N2_OI
        : SolutionAgent.OP_STCVOZ_N2_ACC;

    const solution_agent_for =
      this.system === 'SAC'
        ? SolutionAgent.OP_SACFIXA_N2_OI
        : SolutionAgent.OP_STCVOZ_N2_ACC;

    const readFile = promisify(fs.readFile);

    try {
      const file = await readFile(
        `Z:\\COPERNIC_PASTAS_INDICE\\01. Fontes Dimensions R1\\PRODUCAO_JCL\\${job_name}.txt`,
        'utf8'
      );

      const lines = file.split('\r\n');

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
              server_in = value.substr(3, value.length);
              node_in = value;
              user_in = `CD${value}`;
              break;
            case 'DEST':
              server_for = value;
              node_for = value;
              break;
            case 'N':
              application_in = value;
              break;
            case 'DSNORIG':
              mask_archive_in = value;
              mask_archive_in_proc = mask_archive_in.replace(/%%\./g, '.');
              mask_archive_in_proc = mask_archive_in_proc.replace(/%%/g, '&');
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
                node_in,
                node_for,
                solution_agent_in,
                solution_agent_for,
                mask_archive_in_proc,
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
              node_in = '';
              node_for = '';
              break;
            default:
          }
        }

        if (transmission_conect) {
          const [atribute, value] = trim_line.split('=');
          switch (atribute) {
            case 'SIGNON USERID':
              separate = value.split(',');
              user_in = separate[1].substr(0, separate[1].length - 3);
              node_in = separate[1].substr(2, separate[1].length - 5);
              break;
            case 'SUBMIT PROC':
              application_in = value.substr(0, value.length - 2);
              break;
            case '&ORIGEM':
              server_in = value.substr(0, value.length - 2);
              break;
            case '&DESTINO':
              server_for = value.substr(0, value.length - 2);
              node_for = value.substr(0, value.length - 2);
              break;
            case '&ARQORIG':
              mask_archive_in = value.substr(0, value.length - 2);
              mask_archive_in_proc = mask_archive_in.replace('%%.', '.');
              mask_archive_in_proc = mask_archive_in_proc.replace('%%', '&');
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
                node_in,
                node_for,
                solution_agent_in,
                solution_agent_for,
                mask_archive_in_proc,
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
              node_in = '';
              node_for = '';

              break;
            default:
          }
        }
      });
      return aux_transmissions;
    } catch (error) {
      return aux_transmissions;
    }
  }
}
