import { ShieldCheckIcon } from '@heroicons/react/24/solid';

function Header() {
  return (
    <header className="bg-primary shadow-lg">
      <div className="container mx-auto px-4 py-5">
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
              <ShieldCheckIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Crime Awareness Chatbot
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;