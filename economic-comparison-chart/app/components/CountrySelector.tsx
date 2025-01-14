import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
  interface CountrySelectorProps {
    label: string
    value: string
    onChange: (value: string) => void
    options: string[]
  }
  
  export default function CountrySelector({ label, value, onChange, options }: CountrySelectorProps) {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
          <SelectContent>
            {options.map((country) => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  }
  
  