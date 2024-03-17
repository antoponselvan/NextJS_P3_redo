'use server'

import type { Topic } from "@prisma/client"
import {revalidatePath} from 'next/cache'
import { redirect } from "next/navigation"
import {z} from 'zod'
import {auth} from '@/auth'
import { db } from "@/db"
import paths from "@/paths"

const createTopicSchema = z.object({
  name: z.string().min(3).regex(/[a-z]/,{
    message: 'must be just lower case chars'
  }),
  description: z.string().min(10)
})

interface CreateTopicFormState{
  errors: {
    name?: string[],
    description?: string[],
    _form?: string[]
  }
}

const createTopic = async(
  formState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> => {
  const result = createTopicSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description')
  })
  if (!result.success){
    return {
      errors: result.error.flatten().fieldErrors
    }
  }
  const session = await auth()
  if ((!session)||(!session.user)){
    return {
      errors: {
        _form: ['SignIn Asshole!']
      }
    }
  }
  let topic: Topic
  try{
    topic = await db.topic.create({
      data:{
        slug: result.data.name,
        description: result.data.description
      },
    })
  } catch (err: any){
    if (err instanceof Error){
      return({
        errors:{
          _form: [err.message]
        }
      })
    } else {
      return {
        errors: {
          _form: ['Sth beyond me!']
        }
      }
    }
  }
  revalidatePath('/')
  redirect(paths.topicShow(topic.slug))
  return {
    errors: {

    }
  }
}

export {createTopic}