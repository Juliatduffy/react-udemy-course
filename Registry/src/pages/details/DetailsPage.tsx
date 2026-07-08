import { useLoaderData } from "react-router-dom";
import type { DetailsLoaderResult } from "./detailsLoader";

export default function DetailsPage() {
  const {details} = useLoaderData() as DetailsLoaderResult ;

  /**
   * TODO display package details:
   * name: string;
    description: string;
    readme: string;
    author: {
        email: string;
        name: string;
    }
    maintainers: {
        email: string;
        name: string;
    }[]
    license: string;
   */
  return (
    <div>
      <div>{details.name} - {details.description}</div>
      <div>License: {details.license}</div>
      <div>Author Email: {details?.author?.email ?? "N/A"}</div>
      <div>Author Name: {details?.author?.name ?? "N/A"}</div>
      <div>Maintainers:</div>
      <div>
        {details.maintainers.map((maintainer : { email: string; name: string }, index : number) => (
          // TODO make list  be numbered with key
          <ul key={index} >
            <li className = "ml-3">{index + 1}. {maintainer.name} - {maintainer.email}</li>
          </ul>
        ))}
      </div>
    </div>
  );
}
