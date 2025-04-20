"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const scrollToSection = (id: string) => {
        setMobileMenuOpen(false)
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <header
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-300",
                isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4",
            )}
        >
            <div className="container mx-auto px-4 flex justify-between items-center p-2">
                <a href="#" className="text-xl font-bold text-gray-800">
                    Mohan<span className="text-blue-600">Kumar</span>
                </a>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-8">
                    {[
                        { name: "About", id: "about" },
                        { name: "Projects", id: "projects" },
                        { name: "Skills", id: "skills" },
                        { name: "Experience", id: "experience" },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className="text-gray-600 hover:text-blue-600 transition-colors"
                        >
                            {item.name}
                        </button>
                    ))}
                </nav>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-gray-800" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white shadow-lg absolute top-full left-0 w-full">
                    <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                        {[
                            { name: "About", id: "about" },
                            { name: "Projects", id: "projects" },
                            { name: "Skills", id: "skills" },
                            { name: "Experience", id: "experience" },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className="text-gray-600 hover:text-blue-600 transition-colors text-left py-2"
                            >
                                {item.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </header>
    )
}
