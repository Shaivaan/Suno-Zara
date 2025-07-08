import { toast } from "sonner";
import { toastMessages } from "@/lib/utils";

const {favourited,unfavourited} = toastMessages;
const useToast=()=>{
  const triggerMessage = (message : string,type : 'success' | 'error' = 'success') => toast[type](message)
  const triggerFlagMessage = (isLiked:boolean)=>{
    const message = !isLiked ? favourited : unfavourited;
    triggerMessage(message);
  }
  return {triggerMessage, triggerFlagMessage};
}

export default useToast;