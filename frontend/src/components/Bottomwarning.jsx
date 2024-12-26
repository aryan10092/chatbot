import { Link } from "react-router-dom";

export function Bottomwarning({label,text,to}) {
    return(
<div className="py-2 text-sm flex justify-center">
<div>{label}</div>
<Link className="pointer underline pt-1 cursor-pointer " to={to}>
     {text}</Link>
    </div>

    )
}