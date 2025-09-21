import { useState, useEffect, useCallback } from 'react';
import { fetchJson } from '../api/swapi';

// A hook to fetch and cache names of resources (planets, characters, starships) by their URLs
export function useResourceNames(urls: string[]) {
    const [cache, setCache] = useState<Map<string, string>>(new Map());
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!urls || urls.length === 0) return;

        const missing = urls.filter((u) => !cache.has(u));
        if (missing.length === 0) return;

        setLoading(true);
        Promise.all(
            missing.map((url) =>
                fetchJson(url)
                    .then((data) => {
                        const d = data as { name?: string; title?: string };
                        return { url, name: d.name || d.title || "Unknown" };
                    })
                    .catch(() => ({ url, name: "Unknown" }))
            )
        ).then((results) => {
            setCache((prev) => {
                const copy = new Map(prev);
                results.forEach(({ url, name }) => copy.set(url, name));
                return copy;
            });
            setLoading(false);
        });
    }, [urls, cache]);

    const getName = useCallback(
        (url: string) => cache.get(url) ?? null,
        [cache]
    );

    return { getName, loading };
}