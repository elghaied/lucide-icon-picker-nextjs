'use client'

import React, { useState, useEffect, memo } from 'react'
import dynamicIconImports from 'lucide-react/dynamicIconImports'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination"
import Icon from './Icon'

interface IconButtonProps {
  iconName: string;
  isSelected: boolean;
  onClick: () => void;
}

const IconButton = memo(({ iconName, isSelected, onClick }: IconButtonProps) => (
  <Button
    variant="outline"
    className={`p-2 aspect-square ${isSelected ? 'ring-2 ring-primary' : ''}`}
    onClick={onClick}
  >
    <Icon name={iconName as keyof typeof dynamicIconImports} size={24} aria-hidden="true" />
  </Button>
))
IconButton.displayName = 'IconButton'

interface LucideIconSelectorProps {
  onSelectIcon: (iconName: string) => void;
}

export default function LucideIconSelector({ onSelectIcon }: LucideIconSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
  const iconsPerPage = 40 // 4x10 grid

  const allIcons = Object.keys(dynamicIconImports) as (keyof typeof dynamicIconImports)[]

  const filteredIcons = allIcons.filter((iconName) =>
    iconName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredIcons.length / iconsPerPage)

  const currentIcons = filteredIcons.slice(
    (currentPage - 1) * iconsPerPage,
    currentPage * iconsPerPage
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  const handleIconClick = (iconName: string) => {
    setSelectedIcon(iconName)
    onSelectIcon(iconName)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-4">
      <Input
        type="text"
        placeholder="Search icons..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full"
      />
      <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-10 gap-2">
        {currentIcons.map((iconName) => (
          <IconButton
            key={iconName}
            iconName={iconName}
            isSelected={selectedIcon === iconName}
            onClick={() => handleIconClick(iconName)}
          />
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, index) => {
            if (
              index === 0 ||
              index === totalPages - 1 ||
              (index >= currentPage - 2 && index <= currentPage + 1)
            ) {
              return (
                <PaginationItem key={index}>
                  <PaginationLink
                    onClick={() => handlePageChange(index + 1)}
                    isActive={currentPage === index + 1}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              )
            } else if (
              index === currentPage - 3 ||
              index === currentPage + 2
            ) {
              return (
                <PaginationItem key={index}>
                  <PaginationEllipsis />
                </PaginationItem>
              )
            }
            return null
          })}
          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
              className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}