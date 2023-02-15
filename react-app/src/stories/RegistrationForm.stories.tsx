import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { RegisterForm } from '../components/RegisterForm';

import 'bootstrap/dist/css/bootstrap.css';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'RegisterForm',
  component: RegisterForm,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof RegisterForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof RegisterForm> = (args) => <RegisterForm {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  handleRegistration: ({email, handle, password}) => alert(`${email}, ${handle},${password}`),
};

