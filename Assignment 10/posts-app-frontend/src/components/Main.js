import React, { useEffect, useState } from 'react'
import MainPosts from './MainPosts';

const Main = () => {

    const [postData, setPostData] = useState([]);
    console.log(postData);

    const getData = async () => {

        const res = await fetch("http://localhost:8003/getdata", {
            method: "GET",
            headers:{
                "Content-Type":"application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if(res.status === 422 || !data){
            console.log("error")
        }
        else{
            setPostData(data)
            console.log("get data")
        }
    }

    useEffect(() => {
        getData();
    }, [])


  return (
    <div className='container mt-3'>
        <div className="row">
        {
            postData.map(post => <MainPosts key={post._id} post={post} />)
        }
        </div>
    </div>
  )
}

export default Main