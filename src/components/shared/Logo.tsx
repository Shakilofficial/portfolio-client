import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className={cn("flex items-center space-x-2")}>
      <div className="relative w-[110px] h-[40px]">
        <Image
          src={logo}
          alt="Logo"
          sizes="40"
          fill
          className="object-contain"
        />
      </div>
    </Link>
  );
};

export default Logo;
