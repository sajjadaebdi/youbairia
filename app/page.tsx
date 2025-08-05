"use client"

import Link from "next/link"
import { ArrowRight, Search, ShoppingCart, Sparkles, TrendingUp, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

import { useCartStore } from "@/app/store/cart"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ProductCard from "@/app/components/product-card"
import CategoryFilter from "@/app/components/category-filter"

export default function Home() {
  const items = useCartStore((state) => state.items)
  const totalCount = items.reduce((total, item) => total + item.quantity, 0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="py-8">
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-12 md:py-16 lg:py-20 bg-gradient-to-r from-muted/50 to-muted/30"
      >
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              Your Marketplace for Digital Products
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Buy and sell digital products from creators around the world. From templates to software, find
              everything you need.
            </p>
          </motion.div>
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-2 min-[400px]:gap-4"
          >
            <Link href="/products">
              <Button size="lg" className="gap-1 hover:scale-105 transition-transform">
                Browse Products <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/create-shop">
              <Button size="lg" variant="outline" className="hover:bg-primary/10 transition-colors">
                Start Selling
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="py-12 md:py-16"
      >
        <div className="flex flex-col gap-8">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            <div>
              <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                Featured Products <Sparkles className="h-5 w-5 text-yellow-500" />
              </h2>
              <p className="text-muted-foreground">Discover our most popular digital products</p>
            </div>
            <CategoryFilter />
          </motion.div>
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            <ProductCard
              id="5"
              title="USDT/INR"
              price={98.99}
              image="/usdt.png"
              category="Assets"
              seller="Youbairia"
            />
            <ProductCard
              id="6"
              title="Paid per Million Views"
              price={100.00}
              image="/paid.png"
              category="Marketing"
              seller="Youbairia"
            />
            <ProductCard
              id="7"
              title="Social Media Marketing"
              price={24.99}
              image="/smm.png"
              category="Marketing"
              seller="Youbairia"
            />
            <ProductCard
              id="8"
              title="Android App Development"
              price={39.99}
              image="/android.png"
              category="Development"
              seller="Youbairia"
            />
          </motion.div>
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 1 }}
            className="flex justify-center"
          >
            <Link href="/products">
              <Button variant="outline" className="gap-1 hover:bg-primary/10 transition-colors">
                Browse All Categories <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="py-12 md:py-16 bg-gradient-to-b from-muted/30 to-muted/50"
      >
        <div className="flex flex-col gap-8">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <h2 className="text-2xl font-bold tracking-tight text-center">Why Choose Youbairia?</h2>
            <p className="text-muted-foreground text-center mt-2">
              We make buying and selling digital products simple and secure
            </p>
          </motion.div>
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 1.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              <div className="p-3 rounded-full bg-primary/10 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Secure Transactions</h3>
              <p className="text-muted-foreground">
                All payments are processed securely with industry-standard encryption.
              </p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              <div className="p-3 rounded-full bg-primary/10 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Global Community</h3>
              <p className="text-muted-foreground">Connect with creators and buyers from around the world.</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              <div className="p-3 rounded-full bg-primary/10 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Instant Delivery</h3>
              <p className="text-muted-foreground">Get your digital products instantly after purchase.</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="border-t py-6 md:py-8 mt-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
            <Link href="/" className="text-lg font-semibold hover:text-primary transition-colors">
              Youbairia
            </Link>
            <nav className="flex gap-4 md:gap-6 text-sm">
              <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                Terms
              </Link>
              <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Zoubairia. All rights reserved.
          </p>
        </div>
      </motion.footer>
    </div>
  )
}
