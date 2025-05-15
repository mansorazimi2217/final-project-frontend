const Button = ({ children, variant = "primary", ...props }) => (
  <button
    {...props}
    className={`px-4 py-2 rounded-lg shadow transition ${
      variant === "primary"
        ? "bg-[#006EBD] hover:[#006ECE] text-white"
        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
    }`}
  >
    {children}
  </button>
);

export default Button;
