import { ArrowUpRight, Github, Twitter, Linkedin, Instagram, Heart } from 'lucide-react'

const footerLinks = {
  services: [
    { label: 'Web Development', href: '#services' },
    { label: 'App Development', href: '#services' },
    { label: 'Blockchain', href: '#services' },
    { label: 'UI/UX Design', href: '#services' }
  ],
  company: [
    { label: 'About Us', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' }
  ],
  social: [
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' }
  ]
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-obsidian border-t border-white/[0.05]">
      <div className="container-wide py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <a href="#hero" className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center">
                <span className="font-display font-bold text-void text-xl">A</span>
              </div>
              <span className="font-display font-semibold text-2xl text-ivory">
                Aestrix
              </span>
            </a>
            <p className="font-body text-silver mb-6 max-w-xs">
              Premium software development agency crafting digital products that scale and deliver results.
            </p>
            <div className="flex items-center gap-3">
              {footerLinks.social.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-silver hover:text-accent-400 hover:border-accent-500/30 transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-ivory mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-silver hover:text-accent-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-ivory mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-silver hover:text-accent-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-ivory mb-4">Start a Project</h4>
            <p className="font-body text-sm text-silver mb-4">
              Ready to bring your ideas to life? Let's talk.
            </p>
            <a
              href="https://calendly.com/dannydotdev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-accent-400 to-accent-500 text-void font-medium text-sm hover:shadow-[0_0_20px_rgba(251,191,36,0.3)] transition-all"
            >
              Book a Call
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.05]">
        <div className="container-wide py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-body text-sm text-silver">
              © {currentYear} Aestrix. All rights reserved.
            </p>
            <p className="font-body text-sm text-silver flex items-center gap-1.5">
              Crafted with <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> by Aestrix Devs
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
