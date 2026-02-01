import Main from "@/components/layout/Main";
import { Link } from "react-router";

export function Register() {
  return (
    <div className="min-h-screen bg-background dark">
      <Main className="pt-40 px-4 md:px-6 mx-auto flex justify-center">
        <div className="text-center">
          <h1 className="text-foreground text-xl md:text-2xl lg:text-3xl font-bold mb-6">
            <span>Registration</span> <span className="text-gradient">Will be available soon</span>
          </h1>
          <Link to="/" className="text-primary underline hover:text-primary/90">
            Return to Home
          </Link>
        </div>
      </Main>
    </div>
  )
}
