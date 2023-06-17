export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white dark:text-gray-800 rounded-md font-semibold text-sm uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 transition duration-300 ease-in-out ${
                    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
