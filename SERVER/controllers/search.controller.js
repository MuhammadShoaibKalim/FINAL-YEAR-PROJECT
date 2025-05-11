import { Test, Package } from '../models/testpackage.model.js';
import Lab from '../models/lab.model.js';

export const searchAll = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ success: false, message: 'Search query is required' });
    }

    const [tests, packages, labs] = await Promise.all([
      Test.find({
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } }
        ],
        isActive: true
      }).populate('lab', 'name address'),
      Package.find({
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } }
        ],
        isActive: true
      }).populate('lab', 'name address'),
      Lab.find({
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { address: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } }
        ],
        isActive: true
      })
    ]);

    const formattedResults = [
      ...tests.map(test => ({
        ...test.toObject(),
        type: 'test',
        displayName: test.name,
        displayDescription: test.description,
        price: test.price,
        category: test.category,
        labName: test.lab?.name
      })),
      ...packages.map(pkg => ({
        ...pkg.toObject(),
        type: 'package',
        displayName: pkg.name,
        displayDescription: pkg.description,
        price: pkg.price,
        category: pkg.category,
        labName: pkg.lab?.name
      })),
      ...labs.map(lab => ({
        ...lab.toObject(),
        type: 'lab',
        displayName: lab.name,
        displayDescription: lab.description,
        address: lab.address
      }))
    ];

    res.status(200).json({ success: true, data: formattedResults });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error performing search', error: error.message });
  }
};