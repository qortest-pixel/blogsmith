import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "가격 안내 — Blogsmith",
  description: "Blogsmith 요금제를 확인하세요. 무료부터 Business까지, 필요에 맞는 플랜을 선택하세요.",
};

const plans = [
  {
    name: "Free",
    price: "₩0",
    period: "영구 무료",
    desc: "블로그 자동화를 체험해보세요",
    features: [
      "월 5편 생성",
      "기본 SEO 분석",
      "마크다운 다운로드",
      "표준 글 길이 (1,500자)",
      "이메일 지원",
    ],
    limits: ["글톤 커스텀 불가", "연관 키워드 미표시"],
    cta: "무료로 시작하기",
    highlight: false,
  },
  {
    name: "Pro",
    price: "₩29,000",
    period: "/월",
    desc: "본격적인 콘텐츠 마케팅을 위한",
    features: [
      "월 50편 생성",
      "심화 SEO 분석 + 점수",
      "글톤/타겟 커스텀",
      "연관 키워드 + 검색량 표시",
      "긴 글 (3,000자+)",
      "우선 생성 큐",
      "카카오톡 지원",
    ],
    limits: [],
    cta: "Pro 시작하기",
    highlight: true,
  },
  {
    name: "Business",
    price: "₩59,000",
    period: "/월",
    desc: "팀과 대행사를 위한 무제한 플랜",
    features: [
      "무제한 생성",
      "팀 멤버 5인",
      "API 액세스",
      "브랜드 톤 설정",
      "벌크 생성 (CSV 업로드)",
      "전용 고객 지원",
      "커스텀 프롬프트",
    ],
    limits: [],
    cta: "Business 시작하기",
    highlight: false,
  },
];

const faqs = [
  {
    q: "무료 플랜에 기간 제한이 있나요?",
    a: "아닙니다. 무료 플랜은 영구적으로 이용 가능합니다. 월 5편의 제한만 있습니다.",
  },
  {
    q: "환불 정책은 어떻게 되나요?",
    a: "결제 후 7일 이내에 사용량이 3편 이하인 경우 전액 환불이 가능합니다.",
  },
  {
    q: "생성된 글의 저작권은 누구에게 있나요?",
    a: "생성된 모든 콘텐츠의 저작권은 사용자에게 있습니다. 자유롭게 사용하세요.",
  },
  {
    q: "플랜 변경은 언제든 가능한가요?",
    a: "네, 언제든 업그레이드/다운그레이드가 가능합니다. 차액은 일할 계산됩니다.",
  },
];

export default function PricingPage() {
  return (
    <div>
      {/* Header */}
      <section className="pt-20 pb-12 bg-gradient-to-b from-[#6366f1]/5 to-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">합리적인 가격</h1>
          <p className="mt-4 text-lg text-gray-500">무료로 시작하고, 성장에 맞춰 업그레이드하세요</p>
        </div>
      </section>

      {/* Plans */}
      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 flex flex-col ${
                  plan.highlight
                    ? "bg-[#6366f1] text-white shadow-xl shadow-[#6366f1]/25 ring-4 ring-[#6366f1]/20 md:scale-105"
                    : "bg-white border border-gray-200 shadow-sm"
                }`}
              >
                <div className="mb-6">
                  <h2 className={`text-lg font-semibold ${plan.highlight ? "text-white/90" : "text-gray-500"}`}>
                    {plan.name}
                  </h2>
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

                <ul className="space-y-3 mb-4 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <svg className={`w-5 h-5 shrink-0 mt-0.5 ${plan.highlight ? "text-white/80" : "text-[#6366f1]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={plan.highlight ? "text-white/90" : "text-gray-600"}>{f}</span>
                    </li>
                  ))}
                  {plan.limits.map((l) => (
                    <li key={l} className="flex items-start gap-2 text-sm">
                      <svg className="w-5 h-5 shrink-0 mt-0.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="text-gray-400">{l}</span>
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

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">자주 묻는 질문</h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
