import { Link } from "react-router";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const LogoLink = ({ className }: ButtonProps) => {
  return (
    <Link to="/" className={`flex items-center group align-center ${className}`}>
      <div className="btn relative w-14 h-14 flex items-center justify-center">
        <img src="./logo-rotated.png" alt="insight'26" className="w-full" />
      </div>
      <span className="font-bold text-xl tracking-tight text-foreground ml-[-5px]">
        INSIGHT<span className="text-primary">'26</span>
      </span>
    </Link >
  )
}
