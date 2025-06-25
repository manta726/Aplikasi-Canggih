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
    className="h-8 w-8 text-gray-400"
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

    // Full Name - improved matching for Chinese names
    if (!data.fullName) {
      const namePatterns = [
        /(?:nama\s*lengkap|full\s*name|姓名)[:\s]*([A-Z\s,\u4e00-\u9fff]+)/i,
        /(?:name|姓名)[:\s]*([A-Z\s,\u4e00-\u9fff]+)/i,
        /^([A-Z]+,\s*[A-Z\s]+)$/, // Direct pattern like ZONG, ZHIJU
        /([A-Z]{2,},\s*[A-Z\s]+)/, // Surname, Given name format
      ]

      for (const pattern of namePatterns) {
        const match = line.match(pattern)
        if (match && match[1] && match[1].length > 2) {
          data.fullName = match[1].trim()
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
          data.dateOfBirth = match[1].trim()
          break
        }
      }
    }

    // Place of Birth - improved matching for Chinese locations
    if (!data.placeOfBirth) {
      const pobPatterns = [
        /(?:tempat\s*lahir|place\s*of\s*birth|出生地)[:\s]*(.+)/i,
        /(?:place\s*of\s*birth|出生地)[:\s]*([A-Z\u4e00-\u9fff/\s]+)/i,
        /([\u4e00-\u9fff]+\/[A-Z]+)/, // Chinese/English format like 河南/HENAN
        /([A-Z\u4e00-\u9fff/]+)(?=\s*\d{2}\s+)/, // Location before date
      ]

      for (const pattern of pobPatterns) {
        const match = line.match(pattern)
        if (match && match[1] && match[1].length > 1) {
          data.placeOfBirth = match[1].trim()
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
          data.dateOfIssue = match[1].trim()
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
          data.dateOfExpiry = match[1].trim()
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
    const nameMatch = text.match(/([A-Z]{2,},\s*[A-Z\s]+)/g)
    if (nameMatch) {
      data.fullName = nameMatch[0]
    }
  }

  // Debug logging
  console.log("=== PARSING DEBUG ===")
  console.log("Raw text lines:", lines)
  console.log("Extracted data:", data)
  console.log("====================")

  return data
}

/** Translasi error Gemini agar ramah-user */
function getReadableApiError(errorData: any) {
  const details = errorData?.error?.details ?? []
  const reason = details.find((d: any) => d?.["@type"]?.includes("ErrorInfo"))?.reason ?? ""
  const msg = errorData?.error?.message ?? "Unknown error"

  if (reason === "API_KEY_INVALID" || /api key expired/i.test(msg)) {
    return "API-Key Gemini Anda sudah kedaluwarsa / tidak valid. " + "Silakan buka Pengaturan dan tempel kunci baru."
  }
  if (errorData?.error?.code === 429) {
    return "Quota Gemini terlampaui. Coba lagi nanti atau upgrade."
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
  const getExtractionPrompt = (fileType: string, mode: string) => {
    const basePrompt = "Ekstrak semua teks dari dokumen paspor ini dengan akurasi tinggi."

    if (mode === "basic") {
      return `${basePrompt} Berikan hanya teks yang diekstrak tanpa penjelasan tambahan.`
    }

    return `
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
  }

  // Fungsi untuk memproses satu file
  const processFile = async (file: File): Promise<ProcessedFile> => {
    const fileId = `${file.name}-${Date.now()}`

    try {
      const base64File = await toBase64(file)
      const base64Data = base64File.split(",")[1]
      const prompt = getExtractionPrompt(file.type, extractionMode)

      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`

      console.log("=== API CALL DEBUG ===")
      console.log("API Key:", apiKey ? `${apiKey.substring(0, 10)}...` : "NOT SET")
      console.log("File size:", file.size)
      console.log("File type:", file.type)
      console.log("API URL:", apiUrl)
      console.log("======================")

      const payload = {
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

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      console.log("=== API RESPONSE DEBUG ===")
      console.log("Response status:", response.status)
      console.log("Response ok:", response.ok)
      console.log("Response headers:", Object.fromEntries(response.headers.entries()))
      console.log("==========================")

      if (!response.ok) {
        const errorData = await response.json()
        console.error("API Error Details:", { status: response.status, errorData })
        throw new Error(getReadableApiError(errorData))
      }

      const result = await response.json()

      if (result.candidates?.[0]?.content?.parts?.[0]) {
        const extractedText = result.candidates[0].content.parts[0].text.trim()
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
      } else {
        throw new Error("Tidak ada teks yang ditemukan atau format respons tidak valid.")
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
        setError("Harap masukkan API Key Gemini terlebih dahulu di pengaturan.")
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
    [apiKey, extractionMode, selectedFileForRawText],
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
    <div className="bg-gray-900 text-white min-h-screen font-sans p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            LDB Paspor AI
          </h1>
          <p className="text-white/90 mt-2">Artificial Intelligence Help Your Work</p>

          {/* Kontrol dan Pengaturan */}
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              <SettingsIcon />
              Setting API
            </button>

            {processedFiles.length > 0 && (
              <>
                <button
                  onClick={exportToCSV}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                >
                  <DownloadIcon />
                  Export CSV
                </button>
                <button
                  onClick={resetApp}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                  Reset All
                </button>
              </>
            )}
          </div>

          {/* Panel Pengaturan */}
          {showSettings && (
            <div className="mt-6 p-6 bg-gray-800 rounded-xl border border-gray-700 text-left max-w-2xl mx-auto">
              <h3 className="text-xl font-bold mb-4">Setting Your Tool</h3>

              {/* API Key */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">API Key Gemini</label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Masukkan API Key Gemini Anda"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Dapatkan API Key di{" "}
                  <a
                    href="https://makersuite.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:underline"
                  >
                    Fermanta AI Studio
                  </a>
                </p>
              </div>

              {/* Mode Ekstraksi */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Mode Ekstraksi</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="basic"
                      checked={extractionMode === "basic"}
                      onChange={(e) => setExtractionMode(e.target.value)}
                      className="mr-2"
                    />
                    Basic (Cepat)
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="enhanced"
                      checked={extractionMode === "enhanced"}
                      onChange={(e) => setExtractionMode(e.target.value)}
                      className="mr-2"
                    />
                    Enhanced (Akurat)
                  </label>
                </div>
              </div>
            </div>
          )}
        </header>

        <main className="space-y-8">
          {/* Upload Area */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
            <div
              className="border-2 border-dashed border-gray-600 rounded-xl text-center p-8 cursor-pointer hover:border-gray-500 transition-colors duration-300"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <UploadIcon />
              <p className="mt-4 text-xl font-semibold">Upload Multiple Passport Files</p>
              <p className="text-gray-400 mt-2">Drag & drop files or click to selec</p>
              <p className="text-sm text-gray-500 mt-2">PNG, JPG, WEBP, PDF (Max 20MB per file)</p>
              {isProcessing && (
                <div className="mt-4 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-400"></div>
                  <span className="ml-2">Processing files...</span>
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

          {error && (
            <div className="text-red-400 p-3 bg-red-900/50 rounded-lg border border-red-700 space-y-2">
              <p>
                <strong>Error:</strong> {error}
              </p>
              <button
                onClick={() => setShowSettings(true)}
                className="px-3 py-1 rounded bg-purple-600 hover:bg-purple-700 text-sm"
              >
                Buka Pengaturan
              </button>
            </div>
          )}

          {/* Results Table */}
          {processedFiles.length > 0 && (
            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-200 flex items-center gap-2">
                  <TableIcon />
                  Hasil Ekstraksi ({processedFiles.length} files)
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-300">
                  <thead className="text-xs text-gray-400 uppercase bg-gray-900/50">
                    <tr>
                      <th scope="col" className="px-4 py-3">
                        File Name
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Passport No
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Full Name
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Date of Birth
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Place of Birth
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Date of Issue
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Date of Expiry
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-900/50">
                    {processedFiles.map((file) => (
                      <tr key={file.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                        <td className="px-4 py-3 font-medium text-purple-300">{file.file.name}</td>
                        <td className="px-4 py-3">
                          {file.isProcessing ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-400"></div>
                          ) : file.error ? (
                            <span className="text-red-400">Error</span>
                          ) : (
                            file.structuredData.passportNo || "N/A"
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {file.isProcessing ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-400"></div>
                          ) : file.error ? (
                            <span className="text-red-400">Error</span>
                          ) : (
                            file.structuredData.fullName || "N/A"
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {file.isProcessing ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-400"></div>
                          ) : file.error ? (
                            <span className="text-red-400">Error</span>
                          ) : (
                            file.structuredData.dateOfBirth || "N/A"
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {file.isProcessing ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-400"></div>
                          ) : file.error ? (
                            <span className="text-red-400">Error</span>
                          ) : (
                            file.structuredData.placeOfBirth || "N/A"
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {file.isProcessing ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-400"></div>
                          ) : file.error ? (
                            <span className="text-red-400">Error</span>
                          ) : (
                            file.structuredData.dateOfIssue || "N/A"
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {file.isProcessing ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-400"></div>
                          ) : file.error ? (
                            <span className="text-red-400">Error</span>
                          ) : (
                            file.structuredData.dateOfExpiry || "N/A"
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => removeFile(file.id)}
                            className="p-1 rounded bg-red-600 hover:bg-red-700 transition-colors"
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
          )}

          {/* Raw Text Display with File Selector */}
          {processedFiles.length > 0 && (
            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Raw Text</h3>
                <select
                  value={selectedFileForRawText}
                  onChange={(e) => setSelectedFileForRawText(e.target.value)}
                  className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none text-sm"
                >
                  {processedFiles.map((file) => (
                    <option key={file.id} value={file.id}>
                      {file.file.name}
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                readOnly
                value={selectedFile?.extractedText || ""}
                placeholder="Raw extracted text will appear here..."
                className="w-full h-40 p-4 bg-gray-900/50 border border-gray-600 rounded-lg text-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none text-sm"
              />
              {selectedFile?.extractedText && (
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-gray-400">
                    Karakter: {selectedFile.extractedText.length} | File: {selectedFile.file.name}
                  </p>
                  <button
                    onClick={() => copyToClipboard(selectedFile.extractedText)}
                    className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors duration-200"
                    title="Salin Raw Text"
                  >
                    {copySuccess ? <CheckIcon /> : <CopyIcon />}
                  </button>
                </div>
              )}
            </div>
          )}
        </main>

        <footer className="text-center mt-10 text-white text-sm">
          <p>Ditenagai oleh Fermanta x Gemini AI. </p>
          <p className="mt-1">Part Of Tools Laman Davindo Bahman.</p>
        </footer>
      </div>
    </div>
  )
}
