"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export interface Option {
    label: string
    value: string
}

interface ComboboxProps {
    options: Option[]
    value?: string
    onChange: (value: string) => void
    placeholder?: string
    emptyText?: string
    className?: string
    disabled?: boolean
}

export function Combobox({
    options = [], // Default to empty array to prevent map errors
    value,
    onChange,
    placeholder = "Select option...",
    emptyText = "No results found.",
    className,
    disabled = false
}: ComboboxProps) {
    const [open, setOpen] = React.useState(false)

    // Find the selected option label safely
    const selectedLabel = React.useMemo(() => {
        if (!value) return ""
        const option = options.find((opt) => opt.value === value)
        return option ? option.label : ""
    }, [options, value])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn("w-full justify-between", className)}
                    disabled={disabled}
                >
                    {value
                        ? selectedLabel || value // Fallback to value if label not found
                        : placeholder}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder={`Search ${placeholder.toLowerCase()}...`} />
                    <CommandList>
                        <CommandEmpty>{emptyText}</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.label} // Search by label
                                    onSelect={(currentValue) => {
                                        // We want to pass back the internal 'value', not the label/currentValue text
                                        onChange(option.value === value ? "" : option.value)
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === option.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {option.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
