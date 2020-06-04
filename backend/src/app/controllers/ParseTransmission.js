/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import fs from 'fs';
import { promisify } from 'util';
import SolutionAgent from './enums/EnumSolutionAgent';

export default class ParseTransmission {
  constructor(name, system) {
    this.name = name;
    this.system = system;
    this.transmissions = [];
  }

  // ---------------------------------------------------------------------------------------------------------------
  // Metodo principal para chamado para realizar o parse
  // ---------------------------------------------------------------------------------------------------------------
  async parseTransmission() {
    const access = promisify(fs.access);

    let size_register_in = '';
    let size_register_for = '';
    let mask_archive_in_proc = '';
    let separate_register = '';

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
          const retorno = await this.parseJob(
            this.name.replace(sigla_job, sigla.sigla_ambiente),
            sigla.site_uf
          );
          Array.prototype.push.apply(this.transmissions, retorno);
        }
      } else {
        const ambiente = sigla_ambientes.find(
          (siglas) => this.name.substr(0, 1) === siglas.sigla_ambiente
        );

        Array.prototype.push.apply(
          this.transmissions,
          await this.parseJob(this.name, ambiente.site_uf)
        );
      }
      // ---------------------------------------------------------------------------------------------------------------
      // Compara os elementos do array para fazer merge das transmissoes do ambientes
      // ---------------------------------------------------------------------------------------------------------------
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
              this.transmissions[y].directory_for &&
            this.transmissions[i].proc_name === this.transmissions[y].proc_name
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

      for (const transmission of this.transmissions) {
        mask_archive_in_proc = transmission.mask_archive_in.replace(
          /%%\./g,
          '.'
        );
        mask_archive_in_proc = mask_archive_in_proc.replace(/%%/g, '&');
        size_register_in = await this.parseProc(
          transmission.proc_name,
          transmission.site_uf,
          mask_archive_in_proc
        );
        if (size_register_in !== '' || size_register_in === undefined) {
          separate_register = size_register_in.split('=');
          size_register_for = `${separate_register[1]} bytes`;
        }
        transmission.size_register_in = size_register_in;
        transmission.size_register_for = size_register_for;
      }

      return this.transmissions;
    } catch (error) {
      return this.transmissions;
    }
  }

  // ---------------------------------------------------------------------------------------------------------------
  // Retorna o arquivo ou erro
  // ---------------------------------------------------------------------------------------------------------------
  async readFile(path) {
    const readFile = promisify(fs.readFile);
    try {
      const data = await readFile(path, 'utf8');
      return data;
    } catch (error) {
      return error;
    }
  }

  // ---------------------------------------------------------------------------------------------------------------
  // Parse do JOB
  // ---------------------------------------------------------------------------------------------------------------
  async parseJob(job_name, site_uf) {
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
    let application_for = '';
    let mask_archive_in = '';
    let mask_archive_for = '';
    let directory_for = '';
    let node_in = '';
    let node_for = '';

    let proc_name = '';
    let path_job = '';

    const user_for = 'N/A';
    const directory_in = 'N/A';
    const solution_agent_in =
      this.system === 'SAC'
        ? SolutionAgent.OP_SACFIXA_N2_OI
        : SolutionAgent.OP_STCVOZ_N2_ACC;

    const solution_agent_for =
      this.system === 'SAC'
        ? SolutionAgent.OP_SACFIXA_N2_OI
        : SolutionAgent.OP_STCVOZ_N2_ACC;

    let data_file = await this.readFile(
      `Z:\\COPERNIC_PASTAS_INDICE\\01. Fontes Dimensions R1\\PRODUCAO_JCL\\${job_name}.txt`
    );

    if (data_file.errno) {
      if (site_uf === 'RJ') {
        path_job = 'TELEMAR';
      } else {
        path_job = 'TELEMIG';
      }
      data_file = await this.readFile(
        `Z:\\COPERNIC_PASTAS_INDICE\\02. Fontes JCL - Fora do Dimensions\\${site_uf}\\${path_job}.CTMJCL\\${job_name}.txt`
      );
    }

    if (data_file.errno) {
      return aux_transmissions;
    }

    const lines = data_file.split('\r\n');

    lines.forEach((line) => {
      let trim_line = line.replace(/\s{2,}/g, ' ');
      trim_line = trim_line.trim();

      if (trim_line.search('EXEC') !== -1 && proc_name === '') {
        const axu_proc_name = trim_line.replace(/,/g, '');
        const [, , p_name] = axu_proc_name.split(' ');
        proc_name = p_name;
      }

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
            application_for = value;
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
              user_for,
              tech_in,
              tech_for,
              server_in,
              server_for,
              application_in,
              application_for,
              mask_archive_in,
              mask_archive_for,
              directory_in,
              directory_for,
              node_in,
              node_for,
              solution_agent_in,
              solution_agent_for,
              proc_name,
              site_uf,
            });

            user_in = '';
            tech_in = '';
            tech_for = '';
            server_in = '';
            server_for = '';
            application_in = '';
            application_for = '';
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
            application_for = value.substr(0, value.length - 2);
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
              user_for,
              tech_in,
              tech_for,
              server_in,
              server_for,
              application_in,
              application_for,
              mask_archive_in,
              mask_archive_for,
              directory_in,
              directory_for,
              node_in,
              node_for,
              solution_agent_in,
              solution_agent_for,
              proc_name,
              site_uf,
            });

            user_in = '';
            tech_in = '';
            tech_for = '';
            server_in = '';
            server_for = '';
            application_in = '';
            application_for = '';
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
  }

  // ---------------------------------------------------------------------------------------------------------------
  // Parse do LRECL da PROC
  // ---------------------------------------------------------------------------------------------------------------
  async parseProc(proc_name, site_uf, mask_archive_in_proc) {
    let path_proc = '';
    let size_register = '';
    let mask_archive_search = false;
    let count_lines = 0;

    let proc_file = await this.readFile(
      `Z:\\COPERNIC_PASTAS_INDICE\\01. Fontes Dimensions R1\\PRODUCAO_PROC\\${proc_name}.txt`
    );

    if (proc_file.errno) {
      if (site_uf === 'RJ') {
        path_proc = 'TELEMAR';
      } else {
        path_proc = 'TELEMIG';
      }
      proc_file = await this.readFile(
        `Z:\\COPERNIC_PASTAS_INDICE\\02. Fontes JCL - Fora do Dimensions\\${site_uf}\\${path_proc}.PRODPROC\\${proc_name}.txt`
      );
    }

    if (proc_file.errno) {
      return size_register;
    }

    const proc_lines = proc_file.split('\r\n');

    proc_lines.forEach((line) => {
      let trim_line = line.replace(/\s{2,}/g, ' ');
      trim_line = trim_line.trim();

      if (trim_line.search(mask_archive_in_proc) !== -1) {
        mask_archive_search = true;
      }

      if (mask_archive_search) {
        count_lines += 1;
        if (trim_line.search('LRECL') !== -1) {
          mask_archive_search = false;

          const ini = trim_line.indexOf('LRECL');
          size_register = trim_line.slice(ini);
          const end = size_register.indexOf(',');
          size_register = size_register.slice(0, -(size_register.length - end));
          return size_register;
        }
      }

      if (count_lines >= 5) {
        count_lines = 0;
        mask_archive_search = false;
      }
    });

    return size_register;
  }
}
