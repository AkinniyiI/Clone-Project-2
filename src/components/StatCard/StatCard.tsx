
type StatCardProps = {
  title: string
  value: string | number
  description: string
  valueColor?: string
}

const StatCard = ({ title, value, description, valueColor }: StatCardProps) => {
  return (
    <>
      <div className="w-full max-w-81 rounded-[14px] border border-[#dfe3e8] bg-white px-5.5 py-5">
      {/* Title */}
      <p className="mb-2 text-[13px] font-medium uppercase text-[#63708a]">
        {title}
      </p>

      {/* Value */}
      <p className={`text-[24px] font-bold leading-none ${valueColor}`}>
        {value}
      </p>

      {/* Description */}
      <p className="mt-3 text-[15px] text-[#69758d]">
        {description}
      </p>
    </div>
    </>
  )
}

export default StatCard
