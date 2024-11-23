'use client'

export default function Dashboard() {
  return (
    <div className="min-h-screen w-full m-0 overflow-hidden relative bg-[#f5f5f1] flex flex-col items-center justify-center p-4">
      <div className="text-center w-full max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl xl:text-9xl text-[#2E8B57] font-bold leading-tight tracking-tight">
          <span className="block mb-1 sm:mb-2">O SERVIÇO SOCIAL</span>
          <span className="block mb-1 sm:mb-2">É UMA GRANDE</span>
          <span className="block">FACHADA</span>
        </h1>
        <p className="mt-3 sm:mt-5 md:mt-6 text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl max-w-[280px] sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto leading-relaxed">
          Um sistema que perpetua desigualdades sociais sob o pretexto de ajuda, mascarando problemas estruturais sem resolver as verdadeiras causas da pobreza e exclusão social em Portugal.
        </p>
      </div>
    </div>
  );
}