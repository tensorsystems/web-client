import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { IntraOpForm } from "../IntraOpForm";
import { SurgicalProcedureInput } from "@tensoremr/models";
import { useForm } from "react-hook-form";

export default {
  title: "Components/IntraOpForm",
  component: IntraOpForm,
} as ComponentMeta<typeof IntraOpForm>;

const Template: ComponentStory<typeof IntraOpForm> = (args) => {
  const { register } = useForm<SurgicalProcedureInput>({});

  return <IntraOpForm {...args} register={register} />;
};

export const Default = Template.bind({});

Default.args = {
  locked: false,
  handleChanges: () => {},
};
