import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { destinationGuides } from "../../components/destination-guides";
import { DestinationDetailPage } from "../../components/destination-detail-page";

export function generateStaticParams() {
  return destinationGuides.map(guide => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = destinationGuides.find(item => item.slug === slug);
  if (!guide) notFound();
  return { title: `${guide.name} Journeys | Wings & Wheels`, description: `${guide.line} Explore ${guide.name} with travel ideas, trip lengths, regional combinations and a journey planned around you.` };
}

export default async function Destination({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = destinationGuides.find(item => item.slug === slug);
  if (!guide) notFound();
  return <DestinationDetailPage guide={guide} />;
}
