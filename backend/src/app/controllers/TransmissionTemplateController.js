import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  AlignmentType,
  UnderlineType,
  BorderStyle,
  VerticalAlign,
} from 'docx';

import Job from '../models/Job';
import Transmission from '../models/Transmission';

class TransmissionTemplateController {
  async index(req, res) {
    const { id } = req.params;

    const transmissionsJobs = await Job.findByPk(id, {
      include: { model: Transmission },
    });

    if (!transmissionsJobs) {
      return res.status(400).json({ error: 'Job informado inválido.' });
    }

    if (transmissionsJobs.Transmissions.length < 1) {
      return res.status(400).json({ error: 'Job não possui transmissão.' });
    }

    const doc = new Document({
      creator: 'FastDoc',
      title: 'Documento de Transmissão',
      description: 'Documento de Transmissão automático',
      styles: {
        paragraphStyles: [
          {
            id: 'text1',
            name: 'Text 1',
            basedOn: 'Normal',
            next: 'Normal',
            run: {
              bold: true,
              size: 24,
              font: 'Times New Roman',
              underline: {
                type: UnderlineType.SINGLE,
              },
            },
            paragraph: {
              alignment: AlignmentType.CENTER,
              spacing: {
                after: 200,
              },
            },
          },
          {
            id: 'text2',
            name: 'Text 2',
            basedOn: 'Normal',
            next: 'Normal',
            run: {
              size: 24,
              font: 'Times New Roman',
            },
            paragraph: {
              alignment: AlignmentType.CENTER,
              spacing: {
                after: 200,
              },
            },
          },
          {
            id: 'headtable',
            name: 'headtable',
            basedOn: 'Normal',
            next: 'Normal',
            run: {
              bold: true,
              size: 24,
              font: 'Times New Roman',
            },
            paragraph: {
              alignment: AlignmentType.CENTER,
            },
          },
          {
            id: 'TextTable1',
            name: 'Text Table 1',
            basedOn: 'Normal',
            next: 'Normal',
            run: {
              size: 20,
              font: 'Times New Roman',
            },
            paragraph: {
              alignment: AlignmentType.LEFT,
            },
          },
          {
            id: 'TextTable2',
            name: 'Text Table 2',
            basedOn: 'Normal',
            next: 'Normal',
            run: {
              size: 20,
              font: 'Courier New',
            },
            paragraph: {
              alignment: AlignmentType.CENTER,
            },
          },
        ],
      },
    });

    transmissionsJobs.Transmissions.forEach((transmission) => {
      const table = new Table({
        margins: {
          top: 20,
          bottom: 20,
          left: 20,
          right: 20,
        },
        alignment: AlignmentType.CENTER,
        borders: {
          left: { style: BorderStyle.DOUBLE, size: 1, color: '000' },
          top: { style: BorderStyle.DOUBLE, size: 1, color: '000' },
          right: { style: BorderStyle.DOUBLE, size: 1, color: '000' },
          bottom: { style: BorderStyle.DOUBLE, size: 1, color: '000' },
          insideHorizontal: {
            style: BorderStyle.DOUBLE,
            size: 1,
            color: '000',
          },
          insideVertical: { style: BorderStyle.DOUBLE, size: 1, color: '000' },
        },
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({
                children: [
                  // ------------------------------------------------- CABEÇALHO
                  new Paragraph({
                    text: 'SEÇÃO',
                    style: 'headtable',
                  }),
                ],
                shading: {
                  fill: 'E6E6E6',
                },
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    text: 'ORIGEM',
                    style: 'headtable',
                  }),
                ],
                shading: {
                  fill: 'E6E6E6',
                },
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    text: 'DESTINO',
                    style: 'headtable',
                  }),
                ],
                shading: {
                  fill: 'E6E6E6',
                },
              }),
            ],
          }),
          // ------------------------------------------------- 1 – Forma de envio
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({
                children: [
                  new Paragraph({
                    text: '1 – Forma de envio',
                    style: 'TextTable1',
                  }),
                ],
                shading: {
                  fill: 'E6E6E6',
                },
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    text: transmission.tech_in,
                    style: 'TextTable2',
                  }),
                ],
                verticalAlign: VerticalAlign.CENTER,
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    text: transmission.tech_for,
                    style: 'TextTable2',
                  }),
                ],
                verticalAlign: VerticalAlign.CENTER,
              }),
            ],
          }),
          // ------------------------------------- 2 – Servidor (ambiente/Nome/IP)
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({
                children: [
                  new Paragraph({
                    text: '2 – Servidor (ambiente/Nome/IP)',
                    style: 'TextTable1',
                  }),
                ],
                shading: {
                  fill: 'E6E6E6',
                },
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    text: transmission.server_in,
                    style: 'TextTable2',
                  }),
                ],
                verticalAlign: VerticalAlign.CENTER,
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    text: transmission.server_for,
                    style: 'TextTable2',
                  }),
                ],
                verticalAlign: VerticalAlign.CENTER,
              }),
            ],
          }),
          // -----------------3 – Caminho / PATH (Diretório / FS / Data Set, etc)
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({
                children: [
                  new Paragraph({
                    text: '3 – Caminho / PATH (Diretório / FS / Data Set, etc)',
                    style: 'TextTable1',
                  }),
                ],
                shading: {
                  fill: 'E6E6E6',
                },
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    text: transmission.directory_in,
                    style: 'TextTable2',
                  }),
                ],
                verticalAlign: VerticalAlign.CENTER,
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    text: transmission.directory_for,
                    style: 'TextTable2',
                  }),
                ],
                verticalAlign: VerticalAlign.CENTER,
              }),
            ],
          }),
          // ----- 4 – Usuário executor do Processo Control-M(Ambiente Distribuído)
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({
                children: [
                  new Paragraph({
                    text:
                      '4 – Usuário executor do Processo Control-M(Ambiente Distribuído)',
                    style: 'TextTable1',
                  }),
                ],
                shading: {
                  fill: 'E6E6E6',
                },
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    text: transmission.user_in,
                    style: 'TextTable2',
                  }),
                ],
                verticalAlign: VerticalAlign.CENTER,
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    text: transmission.user_for,
                    style: 'TextTable2',
                  }),
                ],
                verticalAlign: VerticalAlign.CENTER,
              }),
            ],
          }),
          // ------------------------------------------- 5 – Máscara do arquivo
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({
                children: [
                  new Paragraph({
                    text: '5 – Máscara do arquivo',
                    style: 'TextTable1',
                  }),
                ],
                shading: {
                  fill: 'E6E6E6',
                },
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    text: transmission.mask_archive_in,
                    style: 'TextTable2',
                  }),
                ],
                verticalAlign: VerticalAlign.CENTER,
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    text: transmission.mask_archive_for,
                    style: 'TextTable2',
                  }),
                ],
                verticalAlign: VerticalAlign.CENTER,
              }),
            ],
          }),
          // ------------------------------------ 6 – Tam. Registro / DCB / ???CYL
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({
                children: [
                  new Paragraph({
                    text: '6 – Tam. Registro / DCB / ???CYL',
                    style: 'TextTable1',
                  }),
                ],
                shading: {
                  fill: 'E6E6E6',
                },
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    text: transmission.size_register_in,
                    style: 'TextTable2',
                  }),
                ],
                verticalAlign: VerticalAlign.CENTER,
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    text: transmission.size_register_for,
                    style: 'TextTable2',
                  }),
                ],
                verticalAlign: VerticalAlign.CENTER,
              }),
            ],
          }),
          // ----------------- 7 – Identificação:Node (Connect) / Site (Pelican)

          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({
                children: [
                  new Paragraph({
                    text: '7 – Identificação:Node (Connect) / Site (Pelican)',
                    style: 'TextTable1',
                  }),
                ],
                shading: {
                  fill: 'E6E6E6',
                },
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    text: transmission.node_in,
                    style: 'TextTable2',
                  }),
                ],
                verticalAlign: VerticalAlign.CENTER,
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    text: transmission.node_for,
                    style: 'TextTable2',
                  }),
                ],
                verticalAlign: VerticalAlign.CENTER,
              }),
            ],
          }),
          // ----------------------- 8 - Aplicação(XFB) / Process Name (CD)
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({
                children: [
                  new Paragraph({
                    text: '8 - Aplicação(XFB) / Process Name (CD)',
                    style: 'TextTable1',
                  }),
                ],
                shading: {
                  fill: 'E6E6E6',
                },
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    text: transmission.application_in,
                    style: 'TextTable2',
                  }),
                ],
                verticalAlign: VerticalAlign.CENTER,
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    text: transmission.application_for,
                    style: 'TextTable2',
                  }),
                ],
                verticalAlign: VerticalAlign.CENTER,
              }),
            ],
          }),
          // -- 9 -Agente solução no ARS  e  responsável pelo diretório/Manutenção
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({
                children: [
                  new Paragraph({
                    text:
                      '9 -Agente solução no ARS  e  responsável pelo diretório/Manutenção',
                    style: 'TextTable1',
                  }),
                ],
                shading: {
                  fill: 'E6E6E6',
                },
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    text: transmission.solution_agent_in,
                    style: 'TextTable2',
                  }),
                ],
                verticalAlign: VerticalAlign.CENTER,
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    text: transmission.solution_agent_for,
                    style: 'TextTable2',
                  }),
                ],
                verticalAlign: VerticalAlign.CENTER,
              }),
            ],
          }),
          // -- 10 – Aplicação do processo
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({
                children: [
                  new Paragraph({
                    text: '10 – Aplicação do processo',
                    style: 'TextTable1',
                  }),
                ],
                shading: {
                  fill: 'E6E6E6',
                },
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    text: transmission.process_in,
                    style: 'TextTable2',
                  }),
                ],
                verticalAlign: VerticalAlign.CENTER,
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    text: transmission.process_for,
                    style: 'TextTable2',
                  }),
                ],
                verticalAlign: VerticalAlign.CENTER,
              }),
            ],
          }),
        ],
      });

      doc.addSection({
        properties: {},
        children: [
          new Paragraph({
            text: `Documento de transmissão da etapa ${transmissionsJobs.name}`,
            style: 'text1',
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Etapa:',
                bold: true,
              }),
              new TextRun({
                text: transmissionsJobs.name,
              }),
            ],
            style: 'text2',
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Arquivo:',
                bold: true,
              }),
              new TextRun({
                text: transmission.mask_archive_in,
              }),
            ],
            style: 'text2',
          }),
          table,
        ],
      });
    });

    // Used to export the file into a .docx file
    const b64string = await Packer.toBase64String(doc);
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=Documento de Transmissão.docx'
    );

    return res.send(Buffer.from(b64string, 'base64'));
  }
}

export default new TransmissionTemplateController();
