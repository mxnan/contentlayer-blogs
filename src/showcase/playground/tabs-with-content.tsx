import React from 'react'
import TabsWithContent from "@/components/ui/tabs-with-content"

const TabsWithContentShowcase = () => {
  const tabs = ["preview", "code"]
  const tabContent = [
    "This is the preview content.",
    "This is the code content.",
  ]

  return (
    <section className="flex-1 relative min-h-screen">
      <TabsWithContent tabs={tabs} tabContent={tabContent} />
    </section>
  )
}

export default TabsWithContentShowcase