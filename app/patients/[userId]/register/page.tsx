import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/patient.actions'
import * as Sentry from '@sentry/nextjs'

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId)

  Sentry.metrics.set("user_view_register", user.name);

  return (
    <div className="flex h-screen max-h-screen">

      <section className="remove-scrollbar container ">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <div className="flex flex-direction-col">
            <Image
              src="/assets/icons/logo-page2.svg"
              height={150}
              width={150}
              alt="Page_Logo"
              className="mb-3 h-12 w-fit"
            />
            <p className="px-2.5 font-bold text-3xl text-indigo-400">
              Aarogya
            </p>
          </div>

          <RegisterForm user={user} />


          <p className="copyright py-12">
            © 2024 Aarogya. All rights reserved.
          </p>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.jpeg"
        height={1000}
        width={1000}
        alt="Register_Image"
        className="side-img max-w-[390px]"
      />
    </div>
  )
}

export default Register 
