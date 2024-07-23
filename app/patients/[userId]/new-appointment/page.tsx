import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import { get } from "http";
import Image from "next/image";
import Link from "next/link";
import * as Sentry from "@sentry/nextjs";


export default async function NewAppointment({ params: { userId }}: SearchParamProps) {
  const patient = await getPatient(userId);

  Sentry.metrics.set("user_view_new-appointment", patient.name);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[660px] flex-1 justify-between">
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


          <AppointmentForm 
            type="create"
            userId={userId}
            patientId={patient.$id}
          />

          <p className="copyright mt-3 py-5">
            © 2024 Aarogya. All rights reserved.
          </p>

        </div>
      </section>

      <Image
        src="/assets/images/appointment-bg.png"
        height={1000}
        width={1000}
        alt="appointment-image"
        className="side-img max-w-[390px]" 
      />
    </div>
  )
}
