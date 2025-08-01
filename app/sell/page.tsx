"use client"

import type React from "react"

import { useState } from "react"
import { Upload } from "lucide-react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export default function SellPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    shopName: "",
    description: "",
    category: "",
    contactEmail: "",
    website: "",
    socialLinks: {
      twitter: "",
      facebook: "",
      instagram: "",
    }
  })

  // Redirect to login if not authenticated
  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (status === "unauthenticated") {
    router.push("/login")
    return null
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const generateShopUrl = (shopName: string) => {
    return shopName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.shopName || !formData.description || !formData.category || !formData.contactEmail) {
      toast.error("Please fill in all required fields")
      return
    }

    if (!session?.user?.id) {
      toast.error("Please log in to create a shop")
      return
    }

    try {
      setIsLoading(true)
      
      // Generate unique shop URL
      const shopUrl = generateShopUrl(formData.shopName)
      
      const response = await fetch("/api/seller", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          shopUrl,
          userId: session.user.id,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to create seller profile")
      }

      const seller = await response.json()
      toast.success("Shop created successfully!")
      router.push(`/shop/${seller.shopUrl}`)
    } catch (error) {
      console.error("Error creating seller:", error)
      toast.error(error instanceof Error ? error.message : "Failed to create shop. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="container py-8 md:py-12">
        <div className="mx-auto max-w-3xl space-y-8">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 pb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60 animate-fade-in-up leading-[1.15]">
              Create Your Digital Shop
            </h1>
            <p className="text-muted-foreground mt-2">
              Set up your seller profile to start selling digital products on our marketplace.
            </p>
          </div>
          <Separator />
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Shop Information</h2>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="shopName">Shop Name *</Label>
                  <Input 
                    id="shopName" 
                    placeholder="Enter your shop name" 
                    value={formData.shopName}
                    onChange={(e) => handleInputChange("shopName", e.target.value)}
                    required
                  />
                  {formData.shopName && (
                    <p className="text-sm text-muted-foreground">
                      Your shop URL will be: yourmarketplace.com/shop/{generateShopUrl(formData.shopName)}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="templates">Templates</SelectItem>
                      <SelectItem value="graphics">Graphics</SelectItem>
                      <SelectItem value="software">Software</SelectItem>
                      <SelectItem value="ebooks">E-books</SelectItem>
                      <SelectItem value="photography">Photography</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="audio">Audio</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Shop Description *</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe your shop and what you sell" 
                    rows={4}
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contactEmail">Contact Email *</Label>
                  <Input 
                    id="contactEmail" 
                    type="email" 
                    placeholder="your@email.com"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="website">Website (Optional)</Label>
                  <Input 
                    id="website" 
                    type="url" 
                    placeholder="https://yourwebsite.com"
                    value={formData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                  />
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Social Media Links (Optional)</h2>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="twitter">Twitter/X</Label>
                  <Input 
                    id="twitter" 
                    placeholder="https://twitter.com/yourhandle"
                    value={formData.socialLinks.twitter}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      socialLinks: { ...prev.socialLinks, twitter: e.target.value }
                    }))}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input 
                    id="facebook" 
                    placeholder="https://facebook.com/yourpage"
                    value={formData.socialLinks.facebook}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      socialLinks: { ...prev.socialLinks, facebook: e.target.value }
                    }))}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input 
                    id="instagram" 
                    placeholder="https://instagram.com/yourhandle"
                    value={formData.socialLinks.instagram}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      socialLinks: { ...prev.socialLinks, instagram: e.target.value }
                    }))}
                  />
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Terms and Conditions</h2>
              <div className="space-y-4">
                <div className="rounded-lg border p-4 text-sm">
                  <p className="font-medium mb-2">By creating your shop, you agree to:</p>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>Our marketplace terms of service</li>
                    <li>A 10% commission fee on each sale</li>
                    <li>Providing customer support for your products</li>
                    <li>Maintaining and updating your products as needed</li>
                    <li>Following our community guidelines</li>
                  </ul>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="terms" className="rounded border-gray-300" required />
                  <label htmlFor="terms" className="text-sm">
                    I agree to the terms and conditions *
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <Button variant="outline" type="button" disabled={isLoading}>
                Save as Draft
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating Shop..." : "Create Shop"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
