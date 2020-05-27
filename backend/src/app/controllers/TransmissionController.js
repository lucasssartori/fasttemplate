import * as Yup from 'yup';

import Job from '../models/Job';
import Transmission from '../models/Transmission';

import Technologies from './enums/EnumTechnologies';

class TransmissionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      job_id: Yup.number().required(),
      tech_in: Yup.string().required(),
      tech_for: Yup.string().required(),
      server_in: Yup.string().required(),
      server_for: Yup.string().required(),
      directory_in: Yup.string().required(),
      directory_for: Yup.string().required(),
      user_in: Yup.string().required(),
      user_for: Yup.string().required(),
      mask_archive_in: Yup.string().required(),
      mask_archive_for: Yup.string().required(),
      size_register_in: Yup.string().required(),
      size_register_for: Yup.string().required(),
      node_in: Yup.string().required(),
      node_for: Yup.string().required(),
      application_in: Yup.string().required(),
      application_for: Yup.string().required(),
      solution_agent_in: Yup.string().required(),
      solution_agent_for: Yup.string().required(),
      process_in: Yup.string().required(),
      process_for: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação dos campos.' });
    }

    const { job_id, tech_in, tech_for } = req.body;

    const existJob = await Job.findByPk(job_id);

    if (!existJob) {
      return res.status(400).json({ error: 'Job informado inválido.' });
    }

    if (!(tech_in in Technologies)) {
      return res.status(400).json({ error: 'Tecnologia origem inválida.' });
    }

    if (!(tech_for in Technologies)) {
      return res.status(400).json({ error: 'Tecnologia destino inválida.' });
    }

    const transmission = await Transmission.create(req.body);

    return res.json({
      transmission,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      job_id: Yup.number(),
      tech_in: Yup.string(),
      tech_for: Yup.string(),
      server_in: Yup.string(),
      server_for: Yup.string(),
      directory_in: Yup.string(),
      directory_for: Yup.string(),
      user_in: Yup.string(),
      user_for: Yup.string(),
      mask_archive_in: Yup.string(),
      mask_archive_for: Yup.string(),
      size_register_in: Yup.string(),
      size_register_for: Yup.string(),
      node_in: Yup.string(),
      node_for: Yup.string(),
      application_in: Yup.string(),
      application_for: Yup.string(),
      solution_agent_in: Yup.string(),
      solution_agent_for: Yup.string(),
      process_in: Yup.string(),
      process_for: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação dos campos.' });
    }

    const { job_id, tech_in, tech_for } = req.body;

    if (job_id) {
      const existJob = await Job.findByPk(job_id);

      if (!existJob) {
        return res.status(400).json({ error: 'Job informado inválido.' });
      }
    }

    if (tech_in && !(tech_in in Technologies)) {
      return res.status(400).json({ error: 'Tecnologia origem inválida.' });
    }

    if (tech_for && !(tech_for in Technologies)) {
      return res.status(400).json({ error: 'Tecnologia destino inválida.' });
    }

    const { id } = req.params;

    const transmission = await Transmission.findByPk(id);

    if (!transmission) {
      return res.status(400).json({ error: 'Trnamissão informada inválida.' });
    }

    await transmission.update(req.body);

    return res.json({
      transmission,
    });
  }

  async index(req, res) {
    const { id } = req.params;
    const { page = 1 } = req.query;

    const job = await Job.findByPk(id, {
      include: { model: Transmission, limit: 10, offset: (page - 1) * 10 },
    });

    if (!job) {
      return res.status(400).json({ error: 'Job informado inválido.' });
    }

    return res.json({
      job,
    });
  }

  async indexById(req, res) {
    const { id } = req.params;

    const transmission = await Transmission.findByPk(id, {
      attributes: [
        'job_id',
        'tech_in',
        'tech_for',
        'server_in',
        'server_for',
        'directory_in',
        'directory_for',
        'user_in',
        'user_for',
        'mask_archive_in',
        'mask_archive_for',
        'size_register_in',
        'size_register_for',
        'node_in',
        'node_for',
        'application_in',
        'application_for',
        'solution_agent_in',
        'solution_agent_for',
        'process_in',
        'process_for',
      ],
    });

    if (!transmission) {
      return res.status(400).json({ error: 'Transmissão informada inválida.' });
    }

    return res.json({
      transmission,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const transmission = await Transmission.findByPk(id);

    if (!transmission) {
      return res.status(400).json({ error: 'Transmissão informada inválida.' });
    }

    await transmission.destroy(id);

    return res.json({
      message: 'Transmissão excluida com sucesso!',
    });
  }
}

export default new TransmissionController();
