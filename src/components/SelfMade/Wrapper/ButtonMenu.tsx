import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ButtonMenu = ({ children }: ChildrenType) => (
  <div className="w-fit border-b-glass-border rounded-[var(--border-radius-all)] border-1 flex gap-0.5 overflow-hidden">
    {children}
  </div>
);

const MenuButton = ({ isActive=false, children,...props }: MenuButtonType & ChildrenType & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <Button
      variant={"ghost"}
      className={cn(
        "capitalize rounded-none",
        isActive &&
          "border-b-[var(--accent-purple)] border-b-1 bg-glass-bg rounded-t-sm"
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

export { ButtonMenu, MenuButton };
