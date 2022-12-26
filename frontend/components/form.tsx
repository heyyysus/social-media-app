import { Anybody } from "@next/font/google";
import React from "react";
import styles from  '../styles/components/form.module.css';

export interface InputField {
    name: string,
    label: string,
    type: "text" | "password",
}

export interface FormProps {
    submitBtnLabel?: string,
    errorMsg?: string,
    fields: InputField[],
    handleSubmit: (data: any) => void,
}

export function Form(props: FormProps){
    const parseSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault()
        const elements: any = event.currentTarget.elements;
        props.handleSubmit(elements);
    }
    return(
        <form onSubmit={parseSubmit} className={styles.form}>
            <div className={styles.inputsContainer}>
                { props.fields.map(field => {
                    return (
                    <div className={styles.inputContainer}>
                        <input placeholder={field.label} id={field.name} name={field.name} type={field.type} />
                    </div>)
                }) }
            </div>
            <div className={styles.formControls}>
                <button type="submit" className={styles.submitBtn}>
                    <span>{props.submitBtnLabel || "Submit"}</span>
                </button>
                <span className={styles.errorMessage}>{props.errorMsg || ""}</span>
            </div>
        </form>
    );
};