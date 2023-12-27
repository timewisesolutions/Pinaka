'use client'
import { FaFilePdf } from 'react-icons/fa6'
import axios from 'axios'
import { useRouter } from 'next/navigation'

import Heading from '@/components/heading'

import { cn } from '@/lib/utils'
import { formSchema } from './constants'

const PdfPage = () => {
  const router = useRouter()

  return (
    <div>
      <Heading
        title="PDF Collaborator"
        description="Interact with your own PDF."
        icon={FaFilePdf}
        iconColor="text-red-500"
        bgColor="bg-red-500/10"
      />
      <div className="px-4 lg:px-8"></div>
    </div>
  )
}

export default PdfPage
