import { getFeaturedPackages } from "../../api/queries/getFeaturedPackages";
import type { PackageDetails } from "../../api/types/packageDetails";

export interface HomeLoaderData {
    featuredPackages: PackageDetails[];
}

export async function homeLoader() {
    const featuredPackages = await getFeaturedPackages();
    return { featuredPackages };
}