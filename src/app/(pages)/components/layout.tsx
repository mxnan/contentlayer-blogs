// app/components/layout.tsx
import LoaderCircleSpin from "@/components/ui/loader-circle-spin";
import dynamic from "next/dynamic";

const DynamicComponentSidebar = dynamic(
  () => import("@/components/navigation/component-sidebar"),
  { ssr: true, loading: () => <LoaderCircleSpin /> }
);

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex relative min-h-screen ">
      <DynamicComponentSidebar />
      <div className="relative pt-16 w-full max-w-5xl 2xl:max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
}
