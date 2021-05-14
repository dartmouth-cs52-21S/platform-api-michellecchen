import mongoose, { Schema } from 'mongoose';

mongoose.set('useFindAndModify', false);

// create a PostSchema with a title field
// Turning on timestamps allows us to track time of post creation/update...
// via createdAt & updatedAt.
const PostSchema = new Schema({
    id: String,
    title: String,
    content: String,
    coverUrl: String,
    tags: String,
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
});

// create PostModel class from schema
const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
