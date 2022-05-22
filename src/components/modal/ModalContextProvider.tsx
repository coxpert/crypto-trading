import { createContext, ReactNode, useContext, useState } from 'react';

export enum ModalType {
    Setting,
    Wallet,
}

export interface ModalArgsType {
    [key: string]: any
}

export interface ModalContextType<T extends ModalArgsType> {
    openSetting: () => void;
    openWallet: () => void
    close: () => void;
    type?: ModalType;
    args: T;
}

export const ModalContext = createContext<ModalContextType<ModalArgsType>>(
    {} as ModalContextType<ModalArgsType>
);


export const useModal = () => useContext(ModalContext)

export const ModalContextProvider = ({ children }: { children: ReactNode }) => {
    const [type, setType] = useState<ModalType>();
    const [args, setArgs] = useState<ModalArgsType>({});

    return (
        <ModalContext.Provider
            value={{
                openSetting: () => {
                    setType(ModalType.Setting);
                },
                openWallet: () => {
                    setType(ModalType.Wallet);
                },
                close: () => {
                    setType(undefined);
                    setArgs({});
                },
                type,
                args
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};


