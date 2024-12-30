import React ,{useEffect,useState} from 'react'
import appwriteService from '../../Appwrite/database'
import { useNavigate,Link,useParams } from 'react-router-dom'
import {Btn,Container} from '../Index'
import parse from 'html-react-parser'
import { useDispatch,useSelector } from 'react-redux'
import { deletePost as updateDeletePost } from '../../store/PostsSlice'




const Post = () => {
  const [post,setPost]=useState("")
  const {slug}=useParams()//useParams use for getting  URL
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const userData= useSelector((state)=>state.auth.userData)

  const isAuthor= post&& userData ?post.userId===userData.$id:false;

  useEffect(() => {
    if(slug){
      appwriteService.getPost(slug).then((post)=>{
        if(post){
          setPost(post)
        }
        else{
          navigate('/')
        }
      })
    }
  }, [slug,navigate])

  const deletePost = async () => {
    try {
      const status = await appwriteService.deletePost(post.$id);
      if (status) {
        await appwriteService.deleteFile(post.featuredImage);
        dispatch(updateDeletePost(post.$id))
        navigate("/");
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  }
  
  return (
    post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Btn bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Btn>
                            </Link>
                            <Btn bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Btn>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null)
}

export default Post