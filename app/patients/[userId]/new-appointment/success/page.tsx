import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { getAppointment } from '@/lib/actions/appointment.actions';
import { Doctors } from '@/constants';
import { formatDateTime } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import * as Sentry from '@sentry/nextjs';
import { getUser } from '@/lib/actions/patient.actions';

const Success = async ({ params: { userId }, searchParams }: SearchParamProps) => {

    const appointmentId = (searchParams?.appointmentId as string) || '';
    const appointment = await getAppointment(appointmentId);
    const doctor = Doctors.find((doc) => doc.name === appointment.primaryPhysician);
    const user = await getUser(userId)
    
    Sentry.metrics.set("user_view_appointment-success", user.name);

  return (
    <div className='flex h-screen max-h-screen px-[5%]'>
      <div className='success-img'>
        <Link href='/'>
        <div className="flex flex-direction-col">
            <Image
              src="/assets/icons/logo-page2.svg"
              height={150}
              width={150}
              alt="Page_Logo"
              className="mb-3 h-12 w-fit"
            />
            <p className="px-2.5 py-1 font-bold text-3xl text-indigo-400">
              Aarogya
            </p>
          </div>
        </Link>

        <section className='flex flex-col items-center'>
            <Image 
                src="/assets/gifs/success.gif"
                height={300}
                width={280}
                alt="Success"
            />
            <h2 className='header mb-6 max-w-[600px] text-center'>
                Your <span className='text-green-500'> appointment request </span> has been successfully submitted.
            </h2>
            <p>We will be in touch shortly to confirm.</p>
        </section>

        <section className='request-details'>
            <p>Requested appointment details</p>
            <div className='flex items-center gap-3'>
                <Image 
                    src={doctor?.image!}
                    alt='Doctor'
                    height={100}
                    width={100}
                    className='sie-6'
                />
                <p className='whitespace-nowrap'>Dr. {doctor?.name}</p>
                <div className='flex gap-2'> 
                    <Image 
                        src='/assets/icons/calendar.svg'
                        alt='Calendar'
                        height={24}
                        width={24}
                    />
                    <p>{formatDateTime(appointment.schedule).dateTime}</p>
                </div>
            </div>
        </section>

        <Button variant="outline" className=' bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-800 hover:to-blue-900 ..."' asChild>
            <Link href={`/patients/${userId}/new-appointment`}>
                New Appointment
            </Link>
        </Button>

        <p className="copyright">
            © 2024 Aarogya. All rights reserved.
          </p>
      </div>
    </div>
  )
}

export default Success