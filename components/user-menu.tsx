"use client"

import { useSession, signOut } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { User, Settings, LogOut, ShoppingBag, Heart } from "lucide-react"

export function UserMenu() {
  const { data: session } = useSession()
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

  if (!currentSession?.user) {
    return null
  }

  const initials = currentSession.user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Avatar className="h-8 w-8 border-2 border-primary/10 hover:border-primary/20 transition-colors">
          <AvatarImage src={currentSession.user.image || ""} alt={currentSession.user.name || ""} />
          <AvatarFallback className="bg-primary/5">{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{currentSession.user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{currentSession.user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/profile")}>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/orders")}>
          <ShoppingBag className="mr-2 h-4 w-4" />
          <span>Orders</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => router.push("/settings")}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* Temporarily disabled sign out */}
        <DropdownMenuItem
          className="text-muted-foreground"
          disabled
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out (Disabled)</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 