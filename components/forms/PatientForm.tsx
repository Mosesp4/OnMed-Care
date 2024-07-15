"use client"

import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import CustomFormField from '@/components/CustomFormField'
import SubmitButton from'@/components/SubmitButton'
import { UserFormValidation } from "@/lib/validation";
import { us}

export enum FormFieldType {
  INPUT ='input',
  TEXTAREA = 'textarea',
  PHONE_INPUT =  'phoneInput',
  SELECT = 'select',
  DATE_PICKER = 'datepicker',
  SKELETON = 'skeleton',
  CHECKBOX = 'checkbox',
}


const PatientForm = () => {

  const [isLoading, setIsLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit({ name, email, phone }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);

    try {
      const userData = {  name, email, phone,}

      const user = await createUser(userData);

      if (user)
    } catch (error) {
      console.log(error);
    }
  }

   return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
            <h1 className="header">Hi there </h1>
            <p className="text-dark-700">Schedule your first Appointment</p>
        </section>

         <CustomFormField 
           fieldType={FormFieldType.INPUT}
           control={form.control}
           name="name"
           label="Full name"
           placeholder="John Doe"
           iconSrc="/assets/icons/user.svg"
           iconAlt="user"
         />

        <CustomFormField 
           fieldType={FormFieldType.INPUT}
           control={form.control}
           name="email"
           label="Email"
           placeholder="echelamoses@gmail.com"
           iconSrc="/assets/icons/email.svg"
           iconAlt="email"
         />

        <CustomFormField 
           fieldType={FormFieldType.PHONE_INPUT}
           control={form.control}
           name="phone"
           label="Phone number"
           placeholder="(+234) 7034221"
         />

        <SubmitButton  isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
   )
}

export default PatientForm; 
