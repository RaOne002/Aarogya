"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl } from "@/components/ui/form"
import CustomeFormField from "../CustomeFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { PatientFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser, registerPatient } from "@/lib/actions/patient.actions"
import { FormFieldTypes } from "./PatientForm"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues } from "@/constants"
import { Label } from "../ui/label"
import { SelectItem } from "../ui/select"
import Image from "next/image"
import FileUploader from "../FileUploader"

const RegisterForm = ({ user }: { user: User }) => {

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof PatientFormValidation>>({
        resolver: zodResolver(PatientFormValidation),
        defaultValues: {
            ...PatientFormDefaultValues,
            name: "",
            email: "",
            phone: "",
        },
    });


    async function onSubmit( values : z.infer<typeof PatientFormValidation>) {
        setIsLoading(true);

        let formData;

        if (values.identificationDocument && values.identificationDocument.length > 0) {
            const blobFile = new Blob([values.identificationDocument[0]], { type: values.identificationDocument[0].type, });


            formData = new FormData();
            formData.append('blobFile', blobFile);
            formData.append('fileName', values.identificationDocument[0].name);
        }

        try {
            const patientData = {
                ...values,
                userId: user.$id,
                birthDate: new Date(values.birthDate),
                identificationDocument: formData,
            }

            //@ts-ignore
            const patient = await registerPatient(patientData);

            if(patient) router.push(`/patients/${user.$id}/new-appointment`)
        }
        catch (error) {
            console.log(error);
        }

        setIsLoading(false);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
                <section className="space-y-4">
                    <h1 className="header text-sky-400/75">Welcome 😀</h1>
                    <p className="text-dark-700">
                        We are glad you are here! Let us know a little about yourself.
                    </p>
                </section>

                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header text-sky-400/75">
                            Personal Information
                        </h2>
                    </div>
                </section>

                <CustomeFormField
                    fieldType={FormFieldTypes.INPUT}
                    control={form.control}
                    name="name"
                    label="Full Name"
                    placeholder="Enter your full name"
                    iconSrc="/assets/icons/user.svg"
                    iconAlt="User Icon"
                />

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomeFormField
                        fieldType={FormFieldTypes.INPUT}
                        control={form.control}
                        name="email"
                        label="Email"
                        placeholder="Enter your email"
                        iconSrc="/assets/icons/email.svg"
                        iconAlt="Email Icon"
                    />

                    <CustomeFormField
                        fieldType={FormFieldTypes.PHONE_INPUT}
                        control={form.control}
                        name="phone"
                        label="Phone Number"
                        placeholder="Enter your full phone number"
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomeFormField
                        fieldType={FormFieldTypes.DATE_PICKER}
                        control={form.control}
                        name="birthDate"
                        label="Date of Birth"
                    />

                    <CustomeFormField
                        fieldType={FormFieldTypes.SKELETON}
                        control={form.control}
                        name="gender"
                        label="Gender"
                        renderSkeleton={(field) => (
                            <FormControl>
                                <RadioGroup className="flex h-11 gap-6 xl:justify-between"
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    {GenderOptions.map((option) => (
                                        <div key={option} className="radio-group">
                                            <RadioGroupItem
                                                value={option}
                                                id={option}
                                            />
                                            <Label htmlFor={option} className="cursor-point">
                                                {option}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        )}
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomeFormField
                        fieldType={FormFieldTypes.INPUT}
                        control={form.control}
                        name="address"
                        label="Address"
                        placeholder="Enter your address"
                    />

                    <CustomeFormField
                        fieldType={FormFieldTypes.INPUT}
                        control={form.control}
                        name="occupation"
                        label="Occupation"
                        placeholder="Enter your occupation"
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomeFormField
                        fieldType={FormFieldTypes.INPUT}
                        control={form.control}
                        name="emergencyContactName"
                        label="Emergency Contact Name"
                        placeholder="Guardian's Name"
                    />

                    <CustomeFormField
                        fieldType={FormFieldTypes.PHONE_INPUT}
                        control={form.control}
                        name="emergencyContactNumber"
                        label="Emergency Contact Number"
                        placeholder="Guardian's Phone Number"
                    />
                </div>

                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header text-sky-400/75">
                            Medical Information
                        </h2>
                    </div>
                </section>

                <CustomeFormField
                    fieldType={FormFieldTypes.SELECT}
                    control={form.control}
                    name="primaryPhysician"
                    label="Primary Physician"
                    placeholder="Select your primary physician"
                >
                    {Doctors.map((doctor) => (
                        <SelectItem
                            key={doctor.name}
                            value={doctor.name}
                        >
                            <div className="flex cursor-pointer items-center gap-2">
                                <Image
                                    src={doctor.image}
                                    alt={doctor.name}
                                    width={32}
                                    height={32}
                                    className="rounded-full border border-dark-500"
                                />
                                <p>{doctor.name}</p>
                            </div>
                        </SelectItem>
                    ))}
                </CustomeFormField>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomeFormField
                        fieldType={FormFieldTypes.INPUT}
                        control={form.control}
                        name="insuranceProvider"
                        label="Insurance Provider"
                        placeholder="Name of your IP"
                    />

                    <CustomeFormField
                        fieldType={FormFieldTypes.INPUT}
                        control={form.control}
                        name="insurancePolicyNumber"
                        label="Insurance Policy Number"
                        placeholder="ABC123456"
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomeFormField
                        fieldType={FormFieldTypes.TEXTAREA}
                        control={form.control}
                        name="allergies"
                        label="Allergies (if any)"
                        placeholder="List any allergies you have"
                    />

                    <CustomeFormField
                        fieldType={FormFieldTypes.TEXTAREA}
                        control={form.control}
                        name="currentMedication"
                        label="Current Medication (if any)"
                        placeholder="List any medications you are currently taking"
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomeFormField
                        fieldType={FormFieldTypes.TEXTAREA}
                        control={form.control}
                        name="familyMedicalHistory"
                        label="Family Medical History"
                        placeholder="List any medical conditions that run in your family"
                    />

                    <CustomeFormField
                        fieldType={FormFieldTypes.TEXTAREA}
                        control={form.control}
                        name="pastMedicalHistory"
                        label="Past Medical History (if any)"
                        placeholder="List any medical conditions you have had in the past"
                    />
                </div>

                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header text-sky-400/75">
                            Identification & Verification
                        </h2>
                    </div>
                </section>

                <CustomeFormField
                    fieldType={FormFieldTypes.SELECT}
                    control={form.control}
                    name="identificationType"
                    label="Identification Type"
                    placeholder="Select your identification type"
                >
                    {IdentificationTypes.map((type) => (
                        <SelectItem
                            key={type}
                            value={type}
                        >
                            {type}
                        </SelectItem>
                    ))}

                </CustomeFormField>

                <CustomeFormField
                    fieldType={FormFieldTypes.INPUT}
                    control={form.control}
                    name="identificationNumber"
                    label="Identification Number"
                    placeholder="Enter your identification number"
                />

                <CustomeFormField
                    fieldType={FormFieldTypes.SKELETON}
                    control={form.control}
                    name="identificationDocument"
                    label="Scanned copy of your identification document"
                    renderSkeleton={(field) => (
                        <FormControl>
                            <FileUploader
                                files={field.value}
                                onChange={field.onChange}
                            />
                        </FormControl>
                    )}
                />

                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header text-sky-400/75">
                            Consent & Privacy
                        </h2>
                    </div>
                </section>

                <CustomeFormField
                    fieldType={FormFieldTypes.CHECKBOX}
                    control={form.control}
                    name="treatmentConsent"
                    label="I agree to the Treatment Consent"
                />
                <CustomeFormField
                    fieldType={FormFieldTypes.CHECKBOX}
                    control={form.control}
                    name="disclosureConsent"
                    label="I agree to the Disclosure Consent"
                />
                <CustomeFormField
                    fieldType={FormFieldTypes.CHECKBOX}
                    control={form.control}
                    name="privacyConsent"
                    label="I agree to the Privacy Consent"
                />

                <SubmitButton isLoading={isLoading} className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 ...">Get Started </SubmitButton>
            </form>
        </Form>
    )
}

export default RegisterForm
