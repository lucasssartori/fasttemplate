import ParseTransmission from './ParseTransmission';

class ParseTransmissionController {
  async index(req, res) {
    const { name, system } = req.query;

    if (system.search('STC') !== -1 || system.search('SISRAF') !== -1) {
      const parse = new ParseTransmission(name, system);
      const transmissions = await parse.parseTransmission();
      return res.json({ transmissions });
    }
    return res.json({ transmissions: [] });
  }
}

export default new ParseTransmissionController();
