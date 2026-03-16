export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 mix-blend-difference text-white">
      <div className="text-xl font-bold uppercase tracking-widest">Brand</div>
      <ul className="flex gap-6 text-sm uppercase tracking-wide">
        <li className="cursor-pointer hover:opacity-70 transition-opacity">
          Work
        </li>
        <li className="cursor-pointer hover:opacity-70 transition-opacity">
          About
        </li>
        <li className="cursor-pointer hover:opacity-70 transition-opacity">
          Contact
        </li>
      </ul>
    </nav>
  );
}
