"use client";

const Footer = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
    const navLinks = [
        { label: "Home", page: "AdminPanel" },
        { label: "Treasury", page: "MonthlyReport" },
        { label: "Income", page: "dailyIncome" },
        { label: "Bus", page: "busAttendance" },
    ];

    const legalLinks = ["Privacy Policy", "Terms of Use", "Data Policy"];

    return (
        <div className="bg-transparent pt-10">
            <footer className="bg-[#16377e] w-full max-w-[1920px] mx-auto text-white pt-14 px-6 sm:px-10 md:px-16 lg:px-28 rounded-tl-3xl rounded-tr-3xl overflow-hidden">

                {/* Top section */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 pb-12 border-b border-white/10">

                    {/* Brand column */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/15">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="2" y="7" width="20" height="12" rx="3" stroke="white" strokeWidth="2"/>
                                    <path d="M7 7V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" stroke="white" strokeWidth="2"/>
                                    <circle cx="7.5" cy="19" r="2" fill="white"/>
                                    <circle cx="16.5" cy="19" r="2" fill="white"/>
                                    <path d="M2 12h20" stroke="white" strokeWidth="1.5" strokeDasharray="3 2"/>
                                </svg>
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="font-black tracking-[0.18em] text-lg">ITRANSCO</span>
                                <span className="text-[9px] tracking-[0.25em] uppercase text-white/50 font-medium">Bus Cooperative System</span>
                            </div>
                        </div>

                        <p className="text-sm/6 text-white/55 max-w-sm mb-7">
                            Designed specifically for Bus Cooperatives to streamline operations — 
                            from employee access and treasury management to income tracking and reporting.
                        </p>

                        {/* Partner logos */}
                        <div className="flex items-center gap-4 mb-7">
                            {["Kryurin", "Itransco", "West", "CICT"].map((name) => (
                                <div key={name} className="w-11 h-11 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center">
                                    <span className="text-[8px] font-bold text-white/40 tracking-wider">{name.slice(0, 3).toUpperCase()}</span>
                                </div>
                            ))}
                        </div>

                        {/* Social */}
                        <div className="flex gap-3">
                            <a href="#" className="w-9 h-9 rounded-lg bg-white/8 border border-white/10 hover:bg-white/15 hover:border-white/25 transition-all duration-200 flex items-center justify-center text-white/70 hover:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                                </svg>
                            </a>
                            <a href="tel:+1234567890" className="w-9 h-9 rounded-lg bg-white/8 border border-white/10 hover:bg-white/15 hover:border-white/25 transition-all duration-200 flex items-center justify-center text-white/70 hover:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                                </svg>
                            </a>
                            <a href="mailto:info@itransco.ph" className="w-9 h-9 rounded-lg bg-white/8 border border-white/10 hover:bg-white/15 hover:border-white/25 transition-all duration-200 flex items-center justify-center text-white/70 hover:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Links grid */}
                    <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">

                        {/* Navigation */}
                        <div>
                            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-white/40 mb-5">Navigation</h3>
                            <ul className="space-y-3">
                                {navLinks.map((link) => (
                                    <li key={link.page}>
                                        <button
                                            onClick={() => onNavigate(link.page)}
                                            className="text-sm text-white/65 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                                        >
                                            <span className="w-0 h-px bg-amber-400 group-hover:w-3 transition-all duration-200" />
                                            {link.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* System */}
                        <div>
                            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-white/40 mb-5">System</h3>
                            <ul className="space-y-3">
                                {["Employee Access", "Bus Tracking", "Remittance", "Reports", "Analytics"].map((item) => (
                                    <li key={item}>
                                        <span className="text-sm text-white/65 hover:text-white transition-colors duration-200 cursor-pointer flex items-center gap-2 group">
                                            <span className="w-0 h-px bg-amber-400 group-hover:w-3 transition-all duration-200" />
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-white/40 mb-5">Contact</h3>
                            <ul className="space-y-3 text-sm text-white/55">
                                <li className="leading-relaxed">Cebu City, Philippines</li>
                                <li>info@itransco.ph</li>
                                <li>+63 (32) 123 4567</li>
                                <li className="pt-2">
                                    <span className="inline-flex items-center gap-1.5 text-xs bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 rounded-full px-2.5 py-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                        System Online
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom section */}
                <div className="max-w-7xl mx-auto py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
                    <p className="text-white/35 text-xs tracking-wide">© 2026 ITRANSCO. All rights reserved.</p>
                    <div className="flex items-center gap-5">
                        {legalLinks.map((item) => (
                            <a key={item} href="#" className="text-xs text-white/35 hover:text-white/65 transition-colors">{item}</a>
                        ))}
                    </div>
                </div>

                {/* Wordmark */}
                <div className="relative">
                    <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-3xl h-full max-h-64 bg-white/5 rounded-full blur-[170px] pointer-events-none" />
                    <h3 className="text-center font-extrabold leading-[0.75] text-transparent text-[clamp(3rem,14vw,14rem)] [-webkit-text-stroke:1px_rgba(255,255,255,0.12)] mt-4 select-none">
                        ITRANSCO
                    </h3>
                </div>
            </footer>
        </div>
    );
};

export default Footer;