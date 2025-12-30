import { Button } from "@/components/ui/button"
import { Link, useLocation } from "react-router-dom"

export default function Navbar() {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200/60 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex h-18 items-center justify-between px-6">

        {/* Logo */}
        <Link to="/" className="group flex items-center gap-2">
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-2xl font-extrabold text-transparent transition-all duration-300 group-hover:opacity-80">
            MyWebsite
          </span>
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-1">
          {[
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
            { name: "Products", path: "/products" },
            { name: "Services", path: "/services" },
          ].map((item) => {
            const active = isActive(item.path)

            return (
              <Link key={item.path} to={item.path} className="group">
                <Button
                  variant="ghost"
                  className={`
                    relative px-5 py-2 text-sm font-semibold transition-all duration-300
                    ${
                      active
                        ? "text-blue-600"
                        : "text-gray-600 hover:text-blue-600"
                    }
                    hover:-translate-y-[1px] hover:bg-blue-50/60
                  `}
                >
                  {item.name}

                  {/* Active dot */}
                  <span
                    className={`
                      absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-blue-600 transition-all duration-300
                      ${active ? "opacity-100 scale-100" : "opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100"}
                    `}
                  />

                  {/* Glow underline */}
                  <span
                    className={`
                      absolute bottom-0 left-1/2 h-[2px] w-8 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300
                      ${active ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
                    `}
                  />
                </Button>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
