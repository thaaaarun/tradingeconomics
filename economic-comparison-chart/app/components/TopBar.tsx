import RefreshButton from './RefreshButton'

interface TopBarProps {
  countryA: string;
  countryB: string;
  indicator: string;
  onRefresh: () => void;
}

export default function TopBar({ countryA, countryB, indicator, onRefresh }: TopBarProps) {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 p-4 border-b-2 border-gray-300 shadow-sm flex justify-between items-center">
      <div className="text-2xl font-bold text-gray-800">
        {countryA} vs {countryB}: {indicator}
      </div>
      <RefreshButton
        countryA={countryA}
        countryB={countryB}
        indicator={indicator}
        onRefresh={onRefresh}
      />
    </div>
  )
}

