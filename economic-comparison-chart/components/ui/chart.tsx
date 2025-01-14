"use client"

import * as React from "react"
import { ChartTooltipProps } from "recharts"

export function ChartContainer({
  config,
  children,
  className,
}: {
  config: Record<string, { label: string; color: string }>
  children: React.ReactNode
  className?: string
}) {
  const [style, setStyle] = React.useState<Record<string, string>>({})

  React.useEffect(() => {
    const newStyle = Object.entries(config).reduce((acc, [key, value]) => {
      acc[`--color-${key}`] = value.color
      return acc
    }, {} as Record<string, string>)
    setStyle(newStyle)
  }, [config])

  return (
    <div className={className} style={style}>
      {children}
    </div>
  )
}

export function ChartTooltip({
  active,
  payload,
  label,
  content,
  ...props
}: ChartTooltipProps<number, string>) {
  if (!active || !payload) {
    return null
  }

  if (content) {
    return <>{content}</>
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col">
          <span className="text-[0.70rem] uppercase text-muted-foreground">
            {label}
          </span>
          <span className="font-bold text-muted-foreground">
            {payload[0]?.value}
          </span>
        </div>
        {payload.map((item) => (
          <div key={item.dataKey} className="flex flex-col">
            <span
              className="text-[0.70rem] uppercase"
              style={{ color: item.color }}
            >
              {item.dataKey}
            </span>
            <span className="font-bold" style={{ color: item.color }}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ChartTooltipContent({
  indicator,
  hideLabel,
  nameKey,
}: {
  indicator?: string
  hideLabel?: boolean
  nameKey?: string
}) {
  return function TooltipContent({
    active,
    payload,
    label,
  }: ChartTooltipProps<number, string>) {
    if (!active || !payload) {
      return null
    }

    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          {!hideLabel && (
            <div className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">
                {nameKey || "Year"}
              </span>
              <span className="font-bold text-muted-foreground">{label}</span>
            </div>
          )}
          {payload.map((item) => (
            <div key={item.dataKey} className="flex flex-col">
              <span
                className="text-[0.70rem] uppercase"
                style={{ color: item.color }}
              >
                {item.name}
              </span>
              <span className="font-bold" style={{ color: item.color }}>
                {item.value} {indicator}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }
}


