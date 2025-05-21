export default function FooterSection() {
  return (
    <footer className="border-t border-gray-700/50 bg-black py-7">
      <div className="container mx-auto max-w-5xl px-4 text-center">
        <p className="font-semibold text-white">
          {new Date().getFullYear()} JepLex. All rights reserved.
        </p>
        <p className="mt-2 text-2xs text-white">
          Designed and built with Next.js, Tailwind, and Full of Patient
        </p>
      </div>
    </footer>
  );
}
