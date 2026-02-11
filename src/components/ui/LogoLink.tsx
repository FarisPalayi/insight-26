import { Link } from "react-router";
import logo from "@/assets/logo-min-new.png";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const LogoLink = ({ className }: ButtonProps) => {
  return (
    <Link to="/" className={`flex items-center group align-center ${className ?? ""}`}>
      <div className="btn relative w-14 h-14 flex items-center justify-center">
        <img
          src={logo}
          alt="insight'26"
          className="w-full select-none"
          draggable={false}
        />
      </div>

      <span className="font-bold text-xl tracking-tight text-foreground ml-[-5px]">
        INSIGHT<span className="text-primary">'26</span>
      </span>
    </Link>
  );
};
