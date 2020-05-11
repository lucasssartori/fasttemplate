import * as Yup from 'yup';
import { Op } from 'sequelize';

import Job from '../models/Job';
import Systems from './enums/EnumSystems';

class JobController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      system: Yup.string().required(),
      description: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação dos campos.' });
    }

    const { name, system, description } = req.body;

    const existJob = await Job.findOne({
      where: {
        name,
        system,
      },
    });

    if (existJob) {
      return res.status(400).json({ error: 'Job já está cadastrado.' });
    }

    if (!(system in Systems)) {
      return res.status(400).json({ error: 'Sistema informado inválido.' });
    }

    await Job.create(req.body);

    return res.json({
      name,
      system,
      description,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      system: Yup.string(),
      description: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação dos campos.' });
    }

    const { id } = req.params;

    const job = await Job.findByPk(id);

    if (!job) {
      return res.status(400).json({ error: 'Job informado inválido.' });
    }

    const { name, system } = req.body;

    if (system) {
      if (!(system in Systems)) {
        return res.status(400).json({ error: 'Sistema informado inválido.' });
      }
    }

    if ((name && name !== job.name) || (system && system !== job.system)) {
      const existJob = await Job.findOne({
        where: {
          name: name || job.name,
          system: system || job.system,
        },
      });

      if (existJob) {
        return res.status(400).json({ error: 'Job já está cadastrado.' });
      }
    }

    const updJob = await job.update(req.body);

    return res.json({
      updJob,
    });
  }

  async index(req, res) {
    const { name = '', page = 1 } = req.query;

    const jobs = await Job.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      limit: 10,
      offset: (page - 1) * 10,
      order: ['created_at'],
    });

    return res.json({
      jobs,
    });
  }

  async indexById(req, res) {
    const { id } = req.params;

    const job = await Job.findByPk(id);

    if (!job) {
      return res.status(400).json({ error: 'Job informado inválido.' });
    }

    return res.json({
      job,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const job = await Job.findByPk(id);

    if (!job) {
      return res.status(400).json({ error: 'Job informado inválido.' });
    }

    await job.destroy(id);

    return res.json({
      message: 'Job excluido com sucesso!',
    });
  }
}

export default new JobController();
