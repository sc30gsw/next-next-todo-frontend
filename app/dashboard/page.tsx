import { getServerSession } from 'next-auth'
import React from 'react'

import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import UserInfo from '../components/UserInfo'
import { options } from '../options'

const DashBoardPage = async () => {
  const session = await getServerSession(options)

  return (
    <>
      <UserInfo email={session?.user?.email} />
      <TaskForm userId={session?.user?.userId as number} />
      <TaskList userId={session?.user?.userId} />
    </>
  )
}

export default DashBoardPage
