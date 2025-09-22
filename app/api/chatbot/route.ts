import { NextRequest, NextResponse } from "next/server"

const MODEL_ID = "gemini-1.5-flash"

function buildPrompt(userMessage: string): string {
	return `You are Digital Mandi's helpful AI assistant. Keep answers concise, factual, and relevant to Indian agriculture and the Digital Mandi platform. If a question is unrelated, gently steer the user back to farming, pricing, marketplace usage, logistics, payments, quality, or best practices.

User message: ${userMessage}`
}

function getGeminiApiKey(): string | undefined {
	return (
		process.env.GOOGLE_GENAI_API_KEY ||
		process.env.GEMINI_API_KEY ||
		process.env.GOOGLE_GEMINI_API_KEY ||
		process.env.NEXT_PUBLIC_GEMINI_API_KEY
	)
}

async function callGeminiAPI(prompt: string, language?: string): Promise<string> {
	const apiKey = getGeminiApiKey()
	if (!apiKey) {
		// Fallback local response to avoid hard-failing in non-configured environments
		const fallback = language === "hi"
			? "माफ़ कीजिए, AI सेवा उपलब्ध नहीं है। फिर भी: कृपया अपना सवाल स्पष्ट लिखें—मैं खेती, मूल्य, और मार्केट से जुड़ी जानकारी देने की कोशिश करूँगा।"
			: "AI service is not configured. Still: please ask clearly—I'll try to help with farming, pricing, and marketplace topics."
		return fallback
	}

	const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:generateContent?key=${apiKey}`

	const controller = new AbortController()
	const timeout = setTimeout(() => controller.abort(), 15000)
	try {
		const res = await fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				contents: [
					{
						role: "user",
						parts: [
							{ text: prompt + (language === "hi" ? "\nभाषा: हिंदी" : "\nLanguage: English") },
						],
					},
				],
				generationConfig: {
					temperature: 0.4,
					topP: 0.9,
					topK: 40,
					maxOutputTokens: 300,
				},
			}),
			signal: controller.signal,
		})

		if (!res.ok) {
			let message = `Upstream error ${res.status}`
			try {
				const err = await res.json()
				message = err?.error?.message || err?.message || message
			} catch {}
			throw new Error(message)
		}

		const data = await res.json()
		// Gemini response shape: candidates[0].content.parts[0].text
		const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim()
		return reply || (language === "hi" ? "क्षमा करें, मैं जवाब नहीं दे पाया।" : "Sorry, I couldn't generate a response.")
	} finally {
		clearTimeout(timeout)
	}
}

export async function POST(request: NextRequest) {
	try {
		const { message, language } = await request.json()

		if (!message || typeof message !== "string") {
			return NextResponse.json({ error: "Message is required" }, { status: 400 })
		}

		const prompt = buildPrompt(message)
		const reply = await callGeminiAPI(prompt, language)
		return NextResponse.json({ reply })
	} catch (error: unknown) {
		const errMsg = error instanceof Error ? error.message : "Internal server error"
		return NextResponse.json({ error: errMsg }, { status: 500 })
	}
}
