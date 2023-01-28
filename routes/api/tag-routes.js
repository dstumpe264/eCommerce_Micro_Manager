const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagsData = await Tag.findAll({
      include: [{model: Product, through: ProductTag}],
    });
    res.status(200).json(tagsData);
  } catch (error) {
    res.status(500).json(error);
  }
  // be sure to include its associated Products
});

router.get('/:id', async(req, res) => {
  // find one Tag by its `id` value
  // be sure to include its associated Products
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }],
    });
    if (!tagData) {
      res.status(400).json({message: 'No Tag found with that id'});
      return;
    }
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new Tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a Tag by its `id` value
  try {
    const updatedTag = await Tag.update(
      {
        tag_name: req.body.Tag_name
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
    res.status(200).json(updatedTag);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a Tag by its `id` value
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedTag){
      res.status(404).json({message: 'No Tag found with this id'});
    }
    res.status(200).json(deletedTag);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
