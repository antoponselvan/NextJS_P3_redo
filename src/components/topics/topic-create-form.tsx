"use client";

import { useFormState } from "react-dom";
import {
  Input,
  Button,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import * as actions from "@/actions";
import FormButton from "../common/form-button";

const TopicCreateForm = () => {
  const [formState, action] = useFormState(actions.createTopic, {
    errors: {},
  });
  return (
    <Popover>
      <PopoverTrigger>
        <Button color="primary">Create a Topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4">
            <h3>Create Topic</h3>
            <Input name="name" placeholder="Name" label="Name" labelPlacement="outside" isInvalid={!!formState.errors.name} errorMessage={formState.errors.name?.join(' ,')}/>
            <Textarea name="description" placeholder="Description" label='Description' labelPlacement="outside" isInvalid={!!formState.errors.description} errorMessage={formState.errors.description}/>
            <div className="bg-red-200 roundeed">
              {formState.errors._form?.join(' ,')}
            </div>
            <FormButton>Save</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default TopicCreateForm;
