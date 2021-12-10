import React from 'react'
import { MdOutlineDriveFolderUpload } from 'react-icons/md'

function InputFile({ id, type, classInput, valueInput, onChange }) {
    return (
        <>
            <input
                id={id}
                type={type}
                className={classInput}
                onChange={(value) => {
                    onChange(id, value)
                }} />
            <label htmlFor={id}>{<MdOutlineDriveFolderUpload size={60} />}</label>
        </>
    )
}

export default InputFile
