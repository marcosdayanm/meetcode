"use client";

import { useRouter } from "next/navigation";
import { Badge } from "./ui/badge";

export function TagsList({ tags }: { tags: string[] }) {
  const router = useRouter();
  return (
    <div className="flex gap-2 flex-wrap">
      {tags.map((tag) => (
        <button // ya que pusimos en button, no se necesita lo de tabindex porque el button ya por si solo tiene todas esas propiedades
          key={tag}
          onClick={() => {
            router.push(`/browse?search=${tag}`);
          }}
        >
          <Badge
            className="w-fit cursor-pointer"
            // tabIndex={0} // ésto es para que se pueda tipo seleccionar con el tab
            // role="button"
          >
            {tag}
          </Badge>
        </button>
      ))}
    </div>
  );
}
