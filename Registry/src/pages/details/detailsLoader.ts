import { getPackage } from "../../api/queries/getPackage";
import type {Params} from 'react-router-dom';
import type { PackageDetails } from "../../api/types/packageDetails";

export async function detailsLoader({params} : {params: Params<string>}) : Promise<DetailsLoaderResult> {
    const { name } = params;
    if (!name) {
        throw new Error("Package name is required");
    }
    const data = await getPackage(name);
    return { details: data } as DetailsLoaderResult;
}

export interface DetailsLoaderResult{
    details: PackageDetails;
}