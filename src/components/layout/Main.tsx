import type { ReactNode } from "react";

type MainProps = {
  children: ReactNode,
  className?: string,
}

const Main = ({ children, className }: MainProps) => {
  return (
    <main className={`relative min-h-screen pb-10 ${className ?? 'pt-32'}`} >
      {children}
    </main >
  )
}

export default Main;
