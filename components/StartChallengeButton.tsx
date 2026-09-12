export default function StartChallengeButton() {
    return (
        <button className="group flex items-center gap-3 rounded-full bg-white pl-5 pr-1.5 py-1.5 text-[17px] font-bold leading-none text-black">
            <span className="leading-none">Start a challenge</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-lime-400 text-black transition-transform duration-300 group-hover:rotate-45">
                <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M7 17 17 7" />
                    <path d="M7 7h10v10" />
                </svg>
            </span>
        </button>
    )
}
