'use client'

import { useFormState } from "react-dom"
import { Input, Button, Textarea, Popover, PopoverTrigger, PopoverContent} from '@nextui-org/react'
import * as actions from '@/actions'
import FormButton from "../common/form-button"

interface PostCreateFormProps {
  slug: string
}

export default function PostCreateForm ({slug}: PostCreateFormProps){
  const [formState, action] = useFormState(
    actions.createPost.bind(null, slug), {errors: {}}
  )
  return(
    <Popover>
      <PopoverTrigger>
        <Button color="primary">Create Post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4">
            <h3>Create a Post</h3>
            <Input isInvalid={!!formState.errors.title} errorMessage={formState.errors.title?.join(" ,")} name="title" label="Title" labelPlacement="outside"/>
            <Textarea isInvalid={!!formState.errors.content} errorMessage={formState.errors.content?.join(" ,")} name="content" label="Title" labelPlacement="outside"/>
            {formState.errors._form?.join(" ,")}
            <FormButton>Create Post</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  )
}