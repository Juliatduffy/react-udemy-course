import type { PackageSummary } from "../api/types/packageSummary";
import { Link } from "react-router-dom";

interface PackageListItemProps {
    pkg: PackageSummary;
}

export default function PackageListItem({ pkg }: PackageListItemProps) {
    
    const renderedKeywords = (pkg.keywords || []).map((keyword) => (
        <span key={keyword} className="border py-0.5 px-1 text-xs bg-slate-200 rounded">
            {keyword}
        </span>
    ));
    
    return (
        <div className =" border p-4 rounded flex justify-between items-center">
            <div className="flex flex-col gap-2">
                <Link to={`/packages/${pkg.name}`} className="text-xl font-bold">
                    {pkg.name}
                </Link>
            </div>
        <p className=" text-sm text-gray-500">{pkg.description}</p>
       <div className="flex gap-1">
       {renderedKeywords}
       </div>
       <div className="mr-6">
        <Link className="py-2 px-3 rounded bg-black text-white text-lg" to={`/packages/${pkg.name}`}>View</Link>
       </div>
        </div>
    );
}   