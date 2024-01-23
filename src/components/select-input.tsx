import { forwardRef, SelectHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement>

const Select = forwardRef<HTMLSelectElement, SelectProps>(
	({ children, className, ...props }, ref) => {
		return (
			<select
				className={twMerge(
					'block w-full rounded-xl border-0 px-3 py-3 leading-[22px] text-gray-900  ring-1 ring-inset ring-[#D0D5DD] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-special-gray-500 focus:placeholder:text-special-gray-500',
					className,
				)}
				ref={ref}
				{...props}
			>
				{children}
			</select>
		)
	},
)

Select.displayName = 'Select'

export { Select }
