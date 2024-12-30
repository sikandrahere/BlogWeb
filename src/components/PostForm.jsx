import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import appwriteService from '../Appwrite/database'
import { Btn, Input, Select, RTE } from "./Index"
import {addPost,editPost} from '../store/PostsSlice'

const PostForm = ({ post }) => { // post = we are getting from parent element
  const { register, handleSubmit, control, setValue, getValues, watch } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "", //url
      status: post?.status || "",
      content: post?.content || ""
    }
  })
  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)
  const dispatch=useDispatch()
 



  const submit = async (data) => {
    // here data = what we are getting from input fields 


    //check if post is avaiable or  not 
    // if post is avaiable then its in edit position
    if (post) {
      const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
      // Checks if post exists to determine if it's an update.If an image is provided, it uploads the new file.

      if (file) {
        appwriteService.deleteFile(post.featuredImage)
        // Deletes the old image if a new one is uploaded
      }
      const dbPost = await appwriteService.updatePost(post.$id, { ...data, featuredImage: file ? file.$id : post.featuredImage })
      //updating the file in the appwrite
      // storing postID, spreding data(what we are getting from user and updating featuredImage(id))

      if (dbPost) {
        const updatedPost = {
          ...data,
          userId: userData.$id,
          featuredImage:file ? file.$id : post.featuredImage,
          id: post.$id
        };
        delete updatedPost.image
        dispatch(editPost(updatedPost));
        navigate(`/post/${dbPost.$id}`);
      }

      // if post is not aviable then create post 
    }
    else {
      const file = await appwriteService.uploadFile(data.image[0])
      // upload image in appwrite

      if (file) {
        const fildId = file.$id
        data.featuredImage = fildId
        // setting featuredImage equal to fileid

        const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id, featuredImage: file ? file.$id : undefined })

        // creating post 

        if (dbPost) {
          const postData = {
            ...data,
            userId: userData.$id,
            featuredImage: file ? file.$id : undefined,
            id: dbPost.$id
          };
          delete postData.image;
          dispatch(addPost(postData));
          navigate(`/post/${dbPost.$id}`);
          // if post is created then navigate the user to post page
        }
      }
    }

  }

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, [])
  //transforms the title into a URL-friendly slug by trimming whitespace, converting to lowercase, and replacing non-alphanumeric characters with hyphens.

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true })
      }
    })

    return () =>
      subscription.unsubscribe()
  }, [watch, slugTransform, setValue])
  //subscription callback is executed whenever there is a change in the observed form fields
  //This cleanup function is executed when the component unmounts or before the effect is re-run


  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
          }}
        />
        <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Btn type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
          {post ? "Update" : "Submit"}
        </Btn>
      </div>
    </form>
  )
}

export default PostForm