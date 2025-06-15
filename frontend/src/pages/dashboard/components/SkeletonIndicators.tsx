export const SkeletonIndicators = () => {
    return (
        <>
            {Array.from({ length: 4 }).map( (_, idx) => (
                <div key={idx} className="h-[100px] rounded-md bg-[#1A1C1E] animate-pulse shadow-sm" />
            ))}
        </>
    )
}