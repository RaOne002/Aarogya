import PatientForm from "@/components/forms/PatientForm";
import PasskeyModel from "@/components/PasskeyModel";
import Image from "next/image";
import Link from "next/link";

export default function Home({ searchParams }: SearchParamProps) {

  const isAdmin = searchParams.admin === "true";

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModel />}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
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


          <PatientForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 Aarogya. All rights reserved.
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/doctors-image.jpeg"
        height={1000}
        width={1000}
        alt="Onboarding_Image"
        className="side-img max-w-[50%]"
      />
    </div>
  )
}
