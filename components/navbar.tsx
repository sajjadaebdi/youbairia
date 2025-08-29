"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { UserMenu } from "@/components/user-menu"
import { ShoppingCart, Home, Package, Tag, Gift, MessageSquare } from "lucide-react"
import { useCartStore } from "@/app/store/cart"
import { useRouter } from "next/navigation"
import { SearchBox } from "@/components/search-box"

export function Navbar() {
  const { data: session } = useSession()
  const items = useCartStore((state) => state.items)
  const totalCount = items.reduce((total, item) => total + item.quantity, 0)
  const router = useRouter()

  // Temporarily create a mock session for testing
  const mockSession = {
    user: {
      id: "temp-user-id",
      name: "Test User",
      email: "test@example.com",
      image: null
    }
  }

  // Use mock session instead of real session
  const currentSession = mockSession

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-2 py-2">
          {/* Logo */}
          <Link href="/" className="text-lg font-bold">
            YOUBAIRIA
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors">
              <Home className="h-3.5 w-3.5" />
              Home
            </Link>
            <Link href="/products" className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors">
              <Package className="h-3.5 w-3.5" />
              Products
            </Link>
            <Link href="/categories" className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors">
              <Tag className="h-3.5 w-3.5" />
              Categories
            </Link>
            <Link href="/deals" className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors">
              <Gift className="h-3.5 w-3.5" />
              Deals
            </Link>
            <Link href="/contact-us" className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors">
              <MessageSquare className="h-3.5 w-3.5" />
              Contact
            </Link>
          </nav>

          {/* Search and User Actions */}
          <div className="flex items-center gap-3 w-full max-w-2xl">
            <div className="flex-1">
              <SearchBox />
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
              <Link href="/cart" className="relative">
                <ShoppingCart className="h-4 w-4" />
                {totalCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {totalCount}
                  </span>
                )}
                <span className="sr-only">Cart</span>
              </Link>
            </Button>
            {/* Temporarily always show UserMenu for testing */}
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  )
}