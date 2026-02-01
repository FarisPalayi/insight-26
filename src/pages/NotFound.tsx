import Main from "@/components/layout/Main";
import { Link } from "react-router";

export function NotFound() {
  return (
    <Main className="bg-background pt-40 px-4 md:px-6 mx-auto flex justify-center">
      <div className="text-center">
        <h1 className="text-foreground text-2xl md:text-3xl lg:text-5xl font-bold mb-6">
          <span>404</span> <span className="text-gradient">Not Found</span>
        </h1>
        <Link to="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </Link>
      </div>
    </Main>
  )
}
