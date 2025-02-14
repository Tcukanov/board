import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  const cities = ["All Cities", "New York", "Los Angeles", "Chicago", "Houston", "San Francisco"];
  const languages = { "EN": "English", "RU": "Russian", "UKR": "Ukrainian", "UZ": "Uzbek" };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCity = e.target.value;
    router.push(selectedCity === "All Cities" ? "/" : `/?city=${selectedCity}`);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = e.target.value;
    router.push(`/?lang=${selectedLanguage}`);
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <a href="/" className="text-white text-lg font-bold">Job Board</a>
      <div className="flex space-x-4">
        <select className="p-2 border rounded" onChange={handleCityChange}>
          {cities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
        <select className="p-2 border rounded" onChange={handleLanguageChange}>
          {Object.entries(languages).map(([code, name]) => (
            <option key={code} value={code}>{name}</option>
          ))}
        </select>
      </div>
    </nav>
  );
}