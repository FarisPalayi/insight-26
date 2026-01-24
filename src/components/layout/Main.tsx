import type { ReactNode } from "react";

type MainProps = {
  children: ReactNode
}

const Main = ({ children }: MainProps) => {
  return (
    <main className="relative min-h-screen">
      {children}
    </main>
  )
}

export default Main;
