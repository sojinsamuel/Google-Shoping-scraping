import Link from "next/link";

import { PageResult } from "@/typings";

type Props = {
  results: PageResult[];
  term: string;
};

function ResultsList({ results, term }: Props) {
  //   console.log("________________");

  console.log("Result List", results);

  return (
    <div>
      {/* Sidebar */}
      <div>
        {/* Each page */}
        {results.map((pageResult) => (
          <div key={pageResult.job_id} className="space-y-2">
            {pageResult.content.results.filters?.map((filter) => (
              <div key={pageResult.created_at}>
                <p>{filter.name}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* main body */}
    </div>
  );
}

export default ResultsList;
