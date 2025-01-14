"use client"

import { useState, useEffect } from 'react'
import { Card } from "@/components/ui/card"
import TopBar from './components/TopBar'
import CountrySelector from './components/CountrySelector'
import IndicatorSelector from './components/IndicatorSelector'
import ComparisonChart from './components/ComparisonChart'
import { countries, indicators, generateData, clearCache } from './data'

export default function EconomicComparison() {
  const [countryA, setCountryA] = useState(countries[0])
  const [countryB, setCountryB] = useState(countries[1])
  const [indicator, setIndicator] = useState(indicators[0])
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  async function fetchData() {
    setLoading(true)
    const newData = await generateData(countryA, countryB, indicator)
    setData(newData)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [countryA, countryB, indicator])

  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{
      backgroundColor: '#f5f5f5',
      backgroundImage: 'radial-gradient(circle, #d1d1d1 1px, transparent 1px)',
      backgroundSize: '20px 20px'
    }}>
      <Card className="w-[95%] h-[95vh] overflow-hidden shadow-lg shadow-gray-500">
        <TopBar 
          countryA={countryA} 
          countryB={countryB} 
          indicator={indicator} 
          onRefresh={() => {
            clearCache(countryA, indicator);
            clearCache(countryB, indicator);
            fetchData();
          }}
        />
        <div className="p-6 h-[calc(100%-4rem)]">
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4">
              <CountrySelector
                label="Country A"
                value={countryA}
                onChange={setCountryA}
                options={countries}
              />
              <CountrySelector
                label="Country B"
                value={countryB}
                onChange={setCountryB}
                options={countries}
              />
            </div>
            <div className="flex gap-4 items-center">
              <IndicatorSelector
                value={indicator}
                onChange={setIndicator}
                options={indicators}
              />
            </div>
          </div>
          {loading ? (
            <div className="h-full flex items-center justify-center">
              Loading data...
            </div>
          ) : (
            <div className="h-[calc(100%-4rem)]">
              <ComparisonChart 
                data={data} 
                countryA={countryA} 
                countryB={countryB} 
                indicator={indicator} 
              />
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}