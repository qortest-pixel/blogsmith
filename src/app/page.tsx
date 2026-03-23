import Link from "next/link";

const steps = [
  {
    num: "01",
    icon: "🔍",
    title: "키워드 입력",
    desc: "타겟 키워드를 입력하면 네이버 검색 데이터를 실시간으로 분석합니다.",
  },
  {
    num: "02",
    icon: "🤖",
    title: "AI 분석 & 최적화",
    desc: "연관 키워드, 검색량, 경쟁도를 분석하여 최적의 글 구조를 설계합니다.",
  },
  {
    num: "03",
    icon: "✍️",
    title: "블로그 글 완성",
    desc: "네이버 SEO에 최적화된 고품질 블로그 글이 자동으로 생성됩니다.",
  },
];

const plans = [
  {
    name: "Free",
    price: "₩0",
    period: "영구 무료",
    desc: "블로그 자동화를 체험해보세요",
    features: ["월 5편 생성", "기본 SEO 분석", "마크다운 다운로드", "표준 글 길이"],
    cta: "무료로 시작하기",
    highlight: false,
  },
  {
    name: "Pro",
    price: "₩29,000",
    period: "/월",
    desc: "본격적인 콘텐츠 마케팅을 위한",
    features: ["월 50편 생성", "심화 SEO 분석 + 점수", "글톤/타겟 커스텀", "연관 키워드 추천", "우선 생성 큐"],
    cta: "Pro 시작하기",
    highlight: true,
  },
  {
    name: "Business",
    price: "₩59,000",
    period: "/월",
    desc: "팀과 대행사를 위한 무제한 플랜",
    features: ["무제한 생성", "팀 멤버 5인", "API 액세스", "브랜드 톤 설정", "전용 고객 지원"],
    cta: "Business 시작하기",
    highlight: false,
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/5 via-white to-[#818cf8]/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28 sm:pt-28 sm:pb-36">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#6366f1]/10 text-[#6366f1] px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-[#6366f1] rounded-full animate-pulse" />
              네이버 SEO 최적화 AI
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
              키워드 하나로<br />
              <span className="text-[#6366f1]">블로그 글</span>이 완성됩니다
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto">
              AI가 네이버 검색 데이터를 분석하고, SEO에 최적화된 블로그 글을 
              자동으로 작성합니다. 몇 초 만에.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/generate"
                className="bg-[#6366f1] hover:bg-[#4f46e5] text-white px-8 py-3.5 rounded-xl text-base font-semibold transition shadow-lg shadow-[#6366f1]/25 hover:shadow-xl hover:shadow-[#6366f1]/30"
              >
                무료로 시작하기 →
              </Link>
              <Link
                href="/pricing"
                className="bg-white hover:bg-gray-50 text-gray-700 px-8 py-3.5 rounded-xl text-base font-semibold transition border border-gray-200"
              >
                가격 안내
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">3단계로 끝나는 블로그 자동화</h2>
            <p className="mt-4 text-gray-500 text-lg">복잡한 과정 없이, 키워드만 입력하세요</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.num} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition group">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{step.icon}</span>
                  <span className="text-xs font-bold text-[#6366f1] bg-[#6366f1]/10 px-2.5 py-1 rounded-full">
                    STEP {step.num}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">합리적인 가격</h2>
            <p className="mt-4 text-gray-500 text-lg">무료로 시작하고, 필요할 때 업그레이드하세요</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 ${
                  plan.highlight
                    ? "bg-[#6366f1] text-white shadow-xl shadow-[#6366f1]/25 ring-4 ring-[#6366f1]/20 scale-105"
                    : "bg-white border border-gray-200 shadow-sm"
                }`}
              >
                <div className="mb-6">
                  <h3 className={`text-lg font-semibold ${plan.highlight ? "text-white/90" : "text-gray-500"}`}>
                    {plan.name}
                  </h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className={`text-4xl font-extrabold ${plan.highlight ? "text-white" : "text-gray-900"}`}>
                      {plan.price}
                    </span>
                    <span className={`text-sm ${plan.highlight ? "text-white/70" : "text-gray-400"}`}>
                      {plan.period}
                    </span>
                  </div>
                  <p className={`mt-2 text-sm ${plan.highlight ? "text-white/70" : "text-gray-400"}`}>{plan.desc}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <svg className={`w-5 h-5 shrink-0 mt-0.5 ${plan.highlight ? "text-white/80" : "text-[#6366f1]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={plan.highlight ? "text-white/90" : "text-gray-600"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/generate"
                  className={`block text-center py-3 rounded-xl text-sm font-semibold transition ${
                    plan.highlight
                      ? "bg-white text-[#6366f1] hover:bg-gray-100"
                      : "bg-[#6366f1] text-white hover:bg-[#4f46e5]"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#6366f1]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">지금 바로 시작하세요</h2>
          <p className="mt-4 text-white/70 text-lg">가입 없이 무료로 블로그 글을 생성해보세요</p>
          <Link
            href="/generate"
            className="inline-block mt-8 bg-white text-[#6366f1] hover:bg-gray-100 px-10 py-4 rounded-xl text-base font-bold transition shadow-lg"
          >
            무료로 글 생성하기 →
          </Link>
        </div>
      </section>
    </div>
  );
}
