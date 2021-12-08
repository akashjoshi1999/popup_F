import React, { useEffect, useState } from "react";
import { BsPencilSquare, BsFillPlusCircleFill } from "react-icons/bs";
import { AiFillMinusCircle } from 'react-icons/ai'
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import axios from "axios";
import "./Model.css";

const Modal = () => {
    const [modal, setModal] = useState(true);
    const [showPlusPost, setShowPlusPost] = useState(true);
    const [showPlusFile, setShowPlusFile] = useState(true);
    const [showinputTagPost, setShowinputTagPost] = useState(false)
    const [showinputTagFile, setShowinputTagFile] = useState(false)
    const [word, setWord] = useState(100)
    const [values, setValues] = useState(
        {
            post: '',
            thumbFile: '',
            handlerButton: true
        }
    );
    let max_word = 100;

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
        setWord(max_word - (values.post).split(' ').length + 1)
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
        console.log(values.thumbFile)
        axios.post('http://localhost:3001/posts', {
            post: values.post,
            image: values.thumbFile.name,
            size: values.thumbFile.size,
            type: values.thumbFile.type
        }).then(res => {
            alert("data sent")
            setValues({
                post: '',
                thumbFile: '',
                handlerButton: true
            })
            setShowPlusFile(!showPlusFile)
            setShowPlusPost(!showPlusPost)
            setShowinputTagPost(!showinputTagPost)
            setShowinputTagFile(!showinputTagFile)
        })
    };

    const changePlusPost = () => {
        setShowPlusPost(!showPlusPost)
        setShowinputTagPost(!showinputTagPost)
    }

    const changePlusFile = () => {
        setShowPlusFile(!showPlusFile)
        setShowinputTagFile(!showinputTagFile)
    }

    return (
        <>
            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <form onSubmit={onSubmitHandler} encType="multipart/form-data">
                            <div className="heading">
                                <h2>Create Post </h2>
                                <input type="submit" className="btn" value="x" onClick={toggleModal} />
                            </div>
                            <label>{showPlusPost ? <BsFillPlusCircleFill onClick={changePlusPost} /> : <AiFillMinusCircle onClick={changePlusPost} />} Post Contents  <BsPencilSquare /></label><br />
                            {showinputTagPost ?
                                <div>
                                    <textarea
                                        size="30"
                                        id="post"
                                        type="text"
                                        className="text-form"
                                        value={values.post}
                                        onChange={(value) => {
                                            changeHandler('post', value)
                                        }
                                        }
                                    />
                                    <p>{word} words</p>
                                </div> : ""
                            }
                            <label>{showPlusFile ? <BsFillPlusCircleFill onClick={changePlusFile} /> : <AiFillMinusCircle onClick={changePlusFile} />} Upload Thumbnail  </label><br />
                            {showinputTagFile ?
                                <div>
                                    <input
                                        type="file"
                                        id="file"
                                        style={{ "display": "none" }}
                                        onChange={(value) => {
                                            changeHandler('thumbFile', value)
                                        }}
                                    /><label for="file">{<MdOutlineDriveFolderUpload size={60} />}</label>
                                </div> : ""
                            }
                            <br />
                            <br />
                            <input type="submit" value="Post" className="input-btn" disabled={values.handlerButton} />
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
export default Modal;
