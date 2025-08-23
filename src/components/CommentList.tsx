import { ThumbsUp } from "lucide-react";

const comments = [
  {
    id: 1,
    name: "Yusuf Ade",
    avatar: "/c.jpg",
    text: "This is an amazing post! Thanks for sharing this 💯",
    liked: false,
    likeCount: 2,
    time: "2h ago",
  },
  {
    id: 2,
    name: "Lola Martins",
    avatar: "/d.jpg",
    text: "Thanks for sharing this 💯",
    liked: true,
    likeCount: 5,
    time: "3h ago",
  },
  {
    id: 3,
    name: "Yusuf Ade",
    avatar: "/c.jpg",
    text: "This is an amazing post!",
    liked: false,
    likeCount: 2,
    time: "2h ago",
  },
  {
    id: 4,
    name: "Lola Martins",
    avatar: "/d.jpg",
    text: "Thanks for sharing this 💯 Thanks for sharing this 💯",
    liked: true,
    likeCount: 5,
    time: "3h ago",
  },
  {
    id: 5,
    name: "Yusuf Ade",
    avatar: "/c.jpg",
    text: "This is an amazing post! Thanks for sharing this 💯Thanks for sharing this 💯",
    liked: false,
    likeCount: 2,
    time: "2h ago",
  },
  {
    id: 6,
    name: "Lola Martins",
    avatar: "/c.jpg",
    text: "Thanks for sharing this 💯Thanks for sharing this 💯Thanks for sharing this 💯Thanks for sharing this 💯Thanks for sharing this 💯Thanks for sharing this 💯",
    liked: true,
    likeCount: 5,
    time: "3h ago",
  },
];

export default function CommentList() {
  return (
    <div className="space-y-4 px-4 pt-4">
      {comments.map((comment) => (
        <div key={comment.id} className="flex gap-3">
          {/* Avatar */}
          <img
            src={comment.avatar}
            alt={comment.name}
            className="h-10 w-10 rounded-full object-cover"
          />

          {/* Comment Content */}
          <div className="">
            <div className="rounded-xl bg-gray-100 p-3">
              <p className="text-sm font-semibold text-gray-900">
                {comment.name}
              </p>
              <p className="mt-0.5 text-sm">{comment.text}</p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-2">
              <div className="mt-1 flex items-center gap-4 text-xs text-gray-500">
                <button className="flex items-center gap-1 transition hover:text-blue-500">
                  Like
                </button>
                <span>{comment.time}</span>
              </div>
              <div className="flex items-center gap-x-[1px]">
                <ThumbsUp className="h-3 w-3" />
                <span className="text-xs">{comment.likeCount}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
