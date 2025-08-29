"use client"

import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useCartStore } from "@/app/store/cart"
import { useOrderStore } from "@/app/store/orders"
import { Separator } from "@/components/ui/separator"
import { UPIPayment } from "@/components/upi-payment"
import { useEffect } from "react"

export default function CheckoutPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { items, clearCart } = useCartStore()
  const addOrder = useOrderStore((state) => state.addOrder)

  // Temporarily disabled authentication check
  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push("/signin?callbackUrl=/checkout")
  //   }
  // }, [status, router])

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  const handlePaymentComplete = () => {
    // Add order to store
    addOrder(items, total)
    // Clear cart
    clearCart()
    // Redirect to orders page
    router.push("/orders")
  }

  // Temporarily disabled loading check
  // if (status === "loading") {
  //   return (
  //     <div className="py-12 text-center">
  //       <p className="text-muted-foreground">Loading...</p>
  //     </div>
  //   )
  // }

  if (items.length === 0) {
    return (
      <div className="py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground">Please add items to your cart before checking out.</p>
      </div>
    )
  }

  return (
    <div className="py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>

        <div className="bg-muted/50 rounded-lg p-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm mb-1">
                <span>
                  {item.title} × {item.quantity}
                </span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <Separator className="my-4" />
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax (10%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-base mt-2">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>

          <UPIPayment amount={total} onPaymentComplete={handlePaymentComplete} />
        </div>
      </div>
    </div>
  )
}
