export default function UsernameSuggestions({
  suggestions,
  handleSuggestionClick,
}: {
  suggestions: string[];
  handleSuggestionClick: (value: string) => void;
}) {
  return (
    <div className="flex gap-x-1">
      <div className="text-sm font-medium text-gray-700">suggestions:</div>
      <div className="flex flex-wrap gap-x-1">
        {suggestions.map((suggestion, index) => (
          <span
            key={index}
            onClick={() => handleSuggestionClick(suggestion)}
            className="text-sm text-blue-600 hover:cursor-pointer"
          >
            {suggestion}
            {index !== suggestions.length - 1 ? "," : ""}
          </span>
        ))}
      </div>
    </div>
  );
}
