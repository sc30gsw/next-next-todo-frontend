'use client'

import { Button, Center, TextInput } from '@mantine/core'
//@ts-ignore
import { IconDatabase } from '@tabler/icons'
import { useRouter } from 'next/navigation'
import type { FormEvent } from 'react'

import useStore from '../../store'

type TaskFromProps = {
  userId: number
}

const TaskForm = ({ userId }: TaskFromProps) => {
  const { editedTask } = useStore()
  const router = useRouter()
  const update = useStore((state) => state.updateEditedTask)
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedTask.id === 0)
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL as string}/todo`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId,
              title: editedTask.title,
              description: editedTask.description,
            }),
          },
        )

        router.refresh()
      } catch (err) {
        console.log(err)
      }
    else {
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL as string}/todo/${editedTask.id}`,
          {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId,
              title: editedTask.title,
              description: editedTask.description,
            }),
          },
        )

        router.refresh()
      } catch (err) {
        console.log(err)
      }
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextInput
          mt="md"
          placeholder="title"
          value={editedTask.title || ''}
          onChange={(e) => update({ ...editedTask, title: e.target.value })}
        />
        <TextInput
          mt="md"
          placeholder="description"
          value={editedTask.description || ''}
          onChange={(e) =>
            update({ ...editedTask, description: e.target.value })
          }
        />
        <Center mt="lg">
          <Button
            disabled={editedTask.title === ''}
            leftIcon={<IconDatabase size={14} />}
            color="cyan"
            type="submit"
          >
            {editedTask.id === 0 ? 'Create' : 'Update'}
          </Button>
        </Center>
      </form>
    </>
  )
}

export default TaskForm
