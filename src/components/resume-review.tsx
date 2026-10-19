"use client"

import { useState, useRef, useCallback } from "react"
import { Upload, FileText, Loader2, CheckCircle, AlertCircle, Sparkles } from "lucide-react"

export default function ResumeReview() {
    const [file, setFile] = useState<File | null>(null)
    const [fileName, setFileName] = useState<string>("")
    const [isUploading, setIsUploading] = useState<boolean>(false)
    const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false)
    const [analysisResult, setAnalysisResult] = useState<string>("")
    const [suggestions, setSuggestions] = useState<string[]>([])
    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<boolean>(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // System prompt for resume analysis
    const SYSTEM_PROMPT = `You are an expert resume reviewer and career coach. Analyze the resume content and provide:
1. Overall assessment of the resume
2. Specific suggestions for improvement in each section
3. Missing elements that should be added
4. Formatting and structure recommendations
5. Actionable tips to make the resume more impactful

Be specific, professional, and constructive. Format your response with clear sections and bullet points.`

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (selectedFile) {
            // Validate file type
            const validTypes = ["application/pdf", "text/plain", "application/msword", 
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
            
            if (!validTypes.includes(selectedFile.type) && !selectedFile.name.match(/\.(pdf|txt|doc|docx)$/i)) {
                setError("Please upload a valid resume file (PDF, TXT, DOC, DOCX)")
                return
            }

            // Validate file size (5MB limit)
            if (selectedFile.size > 5 * 1024 * 1024) {
                setError("File size exceeds 5MB limit")
                return
            }

            setError("")
            setFile(selectedFile)
            setFileName(selectedFile.name)
            setSuccess(false)
            setAnalysisResult("")
            setSuggestions([])
        }
    }, [])

    const parseResumeText = useCallback(async (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            
            reader.onload = (e) => {
                const content = e.target?.result as string
                resolve(content || "")
            }
            
            reader.onerror = () => {
                reject(new Error("Failed to read file"))
            }

            if (file.type === "text/plain" || file.name.match(/\.txt$/i)) {
                reader.readAsText(file)
            } else if (file.type === "application/pdf" || file.name.match(/\.pdf$/i)) {
                // For PDF files, we'll use a simple extraction method
                // In production, you'd use a proper PDF parser library
                reader.readAsText(file)
            } else {
                // For DOC/DOCX, we'd need a proper parser
                // For now, we'll attempt text extraction
                reader.readAsText(file)
            }
        })
    }, [])

    const analyzeResume = useCallback(async () => {
        if (!file) {
            setError("Please upload a resume first")
            return
        }

        try {
            setIsAnalyzing(true)
            setError("")
            setSuccess(false)

            // Parse the resume text
            const resumeText = await parseResumeText(file)
            
            if (!resumeText || resumeText.length < 50) {
                setError("Could not extract sufficient text from the resume. Please upload a text-based resume.")
                setIsAnalyzing(false)
                return
            }

            // Prepare the request payload
            const requestBody = {
                resumeText: resumeText,
                systemPrompt: SYSTEM_PROMPT,
                userPrompt: `Please analyze this resume and provide detailed suggestions for improvement. Be specific about what's good, what needs improvement, and what's missing.`
            }

            // Call the API route
            const response = await fetch("/api/analyze-resume", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || "Failed to analyze resume")
            }

            const data = await response.json()
            
            // Process the response
            setAnalysisResult(data.analysis || "No analysis returned")
            setSuggestions(data.suggestions || [])
            setSuccess(true)

        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to analyze resume. Please try again.")
            setSuccess(false)
        } finally {
            setIsAnalyzing(false)
        }
    }, [file, SYSTEM_PROMPT, parseResumeText])

    const handleUploadClick = useCallback(() => {
        fileInputRef.current?.click()
    }, [])

    const handleRemoveFile = useCallback(() => {
        setFile(null)
        setFileName("")
        setAnalysisResult("")
        setSuggestions([])
        setSuccess(false)
        setError("")
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }, [])

    const triggerFileUpload = useCallback(() => {
        if (file) {
            analyzeResume()
        } else {
            fileInputRef.current?.click()
        }
    }, [file, analyzeResume])

    return (
        <section id="resume-review" className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Resume Review
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Upload your resume and get AI-powered suggestions to improve it. 
                        Our system will analyze your resume and provide actionable feedback.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    {/* Upload Area */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-8 text-center cursor-pointer transition-all hover:border-blue-500 hover:bg-gray-50" onClick={handleUploadClick}>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept=".pdf,.txt,.doc,.docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            className="hidden"
                        />
                        
                        {file ? (
                            <div className="flex flex-col items-center gap-4">
                                <FileText className="text-blue-600" size={48} />
                                <p className="text-gray-700 font-medium">{fileName}</p>
                                <p className="text-sm text-gray-500">
                                    {(file.size / 1024).toFixed(2)} KB
                                </p>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleRemoveFile()
                                    }}
                                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                                >
                                    Remove File
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-4">
                                <Upload className="text-blue-600" size={48} />
                                <p className="text-gray-700 font-medium">
                                    Drag & Drop your resume here or click to browse
                                </p>
                                <p className="text-sm text-gray-500">
                                    Supports: PDF, TXT, DOC, DOCX (Max 5MB)
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6 flex items-center gap-3">
                            <AlertCircle className="text-red-500" size={20} />
                            <p className="text-red-700">{error}</p>
                        </div>
                    )}

                    {/* Success Message */}
                    {success && !isAnalyzing && (
                        <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6 flex items-center gap-3">
                            <CheckCircle className="text-green-500" size={20} />
                            <p className="text-green-700">Resume analyzed successfully!</p>
                        </div>
                    )}

                    {/* Analyze Button */}
                    <div className="flex justify-center mb-8">
                        <button
                            onClick={triggerFileUpload}
                            disabled={isAnalyzing || (!file && isUploading)}
                            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-3 rounded-md transition-colors font-medium"
                        >
                            {isAnalyzing ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Analyzing...
                                </>
                            ) : file ? (
                                <>
                                    <Sparkles size={20} />
                                    Analyze Resume
                                </>
                            ) : (
                                <>
                                    <Upload size={20} />
                                    Upload & Analyze
                                </>
                            )}
                        </button>
                    </div>

                    {/* Analysis Results */}
                    {isAnalyzing && (
                        <div className="bg-gray-50 rounded-lg p-6 mb-6">
                            <div className="flex items-center gap-2 text-blue-600 mb-4">
                                <Loader2 className="animate-spin" size={20} />
                                <span>Analyzing your resume with AI...</span>
                            </div>
                            <p className="text-gray-600 text-sm">
                                This may take a few moments depending on your resume size.
                            </p>
                        </div>
                    )}

                    {analysisResult && (
                        <div className="bg-gray-50 rounded-lg p-6 mb-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Analysis Results</h3>
                            <div className="prose max-w-none text-gray-700">
                                <p className="whitespace-pre-wrap">{analysisResult}</p>
                            </div>
                        </div>
                    )}

                    {suggestions.length > 0 && (
                        <div className="bg-blue-50 rounded-lg p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">
                                Suggested Improvements
                            </h3>
                            <ul className="space-y-3">
                                {suggestions.map((suggestion, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start gap-3 text-gray-700"
                                    >
                                        <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                                        <span>{suggestion}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Instructions */}
                    {!file && !isAnalyzing && (
                        <div className="bg-gray-50 rounded-lg p-6 text-center">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                How it works:
                            </h3>
                            <ol className="text-gray-600 text-left max-w-md mx-auto space-y-1">
                                <li>1. Upload your resume (PDF, DOC, DOCX, or TXT)</li>
                                <li>2. Click "Analyze Resume" button</li>
                                <li>3. AI will analyze your resume content</li>
                                <li>4. Get detailed suggestions for improvement</li>
                            </ol>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
