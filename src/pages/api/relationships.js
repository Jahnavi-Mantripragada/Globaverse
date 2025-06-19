import relationships from '../../data/relationships.json';

export default function handler(req, res) {
  res.status(200).json(relationships);
}
