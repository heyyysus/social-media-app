import { FC } from 'react';

export interface MessageProps {
    type: "error" | "success",
    code?: number,
    message: string,
};

export const Message: FC<MessageProps> =  ({type, code, message}) => {
    return (<>
        <h2>{code ? `${code}: ` : ""}{message}</h2>
    </>);
};