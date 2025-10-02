"use client"
import React, { useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button'

type Props = {
  title: string,
  description: string,
  trigger?: string | React.ReactNode
  action_name?: string,
  action_function: () => void,
  cancel_name?: string,
  type?: "destructive" | "default",
}

export default function DialogLayout({ title, description, trigger = "open", action_name = "submit", action_function, cancel_name = "cancel", type = "default" }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const handleSubmit = async() => {
    await action_function()
    setIsOpen(false)
  }
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="destructive" size="sm">
            {trigger}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              {description}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">{cancel_name}</Button>
            </DialogClose>
            <Button type="submit" variant={type === "destructive" ? "destructive" : "default"}>{action_name}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}