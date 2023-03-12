import Link from "next/link"
import { useAppSelector } from "../src/redux/hooks"
import { useAuth } from "./AuthContext"
import { colorHeader } from "./theme"

const Header = () => {
  const theme = useAppSelector((s) => s.ui.theme)
  return (
    <header className={`container-header ${colorHeader(theme)}`}>
      <Nav theme={theme} />
    </header>
  )
}

const Nav = ({ theme }: { theme: "default" | "discord" }) => {
  const { currentUser } = useAuth()
  let paths = [
    { name: "index", value: "" },
    { name: "quiz", value: "quiz" },
    { name: "dashboard", value: "dashboard" },
  ]

  return (
    <nav aria-details={`primary-navigation`}>
      <ul className={`container-nav-ul ${colorHeader(theme)}`}>
        {paths.sort().map(({ name, value }, i) => (
          <li key={i}>
            <Link href={`/${value}`} passHref>
              <a
                className={`${
                  currentUser === null && "opacity-0 pointer-events-none"
                } link`}
              >
                {name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Header
