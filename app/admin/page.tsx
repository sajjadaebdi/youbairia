"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { 
  Users, 
  ShoppingBag, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Settings,
  BarChart3,
  Shield,
  Activity
} from "lucide-react"

interface Seller {
  id: string
  shopName: string
  shopUrl: string
  description: string
  category: string
  contactEmail: string
  status: string
  createdAt: string
}

interface Product {
  id: string
  title: string
  description: string
  price: number
  category: string
  status: string
  seller: {
    shopName: string
    shopUrl: string
  }
  createdAt: string
}

interface DashboardStats {
  totalUsers: number
  totalSellers: number
  totalProducts: number
  pendingSellers: number
  pendingProducts: number
  approvedSellers: number
  approvedProducts: number
  totalRevenue: number
}

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [sellers, setSellers] = useState<Seller[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  // Handle authentication and redirects
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    } else if (status === "authenticated" && session?.user?.role !== "ADMIN") {
      router.push("/")
    }
  }, [status, session, router])

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "ADMIN") {
      fetchData()
    }
  }, [status, session])

  const fetchData = async () => {
    try {
      const [sellersRes, productsRes, statsRes] = await Promise.all([
        fetch("/api/admin/sellers"),
        fetch("/api/admin/products"),
        fetch("/api/admin/stats")
      ])

      if (sellersRes.ok) {
        const sellersData = await sellersRes.json()
        setSellers(sellersData)
      }

      if (productsRes.ok) {
        const productsData = await productsRes.json()
        setProducts(productsData)
      }

      if (statsRes.ok) {
        const statsData = await statsRes.json()
        setStats(statsData)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      toast.error("Failed to fetch dashboard data")
    } finally {
      setLoading(false)
    }
  }

  const handleSellerAction = async (sellerId: string, action: "approve" | "reject") => {
    try {
      const response = await fetch(`/api/admin/sellers/${sellerId}/${action}`, {
        method: "POST"
      })

      if (response.ok) {
        toast.success(`Seller ${action}d successfully`)
        fetchData()
      } else {
        toast.error(`Failed to ${action} seller`)
      }
    } catch (error) {
      console.error(`Error ${action}ing seller:`, error)
      toast.error(`Failed to ${action} seller`)
    }
  }

  const handleProductAction = async (productId: string, action: "approve" | "reject") => {
    try {
      const response = await fetch(`/api/admin/products/${productId}/${action}`, {
        method: "POST"
      })

      if (response.ok) {
        toast.success(`Product ${action}d successfully`)
        fetchData()
      } else {
        toast.error(`Failed to ${action} product`)
      }
    } catch (error) {
      console.error(`Error ${action}ing product:`, error)
      toast.error(`Failed to ${action} product`)
    }
  }

  // Show loading state
  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  // Show unauthorized state
  if (status === "unauthenticated" || session?.user?.role !== "ADMIN") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p>Access denied. Admin privileges required.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your marketplace</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Admin Access
              </Badge>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="sellers" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Sellers ({sellers.filter(s => s.status === "PENDING").length})
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              Products ({products.filter(p => p.status === "PENDING").length})
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.totalUsers || 0}</div>
                  <p className="text-xs text-muted-foreground">Registered users</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Sellers</CardTitle>
                  <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.totalSellers || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats?.pendingSellers || 0} pending approval
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.totalProducts || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats?.pendingProducts || 0} pending approval
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${stats?.totalRevenue || 0}</div>
                  <p className="text-xs text-muted-foreground">Platform earnings</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col items-center justify-center gap-2"
                    onClick={() => setActiveTab("sellers")}
                  >
                    <AlertTriangle className="h-6 w-6 text-orange-500" />
                    <span>Review Sellers</span>
                    <Badge variant="secondary">{sellers.filter(s => s.status === "PENDING").length}</Badge>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col items-center justify-center gap-2"
                    onClick={() => setActiveTab("products")}
                  >
                    <ShoppingBag className="h-6 w-6 text-blue-500" />
                    <span>Review Products</span>
                    <Badge variant="secondary">{products.filter(p => p.status === "PENDING").length}</Badge>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col items-center justify-center gap-2"
                  >
                    <BarChart3 className="h-6 w-6 text-green-500" />
                    <span>View Analytics</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sellers" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Seller Management</h2>
              <Badge variant="outline">
                {sellers.length} total sellers
              </Badge>
            </div>
            
            <div className="grid gap-4">
              {sellers.map((seller) => (
                <Card key={seller.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {seller.shopName}
                          <Badge variant={seller.status === "APPROVED" ? "default" : "secondary"}>
                            {seller.status}
                          </Badge>
                        </CardTitle>
                        <CardDescription>{seller.contactEmail}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(`/shop/${seller.shopUrl}`, '_blank')}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Shop
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{seller.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span>Category: {seller.category}</span>
                      <span>Shop URL: /shop/{seller.shopUrl}</span>
                      <span>Created: {new Date(seller.createdAt).toLocaleDateString()}</span>
                    </div>
                    {seller.status === "PENDING" && (
                      <div className="flex gap-2 mt-4">
                        <Button 
                          size="sm" 
                          onClick={() => handleSellerAction(seller.id, "approve")}
                          className="flex items-center gap-1"
                        >
                          <CheckCircle className="h-4 w-4" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleSellerAction(seller.id, "reject")}
                          className="flex items-center gap-1"
                        >
                          <XCircle className="h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
              {sellers.length === 0 && (
                <Card>
                  <CardContent className="py-8 text-center">
                    <p className="text-muted-foreground">No sellers found</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Product Management</h2>
              <Badge variant="outline">
                {products.length} total products
              </Badge>
            </div>
            
            <div className="grid gap-4">
              {products.map((product) => (
                <Card key={product.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {product.title}
                          <Badge variant={product.status === "APPROVED" ? "default" : "secondary"}>
                            {product.status}
                          </Badge>
                        </CardTitle>
                        <CardDescription>by {product.seller.shopName}</CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">${product.price}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span>Category: {product.category}</span>
                      <span>Created: {new Date(product.createdAt).toLocaleDateString()}</span>
                    </div>
                    {product.status === "PENDING" && (
                      <div className="flex gap-2 mt-4">
                        <Button 
                          size="sm" 
                          onClick={() => handleProductAction(product.id, "approve")}
                          className="flex items-center gap-1"
                        >
                          <CheckCircle className="h-4 w-4" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleProductAction(product.id, "reject")}
                          className="flex items-center gap-1"
                        >
                          <XCircle className="h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
              {products.length === 0 && (
                <Card>
                  <CardContent className="py-8 text-center">
                    <p className="text-muted-foreground">No products found</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>Detailed marketplace analytics and insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Analytics dashboard coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 