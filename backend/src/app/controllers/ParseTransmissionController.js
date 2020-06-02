import ParseTransmission from './ParseTransmission';

class ParseTransmissionController {
  async index(req, res) {
    const { name, system } = req.query;

    const parse = new ParseTransmission(name, system);
    const transmissions = await parse.parseTransmission();

    return res.json({ transmissions });
  }
}

export default new ParseTransmissionController();
