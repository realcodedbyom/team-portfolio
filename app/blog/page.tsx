"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Search, Calendar, Clock, ArrowRight, Filter } from "lucide-react"
import { motion } from "framer-motion"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { fadeInUp, staggerContainer } from "@/lib/types"

interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  author: string
  authorAvatar: string
  publishDate: string
  readTime: string
  category: string
  tags: string[]
  image: string
  featured: boolean
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "The Future of Web Development: Trends to Watch in 2024",
    excerpt:
      "Explore the latest trends shaping the future of web development, from AI integration to progressive web apps and beyond.",
    content: "Full article content would go here...",
    author: "John Smith",
    authorAvatar: "/professional-male-developer.png",
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
    content: "Full article content would go here...",
    author: "Jane Doe",
    authorAvatar: "/professional-female-designer.png",
    publishDate: "2024-01-10",
    readTime: "12 min read",
    category: "Design",
    tags: ["Accessibility", "UX", "Design", "WCAG"],
    image: "/placeholder.svg?key=blog2",
    featured: true,
  },
  {
    id: 3,
    title: "Building Scalable Mobile Apps with React Native",
    excerpt: "Discover best practices for creating performant and scalable mobile applications using React Native.",
    content: "Full article content would go here...",
    author: "John Smith",
    authorAvatar: "/professional-male-developer.png",
    publishDate: "2024-01-05",
    readTime: "10 min read",
    category: "Mobile Development",
    tags: ["React Native", "Mobile", "Performance", "Scalability"],
    image: "/placeholder.svg?key=blog3",
    featured: false,
  },
  {
    id: 4,
    title: "AI in Marketing: Transforming Digital Strategies",
    excerpt: "How artificial intelligence is revolutionizing marketing strategies and what it means for businesses.",
    content: "Full article content would go here...",
    author: "Alex Johnson",
    authorAvatar: "/marketing-specialist-portrait.png",
    publishDate: "2024-01-01",
    readTime: "6 min read",
    category: "Marketing",
    tags: ["AI", "Marketing", "Digital Strategy", "Automation"],
    image: "/placeholder.svg?key=blog4",
    featured: false,
  },
  {
    id: 5,
    title: "The Rise of Blockchain in Enterprise Solutions",
    excerpt:
      "Exploring how blockchain technology is being adopted by enterprises for secure and transparent operations.",
    content: "Full article content would go here...",
    author: "David Kim",
    authorAvatar: "/placeholder.svg?height=120&width=120",
    publishDate: "2023-12-28",
    readTime: "15 min read",
    category: "Blockchain",
    tags: ["Blockchain", "Enterprise", "Security", "DeFi"],
    image: "/placeholder.svg?key=blog5",
    featured: false,
  },
  {
    id: 6,
    title: "IoT Security: Protecting Connected Devices",
    excerpt: "Essential security practices for IoT devices and how to build secure connected systems.",
    content: "Full article content would go here...",
    author: "Maria Garcia",
    authorAvatar: "/placeholder.svg?height=120&width=120",
    publishDate: "2023-12-25",
    readTime: "9 min read",
    category: "IoT",
    tags: ["IoT", "Security", "Connected Devices", "Cybersecurity"],
    image: "/placeholder.svg?key=blog6",
    featured: false,
  },
]

const CATEGORIES = ["All", "Web Development", "Design", "Mobile Development", "Marketing", "Blockchain", "IoT"]

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
      const matchesFeatured = !showFeaturedOnly || post.featured

      return matchesSearch && matchesCategory && matchesFeatured
    })
  }, [searchTerm, selectedCategory, showFeaturedOnly])

  const featuredPosts = BLOG_POSTS.filter((post) => post.featured)

  const handleResetFilters = () => {
    setSearchTerm("")
    setSelectedCategory("All")
    setShowFeaturedOnly(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <PageWrapper>
      {/* Header */}
      <section className="relative py-20" aria-labelledby="blog-heading">
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            background: `
              radial-gradient(circle at 30% 20%, hsl(var(--primary) / 0.4), transparent 40%),
              radial-gradient(circle at 70% 80%, hsl(var(--accent) / 0.4), transparent 40%)
            `,
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <Link href="/">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground mb-8 group">
              <ChevronLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Button>
          </Link>

          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 id="blog-heading" className="text-5xl md:text-6xl font-extrabold mb-4 text-balance">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary text-transparent bg-clip-text">
                Our Blog
              </span>
            </h1>

            <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent mx-auto mb-6" />

            <p className="text-xl text-muted-foreground mb-12 text-pretty">
              Insights, tutorials, and industry trends from our team of experts. Stay updated with the latest in
              technology and design.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-10" aria-labelledby="featured-heading">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 id="featured-heading" className="text-3xl md:text-4xl font-extrabold mb-4 text-balance">
                <span className="bg-gradient-to-r from-secondary to-primary text-transparent bg-clip-text">
                  Featured Articles
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Our most popular and impactful articles
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {featuredPosts.map((post, index) => (
                <motion.div key={post.id} variants={fadeInUp}>
                  <Card className="h-full bg-card border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 group overflow-hidden">
                    <div className="relative overflow-hidden">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        width={600}
                        height={300}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-3 left-3 bg-accent text-white">Featured</Badge>
                      <Badge className="absolute top-3 right-3 bg-primary/20 text-primary border-primary/30">
                        {post.category}
                      </Badge>
                    </div>

                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground line-clamp-3">{post.excerpt}</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{post.tags.length - 3} more
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Image
                            src={post.authorAvatar || "/placeholder.svg"}
                            alt={post.author}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                          <div className="text-sm">
                            <p className="font-medium text-foreground">{post.author}</p>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              <span>{formatDate(post.publishDate)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      <Link href={`/blog/${post.id}`}>
                        <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white">
                          Read Article
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Search and Filters */}
      <section className="py-10 bg-muted/20" aria-labelledby="all-posts-heading">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 id="all-posts-heading" className="text-3xl md:text-4xl font-extrabold mb-4 text-balance">
              <span className="bg-gradient-to-r from-accent to-secondary text-transparent bg-clip-text">
                All Articles
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Explore our complete collection of articles and insights
            </p>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search articles by title, content, or tags..."
                  className="pl-10 bg-card border-2 border-border focus:border-primary text-foreground h-12"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search articles"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm font-medium text-muted-foreground flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  Category:
                </span>
                {CATEGORIES.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    className={
                      selectedCategory === category
                        ? "bg-primary hover:bg-primary/90 text-white"
                        : "border-border text-muted-foreground hover:bg-muted"
                    }
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* Additional Filters */}
              <div className="flex flex-wrap gap-4 items-center">
                <Button
                  variant={showFeaturedOnly ? "default" : "outline"}
                  size="sm"
                  className={
                    showFeaturedOnly
                      ? "bg-accent hover:bg-accent/90 text-white"
                      : "border-border text-muted-foreground hover:bg-muted"
                  }
                  onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                >
                  Featured Only
                </Button>

                {(searchTerm || selectedCategory !== "All" || showFeaturedOnly) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleResetFilters}
                    className="text-primary hover:text-primary/80"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>

              <div className="text-sm text-muted-foreground">
                Showing {filteredPosts.length} of {BLOG_POSTS.length} articles
              </div>
            </div>
          </motion.div>

          {/* Articles Grid */}
          {filteredPosts.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {filteredPosts.map((post) => (
                <motion.div key={post.id} variants={fadeInUp}>
                  <Card className="h-full bg-card border-2 border-border hover:border-primary/40 transition-all duration-300 group overflow-hidden">
                    <div className="relative overflow-hidden">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        width={400}
                        height={200}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {post.featured && <Badge className="absolute top-3 left-3 bg-accent text-white">Featured</Badge>}
                      <Badge className="absolute top-3 right-3 bg-primary/20 text-primary border-primary/30">
                        {post.category}
                      </Badge>
                    </div>

                    <CardHeader>
                      <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground line-clamp-2">{post.excerpt}</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{post.tags.length - 2}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Image
                            src={post.authorAvatar || "/placeholder.svg"}
                            alt={post.author}
                            width={24}
                            height={24}
                            className="rounded-full"
                          />
                          <span className="text-muted-foreground">{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(post.publishDate)}
                      </div>

                      <Link href={`/blog/${post.id}`}>
                        <Button
                          variant="outline"
                          className="w-full border-primary/30 text-primary hover:bg-primary/10 bg-transparent"
                        >
                          Read More
                          <ArrowRight className="ml-2 h-3 w-3" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div className="text-center py-20" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="text-6xl mb-4">📝</div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">No articles found</h2>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search criteria or filters to find what you're looking for.
              </p>
              <Button onClick={handleResetFilters} className="bg-primary hover:bg-primary/90 text-white">
                Reset Filters
              </Button>
            </motion.div>
          )}
        </div>
      </section>
    </PageWrapper>
  )
}
