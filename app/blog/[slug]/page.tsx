import { notFound } from "next/navigation"
import siteContent from "@/content/site-content.json"
import { BlogPostClient } from "./blog-post-client"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = siteContent.blog.posts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  return <BlogPostClient post={post} />
}