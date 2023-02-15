import { FC, FormEventHandler, useRef } from 'react';
import "../styles/LoginForm.css";

export interface PostCreationBody {
    body: string
};

export interface PostCreationFormProps {
    handlePostCreation: (postCreationBody: PostCreationBody) => void,
};

export const PostCreationForm: FC<PostCreationFormProps> =  ({ handlePostCreation }) => {

    const bodyRef = useRef<any>();

    const CheckBody = (body: string) => {
        return body.length <= 240;
    }

    const handleSubmit: FormEventHandler = (event) => {
        event.preventDefault()

        const body: string = bodyRef.current.value;

        if(CheckBody(body)){
            handlePostCreation({ body });
            bodyRef.current.value = "";
        }
    }

    return (
        <form onSubmit={ handleSubmit }>
            <div className="form-group">
                <textarea ref={ bodyRef } className="form-control" id="bodyField" rows={3}></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Create</button>
        </form>
    );
};