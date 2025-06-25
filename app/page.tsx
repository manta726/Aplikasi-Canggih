
"use client"

import type React from "react"

import { useState, useCallback, useRef } from "react"

// --- Komponen Ikon ---
const UploadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-12 w-12 text-purple-400 group-hover:text-cyan-400 transition-colors duration-300"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
)

const CopyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
)

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const FileTextIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-16 w-16 text-gray-400"
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
)

const SettingsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v6m0 6v6" />
    <path d="m15.14 7.14-4.28 4.28m0 0L6.58 15.7" />
    <path d="m15.14 16.86-4.28-4.28m0 0L6.58 8.3" />
  </svg>
)

const TableIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <path d="M3 3h18v18H3z" />
    <path d="M21 9H3" />
    <path d="M21 15H3" />
    <path d="M12 3v18" />
  </svg>
)

const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
  </svg>
)

const DownloadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
)

const SparklesIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6 text-yellow-400 animate-pulse"
  >
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0L9.937 15.5Z" />
  </svg>
)

// --- Types ---
interface ExtractedData {
  passportNo: string
  fullName: string
  dateOfBirth: string
  placeOfBirth: string
  dateOfIssue: string
  dateOfExpiry: string
}

interface ProcessedFile {
  id: string
  file: File
  extractedText: string
  structuredData: ExtractedData
  isProcessing: boolean
  error: string | null
}

type AIProvider = "gemini" | "deepseek"

// --- Utility Functions ---
/**
 * Extract specific passport data from raw text with improved parsing for Chinese passports
 */
function extractPassportData(text: string): ExtractedData {
  const data: ExtractedData = {
    passportNo: "",
    fullName: "",
    dateOfBirth: "",
    placeOfBirth: "",
    dateOfIssue: "",
    dateOfExpiry: "",
  }

  const lines = text.split("\n").map((line) => line.trim())

  // Helper function to clean Chinese text
  const cleanChineseText = (text: string): string => {
    // Remove any unwanted prefixes/suffixes and normalize
    return text
      .replace(/^[\u4e00-\u9fff]+\//, '') // Remove Chinese prefix before /
      .replace(/\/[\u4e00-\u9fff]+$/, '') // Remove Chinese suffix after /
      .trim()
  }

  // Helper function to clean Chinese text from dates
  const cleanChineseDateText = (dateText: string): string => {
    // Remove Chinese characters like "2月", "3月", "7月", etc. from date strings
    return dateText
      .replace(/\d+月\//g, '') // Remove patterns like "2月/", "3月/", "7月/"
      .replace(/[\u4e00-\u9fff]+/g, '') // Remove any remaining Chinese characters
      .replace(/\s+/g, ' ') // Normalize spaces
      .trim()
  }

  // Helper function to extract English name from mixed format
  const extractEnglishName = (nameText: string): string => {
    // Handle formats like "陈飞/CHEN, FEI" or "陈贤键/CHEN, XIANJIAN"
    if (nameText.includes('/')) {
      const parts = nameText.split('/')
      if (parts.length >= 2) {
        return parts[1].trim() // Take the English part
      }
    }
    // If no slash, assume it's already in English format
    return nameText.trim()
  }

  // Helper function to extract English place from Chinese/English format
  const extractEnglishPlace = (placeText: string): string => {
    // Handle formats like "甘肃/GANSU" or "河北/HEBEI"
    if (placeText.includes('/')) {
      const parts = placeText.split('/')
      if (parts.length >= 2) {
        return parts[1].trim() // Take the English part
      }
    }
    // If no slash, return as is
    return placeText.trim()
  }

  // Process each line specifically to avoid cross-matching
  for (const line of lines) {
    // Skip empty lines and headers
    if (
      !line ||
      line.toLowerCase().includes("berikut adalah") ||
      line.toLowerCase().includes("informasi yang diekstrak") ||
      line.toLowerCase().includes("people's republic") ||
      line.toLowerCase().includes("ministry of foreign")
    ) {
      continue
    }

    // Passport Number - improved matching for various formats
    if (!data.passportNo) {
      // Try multiple patterns for passport number
      const passportPatterns = [
        /(?:nomor\s*paspor|passport\s*no)[:\s]*([A-Z0-9]+)/i,
        /(?:护照号码|passport\s*number)[:\s]*([A-Z0-9]+)/i,
        /^([A-Z]\d{8,9})$/, // Direct pattern like E97042258
        /passport\s*no[:.\s]*([A-Z0-9]+)/i,
      ]

      for (const pattern of passportPatterns) {
        const match = line.match(pattern)
        if (match && match[1]) {
          data.passportNo = match[1].trim()
          break
        }
      }
    }

    // Full Name - improved matching for Chinese names with better cleaning
    if (!data.fullName) {
      const namePatterns = [
        /(?:nama\s*lengkap|full\s*name|姓名)[:\s]*([A-Z\s,\u4e00-\u9fff\/]+)/i,
        /(?:name|姓名)[:\s]*([A-Z\s,\u4e00-\u9fff\/]+)/i,
        /^([A-Z]+,\s*[A-Z\s]+)$/, // Direct pattern like ZONG, ZHIJU
        /([A-Z]{2,},\s*[A-Z\s]+)/, // Surname, Given name format
        /([\u4e00-\u9fff]+\/[A-Z\s,]+)/, // Chinese/English format like 陈飞/CHEN, FEI
      ]

      for (const pattern of namePatterns) {
        const match = line.match(pattern)
        if (match && match[1] && match[1].length > 2) {
          data.fullName = extractEnglishName(match[1].trim())
          break
        }
      }
    }

    // Date of Birth - improved matching for mixed formats
    if (!data.dateOfBirth) {
      const dobPatterns = [
        /(?:tanggal\s*lahir|date\s*of\s*birth|出生日期)[:\s]*(\d{1,2}\s+\w{3}\s+\d{4})/i,
        /(?:date\s*of\s*birth|出生日期)[:\s]*(\d{1,2}\s+[A-Z]{3}\s+\d{4})/i,
        /(\d{2}\s+[A-Z]{3}\s+\d{4})/, // Direct pattern like 09 AUG 1990
        /(\d{1,2}\s+\d+月?\/[A-Z]{3}\s+\d{4})/i, // Mixed format like 09 8月/AUG 1990
      ]

      for (const pattern of dobPatterns) {
        const match = line.match(pattern)
        if (match && match[1]) {
          data.dateOfBirth = cleanChineseDateText(match[1].trim())
          break
        }
      }
    }

    // Place of Birth - improved matching for Chinese locations with better extraction
    if (!data.placeOfBirth) {
      const pobPatterns = [
        /(?:tempat\s*lahir|place\s*of\s*birth|出生地)[:\s]*(.+)/i,
        /(?:place\s*of\s*birth|出生地)[:\s]*([A-Z\u4e00-\u9fff\/\s]+)/i,
        /([\u4e00-\u9fff]+\/[A-Z]+)/, // Chinese/English format like 河南/HENAN
        /([A-Z\u4e00-\u9fff\/]+)(?=\s*\d{2}\s+)/, // Location before date
      ]

      for (const pattern of pobPatterns) {
        const match = line.match(pattern)
        if (match && match[1] && match[1].length > 1) {
          data.placeOfBirth = extractEnglishPlace(match[1].trim())
          break
        }
      }
    }

    // Date of Issue - improved matching for mixed Chinese/English format
    if (!data.dateOfIssue) {
      const doiPatterns = [
        /(?:tanggal\s*penerbitan|date\s*of\s*issue|签发日期)[:\s]*(\d{1,2}\s+(?:\d+月\/)?[A-Z]{3}\s+\d{4})/i,
        /(?:date\s*of\s*issue|签发日期)[:\s]*(\d{1,2}\s+\d+月?\/[A-Z]{3}\s+\d{4})/i,
        /(\d{2}\s+\d+月\/[A-Z]{3}\s+\d{4})/, // Pattern like 22 2月/FEB 2017
        /(\d{1,2}\s+[A-Z]{3}\s+\d{4})(?=.*签发|.*issue)/i,
      ]

      for (const pattern of doiPatterns) {
        const match = line.match(pattern)
        if (match && match[1]) {
          data.dateOfIssue = cleanChineseDateText(match[1].trim())
          break
        }
      }
    }

    // Date of Expiry - improved matching for mixed Chinese/English format
    if (!data.dateOfExpiry) {
      const doePatterns = [
        /(?:tanggal\s*kedaluwarsa|date\s*of\s*expiry|有效期至)[:\s]*(\d{1,2}\s+(?:\d+月\/)?[A-Z]{3}\s+\d{4})/i,
        /(?:date\s*of\s*expiry|有效期至)[:\s]*(\d{1,2}\s+\d+月?\/[A-Z]{3}\s+\d{4})/i,
        /(\d{2}\s+\d+月\/[A-Z]{3}\s+\d{4})(?=.*有效|.*expiry)/i, // Pattern like 21 2月/FEB 2027
        /(\d{1,2}\s+[A-Z]{3}\s+\d{4})(?=.*有效|.*expiry)/i,
      ]

      for (const pattern of doePatterns) {
        const match = line.match(pattern)
        if (match && match[1]) {
          data.dateOfExpiry = cleanChineseDateText(match[1].trim())
          break
        }
      }
    }
  }

  // Fallback: try to extract from the entire text using more flexible patterns
  if (!data.passportNo) {
    const passportMatch = text.match(/([A-Z]\d{8,9})/g)
    if (passportMatch) {
      data.passportNo = passportMatch[0]
    }
  }

  if (!data.fullName) {
    // Try to find Chinese/English name format in entire text
    const chineseEnglishNameMatch = text.match(/([\u4e00-\u9fff]+\/[A-Z\s,]+)/g)
    if (chineseEnglishNameMatch) {
      data.fullName = extractEnglishName(chineseEnglishNameMatch[0])
    } else {
      const nameMatch = text.match(/([A-Z]{2,},\s*[A-Z\s]+)/g)
      if (nameMatch) {
        data.fullName = nameMatch[0]
      }
    }
  }

  if (!data.placeOfBirth) {
    // Try to find Chinese/English place format in entire text
    const chinesePlaceMatch = text.match(/([\u4e00-\u9fff]+\/[A-Z]+)/g)
    if (chinesePlaceMatch) {
      data.placeOfBirth = extractEnglishPlace(chinesePlaceMatch[0])
    }
  }

  // Final cleanup for all fields
  if (data.fullName) {
    data.fullName = data.fullName.replace(/[\u4e00-\u9fff\/]+/g, '').trim()
  }
  
  if (data.placeOfBirth) {
    data.placeOfBirth = data.placeOfBirth.replace(/[\u4e00-\u9fff\/]+/g, '').trim()
  }

  // Final cleanup for all date fields to ensure no Chinese characters remain
  if (data.dateOfBirth) {
    data.dateOfBirth = cleanChineseDateText(data.dateOfBirth)
  }
  
  if (data.dateOfIssue) {
    data.dateOfIssue = cleanChineseDateText(data.dateOfIssue)
  }
  
  if (data.dateOfExpiry) {
    data.dateOfExpiry = cleanChineseDateText(data.dateOfExpiry)
  }

  // Debug logging
  console.log("=== PARSING DEBUG ===")
  console.log("Raw text lines:", lines)
  console.log("Extracted data:", data)
  console.log("====================")

  return data
}

/** Translasi error AI Provider agar ramah-user */
function getReadableApiError(errorData: any, provider: AIProvider) {
  // Handle quota exceeded errors specifically
  if (errorData?.error?.code === 429) {
    if (provider === "gemini") {
      return "Kuota harian Gemini API telah habis (200 request/hari pada tier gratis). Silakan tunggu hingga reset atau upgrade ke plan berbayar."
    }
    return "Rate limit tercapai. Silakan tunggu beberapa saat sebelum mencoba lagi."
  }
  
  const details = errorData?.error?.details ?? []
  const reason = details.find((d: any) => d?.["@type"]?.includes("ErrorInfo"))?.reason ?? ""
  const msg = errorData?.error?.message ?? errorData?.message ?? "Unknown error"

  if (provider === "gemini") {
    if (reason === "API_KEY_INVALID" || /api key expired/i.test(msg)) {
      return "API-Key Gemini Anda sudah kedaluwarsa / tidak valid. " + "Silakan buka Pengaturan dan tempel kunci baru."
    }
    if (errorData?.error?.code === 429) {
      return "Quota Gemini terlampaui. Coba lagi nanti atau upgrade."
    }
  } else if (provider === "deepseek") {
    if (errorData?.error?.code === 401 || /unauthorized/i.test(msg) || /invalid.*key/i.test(msg)) {
      return "API-Key DeepSeek Anda tidak valid. Silakan buka Pengaturan dan tempel kunci baru."
    }
    if (errorData?.error?.code === 429 || /rate limit/i.test(msg)) {
      return "Quota DeepSeek terlampaui. Coba lagi nanti atau upgrade."
    }
    if (errorData?.error?.code === 400 || errorData?.error?.code === 422) {
      return "Format request tidak valid untuk DeepSeek API. Model deepseek-vl mungkin tidak tersedia atau format image tidak didukung."
    }
    if (/model.*not.*found/i.test(msg) || /not.*support/i.test(msg)) {
      return "Model DeepSeek-VL tidak tersedia. Coba gunakan provider Gemini sebagai alternatif."
    }
    if (errorData?.error?.code === 422) {
      return "DeepSeek API menolak request. Kemungkinan model vision tidak tersedia atau format image tidak sesuai."
    }
  }
  
  // fallback
  return msg
}

// --- Komponen Utama Aplikasi ---
export default function App() {
  // State untuk menyimpan data aplikasi
  const [processedFiles, setProcessedFiles] = useState<ProcessedFile[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copySuccess, setCopySuccess] = useState(false)
  const [extractionMode, setExtractionMode] = useState("enhanced")
  const [apiKey, setApiKey] = useState("")
  const [aiProvider, setAiProvider] = useState<AIProvider>("gemini")
  const [showSettings, setShowSettings] = useState(false)
  const [selectedFileForRawText, setSelectedFileForRawText] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Fungsi untuk mengubah file menjadi Base64
  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })

  // Fungsi untuk mendapatkan prompt ekstraksi yang dioptimalkan
  const getExtractionPrompt = (fileType: string, mode: string, provider: AIProvider) => {
    const basePrompt = "Ekstrak semua teks dari dokumen paspor ini dengan akurasi tinggi."

    if (mode === "basic") {
      return `${basePrompt} Berikan hanya teks yang diekstrak tanpa penjelasan tambahan.`
    }

    // Optimized prompt for different providers
    const instructionPrompt = `
${basePrompt}

INSTRUKSI KHUSUS UNTUK PASPOR (TERMASUK PASPOR CHINA):
1. Fokus pada informasi utama: Nomor Paspor, Nama Lengkap, Tanggal Lahir, Tempat Lahir, Tanggal Penerbitan, Tanggal Kedaluwarsa
2. Baca semua teks dengan teliti, termasuk yang kecil atau kurang jelas
3. Perhatikan format tanggal campuran seperti "22 2月/FEB 2017" atau "09 AUG 1990"
4. Ekstrak nama lengkap termasuk format "SURNAME, GIVEN NAME" dan karakter China
5. Identifikasi nomor paspor dengan tepat (contoh: E97042258)
6. Perhatikan teks yang mungkin terpotong atau sebagian tersembunyi
7. Untuk teks dalam bahasa Cina, sertakan juga terjemahan bahasa Inggris jika ada
8. Perhatikan format bilingual seperti "河南/HENAN" untuk tempat lahir
9. Ekstrak semua informasi meskipun dalam format campuran China-Inggris

FORMAT OUTPUT:
- Berikan teks yang diekstrak dalam format yang terstruktur
- Gunakan format "Label: Nilai" untuk setiap informasi
- Pertahankan format asli untuk tanggal dan nama
- Jika ada field yang tidak terbaca, tulis "TIDAK TERBACA"

CONTOH FORMAT UNTUK PASPOR CHINA:
Nomor Paspor: E97042258
Nama Lengkap: ZONG, ZHIJU
Tanggal Lahir: 09 AUG 1990
Tempat Lahir: 河南/HENAN
Tanggal Penerbitan: 22 2月/FEB 2017
Tanggal Kedaluwarsa: 21 2月/FEB 2027
`

    // DeepSeek specific optimization
    if (provider === "deepseek") {
      return `${instructionPrompt}

CATATAN UNTUK AI: Anda adalah AI yang sangat baik dalam OCR dan pemahaman dokumen. Fokus pada akurasi ekstraksi teks dari gambar dokumen paspor.`
    }

    return instructionPrompt
  }

  // Fungsi untuk memproses satu file
  const processFile = async (file: File): Promise<ProcessedFile> => {
    const fileId = `${file.name}-${Date.now()}`

    // Store API keys
    const apiKeys = {
      gemini: apiKey,
      deepseek: apiKey,
      openai: process.env.NEXT_PUBLIC_OPENAI_API_KEY || ""
    }

    try {
      const base64File = await toBase64(file)
      const base64Data = base64File.split(",")[1]
      const prompt = getExtractionPrompt(file.type, extractionMode, aiProvider)
      
      // Extract file type and image data for potential fallback
      const fileType = file.type
      const imageData = base64Data

      let apiUrl: string
      let payload: any
      let headers: Record<string, string>

      if (aiProvider === "gemini") {
        apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`
        headers = { "Content-Type": "application/json" }
        payload = {
          contents: [
            {
              parts: [{ text: prompt }, { inlineData: { mimeType: file.type, data: base64Data } }],
            },
          ],
          generationConfig: {
            temperature: 0.1,
            topK: 1,
            topP: 0.8,
            maxOutputTokens: 8192,
          },
        }
      } else if (aiProvider === "deepseek") {
        apiUrl = "https://api.deepseek.com/v1/chat/completions"
        headers = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        }
        // Try different models for DeepSeek
        const deepseekModels = ["deepseek-vl", "deepseek-chat"];
        payload = {
          model: deepseekModels[0], // Start with vision model
          messages: [
            {
              role: "user",
              content: [
                { 
                  type: "text", 
                  text: prompt 
                },
                { 
                  type: "image_url", 
                  image_url: { 
                    url: `data:${file.type};base64,${base64Data}`
                  } 
                }
              ],
            },
          ],
          temperature: 0.1,
          max_tokens: 4000,
          stream: false
        }
      }

      console.log("=== API CALL DEBUG ===")
      console.log("Provider:", aiProvider)
      console.log("API Key:", apiKey ? `${apiKey.substring(0, 10)}...` : "NOT SET")
      console.log("File size:", file.size)
      console.log("File type:", file.type)
      console.log("API URL:", apiUrl)
      if (aiProvider === "deepseek") {
        console.log("DeepSeek payload model:", payload.model)
        console.log("DeepSeek message content types:", payload.messages[0].content.map((c: any) => c.type))
      }
      console.log("======================")

      const response = await fetch(apiUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      })

      console.log("=== API RESPONSE DEBUG ===")
      console.log("Response status:", response.status)
      console.log("Response ok:", response.ok)
      console.log("Response headers:", Object.fromEntries(response.headers.entries()))
      console.log("==========================")

      if (!response.ok) {
        const errorData = await response.text()
        console.error("API Error Details:", { status: response.status, errorData })
        
        // Special handling for Gemini quota exceeded
        if (aiProvider === "gemini" && response.status === 429) {
          console.log("Gemini quota exceeded, trying OpenAI fallback...")
          
          // Fallback to OpenAI
          const openaiUrl = "https://api.openai.com/v1/chat/completions"
          const openaiHeaders = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKeys.openai}`
          }
          
          const openaiPayload = {
            model: "gpt-4o-mini",
            messages: [
              {
                role: "user",
                content: [
                  { type: "text", text: prompt },
                  ...(imageData ? [{ 
                    type: "image_url", 
                    image_url: { url: `data:${fileType};base64,${imageData}` } 
                  }] : [])
                ]
              }
            ],
            temperature: 0.1,
            max_tokens: 4000
          }
          
          const openaiResponse = await fetch(openaiUrl, {
            method: "POST",
            headers: openaiHeaders,
            body: JSON.stringify(openaiPayload),
          })
          
          if (openaiResponse.ok) {
            const openaiResult = await openaiResponse.json()
            return `[Fallback ke OpenAI karena Gemini quota habis]: ${openaiResult.choices[0].message.content}`
          }
        }
        
        // Special handling for DeepSeek vision failures
        if (aiProvider === "deepseek" && response.status === 422) {
          console.log("DeepSeek vision failed, trying text-only approach...")
          
          // Fallback: use text-only approach
          const fallbackPayload = {
            model: "deepseek-chat",
            messages: [
              {
                role: "user",
                content: `${prompt}\n\n[Note: I uploaded an image but the vision model is not available, please respond based on the text prompt only]`
              }
            ],
            temperature: 0.1,
            max_tokens: 4000,
            stream: false
          }
          
          const fallbackResponse = await fetch(apiUrl, {
            method: "POST",
            headers,
            body: JSON.stringify(fallbackPayload),
          })
          
          if (fallbackResponse.ok) {
            const fallbackResult = await fallbackResponse.json()
            return `[DeepSeek Vision tidak tersedia - respons text-only]: ${fallbackResult.choices[0].message.content}`
          }
        }
        
        let parsedError
        try {
          parsedError = JSON.parse(errorData)
        } catch {
          parsedError = { error: { message: errorData } }
        }
        
        throw new Error(getReadableApiError(parsedError, aiProvider))
      }

      const result = await response.json()
      let extractedText = ""

      if (aiProvider === "gemini") {
        if (result.candidates?.[0]?.content?.parts?.[0]) {
          extractedText = result.candidates[0].content.parts[0].text.trim()
        }
      } else if (aiProvider === "deepseek") {
        if (result.choices?.[0]?.message?.content) {
          extractedText = result.choices[0].message.content.trim()
        }
      }

      if (!extractedText) {
        throw new Error("Tidak ada teks yang berhasil diekstrak dari dokumen.")
      }

      const structuredData = extractPassportData(extractedText)

      return {
        id: fileId,
        file,
        extractedText,
        structuredData,
        isProcessing: false,
        error: null,
      }
    } catch (err) {
      return {
        id: fileId,
        file,
        extractedText: "",
        structuredData: {
          passportNo: "",
          fullName: "",
          dateOfBirth: "",
          placeOfBirth: "",
          dateOfIssue: "",
          dateOfExpiry: "",
        },
        isProcessing: false,
        error: err instanceof Error ? err.message : "Unknown error",
      }
    }
  }

  // Fungsi untuk menangani multiple file upload
  const handleMultipleFileUpload = useCallback(
    async (files: FileList) => {
      if (!apiKey) {
        setError(`Harap masukkan API Key ${aiProvider === "gemini" ? "Gemini" : "DeepSeek"} terlebih dahulu di pengaturan.`)
        return
      }

      const allowedTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"]
      const validFiles = Array.from(files).filter((file) => {
        if (!allowedTypes.includes(file.type)) {
          setError(`File ${file.name} tidak didukung. Harap unggah JPG, PNG, WebP, atau PDF.`)
          return false
        }
        if (file.size > 20 * 1024 * 1024) {
          setError(`File ${file.name} terlalu besar. Maksimal 20MB.`)
          return false
        }
        return true
      })

      if (validFiles.length === 0) return

      setError(null)
      setIsProcessing(true)

      // Add files to processing queue
      const newFiles: ProcessedFile[] = validFiles.map((file) => ({
        id: `${file.name}-${Date.now()}`,
        file,
        extractedText: "",
        structuredData: {
          passportNo: "",
          fullName: "",
          dateOfBirth: "",
          placeOfBirth: "",
          dateOfIssue: "",
          dateOfExpiry: "",
        },
        isProcessing: true,
        error: null,
      }))

      setProcessedFiles((prev) => [...prev, ...newFiles])

      // Set first file as selected for raw text display
      if (!selectedFileForRawText && newFiles.length > 0) {
        setSelectedFileForRawText(newFiles[0].id)
      }

      // Process files one by one
      for (let i = 0; i < validFiles.length; i++) {
        try {
          const processedFile = await processFile(validFiles[i])
          setProcessedFiles((prev) => prev.map((file) => (file.id === newFiles[i].id ? processedFile : file)))
        } catch (err) {
          setProcessedFiles((prev) =>
            prev.map((file) =>
              file.id === newFiles[i].id
                ? { ...file, isProcessing: false, error: err instanceof Error ? err.message : "Unknown error" }
                : file,
            ),
          )
        }
      }

      setIsProcessing(false)
    },
    [apiKey, aiProvider, extractionMode, selectedFileForRawText],
  )

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      handleMultipleFileUpload(files)
    }
  }

  const handleDragOver = (e: React.DragEvent) => e.preventDefault()
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      handleMultipleFileUpload(files)
    }
  }

  const removeFile = (fileId: string) => {
    setProcessedFiles((prev) => prev.filter((file) => file.id !== fileId))
    if (selectedFileForRawText === fileId) {
      const remainingFiles = processedFiles.filter((file) => file.id !== fileId)
      setSelectedFileForRawText(remainingFiles.length > 0 ? remainingFiles[0].id : "")
    }
  }

  const copyToClipboard = async (text: string) => {
    if (!text) return

    try {
      await navigator.clipboard.writeText(text)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error("Gagal menyalin teks: ", err)
      setError("Gagal menyalin teks.")
    }
  }

  const exportToCSV = () => {
    if (processedFiles.length === 0) return

    const headers = [
      "File Name",
      "Passport No",
      "Full Name",
      "Date of Birth",
      "Place of Birth",
      "Date of Issue",
      "Date of Expiry",
    ]
    const rows = processedFiles.map((file) => [
      file.file.name,
      file.structuredData.passportNo || "N/A",
      file.structuredData.fullName || "N/A",
      file.structuredData.dateOfBirth || "N/A",
      file.structuredData.placeOfBirth || "N/A",
      file.structuredData.dateOfIssue || "N/A",
      file.structuredData.dateOfExpiry || "N/A",
    ])

    const csvContent = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `passport_data_${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const resetApp = () => {
    setProcessedFiles([])
    setError(null)
    setCopySuccess(false)
    setSelectedFileForRawText("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Get selected file for raw text display
  const selectedFile = processedFiles.find((file) => file.id === selectedFileForRawText)

  return (
    <div className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 text-white min-h-screen font-sans relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_80%_80%,rgba(120,200,255,0.2),rgba(255,255,255,0))]"></div>
      
      {/* Floating Particles Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-2 h-2 bg-purple-400 rounded-full animate-bounce opacity-20" style={{left: '10%', top: '20%', animationDelay: '0s'}}></div>
        <div className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-30" style={{left: '80%', top: '30%', animationDelay: '1s'}}></div>
        <div className="absolute w-3 h-3 bg-pink-400 rounded-full animate-bounce opacity-20" style={{left: '30%', top: '60%', animationDelay: '2s'}}></div>
        <div className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-pulse opacity-30" style={{left: '70%', top: '70%', animationDelay: '3s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 p-4 sm:p-6 md:p-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <SparklesIcon />
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 animate-pulse">
              LDB Paspor AI
            </h1>
            <SparklesIcon />
          </div>
          <p className="text-xl text-gray-300 font-light mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-gray-100">
            Artificial Intelligence Help Your Work ✨
          </p>
          
          {/* Beautiful stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-purple-300/30 rounded-2xl p-4 shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105">
              <div className="text-2xl font-bold text-purple-300">{processedFiles.length}</div>
              <div className="text-sm text-gray-400">Files Processed</div>
            </div>
            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-xl border border-cyan-300/30 rounded-2xl p-4 shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105">
              <div className="text-2xl font-bold text-cyan-300">{processedFiles.filter(f => !f.error).length}</div>
              <div className="text-sm text-gray-400">Successful</div>
            </div>
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-xl border border-green-300/30 rounded-2xl p-4 shadow-lg hover:shadow-green-500/25 transition-all duration-300 hover:scale-105">
              <div className="text-2xl font-bold text-green-300">{aiProvider === "gemini" ? "Gemini" : "DeepSeek"}</div>
              <div className="text-sm text-gray-400">AI Provider</div>
            </div>
          </div>

          {/* Enhanced Controls */}
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-700/80 to-gray-600/80 hover:from-purple-600/80 hover:to-purple-700/80 backdrop-blur-xl border border-gray-600/50 hover:border-purple-400/50 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
            >
              <SettingsIcon />
              <span className="font-medium">Setting API</span>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse group-hover:animate-bounce"></div>
            </button>

            {processedFiles.length > 0 && (
              <>
                <button
                  onClick={exportToCSV}
                  className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-600/80 to-emerald-600/80 hover:from-green-500/80 hover:to-emerald-500/80 backdrop-blur-xl border border-green-500/50 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25"
                >
                  <DownloadIcon />
                  <span className="font-medium">Export CSV</span>
                </button>
                <button
                  onClick={resetApp}
                  className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-red-600/80 to-pink-600/80 hover:from-red-500/80 hover:to-pink-500/80 backdrop-blur-xl border border-red-500/50 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/25"
                >
                  <span className="font-medium">Reset All</span>
                </button>
              </>
            )}
          </div>

          {/* Enhanced Settings Panel */}
          {showSettings && (
            <div className="mt-8 p-8 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 text-left max-w-3xl mx-auto shadow-2xl animate-in slide-in-from-top duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <SettingsIcon />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Setting Your Tool
                </h3>
              </div>

              {/* AI Provider Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3 text-gray-300">AI Provider</label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="relative cursor-pointer">
                    <input
                      type="radio"
                      value="gemini"
                      checked={aiProvider === "gemini"}
                      onChange={(e) => setAiProvider(e.target.value as AIProvider)}
                      className="sr-only"
                    />
                    <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      aiProvider === "gemini" 
                        ? "border-purple-400 bg-purple-500/20 shadow-lg shadow-purple-500/25" 
                        : "border-gray-600 bg-gray-700/50 hover:border-purple-400/50"
                    }`}>
                      <div className="font-medium text-white">Google Gemini</div>
                      <div className="text-xs text-gray-400 mt-1">Advanced OCR</div>
                    </div>
                  </label>
                  <label className="relative cursor-pointer">
                    <input
                      type="radio"
                      value="deepseek"
                      checked={aiProvider === "deepseek"}
                      onChange={(e) => setAiProvider(e.target.value as AIProvider)}
                      className="sr-only"
                    />
                    <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      aiProvider === "deepseek" 
                        ? "border-cyan-400 bg-cyan-500/20 shadow-lg shadow-cyan-500/25" 
                        : "border-gray-600 bg-gray-700/50 hover:border-cyan-400/50"
                    }`}>
                      <div className="font-medium text-white">DeepSeek AI</div>
                      <div className="text-xs text-gray-400 mt-1">Vision-Language</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* API Key */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3 text-gray-300">
                  API Key {aiProvider === "gemini" ? "Gemini" : "DeepSeek"}
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder={`Masukkan API Key ${aiProvider === "gemini" ? "Gemini" : "DeepSeek"} Anda`}
                    className="w-full p-4 bg-gray-700/80 backdrop-blur-xl border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className={`w-3 h-3 rounded-full ${apiKey ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`}></div>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-2 flex items-center gap-2">
                  <span>🔗</span>
                  {aiProvider === "gemini" ? (
                    <>
                      Dapatkan API Key di{" "}
                      <a
                        href="https://makersuite.google.com/app/apikey"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 transition-colors underline decoration-dotted"
                      >
                        Google AI Studio
                      </a>
                    </>
                  ) : (
                    <>
                      Dapatkan API Key di{" "}
                      <a
                        href="https://platform.deepseek.com/api_keys"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 transition-colors underline decoration-dotted"
                      >
                        DeepSeek Platform
                      </a>
                    </>
                  )}
                </p>
              </div>

              {/* Mode Ekstraksi */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3 text-gray-300">Mode Ekstraksi</label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="relative cursor-pointer">
                    <input
                      type="radio"
                      value="basic"
                      checked={extractionMode === "basic"}
                      onChange={(e) => setExtractionMode(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      extractionMode === "basic" 
                        ? "border-green-400 bg-green-500/20 shadow-lg shadow-green-500/25" 
                        : "border-gray-600 bg-gray-700/50 hover:border-green-400/50"
                    }`}>
                      <div className="font-medium text-white">Basic</div>
                      <div className="text-xs text-gray-400 mt-1">⚡ Cepat</div>
                    </div>
                  </label>
                  <label className="relative cursor-pointer">
                    <input
                      type="radio"
                      value="enhanced"
                      checked={extractionMode === "enhanced"}
                      onChange={(e) => setExtractionMode(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      extractionMode === "enhanced" 
                        ? "border-yellow-400 bg-yellow-500/20 shadow-lg shadow-yellow-500/25" 
                        : "border-gray-600 bg-gray-700/50 hover:border-yellow-400/50"
                    }`}>
                      <div className="font-medium text-white">Enhanced</div>
                      <div className="text-xs text-gray-400 mt-1">🎯 Akurat</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Provider Info */}
              <div className="p-6 bg-gradient-to-r from-gray-700/50 to-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-600/30">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-xs">ℹ️</div>
                  <p className="text-sm font-medium text-white">
                    Provider yang dipilih: {aiProvider === "gemini" ? "Google Gemini 2.0 Flash" : "DeepSeek VL (Vision-Language)"}
                  </p>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {aiProvider === "gemini" 
                    ? "Gemini menawarkan OCR yang sangat baik untuk dokumen kompleks dengan teknologi Google terdepan."
                    : "DeepSeek VL adalah model vision yang dirancang khusus untuk memproses gambar dan dokumen dengan presisi tinggi."}
                </p>
              </div>
            </div>
          )}
        </header>

        <main className="space-y-10">
          {/* Enhanced Upload Area */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-gray-700/50">
              <div
                className="group border-3 border-dashed border-gray-600/70 hover:border-purple-400/70 rounded-2xl text-center p-12 cursor-pointer transition-all duration-500 hover:bg-gradient-to-br hover:from-purple-500/10 hover:to-cyan-500/10 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <div className="flex justify-center mb-6">
                  <UploadIcon />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    Upload Multiple Passport Files
                  </h3>
                  <p className="text-gray-300 text-lg">
                    Drag & drop files or <span className="text-purple-400 font-semibold">click to select</span>
                  </p>
                  <div className="flex flex-wrap justify-center gap-3 mt-4">
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-400/30">PNG</span>
                    <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm border border-cyan-400/30">JPG</span>
                    <span className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-sm border border-pink-400/30">WEBP</span>
                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm border border-yellow-400/30">PDF</span>
                  </div>
                  <p className="text-sm text-gray-500">Max 20MB per file</p>
                </div>
                
                {isProcessing && (
                  <div className="mt-8 flex flex-col items-center justify-center space-y-4">
                    <div className="relative">
                      <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-600"></div>
                      <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-purple-400 absolute top-0"></div>
                    </div>
                    <span className="text-purple-300 font-medium animate-pulse">Processing files...</span>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                    </div>
                  </div>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={onFileChange}
                accept="image/png, image/jpeg, image/webp, application/pdf"
                multiple
                className="hidden"
              />
            </div>
          </div>

          {error && (
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl blur opacity-25"></div>
              <div className="relative text-red-300 p-6 bg-gradient-to-br from-red-900/50 to-pink-900/50 backdrop-blur-xl rounded-2xl border border-red-700/50 space-y-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                    <span className="text-red-400">⚠️</span>
                  </div>
                  <strong className="text-red-400">Error:</strong>
                </div>
                <p className="text-red-200 leading-relaxed">{error}</p>
                <button
                  onClick={() => setShowSettings(true)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white text-sm transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Buka Pengaturan
                </button>
              </div>
            </div>
          )}

          {/* Enhanced Results Table */}
          {processedFiles.length > 0 && (
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-3xl blur opacity-25"></div>
              <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-gray-700/50">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                      <TableIcon />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                        Hasil Ekstraksi
                      </h2>
                      <p className="text-gray-400">{processedFiles.length} files processed</p>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-gray-700/50">
                  <table className="w-full text-sm text-left text-gray-300">
                    <thead className="text-xs text-gray-400 uppercase bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-xl">
                      <tr>
                        <th scope="col" className="px-6 py-4 font-medium">File Name</th>
                        <th scope="col" className="px-6 py-4 font-medium">Passport No</th>
                        <th scope="col" className="px-6 py-4 font-medium">Full Name</th>
                        <th scope="col" className="px-6 py-4 font-medium">Date of Birth</th>
                        <th scope="col" className="px-6 py-4 font-medium">Place of Birth</th>
                        <th scope="col" className="px-6 py-4 font-medium">Date of Issue</th>
                        <th scope="col" className="px-6 py-4 font-medium">Date of Expiry</th>
                        <th scope="col" className="px-6 py-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-900/30 backdrop-blur-xl">
                      {processedFiles.map((file, index) => (
                        <tr key={file.id} className="border-b border-gray-700/50 hover:bg-gradient-to-r hover:from-gray-700/30 hover:to-gray-600/30 transition-all duration-300">
                          <td className="px-6 py-4 font-medium">
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"></div>
                              <span className="text-purple-300">{file.file.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {file.isProcessing ? (
                              <div className="flex items-center gap-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-purple-400 border-t-transparent"></div>
                                <span className="text-gray-400 text-xs">Processing...</span>
                              </div>
                            ) : file.error ? (
                              <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded-lg text-xs border border-red-400/30">Error</span>
                            ) : (
                              <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded-lg text-xs border border-green-400/30">
                                {file.structuredData.passportNo || "N/A"}
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {file.isProcessing ? (
                              <div className="animate-pulse bg-gray-600 h-4 w-24 rounded"></div>
                            ) : file.error ? (
                              <span className="text-red-400">Error</span>
                            ) : (
                              file.structuredData.fullName || "N/A"
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {file.isProcessing ? (
                              <div className="animate-pulse bg-gray-600 h-4 w-20 rounded"></div>
                            ) : file.error ? (
                              <span className="text-red-400">Error</span>
                            ) : (
                              file.structuredData.dateOfBirth || "N/A"
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {file.isProcessing ? (
                              <div className="animate-pulse bg-gray-600 h-4 w-16 rounded"></div>
                            ) : file.error ? (
                              <span className="text-red-400">Error</span>
                            ) : (
                              file.structuredData.placeOfBirth || "N/A"
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {file.isProcessing ? (
                              <div className="animate-pulse bg-gray-600 h-4 w-20 rounded"></div>
                            ) : file.error ? (
                              <span className="text-red-400">Error</span>
                            ) : (
                              file.structuredData.dateOfIssue || "N/A"
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {file.isProcessing ? (
                              <div className="animate-pulse bg-gray-600 h-4 w-20 rounded"></div>
                            ) : file.error ? (
                              <span className="text-red-400">Error</span>
                            ) : (
                              file.structuredData.dateOfExpiry || "N/A"
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => removeFile(file.id)}
                              className="p-2 rounded-xl bg-gradient-to-r from-red-600/80 to-red-700/80 hover:from-red-500/80 hover:to-red-600/80 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-red-500/25"
                              title="Remove file"
                            >
                              <TrashIcon />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Raw Text Display */}
          {processedFiles.length > 0 && (
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl blur opacity-25"></div>
              <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-gray-700/50">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <FileTextIcon />
                    </div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                      Raw Text
                    </h3>
                  </div>
                  <select
                    value={selectedFileForRawText}
                    onChange={(e) => setSelectedFileForRawText(e.target.value)}
                    className="px-4 py-2 bg-gray-700/80 backdrop-blur-xl border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-white text-sm"
                  >
                    {processedFiles.map((file) => (
                      <option key={file.id} value={file.id}>
                        {file.file.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="relative">
                  <textarea
                    readOnly
                    value={selectedFile?.extractedText || ""}
                    placeholder="Raw extracted text will appear here..."
                    className="w-full h-48 p-6 bg-gray-900/50 backdrop-blur-xl border border-gray-600/50 rounded-2xl text-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-sm leading-relaxed font-mono"
                  />
                  {selectedFile?.extractedText && (
                    <div className="flex justify-between items-center mt-4 p-4 bg-gray-700/30 rounded-xl border border-gray-600/30">
                      <div className="text-xs text-gray-400 space-y-1">
                        <p>📄 Karakter: <span className="text-green-400 font-medium">{selectedFile.extractedText.length}</span></p>
                        <p>📁 File: <span className="text-purple-400 font-medium">{selectedFile.file.name}</span></p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(selectedFile.extractedText)}
                        className="group flex items-center gap-2 p-3 rounded-xl bg-gradient-to-r from-gray-700/80 to-gray-600/80 hover:from-green-600/80 hover:to-green-700/80 transition-all duration-300 hover:scale-105 shadow-lg"
                        title="Salin Raw Text"
                      >
                        {copySuccess ? (
                          <>
                            <CheckIcon />
                            <span className="text-xs text-green-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <CopyIcon />
                            <span className="text-xs text-gray-400 group-hover:text-green-400">Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>

        <footer className="text-center mt-16 py-8">
          <div className="max-w-md mx-auto p-6 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/30 shadow-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <SparklesIcon />
              <p className="text-lg font-medium bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Ditenagai oleh Fermanta x {aiProvider === "gemini" ? "Gemini AI" : "DeepSeek AI"}
              </p>
            </div>
            <p className="text-sm text-gray-400">
              Part Of Tools <span className="text-purple-400 font-medium">Laman Davindo Bahman</span> ✨
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
