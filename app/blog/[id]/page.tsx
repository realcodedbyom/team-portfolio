"use client"

import { useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ChevronLeft, Calendar, Clock, Share2, Twitter, Linkedin, Facebook, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { PageWrapper } from "@/components/layout/page-wrapper"

// Sample blog post data (in a real app, this would come from a CMS or API)
const BLOG_POSTS = [
  {
    id: 1,
    title: "The Future of Web Development: Trends to Watch in 2024",
    excerpt:
      "Explore the latest trends shaping the future of web development, from AI integration to progressive web apps and beyond.",
    content: `
      <p>The web development landscape is constantly evolving, and 2024 promises to bring exciting new trends and technologies that will shape how we build and interact with web applications. In this comprehensive guide, we'll explore the most significant trends that developers should watch and prepare for.</p>

      <h2>1. AI-Powered Development Tools</h2>
      <p>Artificial Intelligence is revolutionizing the way we write code. From GitHub Copilot to ChatGPT, AI assistants are becoming indispensable tools for developers. These tools can help with:</p>
      <ul>
        <li>Code generation and completion</li>
        <li>Bug detection and fixing</li>
        <li>Code optimization suggestions</li>
        <li>Documentation generation</li>
      </ul>

      <h2>2. Progressive Web Apps (PWAs) Evolution</h2>
      <p>PWAs continue to bridge the gap between web and native applications. With improved browser support and new capabilities, PWAs are becoming more powerful than ever. Key developments include:</p>
      <ul>
        <li>Enhanced offline functionality</li>
        <li>Better integration with device features</li>
        <li>Improved performance metrics</li>
        <li>App store distribution</li>
      </ul>

      <h2>3. WebAssembly (WASM) Adoption</h2>
      <p>WebAssembly is gaining traction as a way to run high-performance applications in the browser. This technology enables:</p>
      <ul>
        <li>Near-native performance for web applications</li>
        <li>Support for multiple programming languages</li>
        <li>Complex computations in the browser</li>
        <li>Gaming and multimedia applications</li>
      </ul>

      <h2>4. Serverless Architecture Growth</h2>
      <p>Serverless computing continues to grow in popularity, offering developers the ability to build and deploy applications without managing infrastructure. Benefits include:</p>
      <ul>
        <li>Reduced operational overhead</li>
        <li>Automatic scaling</li>
        <li>Cost-effective pricing models</li>
        <li>Faster time to market</li>
      </ul>

      <h2>Conclusion</h2>
      <p>The future of web development is bright and full of opportunities. By staying informed about these trends and continuously learning new technologies, developers can build better, more efficient, and more user-friendly applications. The key is to embrace change while maintaining a focus on user experience and performance.</p>
    `,
    author: "John Smith",
    authorAvatar: "/professional-male-developer.png",
    authorBio: "John is a full-stack developer with 6+ years of experience in modern web technologies.",
    publishDate: "2024-01-15",
    readTime: "8 min read",
    category: "Web Development",
    tags: ["React", "Next.js", "AI", "PWA"],
    image: "/placeholder.svg?key=blog1",
    featured: true,
  },
  {
    id: 2,
    title: "Designing for Accessibility: A Complete Guide",
    excerpt:
      "Learn how to create inclusive designs that work for everyone, with practical tips and best practices for accessibility.",
    content: `
      <p>Accessibility in design isn't just about compliance—it's about creating inclusive experiences that work for everyone. In this comprehensive guide, we'll explore the principles, practices, and tools that make digital products accessible to all users.</p>

      <h2>Understanding Web Accessibility</h2>
      <p>Web accessibility means that websites, tools, and technologies are designed and developed so that people with disabilities can use them. This includes users who have:</p>
      <ul>
        <li>Visual impairments</li>
        <li>Hearing impairments</li>
        <li>Motor disabilities</li>
        <li>Cognitive disabilities</li>
      </ul>

      <h2>The WCAG Guidelines</h2>
      <p>The Web Content Accessibility Guidelines (WCAG) provide a framework for making web content accessible. The guidelines are organized around four principles:</p>
      <ul>
        <li><strong>Perceivable:</strong> Information must be presentable in ways users can perceive</li>
        <li><strong>Operable:</strong> Interface components must be operable by all users</li>
        <li><strong>Understandable:</strong> Information and UI operation must be understandable</li>
        <li><strong>Robust:</strong> Content must be robust enough for various assistive technologies</li>
      </ul>

      <h2>Practical Implementation Tips</h2>
      <p>Here are some practical ways to improve accessibility in your designs:</p>
      <ul>
        <li>Use sufficient color contrast ratios</li>
        <li>Provide alternative text for images</li>
        <li>Ensure keyboard navigation works properly</li>
        <li>Use semantic HTML elements</li>
        <li>Provide captions for videos</li>
        <li>Design clear focus indicators</li>
      </ul>

      <h2>Testing for Accessibility</h2>
      <p>Regular testing is crucial for maintaining accessibility. Use these tools and methods:</p>
      <ul>
        <li>Automated testing tools like axe or WAVE</li>
        <li>Manual keyboard navigation testing</li>
        <li>Screen reader testing</li>
        <li>User testing with people with disabilities</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Creating accessible designs is not just the right thing to do—it's also good business. Accessible websites reach a broader audience, improve SEO, and often provide better user experiences for everyone. Start implementing these practices today to make your digital products more inclusive.</p>
    `,
    author: "Jane Doe",
    authorAvatar: "/professional-female-designer.png",
    authorBio:
      "Jane is a UX designer with 8+ years of experience creating accessible and inclusive digital experiences.",
    publishDate: "2024-01-10",
    readTime: "12 min read",
    category: "Design",
    tags: ["Accessibility", "UX", "Design", "WCAG"],
    image: "/placeholder.svg?key=blog2",
    featured: true,
  },
]

const RELATED_POSTS = [
  {
    id: 3,
    title: "Building Scalable Mobile Apps with React Native",
    category: "Mobile Development",
    readTime: "10 min read",
    image: "/placeholder.svg?key=blog3",
  },
  {
    id: 4,
    title: "AI in Marketing: Transforming Digital Strategies",
    category: "Marketing",
    readTime: "6 min read",
    image: "/placeholder.svg?key=blog4",
  },
]

interface BlogPostPageProps {
  params: {
    id: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = useMemo(() => {
    const id = Number.parseInt(params.id)
    return BLOG_POSTS.find((p) => p.id === id)
  }, [params.id])

  if (!post) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const shareUrl = typeof window !== "undefined" ? window.location.href : ""
  const shareText = `Check out this article: ${post.title}`

  return (
    <PageWrapper>
      {/* Header */}
      <section className="relative py-20" aria-labelledby="article-heading">
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            background: `
              radial-gradient(circle at 30% 20%, hsl(var(--primary) / 0.4), transparent 40%),
              radial-gradient(circle at 70% 80%, hsl(var(--secondary) / 0.4), transparent 40%)
            `,
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <Link href="/blog">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground mb-8 group">
              <ChevronLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Button>
          </Link>

          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Article Header */}
            <div className="text-center mb-12">
              <Badge className="bg-primary/20 text-primary border-primary/30 mb-4">{post.category}</Badge>

              <h1 id="article-heading" className="text-4xl md:text-5xl font-extrabold mb-6 text-balance">
                <span className="bg-gradient-to-r from-primary via-accent to-secondary text-transparent bg-clip-text">
                  {post.title}
                </span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 text-pretty">{post.excerpt}</p>

              {/* Article Meta */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Image
                    src={post.authorAvatar || "/placeholder.svg"}
                    alt={post.author}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="font-medium">{post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(post.publishDate)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Featured Image */}
            <motion.div
              className="relative mb-12 rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                width={800}
                height={400}
                className="w-full h-64 md:h-96 object-cover"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-10 pb-20" aria-label="Article content">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              {/* Main Content */}
              <motion.article
                className="lg:col-span-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div
                  className="prose prose-lg max-w-none text-muted-foreground prose-headings:text-foreground prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-p:mb-4 prose-ul:mb-4 prose-li:mb-2"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                <Separator className="my-12" />

                {/* Author Bio */}
                <Card className="bg-muted/20 border border-primary/20">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Image
                        src={post.authorAvatar || "/placeholder.svg"}
                        alt={post.author}
                        width={64}
                        height={64}
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">About {post.author}</h3>
                        <p className="text-muted-foreground">{post.authorBio}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.article>

              {/* Sidebar */}
              <motion.aside
                className="lg:col-span-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="sticky top-8 space-y-8">
                  {/* Share */}
                  <Card className="bg-card border-2 border-primary/20">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Share2 className="h-5 w-5" />
                        Share Article
                      </h3>
                      <div className="space-y-3">
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="w-full justify-start border-blue-500/30 text-blue-400 hover:bg-blue-500/10 bg-transparent"
                        >
                          <Link
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Twitter className="mr-2 h-4 w-4" />
                            Twitter
                          </Link>
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="w-full justify-start border-blue-600/30 text-blue-500 hover:bg-blue-600/10 bg-transparent"
                        >
                          <Link
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Linkedin className="mr-2 h-4 w-4" />
                            LinkedIn
                          </Link>
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="w-full justify-start border-blue-700/30 text-blue-600 hover:bg-blue-700/10 bg-transparent"
                        >
                          <Link
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Facebook className="mr-2 h-4 w-4" />
                            Facebook
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Related Posts */}
                  <Card className="bg-card border-2 border-primary/20">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Related Articles</h3>
                      <div className="space-y-4">
                        {RELATED_POSTS.map((relatedPost) => (
                          <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`}>
                            <div className="group cursor-pointer">
                              <div className="flex gap-3">
                                <Image
                                  src={relatedPost.image || "/placeholder.svg"}
                                  alt={relatedPost.title}
                                  width={60}
                                  height={60}
                                  className="rounded-lg object-cover flex-shrink-0"
                                />
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                    {relatedPost.title}
                                  </h4>
                                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                    <Badge variant="secondary" className="text-xs">
                                      {relatedPost.category}
                                    </Badge>
                                    <span>{relatedPost.readTime}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <Link href="/blog">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full mt-4 border-primary/30 text-primary hover:bg-primary/10 bg-transparent"
                        >
                          View All Articles
                          <ArrowRight className="ml-2 h-3 w-3" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </motion.aside>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
