
import { useSession, signIn, signOut } from "next-auth/react"

export default function Auth() {
  const { data: session } = useSession()

  if (session) {
    return (
      <div className="flex items-center">
        <p className="mr-4">Signed in as {session.user?.name}</p>
        <button onClick={() => signOut()} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
          Sign out
        </button>
      </div>
    )
  }
  return (
    <button onClick={() => signIn("github")} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
      Sign in with GitHub
    </button>
  )
}
