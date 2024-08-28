// app/components/layout.tsx

import dynamic from "next/dynamic";

const DynamicResponsiveSidebar = dynamic(
  () => import("@/components/navigation/responsive-sidebar"),
  { ssr: false }
);
const DynamicProgressBar = dynamic(
  () => import("@/components/custom/progress-bar"),
  { ssr: false }
);

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <DynamicResponsiveSidebar />
      <div className="relative pt-16 max-w-5xl xl:ml-[calc(50%-30rem)] mx-auto">
        <DynamicProgressBar />
        {children}
      </div>
    </div>
  );
}
