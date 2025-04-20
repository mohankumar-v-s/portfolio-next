import { Briefcase } from "lucide-react"

const experiences = [
    {
        id: 1,
        title: "Product Developer",
        company: "7Eagles",
        period: "Nov 2023 - Present",
        description: [
            `Engineered an advanced clinic management system, and architected the home, clinic, and doctor web pages leveraging Next.js with SSR to dramatically enhance loading speeds by 40% while improving organic search rankings.`,
            `Created a React-based dynamic dashboard with role-based login for Admin, Doctors, Receptionists, Lab Technicians, and Pharmacy Staff`,
            `Optimized React components using code-splitting and lazy loading techniques, reducing initial load time by 70%.`,
            `Designed a backend API with Express.js and MongoDB, integrating Gallabox API for WhatsApp messaging, Amazon SNS for SMS notifications, and AWS S3 for secure file storage and retrieval`,
            `Managed deployment pipelines by hosting the Next.js frontend on a Ubuntu server, the dashboard on Vercel, and the backend on AWS EC2.`,
            `Developed and deployed a Node.js background image remover API that automates image processing to enhance user productivity.`,
            `Integrated an email service using the Resend API, enhancing communication by automating user email notifications.`,
            `Mentored junior developers and conducted code reviews`,
        ],
    },
    {
        id: 2,
        title: "React Developer Intern",
        company: "7Eagles",
        period: "Sep 2023 - Oct 2023",
        description: [
            `Developed responsive user interfaces using React.js, improved functionality and design, and applied best practices with code-splitting and lazy loading`,
            "Built RESTful APIs using Node.js and Express with Authentication and Authorization",
            `Implemented authentication and authorization workflows with JSON Web Tokens (JWT) to secure API endpoints.`,
            `Collaborated closely with UX/UI designers to ensure optimal front-end performance and aesthetic appeal`,
        ],
    },
    {
        id: 3,
        title: "Web Developer Intern",
        company: "Pepul",
        period: "Mar 2023 - Apr 2023, Jul 2022 - Aug 2022",
        description: [
            `Developed RESTful APIs using Node.js, ensuring seamless integration with front-end applications and efficient data retrieval and manipulation`,
            `Implemented version control systems (Git) to manage codebase and facilitate collaboration among team members.`,
            `Implemented Password Encryption technique using Express.js with Database Connectivity`,
            `Utilized Sequelize to secure data as objects, preventing SQL injection.`,
            `Translated wireframes and mockups into engaging, responsive user interfaces to enhance user engagement and experience`
        ],
    },
]

export default function Experience() {
    return (
        <section id="experience" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12 cursor-pointer">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Work Experience</h2>
                    <p className="text-gray-600 max-w-3xl mx-auto">
                        My professional journey as a developer, showcasing my growth and the valuable experience I&apos;ve gained.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto">
                    {experiences.map((exp, index) => (
                        <div key={exp.id} className="relative pl-8 pb-12 last:pb-0">
                            {/* Timeline line */}
                            {index < experiences.length - 1 && (
                                <div className="absolute left-4 top-0 h-full w-0.5 bg-blue-200 transform -translate-x-1/2"></div>
                            )}

                            {/* Timeline dot */}
                            <div className="absolute left-4 top-0 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center transform -translate-x-1/2">
                                <Briefcase className="w-4 h-4 text-white" />
                            </div>

                            {/* Content */}
                            <div className="bg-white p-6 rounded-lg shadow-md ml-4 cursor-pointer">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                                    <h3 className="text-xl font-bold text-gray-800">{exp.title}</h3>
                                    <span className="text-blue-600 font-medium">{exp.period}</span>
                                </div>
                                <p className="text-gray-700 font-medium mb-2">{exp.company}</p>
                                <ul className="list-disc space-y-2 text-gray-600 px-2">
                                    {exp.description.map((item, i) => (
                                        <li key={i}>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
