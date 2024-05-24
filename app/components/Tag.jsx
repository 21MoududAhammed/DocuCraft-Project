import Link from "next/link";

export default function Tag({tag}) {
  return (
    <Link key={tag} href={`/tags/${tag}`}>
      {tag}
    </Link>
  );
}
