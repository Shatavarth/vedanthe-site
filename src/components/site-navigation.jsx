import { Link } from 'react-router-dom'
import {
  MotionNavigationMenu,
  MotionNavigationMenuContent,
  MotionNavigationMenuItem,
  MotionNavigationMenuLink,
  MotionNavigationMenuList,
  MotionNavigationMenuTrigger,
} from './ui/motion-navigation-menu'

const triggerClassName =
  'text-ivory/85 hover:text-gold focus:text-gold data-[state=open]:text-gold px-3'

const highlightOnDark = 'bg-accent-on-dark rounded-md'

const SHOP_COLLECTIONS = [
  {
    name: 'Sala da Pranzo',
    desc: 'The Dining Room Edit — wine, old leather',
    image: '/products/essentials-for-her.png',
    to: '/collections/woman',
  },
  {
    name: 'La Biblioteca',
    desc: 'The Library Edit — ink, smoke',
    image: '/products/essentials-for-him.png',
    to: '/collections/man',
  },
  {
    name: 'La Serra',
    desc: 'The Conservatory Edit — linen, marble',
    image: '/products/essentials-for-all.png',
    to: '/collections/unisex',
  },
]

function SiteNavigation() {
  return (
    <MotionNavigationMenu
      viewportClassName="bg-background border-border rounded-md shadow-lg"
    >
      <MotionNavigationMenuList highlightClassName={highlightOnDark}>
        <MotionNavigationMenuItem>
          <MotionNavigationMenuLink as={Link} to="/" className={triggerClassName}>
            Home
          </MotionNavigationMenuLink>
        </MotionNavigationMenuItem>

        <MotionNavigationMenuItem>
          <MotionNavigationMenuLink as={Link} to="/about" className={triggerClassName}>
            About
          </MotionNavigationMenuLink>
        </MotionNavigationMenuItem>

        <MotionNavigationMenuItem value="shop">
          <MotionNavigationMenuTrigger className={triggerClassName}>
            Shop
          </MotionNavigationMenuTrigger>
          <MotionNavigationMenuContent highlightClassName="bg-accent rounded-sm">
            <div className="grid w-[440px] grid-cols-[1fr_1.2fr] gap-2">
              <MotionNavigationMenuLink
                as={Link}
                to="/shop"
                className="bg-ivory flex min-h-40 flex-col justify-between rounded-md p-3"
              >
                <img
                  src="/products/bold-confession-bottle.jpg"
                  alt="Vedanthè Vandelle bottle"
                  className="h-20 w-20 rounded object-contain"
                />
                <span className="space-y-0.5">
                  <span className="text-ink block text-sm font-medium">
                    Shop All
                  </span>
                  <span className="text-taupe block text-xs">
                    Every scent, one villa
                  </span>
                </span>
              </MotionNavigationMenuLink>
              <div className="grid grid-cols-1 gap-0.5">
                {SHOP_COLLECTIONS.map((item) => (
                  <MotionNavigationMenuLink
                    key={item.name}
                    as={Link}
                    to={item.to}
                    className="text-ink hover:text-maroon focus:text-maroon flex-row items-center gap-3"
                  >
                    <img
                      src={item.image}
                      alt=""
                      aria-hidden="true"
                      className="h-9 w-9 flex-shrink-0 rounded object-contain"
                    />
                    <span className="flex flex-col gap-0.5">
                      <span className="font-serif text-sm font-medium">
                        {item.name}
                      </span>
                      <span className="text-taupe text-xs">{item.desc}</span>
                    </span>
                  </MotionNavigationMenuLink>
                ))}
              </div>
            </div>
          </MotionNavigationMenuContent>
        </MotionNavigationMenuItem>

        <MotionNavigationMenuItem>
          <MotionNavigationMenuLink as={Link} to="/contact" className={triggerClassName}>
            Contact
          </MotionNavigationMenuLink>
        </MotionNavigationMenuItem>
      </MotionNavigationMenuList>
    </MotionNavigationMenu>
  )
}

export default SiteNavigation
