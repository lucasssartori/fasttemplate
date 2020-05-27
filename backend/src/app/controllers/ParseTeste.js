import ParseTransmissionController from './ParseTransmissionController';

class ParseTeste {
  async store(req, res) {
    const { name, system } = req.body;

    const parse = new ParseTransmissionController(name, system);
    const transmissions = parse.parseTransmission();

    return res.json(transmissions);
  }
}

export default new ParseTeste();
