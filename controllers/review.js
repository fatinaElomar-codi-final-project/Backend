import express from 'express';
import Review from '../models/review';

const router = express.Router();

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Public
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find({});
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// @desc    Get a single review
// @route   GET /api/reviews/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json(review);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// @desc    Create a review
// @route   POST /api/reviews
// @access  Private
router.post('/', async (req, res) => {
  try {
    const { name, rating, comment, id_user } = req.body;

    const review = new Review({
      name,
      rating,
      comment,
      id_user,
    });

    const createdReview = await review.save();
    res.status(201).json(createdReview);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// @desc    Update a review
// @route   PUT /api/reviews/:id
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const { name, rating, comment } = req.body;

    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    review.name = name || review.name;
    review.rating = rating || review.rating;
    review.comment = comment || review.comment;

    const updatedReview = await review.save();
    res.json(updatedReview);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});
router.delete('/:id', async (req, res) => {
    try {
      const review = await Review.findById(req.params.id);
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }
      await review.remove();
      res.json({ message: 'Review removed' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });
  
  export default router;