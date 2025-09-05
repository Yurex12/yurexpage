import { Button } from "@/components/ui/button";
import { LogOut, Monitor, Smartphone } from "lucide-react";

export default function SeuritySettings() {
  // Example data (in real case, fetch from backend)
  const sessions = [
    {
      id: 1,
      device: "Chrome on Windows",
      ip: "192.168.0.12",
      location: "Lagos, Nigeria",
      lastActive: "Just now",
      current: true,
      icon: <Monitor className="h-5 w-5 text-blue-600" />,
    },
    {
      id: 2,
      device: "Safari on iPhone",
      ip: "192.168.0.33",
      location: "Abuja, Nigeria",
      lastActive: "2 hours ago",
      current: false,
      icon: <Smartphone className="h-5 w-5 text-green-600" />,
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-900">Active Sessions</h2>
      <div className="space-y-4">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="flex items-center justify-between rounded-xl border border-gray-200 p-4 hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              {session.icon}
              <div>
                <p className="font-medium">{session.device}</p>
                <p className="text-sm text-gray-500">
                  {session.location} • {session.ip}
                </p>
                <p className="text-xs text-gray-400">
                  Last active: {session.lastActive}
                  {session.current && " • Current session"}
                </p>
              </div>
            </div>
            {!session.current && (
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <LogOut className="h-4 w-4" /> Logout
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
