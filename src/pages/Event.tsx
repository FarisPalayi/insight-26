import { useLoaderData, useParams } from "react-router"


export function Event() {
  const event = useLoaderData();

  return (
    <>
      <h1>{event.name}</h1>
      <h2>{event.fancyName}</h2>
      <ul>
        {event.guidelines.map((guideline: string) =>
          <li key={guideline}>{guideline}</li>
        )}
      </ul>
    </>
  )
}
