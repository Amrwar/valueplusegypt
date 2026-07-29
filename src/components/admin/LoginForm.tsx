'use client';

import { useActionState } from 'react';
import { AdminLoginState, loginAdmin } from '@/actions/adminAuth';

const initialState: AdminLoginState = { error: '' };

export default function LoginForm() {
  const [state, action, isPending] = useActionState(loginAdmin, initialState);

  return (
    <form
      action={action}
      className="w-full max-w-sm rounded-xl border border-navy-800 bg-navy-900 p-8 shadow-2xl"
    >
      <h1 className="text-xl font-bold text-white">Value Plus Egypt — Admin</h1>
      <div className="mt-2 h-1 w-12 rounded bg-gold-400" />

      <div className="mt-6 space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-navy-200">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 block w-full rounded-lg border border-navy-700 bg-navy-950 px-4 py-2.5 text-white placeholder:text-navy-500 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-navy-200">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="mt-1 block w-full rounded-lg border border-navy-700 bg-navy-950 px-4 py-2.5 text-white placeholder:text-navy-500 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400"
          />
        </div>

        {state.error && (
          <div className="rounded-lg border border-red-800 bg-red-950 p-3 text-sm text-red-300">
            {state.error}
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-lg bg-gold-400 px-6 py-3 text-base font-semibold text-navy-950 transition-colors hover:bg-gold-300 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isPending ? 'Signing in…' : 'Sign in'}
        </button>
      </div>
    </form>
  );
}
