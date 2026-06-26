// services/ocr.service.ts

interface OCRResult {
  plate: string;
  debug: string;
  raw?: unknown;
}

function normalizePlateText(text: string): string {
  return text
    .toUpperCase()
    .replace(/[\r\n]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    // Common OCR mistakes
    .replace(/O/g, "0")
    .replace(/I/g, "1")
    .replace(/L/g, "1");
}

function extractPlateFromText(
  text: string
): string | null {
  const cleaned = normalizePlateText(text);

  const patterns = [
    /\b[A-Z]{3}\s?\d{4}\b/, // ABC1234
    /\b[A-Z]{2}\s?\d{5}\b/, // AB12345
    /\b[A-Z]{2}\s?\d{4}\b/, // AB1234
    /\b[A-Z]{3}\s?\d{3}\b/, // ABC123
    /\b[A-Z]{2,3}[- ]?\d{3,5}\b/,
  ];

  for (const pattern of patterns) {
    const match = cleaned.match(pattern);

    if (match) {
      return match[0].replace(
        /[^A-Z0-9]/g,
        ""
      );
    }
  }

  return null;
}

export async function recognizePlate(
  file: File
): Promise<OCRResult> {
  const formData = new FormData();

  formData.append("file", file);

  // OCR.Space Optimizations
  formData.append("language", "eng");
  formData.append("OCREngine", "2");
  formData.append("scale", "true");
  formData.append(
    "isOverlayRequired",
    "true"
  );

  const response = await fetch(
    "https://api.ocr.space/parse/image",
    {
      method: "POST",
      headers: {
        apikey:
          import.meta.env.VITE_OCR_API_KEY,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error(
      `OCR request failed (${response.status})`
    );
  }

  const data = await response.json();

  if (data.IsErroredOnProcessing) {
    throw new Error(
      data.ErrorMessage?.join(", ") ??
        "OCR processing failed"
    );
  }

  const text =
    data.ParsedResults?.[0]
      ?.ParsedText ?? "";

  const plate =
    extractPlateFromText(text);

  return {
    plate: plate ?? "",
    debug: text,
    raw: data,
  };
}