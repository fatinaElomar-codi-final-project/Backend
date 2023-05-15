// import Review from "../models/review.js"
// router.delete('/:id', async (req, res) => {
//   try {
//     const review = await Review.findById(req.params.id);
//     if (!review) {
//       return res.status(404).json({ message: 'Review not found' });
//     }
//     await review.remove();
//     res.json({ message: 'Review removed' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server Error');
//   }
// });

// export default router;