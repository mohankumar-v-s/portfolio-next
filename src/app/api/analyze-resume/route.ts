import { NextRequest, NextResponse } from "next/server"

// Mock LLM analysis function - in production, replace with actual LLM API call
async function mockLLMAnalysis(resumeText: string, systemPrompt: string): Promise<{
    analysis: string
    suggestions: string[]
}> {
    // This is a mock implementation. In production, you would:
    // 1. Call a real LLM API (OpenAI, Anthropic, Mistral, etc.)
    // 2. Pass the resume text and system prompt
    // 3. Get the analysis response
    
    // For now, we'll provide a mock analysis based on the resume content
    
    // Extract some basic info from the resume
    const wordCount = resumeText.split(/\s+/).length
    const lineCount = resumeText.split(/\n/).length
    
    // Check for common resume sections
    const hasExperience = resumeText.toLowerCase().includes("experience") || 
                         resumeText.toLowerCase().includes("work history")
    const hasEducation = resumeText.toLowerCase().includes("education")
    const hasSkills = resumeText.toLowerCase().includes("skills")
    const hasContact = resumeText.toLowerCase().includes("phone") || 
                       resumeText.toLowerCase().includes("email") ||
                       resumeText.toLowerCase().includes("contact")
    const hasSummary = resumeText.toLowerCase().includes("summary") || 
                       resumeText.toLowerCase().includes("objective")
    
    // Generate mock analysis
    const analysis = `## Resume Analysis Report

### Overall Assessment
This resume appears to be ${wordCount > 500 ? "comprehensive" : wordCount > 200 ? "adequate in length" : "brief"} with approximately ${wordCount} words across ${lineCount} lines.

### Section Analysis
- **Contact Information**: ${hasContact ? "✓ Present" : "✗ Missing - Add your phone, email, and LinkedIn"}
- **Professional Summary**: ${hasSummary ? "✓ Present" : "✗ Missing - Consider adding a 2-3 sentence summary"}
- **Work Experience**: ${hasExperience ? "✓ Present" : "✗ Missing - Add your work history with bullet points"}
- **Education**: ${hasEducation ? "✓ Present" : "✗ Missing - Include your educational background"}
- **Skills**: ${hasSkills ? "✓ Present" : "✗ Missing - List your technical and soft skills"}

### Strengths
- Resume is ${wordCount > 200 ? "detailed enough" : "concise"} for initial review
- ${hasExperience ? "Work experience section is present" : ""}
- ${hasEducation ? "Education background is included" : ""}

### Areas for Improvement
- Consider adding quantifiable achievements (e.g., "Increased sales by 30%")
- Use action verbs to start each bullet point (e.g., "Developed", "Led", "Implemented")
- Ensure consistent formatting throughout the document
- Add specific technologies and tools used in each role`

    const suggestions = [
        "Add a professional summary at the top highlighting your key qualifications",
        "Use bullet points instead of paragraphs for better readability",
        "Include specific achievements with metrics (e.g., 'Reduced costs by $10K')",
        "Add a skills section with relevant technical and soft skills",
        "Ensure all dates are consistent and in the same format",
        "Use a clean, professional font and maintain consistent spacing",
        "Tailor your resume to the job description using keywords from the posting",
        "Keep the resume to 1-2 pages maximum",
        "Add your LinkedIn profile and GitHub portfolio links",
        "Include any relevant certifications or training"
    ].filter(s => {
        // Filter suggestions based on what's missing
        if (!hasContact && s.includes("LinkedIn")) return true
        if (!hasSummary && s.includes("summary")) return true
        if (!hasSkills && s.includes("skills")) return true
        if (!hasExperience && s.includes("achievements")) return true
        if (!hasEducation && s.includes("education")) return true
        return Math.random() > 0.3 // Randomly include some suggestions
    })

    return { analysis, suggestions }
}

// In production, you would use this function instead
/*
async function callRealLLM(resumeText: string, systemPrompt: string, apiKey: string): Promise<{
    analysis: string
    suggestions: string[]
}> {
    // Example using Mistral API
    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "mistral-medium",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: `Please analyze this resume:\n\n${resumeText}` }
            ],
            temperature: 0.7,
            max_tokens: 2000
        })
    })
    
    const data = await response.json()
    const analysis = data.choices[0].message.content
    
    // Parse the analysis to extract suggestions
    // This would depend on your prompt engineering
    return { analysis, suggestions: [] }
}
*/

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { resumeText, systemPrompt, userPrompt } = body
        
        if (!resumeText) {
            return NextResponse.json(
                { error: "Resume text is required" },
                { status: 400 }
            )
        }

        if (!systemPrompt) {
            return NextResponse.json(
                { error: "System prompt is required" },
                { status: 400 }
            )
        }

        // Validate resume text length
        if (resumeText.length < 50) {
            return NextResponse.json(
                { error: "Resume text is too short. Please upload a valid resume." },
                { status: 400 }
            )
        }

        // In production, you would call a real LLM API here
        // For now, we'll use the mock function
        const result = await mockLLMAnalysis(resumeText, systemPrompt)
        
        // In production, uncomment the following and replace with your actual API call:
        // const apiKey = process.env.LLM_API_KEY
        // if (!apiKey) {
        //     return NextResponse.json(
        //         { error: "LLM API key is not configured" },
        //         { status: 500 }
        //     )
        // }
        // const result = await callRealLLM(resumeText, systemPrompt, apiKey)

        return NextResponse.json({
            success: true,
            analysis: result.analysis,
            suggestions: result.suggestions
        })

    } catch (error) {
        console.error("Error analyzing resume:", error)
        return NextResponse.json(
            { error: "Failed to analyze resume. Please try again later." },
            { status: 500 }
        )
    }
}

// Handle GET requests (for testing)
export async function GET() {
    return NextResponse.json({
        message: "Resume analysis API endpoint. Use POST to analyze a resume.",
        methods: ["POST"]
    })
}
