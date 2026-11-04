"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "primary" | "glass" | "outline";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    const variants = {
      primary: "bg-emerald-600 text-white hover:bg-emerald-500 shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)]",
      glass: "bg-white/5 border border-white/10 text-white backdrop-blur-md hover:bg-white/10",
      outline: "border-2 border-emerald-500 text-emerald-400 hover:bg-emerald-500/10"
    };

    return (
      <motion.div 
        whileHover={{ scale: 1.02 }} 
        whileTap={{ scale: 0.97 }}
        className="inline-block w-full sm:w-auto"
      >
        <Comp
          className={cn(
            "inline-flex items-center justify-center w-full whitespace-nowrap rounded-2xl text-lg font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:pointer-events-none disabled:opacity-50 px-8 py-4",
            variants[variant],
            className
          )}
          ref={ref}
          {...props}
        />
      </motion.div>
    );
  }
);
Button.displayName = "Button";

export { Button };