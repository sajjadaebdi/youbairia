"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const categories = [
  { value: "all", label: "All Categories" },
  { value: "templates", label: "Templates" },
  { value: "graphics", label: "Graphics" },
  { value: "software", label: "Software" },
  { value: "ebooks", label: "E-books" },
  { value: "photography", label: "Photography" },
  { value: "video", label: "Video" },
  { value: "audio", label: "Audio" },
  { value: "marketing", label: "Marketing" },
  { value: "design", label: "Design" },
]

export default function CategoryFilter() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("all")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
          {value ? categories.find((category) => category.value === value)?.label : "Select category..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category.value}
                  value={category.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === category.value ? "opacity-100" : "opacity-0")} />
                  {category.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
