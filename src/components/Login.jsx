import { FcGoogle } from 'react-icons/fc'
import { supabase } from '../services/supabase'

export default function Login() {

  const handleGoogleLogin = async () => {
    const { error } =
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
          queryParams: {
            prompt: 'select_account',
          }
        },
      })

    if (error) {
      console.error(error)
      alert(error.message)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ledger-paper px-5">
      <div className="w-full max-w-md">
        <div className="border border-ledger-rule bg-ledger-paper p-8 sm:p-10">

          <div className="mb-8 text-center">

            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-ledger-brass">
              TN Colleges
            </p>

            <h1 className="font-serif text-3xl font-semibold text-ledger-ink">
              The College Register
            </h1>

            <p className="mt-3 font-serif text-sm text-ledger-ink/60">
              Sign in to continue exploring Tamil Nadu engineering colleges.
            </p>

          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex w-full items-center justify-center gap-3 border border-ledger-rule bg-white px-5 py-3 font-serif text-sm text-ledger-ink"
          >
            <FcGoogle size={22} />

            Continue with Google
          </button>

        </div>
      </div>
    </div>
  )
}