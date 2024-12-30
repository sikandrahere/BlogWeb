import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    posts: []
};

const PostSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: (state, action) => {
            const newPost = {
                id: nanoid(),
                title: action.payload.title,
                content: action.payload.content,
                userId: action.payload.userId,
                featuredImage: action.payload.featuredImage,
                status: action.payload.status
            }
            if (Array.isArray(state.posts)) {
                state.posts.push(newPost);
            }
            else {
                state.posts = [newPost];
            }
        },
        editPost: (state, action) => {
            const { id, title, content, featuredImage, status } = action.payload;
            const existingPost = state.posts;
            if (existingPost) {
                existingPost.title = title;
                existingPost.content = content;
                existingPost.featuredImage = featuredImage;
                existingPost.status = status;
            }
        },
        deletePost:(state,action)=>{
            const {$id}=action.payload
            state.posts=state.posts


        },
        setPosts: (state, action) => {
            state.posts = action.payload

        },

    }
})
export const { setPosts, addPost, editPost,deletePost } = PostSlice.actions
export default PostSlice.reducer;