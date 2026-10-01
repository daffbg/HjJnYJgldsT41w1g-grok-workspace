import { createFileRoute } from "@tanstack/react-router";
import { StudioApp } from "@/ui/StudioApp";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <StudioApp />;
}
