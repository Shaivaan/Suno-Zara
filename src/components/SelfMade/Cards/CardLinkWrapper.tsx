import { memo } from "react";
import { Link } from "react-router-dom";

interface CardLinkWrapperType{
    navigateTo?:string | null
    children:React.ReactNode
}
const CardLinkWrapperComp = ({navigateTo,children}:CardLinkWrapperType)=>{
    if(navigateTo) return <Link to={navigateTo}>{children}</Link>
    return <>{children}</>
}

const CardLinkWrapper = memo(CardLinkWrapperComp);
export default CardLinkWrapper;