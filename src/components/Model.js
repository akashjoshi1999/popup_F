import React, { useEffect, useState } from "react";
import "./Model.css";
import axios from "axios";

// const initialValue = {
//     post: '',

// }
const Modal = () => {
    const [modal, setModal] = useState(true);
    // const [post, setPost] = useState('');
    // const [thumbFile, setThumbFile] = useState('')
    // const [handlerButton, setHandlerButton] = useState(true);
    const [values, setValues] = useState(
        {
            post: '',
            thumbFile: '',
            handlerButton: true
        }
        // initialValue
    );
    if (modal) {
        document.body.classList.add('active-modal')
    }

    const changeHandler = (name, e) => {
        const { value, files } = e.target;
        setValues({
            ...values,
            [name]: name === "thumbFile" ? files[0] : value,
        });
        // setHandlerButton(false)
    }
    useEffect(() => {
        if (values.post !== '' && values.thumbFile !== '') {
            setValues({
                ...values,
                handlerButton: false
            });
        }
    }, [values.post, values.thumbFile])
    const onSubmitHandler = (e) => {
        e.preventDefault();
        // console.log(thumbFile)
        let fromdata = new FormData();
        // console.log(values.thumbFile);
        // console.log("post", post)
        fromdata.append('post', values.post);
        fromdata.append('file', values.thumbFile);
        // console.log("data",fromdata)
        // for (let keyValuePair of fromdata.entries()) {
        //     console.log(keyValuePair); //has form ['name','Alex Johnson']
        // }
        axios.post('http://localhost:3001/posts', { post:values.post, image:JSON.stringify(values.thumbFile),form:fromdata }).then(res => {
            alert(JSON.stringify(fromdata.name))
        })
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
                                id="post"
                                type="text"
                                value={values.post}
                                onChange={(value) => changeHandler('post', value)}
                            /><br />
                            <label>Choose Thumbnail</label><br />
                            <input
                                type="file"
                                id="file"
                                onChange={(value) => changeHandler('thumbFile', value)}
                            // onChange={onFileChangeHandler}
                            />
                            <br />
                            <br />
                            <input type="submit" value="Post" disabled={values.handlerButton} />
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
export default Modal;
