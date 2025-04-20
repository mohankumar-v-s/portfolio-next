import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Hero() {
    return (
        <section id="about" className="pt-24 pb-16 md:pt-32 md:pb-24">
            <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Hi, I&apos;m <span className="text-blue-600">Mohankumar</span>
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-medium text-gray-700 mb-6">Full-Stack Developer</h2>
                    <p className="text-gray-600 mb-8 text-lg">
                        With 2 years of experience building modern web applications. I specialize in React, Node.js, NextJS, and cloud
                        technologies. Passionate about creating clean, efficient, and user-friendly solutions to complex problems.
                    </p>

                    <div className="flex flex-wrap gap-4 mb-8">
                        <Link
                            href="#projects"
                            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors"
                        >
                            View My Work <ArrowRight size={18} />
                        </Link>
                        {/* <Link
                            href="#contact"
                            className="inline-flex items-center gap-2 border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-md transition-colors"
                        >
                            Contact Me
                        </Link> */}
                    </div>

                    <div className="flex gap-4">
                        <a
                            href="https://github.com/mohankumar-v-s"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-700 hover:text-blue-600 transition-colors"
                        >
                            <Github size={24} />
                            <span className="sr-only">GitHub</span>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/mohankumar-v-s"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-700 hover:text-blue-600 transition-colors"
                        >
                            <Linkedin size={24} />
                            <span className="sr-only">LinkedIn</span>
                        </a>
                        <a href="mailto:mohankumarvs.27@gmail.com" className="text-gray-700 hover:text-blue-600 transition-colors">
                            <Mail size={24} />
                            <span className="sr-only">Email</span>
                        </a>
                    </div>
                </div>

                <div className="order-1 md:order-2 flex justify-center">
                    <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-blue-600">
                        <Image
                            src="/mohankumar.jpeg"
                            alt="Alex Johnson"
                            width={320}
                            height={320}
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
