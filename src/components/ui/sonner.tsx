import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
const sonnerDuration = 1500;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      position="top-right"
      expand={false}
      closeButton
      theme={theme as ToasterProps["theme"]}
      className="custom-toast"
      duration={sonnerDuration}
      style={
        {
          "--normal-bg": "var(--gradient-bg-gen)",
          "--normal-text": "var(--text-gen-color)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
