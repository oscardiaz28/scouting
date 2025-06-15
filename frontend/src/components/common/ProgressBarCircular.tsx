export const ProgressBarCircular = ({ value }: { value: number }) => {

    const radius = 40;
    const circumference = Math.PI * radius;
    const clamped = Math.min(100, Math.max(0, value));
    const offset = circumference * (1 - clamped / 100);


    return (
        <svg viewBox="0 0 100 50" className="w-32 h-16">
            <path
                d="M10 50 A40 40 0 0 1 90 50"
                fill="none"
                stroke="#e5e7eb" 
                strokeWidth="10"
            />
            <path
                d="M10 50 A40 40 0 0 1 90 50"
                fill="none"
                stroke="#13AA14" // blue-500
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.3s ease' }}
            />
        </svg>
    );
}