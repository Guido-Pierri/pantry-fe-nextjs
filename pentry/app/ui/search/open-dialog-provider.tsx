'use client'
import React, {useState} from 'react';
import {OpenDialogContext} from './open-dialog-context';

export default function OpenDialogProvider({children}: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);

    return (
        <OpenDialogContext.Provider value={{open, setOpen}}>
            {children}
        </OpenDialogContext.Provider>
    );
};