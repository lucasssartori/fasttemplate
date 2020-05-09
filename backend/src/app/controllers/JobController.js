import * as Yup from 'yup';
import Systems from './enums/EnumSystems';

import Job from '../models/Job';

class JobController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      system: Yup.string().required(),
      descripton: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação dos campos.' });
    }

    const { name, system, descripton } = req.body;

    const job = await Job.findOne({
      where: {
        name,
        system,
      },
    });

    if (job) {
      return res.status(400).json({ error: 'Job já está cadastrado.' });
    }

    if (Systems.hasOwnProperty(system)) {
      return res.status(400).json({ error: 'Sistema informado inválido.' });
    }

    await Job.create(req.body);

    return res.json({
      name,
      system,
      descripton,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      system: Yup.string(),
      descripton: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação dos campos.' });
    }
  }

  async index(req, res) {}

  async indexById(req, res) {}

  async delete(req, res) {}
}

export default new JobController();
