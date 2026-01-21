import { useLoaderData } from "react-router"
import type { EventData } from "../types";

export function Event() {
  const event: EventData = useLoaderData();

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
