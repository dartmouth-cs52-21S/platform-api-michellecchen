import { Router } from 'express';
import * as Posts from './controllers/post_controller';
import * as Users from './controllers/user_controller';
import { requireAuth, requireSignin } from './services/passport';

const router = Router();

router.get('/', (req, res) => {
    res.json({ message: 'Welcome to our blog API!' });
});

// Routes here
// Authentication: Protect create/update/deletePost routes using requireAuth

// POST /posts: Posts.createPost - PROTECT
// GET /posts: Posts.getPosts
router.route('/posts').post(requireAuth, Posts.createPost).get(Posts.getPosts);

// GET /posts/:id: Posts.getPost
// PUT /posts/:id: Posts.updatePost - PROTECT
// DELETE /posts/:id: Posts.deletePost = PROTECT
router.route('/posts/:id').get(Posts.getPost).put(requireAuth, Posts.updatePost).delete(requireAuth, Posts.deletePost);

router.post('/signin', requireSignin, Users.signin);
router.post('/signup', Users.signup);

export default router;
