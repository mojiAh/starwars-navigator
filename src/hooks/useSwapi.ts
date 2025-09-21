import { useState, useEffect } from 'react';

import { getPlanets, getCharacters, getStarships, getPlanetByUrl, getCharacterByUrl, getStarshipByUrl } from '../api/swapi';
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
