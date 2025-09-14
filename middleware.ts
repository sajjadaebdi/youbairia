import { NextResponse } from "next/server"

// 🔒 Middleware for global security headers
export default function middleware(req: Request) {
  const response = NextResponse.next()

  // ✅ Security headers
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("Referrer-Policy", "origin-when-cross-origin")
  response.headers.set("X-XSS-Protection", "1; mode=block")

  // ✅ Updated Content Security Policy (allow Razorpay)
  response.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      // allow Razorpay scripts
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://checkout.razorpay.com",
      // allow Razorpay iframes
      "frame-src https://checkout.razorpay.com https://api.razorpay.com",
      // allow API calls
      "connect-src 'self' https://api.razorpay.com",
      // allow images from self, data: URIs, and Razorpay
      "img-src 'self' data: https://checkout.razorpay.com",
      // allow inline styles for Razorpay’s checkout form
      "style-src 'self' 'unsafe-inline'",
      // allow fonts
      "font-src 'self' data:",
      // prevent your site from being embedded elsewhere
      "frame-ancestors 'none'",
    ].join("; ")
  )

  return response
}

// ✅ Match all routes except static assets & favicon
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}