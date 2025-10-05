import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserAvatar({
  url = "https://github.com/shadcn.png",
  alt = "@shadcn",
  fallback = "CN",
}: {
  url: string;
  alt: string;
  fallback: string;
}) {
  return (
    <Avatar className="size-10">
      <AvatarImage src={url} alt={alt} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}
