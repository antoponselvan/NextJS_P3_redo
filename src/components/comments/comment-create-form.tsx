'use client'

import { useFormState } from "react-dom"
import { useEffect, useRef, useState } from "react"
import { Textarea, Button } from "@nextui-org/react"
import FormButton from "../common/form-button"
import * as actions from '@/actions'

interface CommentCreateFormProps {
  postId: string,
  parentId?: string,
  startOpen? : boolean 
}

export default function CommentCreateForm({
  postId,
  parentId,
  startOpen,
}: CommentCreateFormProps) {
  const [open, setOpen] = useState(startOpen);
  const ref = useRef<HTMLFormElement | null>(null)
  const [formState, action] = useFormState(
    actions.createComment.bind(null, {postId, parentId}), {
      errors: {}
    }
  )
  useEffect(()=>{
    if (formState.success){
      ref.current?.reset()
      if (!startOpen){
        setOpen(false)
      }
    }
  },[formState, startOpen])
  const form = (
    <form action={action} ref={ref}>
      <div className="space-y-2 px-1">
        <Textarea name="content" label="Reply" isInvalid={!!formState.errors.content}/>
        <FormButton>Create Comment</FormButton>
      </div>
    </form>)

  return (
    <div>
      <Button onClick={()=>setOpen(!open)}>Reply</Button>
      {open && form}
    </div>
  )
}
