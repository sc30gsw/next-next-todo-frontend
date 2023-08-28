'use client'

import { MantineProvider } from '@mantine/core'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'dark',
        fontFamily: 'Verdana, sans-serif',
      }}
    >
      <SessionProvider>{children}</SessionProvider>
    </MantineProvider>
  )
}

export default Providers
