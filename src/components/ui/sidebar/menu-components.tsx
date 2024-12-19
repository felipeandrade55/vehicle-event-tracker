import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"
import { sidebarMenuButtonVariants } from "./variants"
import type { SidebarMenuButtonProps } from "./types"
import { useSidebar } from "./context"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => {
  return (
    <ul
      ref={ref}
      data-sidebar="menu"
      className={cn("flex w-full flex-col gap-1", className)}
      {...props}
    />
  )
})
SidebarMenu.displayName = "SidebarMenu"

export const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => {
  return <li ref={ref} className={cn("w-full", className)} {...props} />
})
SidebarMenuItem.displayName = "SidebarMenuItem"

export const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(
  (
    {
      className,
      asChild = false,
      variant,
      size,
      isActive = false,
      tooltip,
      ...props
    },
    ref
  ) => {
    const { state } = useSidebar()
    const Comp = asChild ? Slot : "button"
    const content = (
      <Comp
        ref={ref}
        data-sidebar="menu-button"
        data-state={state}
        data-active={isActive}
        className={cn(sidebarMenuButtonVariants({ variant, size, className }))}
        {...props}
      />
    )

    if (state === "collapsed" && tooltip) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent
            side="right"
            className="select-none border-none bg-sidebar-foreground/90 text-sidebar font-medium"
            {...(typeof tooltip === "string" ? { children: tooltip } : tooltip)}
          />
        </Tooltip>
      )
    }

    return content
  }
)
SidebarMenuButton.displayName = "SidebarMenuButton"