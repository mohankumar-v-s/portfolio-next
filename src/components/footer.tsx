import { Github, Linkedin, Mail } from "lucide-react"

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <p className="text-lg font-bold">
                            Mohan<span className="text-blue-400">Kumar</span>
                        </p>
                        <p className="text-gray-400 text-sm">&copy; {currentYear} Mohankumar. All rights reserved.</p>
                    </div>

                    <div className="flex gap-6">
                        <a
                            href="https://github.com/mohankumar-v-s"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors"
                            aria-label="GitHub"
                        >
                            <Github size={20} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/mohankumar-v-s"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors"
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={20} />
                        </a>
                        <a
                            href="mailto:mohankumarvs.27@gmail.com"
                            className="text-gray-400 hover:text-white transition-colors"
                            aria-label="Email"
                        >
                            <Mail size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
