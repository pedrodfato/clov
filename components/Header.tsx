'use client'

import { useEffect, useRef, useState } from "react"

export default function Header() {
    const [hidden, setHidden] = useState(false)
    const lastScrollY = useRef(0)

    useEffect(() => {
        lastScrollY.current = window.scrollY

        function handleScroll() {
            const currentScrollY = window.scrollY

            if (currentScrollY <= 0) {
                setHidden(false)
            } else if (currentScrollY > lastScrollY.current) {
                setHidden(true)
            } else if (currentScrollY < lastScrollY.current) {
                setHidden(false)
            }

            lastScrollY.current = currentScrollY
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return(
        <nav className={`fixed top-0 left-0 right-0 z-50 shadow transition-transform duration-300 ${hidden ? "-translate-y-full" : "translate-y-0"}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <h1 className="text-xl font-bold">Clov</h1>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}