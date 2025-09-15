import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { ArrowLeft, FileX } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  const onNavigate = (id: string) => {
    if (typeof window === "undefined") return
    if (window.location.pathname !== "/") {
      window.location.href = `/#${id}`
      return
    }
    const element = document.getElementById(id)
    if (element) element.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-brand-background text-white">
      <Header activeSection={"blog"} onNavigate={onNavigate} />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <FileX className="w-24 h-24 text-brand-accent mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
              Post Not Found
            </h1>
            <p className="text-xl text-brand-accent mb-8">
              The blog post you're looking for doesn't exist or has been moved.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              className="bg-brand-primary text-brand-background hover:bg-brand-primary/90 font-bold px-8 py-3 rounded-full transition-all duration-300"
            >
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Blog
              </Link>
            </Button>
            
            <Button
              variant="outline"
              asChild
              className="border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-brand-background font-bold px-8 py-3 rounded-full transition-all duration-300"
            >
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
