import { useCallback, useRef, useState } from 'react'

interface Props {
  onFiles: (files: FileList | File[]) => void
  multiple?: boolean
}

export default function FileDropZone({ onFiles, multiple = true }: Props) {
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files.length > 0) {
      onFiles(e.dataTransfer.files)
    }
  }, [onFiles])

  const handleClick = () => inputRef.current?.click()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFiles(e.target.files)
      e.target.value = ''
    }
  }

  return (
    <div
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${
        isDragging
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10'
          : 'border-gray-300 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/20 bg-gray-50 dark:bg-white/5'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        multiple={multiple}
        onChange={handleChange}
        className="hidden"
      />
      <svg
        className="mx-auto h-12 w-12 text-gray-400 dark:text-slate-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 16V4m0 0L8 8m4-4l4 4M4 14v4a2 2 0 002 2h12a2 2 0 002-2v-4"
        />
      </svg>
      <p className="mt-3 text-gray-600 dark:text-slate-300">
        PDF 파일을 여기에 드래그하거나 <span className="text-blue-600 dark:text-blue-400 font-medium">클릭하여 선택</span>하세요
      </p>
      {multiple && <p className="mt-1 text-sm text-gray-400 dark:text-slate-500">여러 파일을 한번에 선택할 수 있습니다</p>}
    </div>
  )
}
