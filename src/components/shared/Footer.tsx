import Link from "next/link";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa6";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const socials = [
  { href: "https://www.linkedin.com/in/md-shakilhossain/", icon: FaLinkedin },
  { href: "https://github.com/Shakilofficial", icon: FaGithub },
  { href: "https://www.facebook.com/iamshakilhossain", icon: FaFacebook },
  { href: "https://www.instagram.com/shakilhossain75", icon: FaInstagram },
  { href: "https://x.com/creative_shakil", icon: FaTwitter },
];

const importantLinks = [
  { href: "https://shakil-portfolio-dashboard.vercel.app", label: "Dashboard" },
];

const Footer = () => {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-12 text-center md:text-left">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-purple-500">
              About Me
            </h3>
            <p className="text-muted-foreground">
              I am a passionate developer creating innovative web solutions. Let
              &apos;s build something amazing together!
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-purple-500">
              Connect
            </h3>
            <div className="flex justify-center md:justify-start space-x-4">
              {socials?.map(({ href, icon: Icon }, index) => (
                <Link
                  key={index}
                  href={href}
                  className="text-muted-foreground hover:text-purple-500 transition-colors"
                >
                  <Icon size={24} />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-purple-500">
              Important Links
            </h3>
            <div className="flex flex-col space-y-4">
              {importantLinks?.map(({ href, label }, index) => (
                <Link
                  key={index}
                  href={href}
                  className="text-muted-foreground hover:text-purple-500 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-purple-500">
              Stay Updated
            </h3>
            <form className="flex items-center justify-center md:justify-start space-x-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-full"
              />
              <Button className="bg-purple-500 text-white" type="submit">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Md Shakil Hossain. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
