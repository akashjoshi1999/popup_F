import React, { useEffect, useState } from "react";
import "./Model.css";
import axios from "axios";
import { BsPencilSquare, BsFillPlusCircleFill } from "react-icons/bs";
import { AiFillMinusCircle } from 'react-icons/ai'

const Modal = () => {
    const [modal, setModal] = useState(true);
    // const [post, setPost] = useState('');
    // const [thumbFile, setThumbFile] = useState('')
    // const [handlerButton, setHandlerButton] = useState(true);
    let max_word = 2000;
    const [values, setValues] = useState(
        {
            post: '',
            post_len: 0,
            thumbFile: '',
            handlerButton: true
        }
        // initialValue
    );
    const toggleModal = () => {
        setModal(!modal);
    };
    if (modal) {
        document.body.classList.add('active-modal')
    }

    const changeHandler = (name, e) => {
        const { value, files } = e.target;
        setValues({
            ...values,
            [name]: name === "thumbFile" ? files[0] : value,
        });
        setWord(word - values.post.split(' ').length)
        // setWord(values.post.match(/(\w+)/g).length) 
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
        // let fromdata = new FormData();
        // console.log(values.thumbFile);
        // console.log("post", post)
        // fromdata.append('post', values.post);
        // fromdata.append('file', values.thumbFile);
        // console.log("data",fromdata)
        // for (let keyValuePair of fromdata.entries()) {
        //     console.log(keyValuePair); //has form ['name','Alex Johnson']
        // }
        axios.post('http://localhost:3001/posts', {
            post: values.post,
            image: values.thumbFile.name,
        }).then(res => {
            alert("data sent")
            setValues({
                post: '',
                post_len: 0,
                thumbFile: '',
                handlerButton: true
            })
            setShowPlusFile(!showPlusFile)
            setShowPlusPost(!showPlusPost)
            setShowinputTagPost(!showinputTagPost)
            setShowinputTagFile(!showinputTagFile)
        })
    };
    const [showPlusPost, setShowPlusPost] = useState(true);
    const [showPlusFile, setShowPlusFile] = useState(true);
    const [showinputTagPost, setShowinputTagPost] = useState(false)
    const [showinputTagFile, setShowinputTagFile] = useState(false)
    const changePlusPost = () => {
        setShowPlusPost(!showPlusPost)
        setShowinputTagPost(!showinputTagPost)
        // setShowinputTagFile(!showinputTagFile)
    }
    const changePlusFile = () => {
        setShowPlusFile(!showPlusFile)
        // setShowinputTagPost(!showinputTagPost)
        setShowinputTagFile(!showinputTagFile)
    }
    const [word, setWord] = useState(2000)
    return (
        <>
            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <form onSubmit={onSubmitHandler} encType="multipart/form-data">
                            <div>
                                <h2>Create Post </h2>
                            </div>
                            <label>{showPlusPost ? <BsFillPlusCircleFill onClick={changePlusPost} /> : <AiFillMinusCircle onClick={changePlusPost} />} Post Comments  <BsPencilSquare /></label><br />
                            {showinputTagPost ?
                                <div>
                                    <input
                                        size="30"
                                        id="post"
                                        type="text"
                                        value={values.post}
                                        onChange={(value) => {
                                            changeHandler('post', value)
                                            // changeHandler('post_len', value)
                                        }
                                        }
                                    />
                                    <p>{word} words</p>
                                </div> : ""
                            }
                            <br />
                            {/* <label>Choose Thumbnail</label><br /> */}
                            <label>{showPlusFile ? <BsFillPlusCircleFill onClick={changePlusFile} /> : <AiFillMinusCircle onClick={changePlusFile} />}Choose Thumbnail  </label><br />
                            {showinputTagFile ?
                                <input
                                    type="file"
                                    id="file"
                                    onChange={(value) => {
                                        changeHandler('thumbFile', value)

                                    }}
                                /> : ""
                            }

                            <br />
                            <br />
                            <input type="submit" value="Post" disabled={values.handlerButton} />
                            <input type="submit" value="Close" onClick={toggleModal} />
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
export default Modal;
