const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories including its associated Products
  try {
    const categoryData = await Category.findAll({ include: { model: Product } })
    res.json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
  });

router.get('/:id', async (req, res) => {
  // find one category by its `id` value including its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: { model: Product},
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
  });

  // create a new category
  router.post('/', async (req, res) => {
    try {
      const newCat = await Category.create(req.body);
      res.status(200).json(newCat);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  });

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCat = await Category.update(req.body, {
      where: {
        id: req.params.id
      },
    });
    res.status(200).json(updateCat);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});


router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const cat = await Category.destroy({
    where: {
      id:req.params.id,
    },
  })
 if (!cat) {
  res.status(404).json({ message: 'No user with this id!'});
  return;
 }
  res.status(200).json(cat);
  } catch (err) {
    res.status(500).json(err);
  }
  });
module.exports = router;
