import { createContext, useState } from 'react';

const initialState = {
    title: '',
    content: '',
    type: '',
    confirmText: '',
    cancelText: '',
    show: false,
    onClose: (value: boolean) => {}
};
const AlertContext = createContext({
    ...initialState,
    setAlert: () => {}
});

export const AlertProvider = ({ children }: any) => {
    const [props, setProps] = useState<any>({});

    const setAlert = (props: any) => {
        setProps(props);
    };

    return (
        <AlertContext.Provider
            value={{
                ...props,
                setAlert
            }}
        >
            {children}
        </AlertContext.Provider>
    );
};

export default AlertContext;
