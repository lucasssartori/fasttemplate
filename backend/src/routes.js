import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import JobController from './app/controllers/JobController';
import TransmissionController from './app/controllers/TransmissionController';
import TransmissionTemplateController from './app/controllers/TransmissionTemplateController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.post('/users', UserController.store);
routes.get('/transmissionstemplate/:id', TransmissionTemplateController.index);
// ---------------------------------------------------------------------------------
// Rotas com autenticação de Token
// ---------------------------------------------------------------------------------
routes.use(authMiddleware);

// ---------------------------------------------------------------------------------
// Rotas de usuário
// ---------------------------------------------------------------------------------
routes.put('/users/:id', UserController.update);

// ---------------------------------------------------------------------------------
// Rotas de Jobs
// ---------------------------------------------------------------------------------

routes.post('/jobs', JobController.store);
routes.put('/jobs/:id', JobController.update);
routes.delete('/jobs/:id', JobController.delete);
routes.get('/jobs', JobController.index);
routes.get('/jobs/:id', JobController.indexById);

// ---------------------------------------------------------------------------------
// Rotas de Criação da transmissão
// ---------------------------------------------------------------------------------

routes.post('/transmissions', TransmissionController.store);
routes.put('/transmissions/:id', TransmissionController.update);
routes.delete('/transmissions/:id', TransmissionController.delete);
routes.get('/transmissions/:id', TransmissionController.indexById);
routes.get('/transmissionsjobs/:id', TransmissionController.index);

// ---------------------------------------------------------------------------------
// Gera documentos
// ---------------------------------------------------------------------------------

export default routes;
