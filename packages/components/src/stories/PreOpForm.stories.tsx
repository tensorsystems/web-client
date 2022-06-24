import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PreOpForm } from "../PreOpForm";
import { SurgicalProcedureInput } from "@tensoremr/models";
import { useForm } from "react-hook-form";

export default {
  title: "Components/PreOpForm",
  component: PreOpForm,
} as ComponentMeta<typeof PreOpForm>;

const Template: ComponentStory<typeof PreOpForm> = (args) => {
  const { register } = useForm<SurgicalProcedureInput>({});

  return <PreOpForm {...args} register={register} />;
};

export const Default = Template.bind({});

Default.args = {
  locked: false,
  handleChanges: () => {},
};
