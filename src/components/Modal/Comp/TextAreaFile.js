import React from 'react'

function TextAreaFile({ size, id, classText, valueText, onChange }) {
    return (
        <>
            <textarea
                size={size}
                id={id}
                className={classText}
                value={valueText}
                onChange={(value) => {
                    onChange(id, value)
                }}
            />
        </>
    )
}

export default TextAreaFile
