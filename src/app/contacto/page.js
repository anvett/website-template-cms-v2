import { fetchPageData } from "@/lib/cms";
import { SectionRenderer } from "@/lib/content/SectionRenderer";
import { buildPageMetadata } from "@/lib/content/buildPageMetadata";

const PAGE_ID = "contacto";

export async function generateMetadata() {
  const pageData = await fetchPageData(PAGE_ID);
  return buildPageMetadata(pageData);
}

export default async function ContactoPage() {
  const pageData = await fetchPageData(PAGE_ID);

  return (
    <main>
      <SectionRenderer sections={pageData.sections} />
    </main>
  );
}
