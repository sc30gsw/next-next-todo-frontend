import React from 'react'

import TaskListClient from './TaskListClient'

const fetchTasks = async (userId: number) => {
  try {
    const response = await fetch(
      `${process.env.API_URL}/todo?userId=${userId}`,
      {
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
      },
    )

    const res = await response.json()

    return res
  } catch (err) {
    console.log(err)
  }
}

type TaskListProps = {
  userId?: number
}

const TaskList = async ({ userId }: TaskListProps) => {
  const tasks = await fetchTasks(userId as number)

  return <TaskListClient tasks={tasks} userId={userId as number} />
}

export default TaskList
