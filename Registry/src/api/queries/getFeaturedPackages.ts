import type { PackageDetails } from "../types/packageDetails";

const FEATURED_PACKAGES = [
    'react',
    'esbuild',
    'typescript',
    'vite',
    'eslint',
    'prettier',
]

export async function getFeaturedPackages() {
    const promises = FEATURED_PACKAGES.map(async (pkg) => {
        const response = await fetch(`https://registry.npmjs.org/${pkg}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch package details for ${pkg}`);
        }
        return await response.json();
    });
    return await Promise.all(promises) as PackageDetails[];
}