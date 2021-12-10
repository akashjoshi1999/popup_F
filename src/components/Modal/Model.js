import React, { useEffect, useState } from "react";
import { BsPencilSquare, BsFillPlusCircleFill } from "react-icons/bs";
import { AiFillMinusCircle } from 'react-icons/ai'
import TextAreaFile from "./Comp/TextAreaFile";
import axios from "axios";
import "./Model.css";
import InputFile from "./Comp/InputFile";

const initialState = {
    post: '',
    thumbFile: '',
    handlerButton: true
}
const Modal = () => {
    const [modal, setModal] = useState(true);
    const [showPlusPost, setShowPlusPost] = useState(true);
    const [showPlusFile, setShowPlusFile] = useState(true);
    const [word, setWord] = useState(100)
    const [values, setValues] = useState(initialState);
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
        const { name, size, type, lastModified, lastModifiedDate } = values.thumbFile
        axios.post('http://localhost:3001/posts',
            {
                post: values.post,
                file: {
                    name: name,
                    size: size,
                    type: type,
                    lastModified: lastModified,
                    lastModifiedDate: lastModifiedDate
                }
            }
        ).then(res => {
            alert("data sent")
            setValues(initialState)
            setShowPlusFile(!showPlusFile)
            setShowPlusPost(!showPlusPost)
        })
    };

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
                            <label>{showPlusPost ? <BsFillPlusCircleFill onClick={() => setShowPlusPost(!showPlusPost)} /> : <AiFillMinusCircle onClick={() => setShowPlusPost(!showPlusPost)} />} Post Contents  <BsPencilSquare /></label><br />
                            {showPlusPost ? "" :
                                <div>
                                    <TextAreaFile
                                        size="30"
                                        id="post"
                                        classText="text-form"
                                        valueText={values.post}
                                        onChange={changeHandler} />
                                    <p>{word} words</p>
                                </div>
                            }
                            <label>{showPlusFile ? <BsFillPlusCircleFill onClick={() => setShowPlusFile(!showPlusFile)} /> : <AiFillMinusCircle onClick={() => setShowPlusFile(!showPlusFile)} />} Upload Thumbnail  </label><br />
                            {showPlusFile ? "" :
                                <div>
                                    <InputFile
                                        id="thumbFile"
                                        type="file"
                                        classInput="input-thumb"
                                        valueInput={values.thumbFile}
                                        onChange={changeHandler}
                                    />
                                </div>
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
