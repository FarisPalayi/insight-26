import * as React from "react"
import { motion, type HTMLMotionProps } from "framer-motion"
import { Button, type ButtonProps } from "@/components/ui/button"

// omitted 'color' because it can conflict between React types and Motion types
type MotionButtonProps = Omit<HTMLMotionProps<"button">, keyof ButtonProps> & ButtonProps

const MotionButton = motion.create(
  React.forwardRef<HTMLButtonElement, MotionButtonProps>(
    ({ className, variant, size, ...props }, ref) => {
      return (
        <Button
          ref={ref}
          variant={variant}
          size={size}
          className={className}
          {...props}
        />
      )
    }
  )
)

MotionButton.displayName = "MotionButton"

export { MotionButton }
