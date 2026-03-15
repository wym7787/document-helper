interface Props {
  onNavigate: (page: string) => void
}

// 기능 카드 데이터
const features = [
  {
    id: 'pdf-merge',
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    title: 'PDF 병합',
    description: '여러 PDF 파일을 병합하고, 첫페이지들만 따로 추출하여 병합할 수 있습니다. 드래그앤드롭으로 간편하게 사용하세요.',
    actionLabel: '시작하기',
    available: true,
  },
  {
    id: 'pdf-split',
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M4 6h16M4 12h8m-8 6h16" />
      </svg>
    ),
    title: 'PDF 분리',
    description: 'PDF 파일을 페이지별로 분리하여 개별 파일로 다운로드할 수 있습니다. ZIP으로 한번에 받을 수도 있습니다.',
    actionLabel: '시작하기',
    available: true,
  },
  {
    id: 'pdf-compress',
    icon: (
      <svg className="w-8 h-8 text-gray-400 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M19 9l-7 7-7-7" />
      </svg>
    ),
    title: '문서 변경',
    description: '',
    actionLabel: 'Coming Soon',
    available: false,
  },
]

export default function HomePage({ onNavigate }: Props) {
  return (
    <div className="flex-1">
      {/* 히어로 섹션 */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-100 via-gray-100 to-blue-50 dark:from-[#1a2744] dark:via-[#162040] dark:to-[#111827] py-20 px-4 transition-colors duration-200">
        {/* 라이트 모드 배경 장식 요소 */}
        <div className="absolute inset-0 dark:hidden">
          {/* 그라디언트 원형 블롭 */}
          <div className="absolute top-6 left-[10%] w-72 h-72 bg-blue-200/40 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-0 right-[15%] w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-100/50 rounded-full blur-3xl" />

          {/* 기하학적 도형 장식 */}
          <div className="absolute top-12 right-[20%] w-16 h-16 border-2 border-blue-200/60 rounded-xl rotate-12 animate-[spin_20s_linear_infinite]" />
          <div className="absolute bottom-10 left-[18%] w-10 h-10 border-2 border-indigo-200/50 rounded-lg -rotate-12 animate-[spin_25s_linear_infinite_reverse]" />
          <div className="absolute top-1/3 left-[8%] w-6 h-6 bg-blue-300/30 rounded-full animate-bounce" style={{ animationDuration: '3s' }} />
          <div className="absolute top-1/4 right-[10%] w-4 h-4 bg-indigo-300/40 rounded-full animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '1s' }} />

          {/* 도트 패턴 */}
          <svg className="absolute top-8 left-[30%] opacity-20" width="120" height="80" fill="none">
            {[...Array(5)].map((_, row) =>
              [...Array(8)].map((_, col) => (
                <circle key={`${row}-${col}`} cx={col * 16 + 4} cy={row * 16 + 4} r="1.5" fill="#6366f1" />
              ))
            )}
          </svg>
          <svg className="absolute bottom-6 right-[25%] opacity-15" width="100" height="60" fill="none">
            {[...Array(4)].map((_, row) =>
              [...Array(6)].map((_, col) => (
                <circle key={`${row}-${col}`} cx={col * 16 + 4} cy={row * 16 + 4} r="1.5" fill="#3b82f6" />
              ))
            )}
          </svg>

          {/* 가는 라인 장식 */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-blue-300/30" />
          <div className="absolute bottom-0 left-1/3 w-px h-12 bg-gradient-to-t from-transparent to-indigo-300/30" />
        </div>

        <div className="relative max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">문서 작업을 더 쉽게</h1>
          <p className="text-gray-500 dark:text-blue-300 text-lg">간단한 기능으로 편리하게 문서를 관리하세요</p>
        </div>
      </section>

      {/* 기능 카드 섹션 */}
      <section className="py-16 px-4 bg-gradient-to-b from-slate-50 to-blue-50/50 dark:from-[#1e2540] dark:via-[#2a3050] dark:to-[#1e2540] dark:bg-none transition-colors duration-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">제공 기능</h2>
          <p className="text-gray-500 dark:text-slate-400 text-center mb-10">필요한 기능을 선택하세요</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature) => (
              feature.available ? (
                <div
                  key={feature.id}
                  className="bg-white dark:bg-white/5 dark:backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-white/10 flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-blue-400/50 dark:hover:border-blue-400/40 dark:hover:bg-white/10"
                >
                  <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-2xl -mx-6 -mt-6 mb-6" />
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-500 dark:text-slate-300 text-sm flex-1 mb-5">{feature.description}</p>
                  <button
                    onClick={() => onNavigate(feature.id)}
                    className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                  >
                    {feature.actionLabel}
                  </button>
                </div>
              ) : (
                <div
                  key={feature.id}
                  className="bg-gray-50 dark:bg-white/5 dark:backdrop-blur-xl rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-white/8 flex flex-col transition-colors duration-200"
                >
                  <div className="h-1 bg-gray-200 dark:bg-white/10 rounded-t-2xl -mx-6 -mt-6 mb-6" />
                  <div className="w-14 h-14 bg-blue-50 dark:bg-white/10 rounded-xl flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white/60 mb-2">{feature.title}</h3>
                  <p className="text-gray-500 dark:text-white/30 text-sm flex-1 mb-5">{feature.description}</p>
                  <button
                    disabled
                    className="w-full bg-gray-100 dark:bg-white/8 text-gray-400 dark:text-white/30 py-2.5 rounded-lg text-sm font-medium cursor-not-allowed"
                  >
                    {feature.actionLabel}
                  </button>
                </div>
              )
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
