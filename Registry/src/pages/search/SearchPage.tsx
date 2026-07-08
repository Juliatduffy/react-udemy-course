import { useLoaderData } from "react-router-dom";
import type { SearchLoaderResult } from "./searchLoader";
import PackageListItem from '../../components/PackageListItem';

export default function SearchPage() {

  const { searchResults } = useLoaderData() as SearchLoaderResult;

  // TODO add gap between
  const renderedResults = searchResults.map((pkg) => (
      <PackageListItem key={pkg.name} pkg={pkg} />
  ));


  return <div>
    <h1 className="text-2xl font-bold my-6">Search Results</h1>
    <div className="space-y-4 mt-4 gap-4">
    {renderedResults}
    </div>
    </div>;
}
