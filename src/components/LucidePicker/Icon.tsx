'use client'

import React, { memo } from 'react'
import dynamic from 'next/dynamic'
import { LucideProps } from 'lucide-react'
import dynamicIconImports from 'lucide-react/dynamicIconImports'

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: keyof typeof dynamicIconImports;
}

const IconCache: Record<string, React.ComponentType<LucideProps>> = {}

const IconComponent = ({ name, ...props }: IconProps) => {
  // Check if the icon is already in cache
  if (!IconCache[name]) {
    IconCache[name] = dynamic(dynamicIconImports[name], {
      loading: () => (
        <div 
          style={{ 
            width: props.size, 
            height: props.size 
          }} 
          className="animate-pulse bg-muted rounded"
        />
      ),
      ssr: false
    })
  }

  const LucideIcon = IconCache[name]
  return <LucideIcon {...props} />
}

IconComponent.displayName = 'IconComponent'

// Memoize the component to prevent unnecessary re-renders
const Icon = memo(IconComponent)

export default Icon