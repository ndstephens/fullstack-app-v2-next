'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Button from '@/components/Button';
import Card from '@/components/Card';
import InputWithLabel from '@/components/InputWithLabel';
import { register, signin } from '@/lib/api';

const registerContent = {
  header: 'Create a new account',
  subheader: 'Just a few things to get started',
  buttonText: 'Register',
  linkText: 'Already have an account?',
  linkUrl: '/signin',
};

const signinContent = {
  header: 'Welcome back!',
  subheader: 'Enter your credentials to access your account',
  buttonText: 'Sign In',
  linkText: "Don't have an account?",
  linkUrl: '/register',
};

const initialState = { email: '', password: '', firstName: '', lastName: '' };

export default function AuthForm({ mode }: { mode: 'register' | 'signin' }) {
  const [formState, setFormState] = useState({ ...initialState });
  const router = useRouter();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      if (mode === 'register') {
        await register(formState);
      } else {
        await signin(formState);
      }
      // TODO: do i need to reset the form if i'm changing routes ?
      // setFormState({...initialState})
      router.replace('/home');
    } catch (error) {
      console.error(error);
    }
  };

  const content = mode === 'register' ? registerContent : signinContent;

  return (
    <Card>
      <div className="flex flex-col gap-y-10 p-8">
        <div className="flex flex-col items-center gap-y-2 px-6">
          <h2 className="text-3xl">{content.header}</h2>
          <p className="text-base text-gray-400">{content.subheader}</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-8">
          {mode === 'register' && (
            <div className="flex gap-x-4">
              <InputWithLabel
                label="First Name"
                id="firstName"
                required
                maxLength={48}
                type="text"
                placeholder="Jane"
                value={formState.firstName}
                onChange={(e) =>
                  setFormState((s) => ({
                    ...s,
                    firstName: e.target.value.trim(),
                  }))
                }
              />
              <InputWithLabel
                label="Last Name"
                id="lastName"
                required
                maxLength={48}
                type="text"
                placeholder="Doe"
                value={formState.lastName}
                onChange={(e) =>
                  setFormState((s) => ({
                    ...s,
                    lastName: e.target.value.trim(),
                  }))
                }
              />
            </div>
          )}
          <InputWithLabel
            label="Email"
            id="email"
            required
            type="email"
            placeholder="jane@email.com"
            value={formState.email}
            onChange={(e) =>
              setFormState((s) => ({ ...s, email: e.target.value.trim() }))
            }
          />
          <InputWithLabel
            label="Password"
            id="password"
            required
            minLength={8}
            maxLength={32}
            type="password"
            placeholder="********"
            value={formState.password}
            onChange={(e) =>
              setFormState((s) => ({ ...s, password: e.target.value.trim() }))
            }
          />
          <div className="flex items-center justify-between gap-x-12">
            <Link href={content.linkUrl} className="font-bold text-blue-600">
              {content.linkText}
            </Link>
            <Button type="submit" intent="secondary">
              {content.buttonText}
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
}
