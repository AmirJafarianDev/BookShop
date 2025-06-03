import ProfileSidebar from '@/components/layout/ProfileSidebar'
import React from 'react'

function layoutProfile({children}) {
  return (
    <ProfileSidebar>
        {children}
    </ProfileSidebar>
  )
}

export default layoutProfile