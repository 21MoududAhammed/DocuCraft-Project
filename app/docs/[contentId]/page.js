import ContentDisplay from "@/app/components/ContentDisplay";

export default function ContentPage({ params: { contentId } }) {
  return <ContentDisplay id={contentId} />;
}
