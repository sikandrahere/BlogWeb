import React,{useEffect,useState} from 'react'
import appwriteService from "../../Appwrite/database"
import { Container,PostCard } from '../Index'

const AllPost = () => {
  const [posts, setPosts] = useState([])
  useEffect(()=>{
    appwriteService.getPosts([]).then((Posts) => {
      if(Posts){
        setPosts(Posts.documents)
      }
  },[])
  
  })
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                        {/* sending post value as a prop in PostCard */}
                    </div>
                ))}
            </div>
            </Container>
    </div>
  )
}

export default AllPost