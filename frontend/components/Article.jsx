import React, { useState } from "react"

export default function Article({item}) {
    return (
        <>
            <h3>{item.title}</h3>
            <p>{item.isoDate}</p>
        </>
    )
}