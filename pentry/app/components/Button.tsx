import React from 'react'
type Props = { btnClass?: string,
    title?: string,
    onClick?: () => void,
    type?: "submit" | "reset" | "button" }
export default function Button({ btnClass, title, onClick, type }: Props) {
    return (
        <button className={`btn ${btnClass}`}
                onClick={onClick}
                type={`${type}`}>
            {title}
        </button>
    )
}
