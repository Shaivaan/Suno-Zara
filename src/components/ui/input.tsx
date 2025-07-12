import * as React from "react"

import { cn } from "@/lib/utils"
import { Search, X } from "lucide-react"
import { Button } from "./button"
import useZustandStore, { init_search_data, init_search_loading } from "@/Zustand/store"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  const {handleSearchScreenData,searchScreenData:{searchQuery}} = useZustandStore();
  const clearInputAndData = ()=>handleSearchScreenData({searchQuery:'',...init_search_data,isLoading:init_search_loading});
  const isSearchEmtpy = React.useMemo(()=>searchQuery.trim().length ===  0,[searchQuery]);
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
      <input
        type={type}
        data-slot="input"
        className={cn(
          "!pl-10 file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-[var(--accent-purple)] focus-visible:ring-[var(--accent-purple)]focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />
      {!isSearchEmtpy && <Button className="absolute rounded-[50%] !p-[0.5rem] right-3 top-1/2 -translate-y-1/2 cursor-pointer" variant={'ghost'} onClick={clearInputAndData}>
          <X  />
      </Button>}
    </div>
  )
}

export { Input }
