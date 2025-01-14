import { RefreshCw } from 'lucide-react'

interface RefreshButtonProps {
  countryA: string;
  countryB: string;
  indicator: string;
  onRefresh: () => void;
}

export default function RefreshButton({ countryA, countryB, indicator, onRefresh }: RefreshButtonProps) {
  return (
    <button
      onClick={onRefresh}
      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
    >
      <RefreshCw className="w-4 h-4" />
      <span>Refresh Data</span>
    </button>
  )
}