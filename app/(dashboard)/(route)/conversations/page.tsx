'use client'
import { MessageSquare } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import Heading from '@/components/heading'
import { formSchema } from './constants'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const Conversations = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  })

  const isLoading = form.formState.isSubmitting
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div>
      <Heading
        title="Conversations"
        description="Our cutting-edge conversation model with advanced AI"
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="my-4 grid grid-cols-8 lg:grid-cols-10 gap-2 px-2 py-4 border rounded-lg focus-within:shadow-sm w-full"
            >
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-8 lg:col-span-9">
                    <FormControl className="">
                      <Input
                        className="px-4 py-2 border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="What is the value of Pi?"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-8 lg:col-span-1 w-full"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
          <div>Message</div>
        </div>
      </div>
    </div>
  )
}

export default Conversations
