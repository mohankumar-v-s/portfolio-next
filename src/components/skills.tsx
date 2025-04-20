import { Code, Database, Globe, Layout, Server, Smartphone } from "lucide-react"

const skillCategories = [
    {
        id: "frontend",
        title: "Frontend",
        icon: <Layout className="w-6 h-6 text-blue-600" />,
        skills: ["React", "Next.js", "JavaScript", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "Zustand"],
    },
    {
        id: "backend",
        title: "Backend",
        icon: <Server className="w-6 h-6 text-blue-600" />,
        skills: ["Node.js", "Express", "REST APIs", "JWT", "Authentication", "Authorization"],
    },
    {
        id: "database",
        title: "Database",
        icon: <Database className="w-6 h-6 text-blue-600" />,
        skills: ["MongoDB", "MySQL", "Mongoose", "Sequelize"],
    },
    {
        id: "tools",
        title: "Tools & Deployment",
        icon: <Code className="w-6 h-6 text-blue-600" />,
        skills: ["Git", "GitHub", "Docker", "CI/CD", "AWS", "Digitial Ocean"],
    },
    {
        id: "mobile",
        title: "Mobile",
        icon: <Smartphone className="w-6 h-6 text-blue-600" />,
        skills: ["React Native", "Responsive Design", "Progressive Web Apps"],
    },
    {
        id: "other",
        title: "Other",
        icon: <Globe className="w-6 h-6 text-blue-600" />,
        skills: ["Agile Methodology", "UI/UX Principles", "Testing", "Performance Optimization", "SEO"],
    },
]

export default function Skills() {
    return (
        <section id="skills" className="py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">My Skills</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        I&apos;ve developed a diverse set of skills throughout my career. Here&apos;s an overview of my technical expertise.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skillCategories.map((category) => (
                        <div key={category.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <div className="flex items-center gap-3 mb-4">
                                {category.icon}
                                <h3 className="text-xl font-bold text-gray-800">{category.title}</h3>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {category.skills.map((skill) => (
                                    <span key={skill} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-md text-sm">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
