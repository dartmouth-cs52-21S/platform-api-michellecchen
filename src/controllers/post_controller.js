import Post from '../models/post_model';

// Reference docs: https://mongoosejs.com/docs/api/model.html

export const createPost = (req, res) => {
    const post = new Post();

    post.title = req.body.title;
    post.content = req.body.content;
    post.tags = req.body.tags;
    post.coverUrl = req.body.coverUrl;

    post.save()
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            res.status(500).json({ error });
    });
};

export const getPosts = (req, res) => {
    // await finding posts
    // return posts

    return Post.find()
        .then((result) => {
            // ** SORT BY TIME OF CREATION: use createdAt
            result.sort((a, b) => { 
                return ((a.createdAt < b.createdAt ) ? 1 : -1);
            });
            res.json(result);
        })
        .catch((error) => {
        res.status(500).json({ error });
        });
};

export const getPost = (req, res) => {
    // await finding one post
    // return post

    Post.findById(req.params.id)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
};

export const deletePost = (req, res) => {
    // await deleting a post
    // return confirmation

    Post.findByIdAndRemove(req.params.id)
        .then(() => {
            res.json({
                message: 'Your post has been deleted.',
            });
        }).catch((error) => {
            res.status(500).json({ error });
        });
};

export const updatePost = (req, res) => {
    // await updating a post by id
    // return *updated* post

    const updatedFields = req.body;
    // if ('title' in req.body) updatedFields.title = req.body.title;
    // if ('content' in req.body) updatedFields.content = req.body.content;
    // if ('coverUrl' in req.body) updatedFields.coverUrl = req.body.coverUrl;
    // if ('tags' in req.body) updatedFields.tags = req.body.tags;

    Post.findByIdAndUpdated(req.params.id, updatedFields, { new: true })
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
};
