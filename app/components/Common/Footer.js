import Link from 'next/link'
import { Facebook, Instagram, Linkedin, MessageCircle } from 'lucide-react'

const navGroups = [
  {
    title: 'Explore',
    links: [
      { label: 'About', href: 'https://onlybees.in/about' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact us', href: 'https://onlybees.in/contact-us' },
      { label: 'Refund', href: 'https://onlybees.in/refunds' },
    ],
  },
]

const socialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/share/19iT9sHj9o/?mibextid=wwXIfr', Icon: Facebook },
  { label: 'Instagram', href: 'https://www.instagram.com/onlybees.in/', Icon: Instagram },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/onlybees/', Icon: Linkedin },
  { label: 'WhatsApp', href: 'https://wa.me/919366313160', Icon: MessageCircle },
]

const Footer = () => {
  return (
    <footer className="bg-background text-foreground  mt-20">
      <div className=" mx-auto px-6 lg:px-10 py-14 flex flex-col gap-12">
        <div className=" border-y-2 border-white py-12 flex flex-col gap-10">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 lg:gap-16">
            <div className="text-4xl md:text-5xl font-extrabold tracking-tight leading-none">ONLYBEES.</div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 lg:gap-16 lg:pt-2">
              {navGroups.map((group) => (
                <div key={group.title} className="flex flex-col gap-4">
                  <h3 className="text-lg font-semibold">{group.title}</h3>
                  <div className="flex flex-col gap-3 text-sm md:text-base text-foreground/80">
                    {group.links.map((link) => (
                      <Link key={link.label} href={link.href} className="hover:text-foreground transition-colors">
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-sm text-foreground/80">Copyright © Onlybees 2025, KL & Sons - ONLYBEES</p>

          <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6">
            <div className="flex items-center gap-4">
              {socialLinks.map(({ label, href, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="group h-10 w-10 rounded-full bg-foreground text-background flex items-center justify-center"
                >
                  <Icon className="h-4.5 w-4.5"/>
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4 text-sm text-foreground/80">
              <Link href="#privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <span className="text-foreground/40">•</span>
              <Link href="#terms" className="hover:text-foreground transition-colors">Terms and Conditions</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer