"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  date?: Date
  onDateChange?: (date: Date | undefined) => void
  placeholder?: string
  className?: string
}

export function DatePicker({ date, onDateChange, placeholder = "Pick a date", className }: DatePickerProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(date)
  const [inputValue, setInputValue] = React.useState<string>("")

  // Sync selectedDate prop change to local state and input value
  React.useEffect(() => {
    setSelectedDate(date)
    if (date) {
      setInputValue(format(date, "PPP"))
    } else {
      setInputValue("")
    }
  }, [date])

  const handleSelect = (newDate: Date | undefined) => {
    setSelectedDate(newDate)
    onDateChange?.(newDate)
    if (newDate) {
      setInputValue(format(newDate, "PPP"))
    } else {
      setInputValue("")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)

    // Try to parse the input
    const parsedDate = new Date(value)
    
    // Check if it's a valid date and not "Invalid Date"
    // Also minimal check to avoid parsing short numbers prematurely, though regular Date parsing is loose
    if (!isNaN(parsedDate.getTime()) && value.length >= 4) {
       setSelectedDate(parsedDate)
       onDateChange?.(parsedDate)
    } else {
       // If invalid, we might want to set internal state to undefined or keep last valid?
       // For now, let's just not update the parent content until valid
       if (value === "") {
         setSelectedDate(undefined)
         onDateChange?.(undefined)
       }
    }
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Input 
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="flex-1"
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "h-9 w-9 shrink-0",
              !selectedDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

interface DateRangePickerProps {
  from?: Date
  to?: Date
  onRangeChange?: (range: { from: Date | undefined; to: Date | undefined }) => void
  className?: string
}

export function DateRangePicker({ from, to, onRangeChange, className }: DateRangePickerProps) {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({ from, to })

  const handleSelect = (range: DateRange | undefined) => {
    const newRange = range 
      ? { from: range.from, to: range.to } 
      : { from: undefined, to: undefined }
    setDateRange(newRange)
    onRangeChange?.(newRange)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !dateRange?.from && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dateRange?.from ? (
            dateRange.to ? (
              <>
                {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
              </>
            ) : (
              format(dateRange.from, "LLL dd, y")
            )
          ) : (
            <span>Pick a date range</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={dateRange?.from}
          selected={dateRange}
          onSelect={handleSelect}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  )
}
