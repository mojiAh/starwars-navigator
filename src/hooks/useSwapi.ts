import { useState, useEffect, useCallback } from 'react';

import { getPlanets, getCharacters, getStarships, getPlanetByUrl, getCharacterByUrl, getStarshipByUrl, fetchJson } from '../api/swapi';
import type { Planet, Character, Starship, SwapiResponse } from '../types';

export function usePlanets({ page = 1, search = "" }: { page?: number; search?: string; }) {
    const [data, setData] = useState<SwapiResponse<Planet> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let alive = true;
        setLoading(true);
        getPlanets({ page, search })
            .then((d) => {
                if (alive) setData(d);
            })
            .catch((err) => {
                if (alive) setError(err as Error);
            })
            .finally(() => {
                if (alive) setLoading(false);
            });
        return () => {
            alive = false;
        };
    }, [page, search]);
    return { data, loading, error };
}

export function useCharacters({ page = 1, search = "" }: { page?: number; search?: string; }) {
    const [data, setData] = useState<SwapiResponse<Character> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let alive = true;
        setLoading(true);
        getCharacters({ page, search })
            .then((d) => {
                if (alive) setData(d);
            })
            .catch((err) => {
                if (alive) setError(err as Error);
            })
            .finally(() => {
                if (alive) setLoading(false);
            });
        return () => {
            alive = false;
        };
    }, [page, search]);
    return { data, loading, error };
}

export function useStarships({ page = 1 }: { page?: number; }) {
    const [data, setData] = useState<SwapiResponse<Starship> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let alive = true;
        setLoading(true);
        getStarships({ page })
            .then((d) => {
                if (alive) setData(d);
            })
            .catch((err) => {
                if (alive) setError(err as Error);
            })
            .finally(() => {
                if (alive) setLoading(false);
            });
        return () => {
            alive = false;
        };
    }, [page]);
    return { data, loading, error };
}

export function usePlanetDetails(id?: string) {

    const [data, setData] = useState<Planet | null>(null);
    const [loading, setLoading] = useState<boolean>(!!id);
    const [error, setError] = useState<Error | null>(null);

    const url = id ? `https://swapi.py4e.com/api/planets/${id}/` : null;

    useEffect(() => {
        if (!url) return;
        let alive = true;
        setLoading(true);
        getPlanetByUrl(url)
            .then((d) => {
                if (alive) setData(d);
            })
            .catch((err) => {
                if (alive) setError(err as Error);
            })
            .finally(() => {
                if (alive) setLoading(false);
            });
        return () => {
            alive = false;
        };
    }, [id]);

    return { data, loading, error };
}

export function useCharacterDetails(id?: string) {

    const [data, setData] = useState<Character | null>(null);
    const [loading, setLoading] = useState<boolean>(!!id);
    const [error, setError] = useState<Error | null>(null);

    const url = id ? `https://swapi.py4e.com/api/people/${id}/` : null;

    useEffect(() => {
        if (!url) return;
        let alive = true;
        setLoading(true);
        getCharacterByUrl(url)
            .then((d) => {
                if (alive) setData(d);
            })
            .catch((err) => {
                if (alive) setError(err as Error);
            })
            .finally(() => {
                if (alive) setLoading(false);
            });
        return () => {
            alive = false;
        };
    }, [id]);

    return { data, loading, error };
}

export function useStarshipDetails(id?: string) {

    const [data, setData] = useState<Starship | null>(null);
    const [loading, setLoading] = useState<boolean>(!!id);
    const [error, setError] = useState<Error | null>(null);

    const url = id ? `https://swapi.py4e.com/api/starships/${id}/` : null;

    useEffect(() => {
        if (!url) return;
        let alive = true;
        setLoading(true);
        getStarshipByUrl(url)
            .then((d) => {
                if (alive) setData(d);
            })
            .catch((err) => {
                if (alive) setError(err as Error);
            })
            .finally(() => {
                if (alive) setLoading(false);
            });
        return () => {
            alive = false;
        };
    }, [id]);

    return { data, loading, error };
}

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