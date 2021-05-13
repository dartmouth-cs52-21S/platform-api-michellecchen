import { Router } from 'express';
import * as Posts from './controllers/post_controller';

const router = Router();

router.get('/', (req, res) => {
    res.json({ message: 'Welcome to our blog API!' });
});

// Routes here

// POST /posts: Posts.createPost
// GET /posts: Posts.getPosts
router.route('/posts').post(Posts.createPost).get(Posts.getPosts);

// GET /posts/:id: Posts.getPost
// PUT /posts/:id: Posts.updatePost
// DELETE /posts/:id: Posts.deletePost
router.route('/posts/:id').get(Posts.getPost).put(Posts.updatePost).delete(Posts.deletePost);

export default router;
