import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AccountSettings() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-medium text-gray-900">Account Information</h2>
      <form className="space-y-5">
        {/* email */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Email:{" "}
          </label>
          <Input
            type="text"
            className="h-10 w-full rounded-xl border shadow-none hover:cursor-not-allowed disabled:pointer-events-auto disabled:cursor-not-allowed"
            value="yusufekungomi@gmail.com"
            disabled
          />
        </div>
        {/* displayname */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Display name:
          </label>
          <Input
            type="text"
            placeholder="Enter new username"
            className="h-10 w-full rounded-xl border bg-gray-100 p-3 shadow-none focus:ring-0 focus:outline-none focus-visible:ring-0"
          />
        </div>
        {/* username */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Username:
          </label>
          <Input
            type="text"
            placeholder="Enter new username"
            className="h-10 w-full rounded-xl border bg-gray-100 p-3 shadow-none focus:ring-0 focus:outline-none focus-visible:ring-0"
          />
        </div>
        <Button className="hover:bg-primary bg-primary px-5 font-medium text-white shadow-none transition hover:text-white">
          Save changes
        </Button>
      </form>
    </div>
  );
}
