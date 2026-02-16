export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen w-full bg-white text-black flex items-center justify-center">
      {children}
    </div>
  )
}
