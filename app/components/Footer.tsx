"use client";

 
const Footer = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
    return (
        <>
            <div className='bg-transparent pt-10'>
                <footer className="bg-[#16377e] w-full max-w-[1920px] mx-auto text-white pt-8 lg:pt-12 px-4 sm:px-8 md:px-16 lg:px-28 rounded-tl-3xl rounded-tr-3xl overflow-hidden">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-6 gap-8 md:gap-12">
                        
                        <div className="lg:col-span-3">
                            <div className="flex gap-4 md:gap-6 mb-4">
                                <img src="/Kryurin.png" alt="Kryurin Logo" className="h-15 w-15 object-contain" />
                                <img src="/itransco.png" alt="Itransco Logo" className="h-15 w-15 object-contain" />
                                <img src="/west.png" alt="West" className="h-15 w-15 object-contain" />
                                <img src="/cict.png" alt="CICT" className="h-15 w-15 object-contain" />
                            </div>
                            <p className="text-sm/6 text-neutral-300 max-w-96">Itransco System is designed specifically for a Bus Cooperative
                                to streamline operations such as employee access, treasury 
                                management, income tracking, and reporting.</p>

                            <div className="mt-3 flex gap-5 md:gap-6 order-1 md:order-2">
                                <a href="#" className="text-white hover:text-gray-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                                    </svg>
                                </a>
                                <a href="tel:+1234567890" className="text-white hover:text-gray-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 lg:gap-28 items-start">
                            {/* Navigations */}
                            <div>
                                <h3 className="font-medium text-sm mb-4">Navigations</h3>
                                <ul className="space-y-3 text-sm text-neutral-300">
                                    <li>
                                        <button onClick={() => onNavigate("AdminPanel")} className="hover:text-neutral-400">
                                            Home
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={() => onNavigate("MonthlyReport")} className="hover:text-neutral-400">
                                            Treasury
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={() => onNavigate("dailyIncome")} className="hover:text-neutral-400">
                                            Income
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={() => onNavigate("busAttendance")} className="hover:text-neutral-400">
                                            Bus
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-7xl mx-auto mt-12 pt-4 border-t border-neutral-700 flex justify-between items-center">
                        <p className="text-neutral-400 text-sm">© 2026 ITRANSCO</p>
                        <p className='text-sm text-neutral-400'>All right reserved.</p>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-3xl h-full max-h-64 bg-white rounded-full blur-[170px] pointer-events-none"/>
                        <h3 className="text-center font-extrabold leading-[0.7] text-transparent text-[clamp(3rem,15vw,15rem)] [-webkit-text-stroke:1px_white] mt-6" >
                            ITRANSCO
                        </h3>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default Footer;