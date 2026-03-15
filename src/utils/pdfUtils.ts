import { PDFDocument } from 'pdf-lib'
import JSZip from 'jszip'
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

// PDF에서 지정 구간의 페이지를 하나의 PDF로 추출
export async function splitPageRange(file: File, startPage: number, endPage: number): Promise<Uint8Array> {
  const buffer = await file.arrayBuffer()
  const srcPdf = await PDFDocument.load(buffer)
  const newPdf = await PDFDocument.create()
  const indices = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage - 1 + i)
  const pages = await newPdf.copyPages(srcPdf, indices)
  pages.forEach(page => newPdf.addPage(page))
  return newPdf.save()
}

// PDF를 각 페이지별로 분리
export async function splitPages(file: File): Promise<{ pageNumber: number; bytes: Uint8Array }[]> {
  const buffer = await file.arrayBuffer()
  const srcPdf = await PDFDocument.load(buffer)
  const totalPages = srcPdf.getPageCount()
  const results: { pageNumber: number; bytes: Uint8Array }[] = []

  for (let i = 0; i < totalPages; i++) {
    const newPdf = await PDFDocument.create()
    const [page] = await newPdf.copyPages(srcPdf, [i])
    newPdf.addPage(page)
    const bytes = await newPdf.save()
    results.push({ pageNumber: i + 1, bytes })
  }

  return results
}

// 분리된 페이지들을 ZIP으로 다운로드
export async function downloadPagesAsZip(
  pages: { pageNumber: number; bytes: Uint8Array }[],
  originalFileName: string
) {
  const zip = new JSZip()
  const baseName = originalFileName.replace(/\.pdf$/i, '')

  for (const page of pages) {
    zip.file(`${baseName}_page_${page.pageNumber}.pdf`, page.bytes)
  }

  const blob = await zip.generateAsync({ type: 'blob' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${baseName}_pages.zip`
  link.click()
  URL.revokeObjectURL(url)
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
