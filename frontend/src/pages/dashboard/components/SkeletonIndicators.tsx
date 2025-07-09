export const SkeletonIndicators = () => {
    return (
        <>
            {Array.from({ length: 4 }).map( (_, idx) => (
                <div key={idx} className="h-[100px] rounded-md bg-[#1E293B] animate-pulse shadow-sm border border-[#334155]" />
            ))}
        </>
    )
}