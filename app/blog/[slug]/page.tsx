import { notFound } from "next/navigation"
import siteContent from "@/content/site-content.json"
import { BlogPostClient } from "./blog-post-client"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const post = siteContent.blog.posts.find((p) => p.slug === params.slug)

    if (!post) {
      notFound()
    }

    // Validate post structure
    if (!post.content || !post.content.body || !post.content.highlights) {
      console.error('Invalid post structure:', post)
      notFound()
    }

    return <BlogPostClient post={post} />
  } catch (error) {
    console.error('Error in BlogPostPage:', error)
    notFound()
  }
}