import type { ReactNode } from "react";

type MainProps = {
  children: ReactNode,
  className?: string,
}

const Main = ({ children, className }: MainProps) => {
  return (
    <main className={`relative pb-20 md:pb-32 ${className ?? 'pt-32'}`} >
      {children}
    </main >
  )
}

export default Main;
