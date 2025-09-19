import { useState, useEffect } from 'react';
import { fetchJson } from '../api/swapi';
import type { Planet, Character, Starship } from '../types';

async function getPlanetByUrl(url: string) {
    return fetchJson<Planet>(url);
}

async function getCharacterByUrl(url: string) {
    return fetchJson<Character>(url);
}

async function getStarshipByUrl(url: string) {
    return fetchJson<Starship>(url);
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