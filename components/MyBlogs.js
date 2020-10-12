import {getAllBlogsForThisUser} from '../RequestApi/usersRequest';
import {getCookie,isAuth} from '../RequestApi/authRequest';
import{withRouter} from 'next/router';
import {useState,useEffect} from 'react';
import SmallCard from './SmallCard';

const MyBlogs=(props)=>{
    const [requestState,setRequestState]=useState({
        error:false,
        success:false,
        errorMessage:'',
        successMessage:'',
        loading:false
    });
    const [blogs,setBlogs]=useState([]);
    const {error,errorMessage,success,successMessage,loading}=requestState;
    const token=getCookie('token');
    const username=isAuth().username
    const fetchBlogs=async()=>{
        setRequestState({...requestState,loading:true})
        const response=await  getAllBlogsForThisUser(username,token);
        if(response.error){
        setRequestState({...requestState,loading:false,error:true,errorMessage:response.errorMessage})

        }else if(response.success){
        setRequestState({...requestState,loading:false,success:true})
        setBlogs(response.result)

        }
    }
    useEffect(()=>{
        fetchBlogs()
    },[])
    const showResponseMessages=()=>{
        return (
            <React.Fragment>
                <div className="alert alert-info" style={{display:loading?'':'none'}}>Loading...</div>
                <div className="alert alert-danger" style={{display:error?'':'none'}}> {errorMessage}</div>
            </React.Fragment>
        )
    }

    return (
        <div>
            
            {showResponseMessages()}
            <div>
            {blogs && !loading && success&&( blogs.map((blog)=>{
                return <SmallCard blog={blog} key={blog._id}/>
            }))}
            

            </div>
        </div>
    )
}

export default withRouter(MyBlogs);