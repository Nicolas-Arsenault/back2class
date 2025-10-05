import React, { useState } from 'react'
import LoggedInNavBar from '../../components/LoggedInNavBar';
import FilterButton from '../../components/FilterButton';

function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <LoggedInNavBar />
      <FilterButton />
    </div>
  )
}

export default DashboardPage
