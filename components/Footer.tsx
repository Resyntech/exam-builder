import Link from "next/link"
import { useAppSelector } from "../src/redux/hooks"
import { colorFooter } from "./theme"

const Footer = () => {
  const theme = useAppSelector((s) => s.ui.theme)
  const socials = [
    { href: "https://www.youtube.com/@realsyntexia", name: "YouTube" },
    { href: "https://www.github.com/resyntech", name: "Github" },
    { href: "https://www.facebook.com/realsyntexia", name: "Facebook" },
    {
      href: "https://www.linkedin.com/in/gian-carlo-carranza-5a6861216/",
      name: "LinkedIn",
    },
  ]
  return (
    <footer
      className={`container-footer sm:bottom-0 sm:absolute sm:inset-x-0 ${colorFooter(
        theme
      )}`}
    >
      <div className="socials">
        {socials.map(({ href, name }) => (
          <Link key={name} href={href} passHref>
            <a className="text-xs" target="_blank">
              {name}
            </a>
          </Link>
        ))}
      </div>
      <p className="text-xs">&copy; 2023</p>
    </footer>
  )
}

export default Footer
