import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const options: NextAuthOptions = {
  debug: true,
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@exampl.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      // メールアドレス認証
      async authorize(credentials) {
        const response = await fetch(
          `${process.env.API_URL as string}/auth/login`,
          {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          },
        )

        const res = await response.json()
        if (response.ok && res) {
          return {
            id: res.id,
            name: res.name,
            email: res.email,
            role: 'admin',
            createdAt: res.createdAt,
            updatedAt: res.updatedAt,
          }
        }

        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.user = user
        const u = user as any
        token.role = u.role
        token.id = u.id
      }
      if (account) {
        token.accessToken = account.access_token
      }

      return token
    },
    session: ({ session, token }) => {
      token.accessToken
      return {
        ...session,
        user: {
          ...session.user,
          userId: token.id,
          role: token.role,
        },
      }
    },
  },
}
