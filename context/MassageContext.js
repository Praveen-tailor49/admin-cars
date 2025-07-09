import { createContext, useContext, useState } from 'react';


const MessageContext = createContext();


export const MassageProvider = ({ children }) => {
    const [message, setMessage] = useState(null);
    const [token, setToken] = useState(null);
    return (
        <MessageContext.Provider value={{ message, setMessage, token, setToken }}>
            {children}
        </MessageContext.Provider>
    );
}

export const useData = () => useContext(MessageContext);