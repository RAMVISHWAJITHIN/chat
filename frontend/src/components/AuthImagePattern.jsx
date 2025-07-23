const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] px-10 py-16 min-h-screen">
      <div className="w-full max-w-md rounded-3xl bg-white/5 border border-white/20 backdrop-blur-md p-8 shadow-xl text-center">
        {/* Animated Grid Pattern */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-xl ${
                i % 2 === 0
                  ? "bg-white/20 animate-pulse"
                  : "bg-white/10 hover:bg-white/20 transition"
              }`}
            />
          ))}
        </div>

        {/* Auth Text */}
        <h2 className="text-2xl font-bold text-white mb-2 tracking-wide">
          {title}
        </h2>
        <p className="text-white/80 text-sm leading-relaxed">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;


