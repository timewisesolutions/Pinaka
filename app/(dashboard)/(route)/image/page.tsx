'use client'
import { Download, ImageIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import Heading from '@/components/heading'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Empty } from '@/components/empty'
import { Card, CardFooter } from '@/components/ui/card'
import { Loader } from '@/components/loader'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { amountOptions, formSchema, resolutionOptions } from './constants'
import { cn } from '@/lib/utils'
import image from 'next/image'

const ImagePage = () => {
  const router = useRouter()
  const [images, setImages] = useState<string[]>([])

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
      amount: '1',
      resolution: '512x512',
    },
  })

  const isLoading = form.formState.isSubmitting
  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([])
      const response = await axios.post('/api/image', values)
      const urls = response.data.map((image: { url: string }) => image.url)
      setImages(urls)
      form.reset()
    } catch (error: any) {
      console.log(error)
    } finally {
      router.refresh()
    }
  }

  return (
    <div>
      <Heading
        title="Image Generation"
        description="Convert your text prompt into an image."
        icon={ImageIcon}
        iconColor="text-pink-500"
        bgColor="bg-pink-500/10"
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
                  <FormItem className="col-span-8 lg:col-span-4">
                    <FormControl className="">
                      <Input
                        className="px-4 py-2 border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="A picture of a horse in Himalayas"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {amountOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="resolution"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {resolutionOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
          <div className="space-y-4 mt-4">
            {isLoading && (
              <div className="p-20">
                <Loader />
              </div>
            )}
            {images.length === 0 && !isLoading && (
              <div>
                <Empty label="No images generated" />
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
              {images.map((image) => (
                <Card key={image} className="rounded-lg overflow-hidden">
                  <div className="relative aspect-square">
                    <Image alt="image" src={image} fill />
                  </div>
                  <CardFooter className="p-2 ">
                    <Button
                      onClick={() => window.open(image)}
                      variant="secondary"
                      className="w-full"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImagePage
