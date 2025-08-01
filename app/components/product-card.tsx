"use client"

import Image from "next/image"
import Link from "next/link"
import { useCartStore } from "@/app/store/cart"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

interface ProductCardProps {
  id: string
  title: string
  price: number
  image: string
  category: string
  seller: string
}

export default function ProductCard({
  id,
  title,
  price,
  image,
  category,
  seller,
}: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    addItem({
      id,
      title,
      price,
      image,
      category,
      seller,
      quantity: 1,
    })
  }

  return (
    <div className="group relative bg-background rounded-lg border p-4 hover:shadow-md transition-shadow">
      <Link href={`/products/${id}`}>
        <div className="aspect-square relative mb-4 overflow-hidden rounded-md">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-2">{category}</p>
        <p className="font-medium">₹{price.toFixed(2)}</p>
      </Link>
      <Button
        variant="outline"
        size="sm"
        className="w-full mt-4"
        onClick={handleAddToCart}
      >
        <ShoppingCart className="mr-2 h-4 w-4" />
        Add to Cart
      </Button>
    </div>
  )
}
