interface Cache {
  data: any
  timestamp: number
}

const cache = new Map<string, Cache>()

export function clearCache(country?: string, indicator?: string) {
  if (country && indicator) {
    cache.delete(`${country}-${indicator}`)
  } else {
    cache.clear()
  }
}
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour in milliseconds

export const countries = ['Sweden', 'Mexico', 'Thailand', 'New Zealand']
export const indicators = ['GDP', 'Unemployment Rate', 'Auto Exports']

interface TEData {
  Country: string
  DateTime: string
  Value: number
}

async function fetchDataFromAPI(country: string, indicator: string): Promise<any> {
  const url = `/api/economic?country=${encodeURIComponent(country)}&indicator=${encodeURIComponent(indicator)}`
  const response = await fetch(url)
  return response.json()
}

export async function fetchData(country: string, indicator: string): Promise<{year: number, value: number}[]> {
  const cacheKey = `${country}-${indicator}`
  const now = Date.now()
  const cached = cache.get(cacheKey)

  if (cached && (now - cached.timestamp) < CACHE_DURATION) {
    return cached.data
  }

  try {
    const data = await fetchDataFromAPI(country, indicator)
    
    if (!Array.isArray(data)) {
      console.error('Expected array, got:', typeof data)
      return []
    }

    const yearMap = new Map<number, number>()
    
    data
      .sort((a, b) => new Date(b.DateTime).getTime() - new Date(a.DateTime).getTime())
      .forEach((item: TEData) => {
        const year = new Date(item.DateTime).getFullYear()
        if (!yearMap.has(year)) {
          yearMap.set(year, item.Value)
        }
      })
    
    const processedData = Array.from(yearMap.entries())
      .slice(0, -1)
      .map(([year, value]) => ({ year, value }))

    // Cache the processed data
    cache.set(cacheKey, {
      data: processedData,
      timestamp: now
    })

    return processedData
  } catch (error) {
    console.error('Error fetching data:', error)
    return []
  }
}

export async function generateData(countryA: string, countryB: string, indicator: string) {
  try {
    const dataA = await fetchData(countryA, indicator)
    await new Promise(resolve => setTimeout(resolve, 1000))
    const dataB = await fetchData(countryB, indicator)
    
    // Combine all years from both countries
    const allYears = [...new Set([
      ...dataA.map(d => d.year),
      ...dataB.map(d => d.year)
    ])].sort()
    
    return allYears.map(year => ({
      year,
      [countryA]: dataA.find(d => d.year === year)?.value || null,
      [countryB]: dataB.find(d => d.year === year)?.value || null
    }))
  } catch (error) {
    console.error('Error generating data:', error)
    return []
  }
}