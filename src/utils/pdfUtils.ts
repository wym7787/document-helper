import { PDFDocument } from 'pdf-lib'
import type { PdfFile } from '../types'

// PDF 파일의 페이지 수를 반환
export async function getPageCount(file: File): Promise<number> {
  const buffer = await file.arrayBuffer()
  const pdf = await PDFDocument.load(buffer)
  return pdf.getPageCount()
}

// 각 PDF의 첫 번째 페이지만 추출하여 하나의 PDF로 병합
export async function mergeFirstPages(pdfFiles: PdfFile[]): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.create()

  for (const pdfFile of pdfFiles) {
    const buffer = await pdfFile.file.arrayBuffer()
    const srcPdf = await PDFDocument.load(buffer)
    const [firstPage] = await mergedPdf.copyPages(srcPdf, [0])
    mergedPdf.addPage(firstPage)
  }

  return mergedPdf.save()
}

// 각 PDF의 모든 페이지를 순서대로 병합
export async function mergeAllPages(pdfFiles: PdfFile[]): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.create()
  for (const pdfFile of pdfFiles) {
    const buffer = await pdfFile.file.arrayBuffer()
    const srcPdf = await PDFDocument.load(buffer)
    const pageIndices = Array.from({ length: srcPdf.getPageCount() }, (_, i) => i)
    const pages = await mergedPdf.copyPages(srcPdf, pageIndices)
    pages.forEach(page => mergedPdf.addPage(page))
  }
  return mergedPdf.save()
}

// PDF 바이트를 파일로 다운로드
export function downloadPdf(bytes: Uint8Array, filename: string) {
  const blob = new Blob([bytes as BlobPart], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}
