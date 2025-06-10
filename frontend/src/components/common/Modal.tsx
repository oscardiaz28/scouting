import React, { useState } from "react";

export const Modal = (children: { children: React.ReactNode }) => {

    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <div className="absolute min-h-screen w-full bg-black/30 flex items-center justify-center p-8">
                <div className="bg-zinc-700 p-6 rounded-md">
                    <h1>Modal</h1>
                </div>
            </div>
        </>
        // TODO --> CREAR EL TRIGGER
    )
}