import react ,{useEffect,useState,useContext,createContext} from 'react';
import axios from 'axios';

const PostContext = createContext(null);

const PostProvider = ({children}) => {
    const [posts,setPosts] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:5000/api/posts',{
            headers:{
                'x-auth-token':localStorage.getItem('token')
            }
        })  
    })
    return (
        <PostContext.Provider value={{}}>
            {children}
        </PostContext.Provider>
    )
}
