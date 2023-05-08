const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags including its associated Product data
  try {
    const tagData = await Tag.findAll({ include: [{ model: Product }, {model: ProductTag}] });
    res.json(tagData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }, { model: ProductTag}]
    });
    res.json(tagData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});


router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      },
    });
    res.status(200).json(updateTag);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});


router.delete('/:id', async (req, res) => {
  // delete one tag by its `id` value
  try {
    const tag = await Tag.destroy({
    where: {
      id:req.params.id,
    },
  })
 if (!tag) {
  res.status(404).json({ message: 'No user with this id!'});
  return;
 }
  res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
  });

module.exports = router;
