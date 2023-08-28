'use client'

import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { List } from '@mantine/core'
import { useRouter } from 'next/navigation'
import React from 'react'

import useStore from '../../store'

type TaskItemProps = {
  id: number
  title: string
  description?: string
  userId: number
}

const TaskItem = ({ id, title, description, userId }: TaskItemProps) => {
  const update = useStore((state) => state.updateEditedTask)
  const router = useRouter()

  const deleteTask = async () => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/todo/${id}?userId=${userId}`,
        { method: 'DELETE', headers: { 'Content-Type': 'application/json' } },
      )

      router.refresh()
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <List.Item>
      <div className="float-left mr-10">
        <PencilAltIcon
          className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
          onClick={() => {
            update({
              id,
              title,
              description,
            })
          }}
        />
        <TrashIcon
          className="h-5 w-5 cursor-pointer text-blue-500"
          onClick={deleteTask}
        />
      </div>
      <span>{title}</span>
    </List.Item>
  )
}

export default TaskItem
