import { Button } from '@/components/ui/button'
import Link from 'next/link'

const LandingPage = () => {
  return (
    <div>
      Landing page (unprotected)
      <div>
        <Link href="/sign-in">
          <Button>Sign in</Button>
        </Link>
        <Link href="/sign-up">
          <Button>Register</Button>
        </Link>
      </div>
    </div>
  )
}
export default LandingPage
