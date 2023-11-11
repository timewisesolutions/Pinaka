import { UserButton } from '@clerk/nextjs'
const Dashboard = () => {
  return (
    <div>
      <p>Dashboard Page (Protected)</p>
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}
export default Dashboard
