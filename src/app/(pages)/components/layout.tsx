// app/components/layout.tsx
import dynamic from "next/dynamic";

const DynamicResponsiveSidebar = dynamic(
  () => import("@/components/navigation/responsive-sidebar"),
  { ssr: true }
);

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <div className="relative min-h-screen ">
      <DynamicResponsiveSidebar />
      <div className="relative pt-16 xl:ml-56">
        {children}
      </div>
    </div>
  );
}
