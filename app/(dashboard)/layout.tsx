import Sidebar from '@/components/sidebar'
import NavBar from '@/components/navbar'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[12rem,1fr] h-screen">
      <div className="hidden md:grid bg-gray-800">
        <Sidebar />
      </div>

      <main>
        <NavBar />
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout
