'use client'

import { LogoutIcon } from '@heroicons/react/solid'
import { signOut } from 'next-auth/react'
import React from 'react'

type UserInfoProps = {
  email?: string | null
}

const UserInfo = ({ email }: UserInfoProps) => {
  const logout = () => signOut({ callbackUrl: '/' })
  return (
    <>
      <LogoutIcon
        className="mb-6 h-6 w-6 cursor-pointer text-blue-500"
        onClick={logout}
      />
      <p>{email}</p>
    </>
  )
}

export default UserInfo
