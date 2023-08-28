'use client'

import { List, ThemeIcon } from '@mantine/core'
import type { Task } from '@prisma/client'
//@ts-ignore
import { IconCircleDashed } from '@tabler/icons'
import React from 'react'

import TaskItem from './TaskItem'

type TaskListClientProps = {
  tasks: Task[]
  userId: number
}

const TaskListClient = ({ tasks, userId }: TaskListClientProps) => {
  return (
    <List
      my="lg"
      spacing="sm"
      size="sm"
      icon={
        <ThemeIcon color="cyan" size={24} radius="xl">
          <IconCircleDashed size={16} />
        </ThemeIcon>
      }
    >
      {tasks.map((task: Task) => (
        <TaskItem
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description as string}
          userId={userId}
        />
      ))}
    </List>
  )
}

export default TaskListClient
