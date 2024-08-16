// app/components/layout.tsx

import ComponentSidebar from "@/components/navigation/component-sidebar";

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex relative min-h-screen ">
      <ComponentSidebar />
      <div className="relative pt-20 w-full max-w-5xl 2xl:max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
}
