import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface IndicatorSelectorProps {
  value: string
  onChange: (value: string) => void
  options: string[]
}

export default function IndicatorSelector({
  value,
  onChange,
  options,
}: IndicatorSelectorProps) {
  const [search, setSearch] = useState("")

  // Filter options based on the search query
  const filteredOptions = options.filter((indicator) =>
    indicator.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Indicator</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select an indicator" />
        </SelectTrigger>
        <SelectContent>
          {/* Search Input */}
          <div className="p-2">
            <input
              type="text"
              className="w-full px-2 py-1 border border-gray-300 rounded-md"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Filtered Options */}
          {filteredOptions.length > 0 ? (
            filteredOptions.map((indicator) => (
              <SelectItem key={indicator} value={indicator}>
                {indicator}
              </SelectItem>
            ))
          ) : (
            <div className="p-2 text-gray-500">No results found</div>
          )}
        </SelectContent>
      </Select>
    </div>
  )
}
