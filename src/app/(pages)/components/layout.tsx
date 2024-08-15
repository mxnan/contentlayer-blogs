// app/components/layout.tsx

import ComponentSidebar from "@/components/navigation/component-sidebar";

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex relative min-h-screen ">
      {/* Adjust pt-44 based on your top navbar height */}

      <ComponentSidebar />

      <div className="relative w-full md:ml-48 lg:ml-52 xl:ml-72 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
