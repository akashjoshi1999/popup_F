import React, { useState } from "react";
import "./Model.css";
import axios from "axios";

const Modal = () => {
    const [modal, setModal] = useState(true);
    const [post, setPost] = useState('');
    const [thumbFile, setThumbFile] = useState('')
    if (modal) {
        document.body.classList.add('active-modal')
    }

    // let formdata = new FormData;
    // const onFileChangeHandler = (e) => {
    //     if(e.target && e.target.files[0]){
    //         formdata.append("file",e.target.files[0])
    //         console.log(e.target.files[0])
    //     }
    // }
    const onSubmitHandler = (e) => {
        e.preventDefault();
        // console.log(thumbFile)
        let fromdata = new FormData();
        console.log("post",post)

        fromdata.append('post', post);
        // fromdata.append('myfile', thumbFile);
        const headers = {
            // 'Content-Type': 'multipart/form-data',
            'Content-Type': 'application/json',

        }


        // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        // axios.post(`http://localhost:3001/posts`, json, {
        //     headers: headers
        // }).then(res => {
        // })

        axios.post(`http://localhost:3001/posts`, fromdata, {
            headers
        })
            .then(res => {
                   console.log(res);
                //    console.log(res.data);
            })
        // let formData = new FormData();    //formdata object

        // formData.append('name', 'ABC');   //append the values with key, value pair
        // formData.append('age', 20);


        // let formdata = new FormData;
        // formdata.append('myFile',thumbFile)
        // axios.post("http://localhost/popup_frank/public/uploads/", formdata,{
        //     headers
        //     // form: fromdata,          
        //     // post: post,
        //     // image: {
        //     //     lastModified: thumbFile.lastModified,
        //     //     lastModifiedDate: thumbFile.lastModifiedDate,
        //     //     name: thumbFile.name,
        //     //     size: thumbFile.size,
        //     //     type: thumbFile.type
        //     // }
        // })
        //     .then((res) => {
        //         console.log(res)
        //         // getData();
        //         // setTitle('');
        //         // setBody('');
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     })
    };


    return (
        <>
            {modal && (
                <div className="modal">
                    <div className="modal-content">
                        <form onSubmit={onSubmitHandler} encType="multipart/form-data">
                            <h2>Create Post</h2>
                            <label>Post Comments</label><br />
                            <input
                                name="post"
                                type="text"
                                value={post}
                                onChange={(e) => { setPost(e.target.value) }}
                            /><br />
                            <label>Choose Thumbnail</label><br />
                            <input
                                type="file"
                                name="myFile"
                                onChange={(e) => { setThumbFile(e.target.files[0]) }}
                            // onChange={onFileChangeHandler}
                            />
                            <br />
                            <br />
                            <input type="submit" value="Post" />
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
export default Modal;
