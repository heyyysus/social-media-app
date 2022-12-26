import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Form } from '../../components/form';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Form',
  component: Form,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Form>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Form> = (args) => <Form {...args} />;

export const Login = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Login.args = {
    fields: [
        {label: "Email", name: "email", type: "text"},
        {label: "Password", name: "password", type: "password"},
    ],
    handleSubmit: (e) => {
        alert(e.email.value)
    },
    submitBtnLabel: "Login",
};


