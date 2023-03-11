import Link from "next/link"

const Header = () => {
  return (
    <header className="container-header">
      <Nav />
    </header>
  )
}

const Nav = () => {
  let paths = [
    { name: "index", value: "" },
    { name: "write", value: "write" },
    { name: "quiz", value: "quiz" },
    { name: "dashboard", value: "dashboard" },
  ]

  return (
    <nav aria-details="primary-navigation">
      <ul className="container-nav-ul">
        {paths.sort().map(({ name, value }, i) => (
          <li key={i}>
            <Link href={`/${value}`} passHref>
              <a className="link">{name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Header
