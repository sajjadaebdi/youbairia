import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductCard from "@/app/components/product-card"
import CategoryFilter from "@/app/components/category-filter"

export default function ProductsPage() {
  // In a real app, you would fetch this data from an API or database
  const categories = [
    {
      id: "all",
      name: "All Products",
      products: [
        {
          id: "1",
          title: "Website Template Bundle",
          price: 49.99,
          image: "/placeholder.svg?height=300&width=300",
          category: "Templates",
          seller: "DesignStudio",
        },
        {
          id: "2",
          title: "Social Media Marketing Kit",
          price: 29.99,
          image: "/placeholder.svg?height=300&width=300",
          category: "Marketing",
          seller: "MarketingPro",
        },
        {
          id: "3",
          title: "Productivity App",
          price: 19.99,
          image: "/placeholder.svg?height=300&width=300",
          category: "Software",
          seller: "AppDev",
        },
        {
          id: "4",
          title: "Photography Presets Pack",
          price: 15.99,
          image: "/placeholder.svg?height=300&width=300",
          category: "Photography",
          seller: "PhotoMaster",
        },
        {
          id: "5",
          title: "E-book: Digital Marketing Guide",
          price: 9.99,
          image: "/placeholder.svg?height=300&width=300",
          category: "E-books",
          seller: "MarketingGuru",
        },
        {
          id: "6",
          title: "Icon Pack - 500+ Icons",
          price: 12.99,
          image: "/placeholder.svg?height=300&width=300",
          category: "Graphics",
          seller: "IconArtist",
        },
        {
          id: "7",
          title: "Video Editing Presets",
          price: 24.99,
          image: "/placeholder.svg?height=300&width=300",
          category: "Video",
          seller: "VideoEditor",
        },
        {
          id: "8",
          title: "UI Kit for Figma",
          price: 39.99,
          image: "/placeholder.svg?height=300&width=300",
          category: "Design",
          seller: "UXDesigner",
        },
      ],
    },
    {
      id: "templates",
      name: "Templates",
      products: [
        {
          id: "1",
          title: "Website Template Bundle",
          price: 49.99,
          image: "/placeholder.svg?height=300&width=300",
          category: "Templates",
          seller: "DesignStudio",
        },
        {
          id: "9",
          title: "E-commerce Template Pack",
          price: 59.99,
          image: "/placeholder.svg?height=300&width=300",
          category: "Templates",
          seller: "WebShopDesigns",
        },
        {
          id: "10",
          title: "Portfolio Templates",
          price: 29.99,
          image: "/placeholder.svg?height=300&width=300",
          category: "Templates",
          seller: "CreativePortfolios",
        },
        {
          id: "11",
          title: "Blog Theme Collection",
          price: 39.99,
          image: "/placeholder.svg?height=300&width=300",
          category: "Templates",
          seller: "BlogThemes",
        },
      ],
    },
    {
      id: "graphics",
      name: "Graphics",
      products: [
        {
          id: "6",
          title: "Icon Pack - 500+ Icons",
          price: 12.99,
          image: "/placeholder.svg?height=300&width=300",
          category: "Graphics",
          seller: "IconArtist",
        },
        {
          id: "12",
          title: "Vector Illustrations Bundle",
          price: 19.99,
          image: "/placeholder.svg?height=300&width=300",
          category: "Graphics",
          seller: "VectorArtist",
        },
        {
          id: "13",
          title: "Logo Templates Pack",
          price: 24.99,
          image: "/placeholder.svg?height=300&width=300",
          category: "Graphics",
          seller: "LogoDesigner",
        },
        {
          id: "14",
          title: "Social Media Graphics Kit",
          price: 17.99,
          image: "/placeholder.svg?height=300&width=300",
          category: "Graphics",
          seller: "SocialMediaDesigner",
        },
      ],
    },
    {
      id: "software",
      name: "Software",
      products: [
        {
          id: "3",
          title: "Productivity App",
          price: 19.99,
          image: "/placeholder.svg?height=300&width=300",
          category: "Software",
          seller: "AppDev",
        },
        {
          id: "15",
          title: "Project Management Tool",
          price: 29.99,
          image: "/placeholder.svg?height=300&width=300",
          category: "Software",
          seller: "ProjectTools",
        },
        {
          id: "16",
          title: "Accounting Software",
          price: 49.99,
          image: "/placeholder.svg?height=300&width=300",
          category: "Software",
          seller: "FinanceApps",
        },
        {
          id: "17",
          title: "CRM System",
          price: 59.99,
          image: "/placeholder.svg?height=300&width=300",
          category: "Software",
          seller: "BusinessSolutions",
        },
      ],
    },
    {
      id: "ebooks",
      name: "E-books",
      products: [
        {
          id: "5",
          title: "E-book: Digital Marketing Guide",
          price: 9.99,
          image: "/placeholder.svg?height=300&width=300",
          category: "E-books",
          seller: "MarketingGuru",
        },
        {
          id: "18",
          title: "E-book: Web Development Fundamentals",
          price: 12.99,
          image: "/placeholder.svg?height=300&width=300",
          category: "E-books",
          seller: "CodeTeacher",
        },
        {
          id: "19",
          title: "E-book: Business Strategy",
          price: 14.99,
          image: "/placeholder.svg?height=300&width=300",
          category: "E-books",
          seller: "BusinessConsultant",
        },
        {
          id: "20",
          title: "E-book: Creative Design Principles",
          price: 11.99,
          image: "/placeholder.svg?height=300&width=300",
          category: "E-books",
          seller: "DesignEducator",
        },
      ],
    },
    {
      id: "marketing",
      name: "Marketing",
      products: [
        {
          id: "2",
          title: "Social Media Marketing Kit",
          price: 29.99,
          image: "/placeholder.svg?height=300&width=300",
          category: "Marketing",
          seller: "MarketingPro",
        },
        {
          id: "21",
          title: "Email Marketing Templates",
          price: 19.99,
          image: "/placeholder.svg?height=300&width=300",
          category: "Marketing",
          seller: "EmailMarketer",
        },
        {
          id: "22",
          title: "SEO Toolkit",
          price: 34.99,
          image: "/placeholder.svg?height=300&width=300",
          category: "Marketing",
          seller: "SEOExpert",
        },
        {
          id: "23",
          title: "Content Marketing Planner",
          price: 24.99,
          image: "/placeholder.svg?height=300&width=300",
          category: "Marketing",
          seller: "ContentStrategist",
        },
      ],
    },
  ]

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Browse Products</h1>
          <p className="text-muted-foreground mt-2">Discover digital products from creators around the world</p>
        </div>

        {/* Mobile Category Filter */}
        <div className="md:hidden">
          <CategoryFilter />
        </div>

        {/* Desktop Category Tabs */}
        <div className="hidden md:block">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full justify-start mb-8 overflow-auto">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {category.products.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      title={product.title}
                      price={product.price}
                      image={product.image}
                      category={product.category}
                      seller={product.seller}
                    />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Mobile Category Sections */}
        <div className="md:hidden space-y-12">
          {categories.slice(1).map((category) => (
            <div key={category.id} className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">{category.name}</h2>
                <Link href={`/products/category/${category.id}`}>
                  <Button variant="link" className="gap-1">
                    View All <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {category.products.slice(0, 2).map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    image={product.image}
                    category={product.category}
                    seller={product.seller}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
