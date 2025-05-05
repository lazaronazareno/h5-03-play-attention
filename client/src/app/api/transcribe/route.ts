// app/api/transcribe/route.ts
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  console.log("POST request received")

  const body = await req.json()
  console.log("Request body parsed:", body)

  const { videoUrl } = body

  if (!videoUrl) {
    console.log("No videoUrl provided")
    return NextResponse.json(
      { error: "Se requiere la URL del video" },
      { status: 400 }
    )
  }

  try {
    console.log("Sending initial request to Gladia API...")
    const initResponse = await fetch("https://api.gladia.io/v2/pre-recorded", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-gladia-key": process.env.GLADIA_API_KEY!,
      },
      body: JSON.stringify({
        audio_url: videoUrl,
        detect_language: true,
        sentences: false,
        translation: true,
        translation_config: {
          model: "base",
          target_languages: ["es"],
        },
        subtitles: true,
        subtitles_config: {
          formats: ["vtt"],
        },
      }),
    })

    console.log("Initial response status:", initResponse.status)

    if (!initResponse.ok) {
      const errorData = await initResponse.json()
      console.log("Error response from Gladia API:", errorData)
      return NextResponse.json(
        { error: errorData },
        { status: initResponse.status }
      )
    }

    const { result_url } = await initResponse.json()
    console.log("Result URL received:", result_url)

    // Esperar el resultado
    let transcriptionResult = null
    const maxAttempts = 10
    let attempts = 0

    while (attempts < maxAttempts) {
      console.log(`Attempt ${attempts + 1} to fetch transcription result...`)
      await new Promise((r) => setTimeout(r, 5000))

      const resultResponse = await fetch(result_url, {
        headers: {
          "x-gladia-key": process.env.GLADIA_API_KEY!,
        },
      })

      console.log("Result response status:", resultResponse.status)

      const resultData = await resultResponse.json()
      console.log("Result data:", resultData)

      if (resultData.status === "done") {
        transcriptionResult = resultData
        console.log("Transcription completed successfully")
        break
      }

      attempts++
    }

    if (!transcriptionResult) {
      console.log("Transcription still in progress after max attempts")
      return NextResponse.json(
        { message: "Transcripción en proceso. Intenta luego." },
        { status: 202 }
      )
    }

    console.log("Returning transcription result")
    const { transcription, translation, ...rest } = transcriptionResult.result

    // Remove utterances from transcription

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { utterances, ...filteredTranscription } = transcription
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { utterances: translationUtterances, ...filteredTranslation } =
      translation.results[0]

    return NextResponse.json({
      transcription: { ...filteredTranscription },
      translation: { ...filteredTranslation },
      ...rest,
    })
  } catch (error) {
    console.error("Error during transcription process:", error)
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}
