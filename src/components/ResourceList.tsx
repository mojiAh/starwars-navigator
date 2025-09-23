import { Link } from "react-router-dom";

interface ResourceListProps {
    title: string;
    urls: string[];
    getName: (url: string) => string | null;
    loading: boolean;
    linkBase?: string;
    emptyMessage?: string;
}

export function ResourceList({
    title,
    urls,
    getName,
    loading,
    linkBase,
    emptyMessage = "No items found",
}: ResourceListProps) {
    return (
        <div className="space-y-2">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>

            {urls.length === 0 ? (
                <div className="text-sm text-gray-600">{emptyMessage}</div>
            ) : loading ? (
                <div className="text-sm text-gray-600">Loading {title.toLowerCase()}…</div>
            ) : (
                <ul className="pl-5 space-y-1 text-sm text-gray-700">
                    {urls.map((url) => {
                        const id = url.split("/").filter(Boolean).pop();
                        const name = getName(url);

                        return (
                            <li key={id}>
                                {linkBase ? (
                                    <Link
                                        className="text-blue-600 font-medium hover:underline"
                                        to={`${linkBase}/${id}`}>
                                        {name || "Unknown"}
                                    </Link>
                                ) : (
                                    <ul className="font-medium text-gray-600">
                                        {name || "Unknown"}
                                    </ul>
                                )}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
