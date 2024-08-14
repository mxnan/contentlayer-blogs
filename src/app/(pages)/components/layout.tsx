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
      <aside className="fixed left-4 md:left-6 lg:left-10 xl:left-12 2xl:left-20  top-44 h-[70vh] bottom-0 md:w-64 overflow-y-auto">
        <ComponentSidebar />
      </aside>
      <div className="relative md:ml-48 lg:ml-52 2xl:max-w-5xl 2xl:mx-auto overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
