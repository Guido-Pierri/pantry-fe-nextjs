import React from 'react';

interface OpenDialogContextProps {
    open: boolean;
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const OpenDialogContext = React.createContext<OpenDialogContextProps>(null!);