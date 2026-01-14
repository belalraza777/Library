// Footer.jsx - Compact Centered Footer

const footerLinks = [
  { href: "/about", label: "About", icon: "fas fa-info-circle" },
  { href: "/contact", label: "Contact", icon: "fas fa-envelope" },
  { href: "/faq", label: "FAQ", icon: "fas fa-question-circle" },
];

export default function Footer() {
  return (
    <footer
      className="bg-gray-900 text-gray-300 mt-10 px-6 py-6 shadow-inner"
      role="contentinfo"
      aria-label="Footer"
    >
      <div className="max-w-5xl mx-auto text-center space-y-4">
        
        {/* Brand Section */}
        <div>
          <h2 className="text-white text-xl font-bold flex items-center justify-center">
            <i className="fas fa-book mr-2 text-indigo-400"></i> 
            Library Management System
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Manage. Organize. Learn.
          </p>
        </div>

        {/* Navigation Links */}
        <nav aria-label="Quick Links">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs">
            {footerLinks.map(({ href, label, icon }) => (
              <li key={href}>
                <a
                  href={href}
                  className="hover:text-white hover:scale-105 transition transform duration-200 ease-in-out flex items-center justify-center"
                >
                  <i className={`${icon} mr-1`}></i> {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Section */}
        <div className="text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Library Management. All rights reserved.</p>
          <p className="flex items-center justify-center">
            Made with{" "}
            <i className="fas fa-heart mx-1 text-red-500 animate-pulse"></i> by{" "}
            <span className="text-white font-semibold ml-1">Belal</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
